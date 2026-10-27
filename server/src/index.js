import { createApp } from './app.js';
import { resolveCsvFilePath } from './storage/csvStorage.js';

const PORT = Number(process.env.PORT) || 3001;
// Default to 0.0.0.0 in production so cloud load balancers can reach the container,
// or 127.0.0.1 in local development unless HOST is explicitly set.
const HOST =
  process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');

const app = createApp();

app.listen(PORT, HOST, () => {
  const storagePath = resolveCsvFilePath();
  console.log(`[muszaini-portfolio-api] Listening on http://${HOST}:${PORT}`);
  console.log(`[muszaini-portfolio-api] Private CSV storage configured at: ${storagePath}`);
});
