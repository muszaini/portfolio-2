import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRateLimiter } from './utils/rateLimiter.js';
import { createContactRouter } from './routes/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(customConfig = {}) {
  const app = express();

  // Basic security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // CORS configuration
  const rawOrigins =
    process.env.CORS_ORIGIN ||
    'http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:5174';
  const allowedOrigins = rawOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);

  // Include Vercel deployment URLs automatically when running on Vercel
  [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ]
    .filter(Boolean)
    .forEach((domain) => {
      allowedOrigins.push(`https://${domain}`, `http://${domain}`);
    });

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. same-origin, server-to-server, curl) or if origin is in whitelist
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
          callback(null, true);
        } else {
          callback(new Error('Cross-Origin Request Blocked'));
        }
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      credentials: false
    })
  );

  // Body parser with 100kb payload ceiling to prevent abuse
  app.use(express.json({ limit: '100kb' }));

  // Storage path configuration (use writable /tmp fallback on Vercel serverless if STORAGE_FILE_PATH is unset)
  const defaultStoragePath = process.env.VERCEL
    ? '/tmp/contact-submissions.csv'
    : path.resolve(__dirname, '../data/contact-submissions.csv');
  const storageFilePath = customConfig.storageFilePath || process.env.STORAGE_FILE_PATH || defaultStoragePath;

  // Rate limiter for contact submissions
  const rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
  const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10);
  const contactLimiter = createRateLimiter({
    windowMs: rateLimitWindowMs,
    maxRequests: rateLimitMax
  });

  // Health check endpoint (supports both /api/health and /health)
  app.get(['/api/health', '/health'], (req, res) => {
    res.status(200).json({
      status: 'healthy',
      service: 'muszaini-portfolio-api',
      time: new Date().toISOString()
    });
  });

  // Mount contact router with rate limiting (supports both /api/contact and /contact)
  const contactRouter = createContactRouter(storageFilePath);
  app.use(['/api/contact', '/contact'], contactLimiter, contactRouter);

  // Catch-all 404 for unknown API endpoints
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

  // Global error handler
  app.use((err, req, res, next) => {
    if (err.message === 'Cross-Origin Request Blocked') {
      return res.status(403).json({ error: 'CORS forbidden' });
    }
    console.error('Unhandled server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
