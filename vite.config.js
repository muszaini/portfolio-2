import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const MAX_DEV_BODY_BYTES = 16 * 1024; // 16 KB safety cap for local middleware

/**
 * Local dev plugin that mounts Vercel-style /api/enquiries route
 * so frontend + backend validation and Supabase insertion work in `npm run dev`.
 */
function localApiMiddleware(mode) {
  return {
    name: 'local-vercel-api-middleware',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), '');
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }

      server.middlewares.use('/api/enquiries', async (req, res, next) => {
        if (req.url && req.url !== '/' && !req.url.startsWith('/?')) {
          return next();
        }

        try {
          const chunks = [];
          let totalBytes = 0;

          for await (const chunk of req) {
            totalBytes += chunk.length;
            if (totalBytes > MAX_DEV_BODY_BYTES) {
              res.statusCode = 413;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(
                JSON.stringify({
                  ok: false,
                  message: 'Enquiry payload is too large.',
                })
              );
              return;
            }
            chunks.push(chunk);
          }

          const rawBody = Buffer.concat(chunks).toString('utf8');
          if (rawBody) {
            try {
              req.body = JSON.parse(rawBody);
            } catch {
              req.body = rawBody;
            }
          } else {
            req.body = {};
          }

          const { default: handler } = await server.ssrLoadModule('/api/enquiries.js');

          const responseHelper = {
            statusCode: 200,
            setHeader: (name, value) => res.setHeader(name, value),
            status(code) {
              this.statusCode = code;
              res.statusCode = code;
              return this;
            },
            json(payload) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(payload));
            },
            end(body) {
              res.end(body);
            },
          };

          await handler(req, responseHelper);
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(
            JSON.stringify({
              ok: false,
              message: 'Local API handler encountered an unexpected error.',
              detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
            })
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), localApiMiddleware(mode)],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-')) {
            return 'motion';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          return undefined;
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
}));
