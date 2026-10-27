import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatCsvRow } from '../validation/contactValidation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default private storage path: <repo>/server/data/contact-submissions.csv
const DEFAULT_CSV_PATH = path.resolve(__dirname, '../../data/contact-submissions.csv');

export const CSV_HEADER = 'submitted_at_utc,name,email,phone,description\n';

/**
 * Resolve the configured private CSV storage path.
 * Ensures the path is never inside the public frontend build directory.
 */
export function resolveCsvFilePath(customPath) {
  const rawPath = customPath || process.env.CONTACT_CSV_PATH || DEFAULT_CSV_PATH;
  const resolved = path.resolve(rawPath);

  // Guard against accidentally pointing storage into public/ or dist/
  const publicDir = path.resolve(__dirname, '../../../public');
  const distDir = path.resolve(__dirname, '../../../dist');
  if (resolved.startsWith(publicDir + path.sep) || resolved.startsWith(distDir + path.sep)) {
    throw new Error('Security configuration error: CSV storage path cannot be inside public/ or dist/.');
  }

  return resolved;
}

/**
 * Ensure the private directory and CSV file exist with restricted owner-only permissions (0700 / 0600),
 * then append a single verified contact submission row.
 */
export async function appendContactSubmission({ name, email, phone, description }, customPath) {
  const csvFilePath = resolveCsvFilePath(customPath);
  const dataDir = path.dirname(csvFilePath);

  // 1. Ensure private directory exists with restricted permissions where supported
  await fs.mkdir(dataDir, { recursive: true, mode: 0o700 });

  // 2. Check if CSV file already exists and has content; if not, write header with 0o600 permissions
  let fileExists = false;
  try {
    const stat = await fs.stat(csvFilePath);
    fileExists = stat.size > 0;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  if (!fileExists) {
    await fs.writeFile(csvFilePath, CSV_HEADER, { encoding: 'utf8', mode: 0o600 });
  }

  // 3. Generate UTC ISO timestamp and format RFC 4180 CSV record
  const submitted_at_utc = new Date().toISOString();
  const rowString = formatCsvRow({
    submitted_at_utc,
    name,
    email,
    phone,
    description,
  });

  // 4. Append row and ensure restricted file permissions
  await fs.appendFile(csvFilePath, rowString, { encoding: 'utf8', mode: 0o600 });
  try {
    await fs.chmod(csvFilePath, 0o600);
  } catch {
    // Ignore chmod unsupported errors on non-POSIX filesystems
  }

  return {
    submitted_at_utc,
  };
}
