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
  const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173';
  const allowedOrigins = rawOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps or curl) or if origin is in whitelist
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

  // Storage path configuration
  const defaultStoragePath = path.resolve(__dirname, '../data/contact-submissions.csv');
  const storageFilePath = customConfig.storageFilePath || process.env.STORAGE_FILE_PATH || defaultStoragePath;

  // Rate limiter for contact submissions
  const rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
  const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10);
  const contactLimiter = createRateLimiter({
    windowMs: rateLimitWindowMs,
    maxRequests: rateLimitMax
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      service: 'muszaini-portfolio-api',
      time: new Date().toISOString()
    });
  });

  // Mount contact router with rate limiting
  app.use('/api/contact', contactLimiter, createContactRouter(storageFilePath));

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
