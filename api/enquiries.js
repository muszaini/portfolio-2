import { createClient } from '@supabase/supabase-js';
import { validateEnquiry, MAX_PAYLOAD_BYTES } from '../shared/validation.js';

const MIN_SUBMISSION_MS = 2000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_PRUNE_THRESHOLD = 200;

const ipRequestLog = new Map();

function getClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function pruneExpiredRateLimitEntries(now) {
  for (const [ip, timestamps] of ipRequestLog.entries()) {
    const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      ipRequestLog.delete(ip);
    } else {
      ipRequestLog.set(ip, recent);
    }
  }
}

function isRateLimited(ip, now) {
  if (ipRequestLog.size >= RATE_LIMIT_PRUNE_THRESHOLD) {
    pruneExpiredRateLimitEntries(now);
  }

  const timestamps = ipRequestLog.get(ip) || [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipRequestLog.set(ip, recent);
  return false;
}

function isAllowedOrigin(req, env) {
  const origin = req.headers?.origin;
  if (!origin) return true; // Same-origin/server calls without Origin header

  const configuredOrigin = (env.ALLOWED_ORIGIN || env.SITE_URL || '').trim();
  if (!configuredOrigin) return true;

  try {
    const incomingHost = new URL(origin).origin;
    const allowedOrigins = configuredOrigin
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => new URL(item).origin);

    return allowedOrigins.includes(incomingHost);
  } catch {
    return false;
  }
}

export function resetRateLimiterForTests() {
  ipRequestLog.clear();
}

export function getRateLimiterSizeForTests() {
  return ipRequestLog.size;
}

export function createEnquiryHandler({
  createSupabaseClient = createClient,
  env = process.env,
  nowFn = () => Date.now(),
} = {}) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({
        ok: false,
        message: 'Method not allowed. Please submit enquiries via POST.',
      });
    }

    if (!isAllowedOrigin(req, env)) {
      return res.status(403).json({
        ok: false,
        message: 'Origin not permitted for enquiry submissions.',
      });
    }

    const contentType = String(req.headers?.['content-type'] || '').toLowerCase();
    if (contentType && !contentType.includes('application/json')) {
      return res.status(415).json({
        ok: false,
        message: 'Unsupported media type. Expected application/json.',
      });
    }

    const rawByteLength =
      typeof req.body === 'string'
        ? Buffer.byteLength(req.body, 'utf8')
        : Buffer.byteLength(JSON.stringify(req.body || {}), 'utf8');

    if (rawByteLength > MAX_PAYLOAD_BYTES) {
      return res.status(413).json({
        ok: false,
        message: 'Enquiry payload is too large. Please shorten your description and try again.',
      });
    }

    const body = typeof req.body === 'string' ? safeJsonParse(req.body) : req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid request payload. Expected a JSON object.',
      });
    }

    // Spam layer 1: Honeypot field (silently acknowledge without writing to DB)
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return res.status(200).json({
        ok: true,
        message: 'Thank you. Your enquiry has been received.',
      });
    }

    const now = nowFn();

    // Spam layer 2: Minimum human fill duration check
    const loadedAt = Number(body.formLoadedAt);
    if (!Number.isFinite(loadedAt) || now - loadedAt < MIN_SUBMISSION_MS) {
      return res.status(400).json({
        ok: false,
        message: 'Please take a moment to review your details before submitting.',
      });
    }

    // Spam layer 3: Per-IP sliding window rate limit (best-effort per warm serverless instance)
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp, now)) {
      return res.status(429).json({
        ok: false,
        message:
          'Too many enquiries submitted in a short period. Please wait a few minutes and try again.',
      });
    }

    // Shared server-side validation
    const { valid, errors, sanitized } = validateEnquiry(body);
    if (!valid) {
      return res.status(400).json({
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        fieldErrors: errors,
      });
    }

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(503).json({
        ok: false,
        message:
          'Enquiry storage is not configured on this deployment yet. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      });
    }

    try {
      const supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      const { data, error } = await supabase
        .from('enquiries')
        .insert([
          {
            full_name: sanitized.fullName,
            email: sanitized.email,
            phone: sanitized.phone,
            company_name: sanitized.companyName || null,
            project_type: sanitized.projectType,
            budget_range: sanitized.budgetRange || null,
            project_description: sanitized.projectDescription,
            consent_given: sanitized.consent,
            source: 'portfolio-website',
            status: 'new',
          },
        ])
        .select('id')
        .single();

      if (error) {
        return res.status(502).json({
          ok: false,
          message:
            'We could not record your enquiry at the moment. Please try again shortly.',
        });
      }

      return res.status(201).json({
        ok: true,
        message:
          'Thank you for reaching out. Your enquiry has been recorded securely and I will respond promptly.',
        referenceId: data?.id || null,
      });
    } catch {
      return res.status(500).json({
        ok: false,
        message: 'An unexpected server error occurred. Please try again shortly.',
      });
    }
  };
}

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default createEnquiryHandler();
