import fs from 'fs';
import path from 'path';

const CSV_HEADER = 'submitted_at_utc,name,email,phone,description\n';

/**
 * Sanitizes a string against CSV formula injection (DDE/spreadsheet attack)
 * when opened in software like Excel or Google Sheets.
 */
function sanitizeFormulaInjection(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

/**
 * Escapes a cell value according to RFC 4180 CSV specifications.
 */
function escapeCsvCell(value) {
  const sanitized = sanitizeFormulaInjection(value);
  // If the cell contains quotes, commas, or newlines, wrap in quotes and double internal quotes
  if (/[",\n\r]/.test(sanitized)) {
    return `"${sanitized.replace(/"/g, '""')}"`;
  }
  return `"${sanitized}"`;
}

/**
 * Ensures the target CSV file and its parent directories exist,
 * with the standard header row if newly created.
 */
export async function ensureCsvFile(filePath) {
  const absolutePath = path.resolve(filePath);
  const dir = path.dirname(absolutePath);

  await fs.promises.mkdir(dir, { recursive: true, mode: 0o700 });

  try {
    const stats = await fs.promises.stat(absolutePath);
    if (stats.size === 0) {
      await fs.promises.writeFile(absolutePath, CSV_HEADER, { encoding: 'utf8', mode: 0o600 });
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.promises.writeFile(absolutePath, CSV_HEADER, { encoding: 'utf8', mode: 0o600 });
    } else {
      throw err;
    }
  }

  return absolutePath;
}

/**
 * Appends a validated contact enquiry to the private CSV storage file.
 *
 * @param {Object} data - { name, email, phone, description }
 * @param {string} filePath - Path to CSV file
 * @returns {Promise<void>}
 */
export async function appendEnquiryToCsv(data, filePath) {
  const absolutePath = await ensureCsvFile(filePath);
  const timestamp = new Date().toISOString();

  const record = [
    escapeCsvCell(timestamp),
    escapeCsvCell(data.name),
    escapeCsvCell(data.email),
    escapeCsvCell(data.phone),
    escapeCsvCell(data.description)
  ].join(',') + '\n';

  await fs.promises.appendFile(absolutePath, record, { encoding: 'utf8', mode: 0o600 });
}
