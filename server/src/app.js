import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { createContactRouter } from './routes/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../../dist');

/**
 * Create and configure the Express application.
 */
export function createApp(options = {}) {
  const app = express();

  // Trust first reverse proxy (Render, Railway, Fly.io, Nginx, Cloudflare)
  // so per-IP rate limiting uses the real visitor IP in production.
  app.set('trust proxy', 1);

  // Security headers
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Strictly block any attempt to request a .csv file over HTTP
    if (req.path && req.path.toLowerCase().endsWith('.csv')) {
      return res.status(403).json({
        error: 'Access to private data files is strictly forbidden.',
      });
    }
    return next();
  });

  // CORS configuration
  const allowedOrigin = process.env.CORS_ORIGIN || '*';
  app.use(
    cors({
      origin: allowedOrigin,
      methods: ['POST', 'GET', 'OPTIONS'],
    })
  );

  // Strict request body size limit (16kb) to prevent payload abuse
  app.use(express.json({ limit: '16kb' }));

  // Handle malformed JSON payloads cleanly
  app.use((err, _req, res, next) => {
    if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
      return res.status(400).json({
        error: 'Malformed JSON request body.',
        fieldErrors: { form: 'Malformed JSON request body.' },
      });
    }
    if (err && err.type === 'entity.too.large') {
      return res.status(400).json({
        error: 'Request payload is too large.',
        fieldErrors: { form: 'Request payload is too large.' },
      });
    }
    return next(err);
  });

  // Healthcheck endpoint (never exposes sensitive data)
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'muszaini-portfolio-api' });
  });

  // Mount contact router
  app.use('/api/contact', createContactRouter(options));

  // Catch-all 404 for unknown API routes
  app.use('/api/*', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  // Serve built production frontend from dist/ when available
  const serveStatic = options.serveStatic ?? fs.existsSync(path.join(DIST_DIR, 'index.html'));
  if (serveStatic) {
    app.use(
      express.static(DIST_DIR, {
        index: 'index.html',
        dotfiles: 'deny',
      })
    );

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      return res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
  }

  return app;
}

export default createApp;
