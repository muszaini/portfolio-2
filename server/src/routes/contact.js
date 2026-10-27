import express from 'express';
import { validateContactSubmission } from '../validation/contactValidation.js';
import { appendContactSubmission } from '../storage/csvStorage.js';

/**
 * Lightweight in-memory sliding-window rate limiter per client IP.
 */
export function createRateLimiter({
  windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  maxRequests = Number(process.env.RATE_LIMIT_MAX) || 8,
} = {}) {
  const ipHits = new Map();

  function middleware(req, res, next) {
    const now = Date.now();
    const clientIp =
      req.ip ||
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    const timestamps = ipHits.get(clientIp) || [];
    const recentTimestamps = timestamps.filter((ts) => now - ts < windowMs);

    if (recentTimestamps.length >= maxRequests) {
      const retryAfterSeconds = Math.ceil((recentTimestamps[0] + windowMs - now) / 1000);
      res.setHeader('Retry-After', String(Math.max(1, retryAfterSeconds)));
      return res.status(429).json({
        error:
          'Too many enquiries have been submitted from this connection. Please wait a few minutes before trying again.',
      });
    }

    recentTimestamps.push(now);
    ipHits.set(clientIp, recentTimestamps);
    return next();
  }

  middleware.reset = () => ipHits.clear();
  return middleware;
}

/**
 * Create the /api/contact router.
 * Accepts optional overrides for testing (customCsvPath, rateLimiterOptions, writeFn).
 */
export function createContactRouter(options = {}) {
  const router = express.Router();
  const rateLimiter = createRateLimiter(options.rateLimiter);
  const persistFn = options.persistFn || appendContactSubmission;

  // Explicitly disallow GET/PUT/DELETE on /api/contact so submissions are never exposed
  router.get('/', (_req, res) => {
    res.status(405).json({
      error: 'Method not allowed. Use POST /api/contact to submit an enquiry.',
    });
  });

  router.post('/', rateLimiter, async (req, res) => {
    const validation = validateContactSubmission(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        error: validation.isSpam
          ? validation.spamReason || 'Submission rejected by spam protection.'
          : 'Please check the highlighted form fields and try again.',
        fieldErrors: validation.fieldErrors,
      });
    }

    try {
      await persistFn(validation.data, options.csvPath);

      return res.status(201).json({
        status: 'created',
        message:
          'Thank you for reaching out. Your collaboration enquiry has been securely recorded, and Muszaini will respond soon.',
      });
    } catch (err) {
      // Log only safe diagnostics; never log full message body or phone number
      console.error('[contact-api] Storage error:', err?.code || err?.message || 'Unknown error');
      return res.status(500).json({
        error:
          'We were unable to record your enquiry right now due to a server storage issue. Please try again later or email muszainimusa224@gmail.com directly.',
      });
    }
  });

  return router;
}
