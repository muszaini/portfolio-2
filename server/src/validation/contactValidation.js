/**
 * Server-side validation, normalisation, spam detection, and CSV escaping
 * for Collaboration / Contact Enquiries.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

// Allows Malaysian (e.g. 0183933371, 018-393 3371, +60183933371, 03-12345678)
// and international phone numbers (+44..., +1..., spaces, hyphens, parentheses, dots).
const PHONE_ALLOWED_CHARS_REGEX = /^\+?[0-9][0-9\s\-().]{5,24}$/;

const DANGEROUS_FORMULA_PREFIXES = ['=', '@', '\t', '\r'];

/**
 * Strip ASCII control characters except standard newlines (\n, \r) and tabs (\t).
 */
export function stripControlChars(input, allowNewlines = false) {
  if (typeof input !== 'string') return '';
  const normalized = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  let out = '';
  for (let i = 0; i < normalized.length; i++) {
    const code = normalized.charCodeAt(i);
    if (allowNewlines && (code === 10 || code === 9)) {
      out += normalized[i];
    } else if (code >= 32 && code !== 127) {
      out += normalized[i];
    } else if (!allowNewlines && (code === 10 || code === 9)) {
      out += ' ';
    }
  }
  return allowNewlines ? out : out.replace(/\s+/g, ' ');
}

/**
 * Normalise phone number while preserving international '+' prefix and readability.
 */
export function normalisePhone(rawPhone) {
  if (typeof rawPhone !== 'string') return '';
  const cleaned = stripControlChars(rawPhone, false).trim();
  // Collapse multiple spaces
  return cleaned.replace(/\s+/g, ' ');
}

/**
 * Validate and sanitise incoming contact enquiry payload.
 * Returns { isValid, data, fieldErrors, isSpam, spamReason }
 */
export function validateContactSubmission(payload = {}) {
  const fieldErrors = {};

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      isValid: false,
      isSpam: false,
      fieldErrors: {
        form: 'Invalid request payload format.',
      },
      data: null,
    };
  }

  // 1. Lightweight honeypot check (fields that must remain empty for real visitors)
  const honeypotValue =
    (typeof payload.website === 'string' && payload.website.trim()) ||
    (typeof payload.company_website === 'string' && payload.company_website.trim()) ||
    (typeof payload.honeypot === 'string' && payload.honeypot.trim());

  if (honeypotValue) {
    return {
      isValid: false,
      isSpam: true,
      spamReason: 'Automated submission detected.',
      fieldErrors: {
        form: 'Submission rejected by spam protection.',
      },
      data: null,
    };
  }

  // 2. Extract and sanitise fields
  const rawName = typeof payload.name === 'string' ? payload.name : '';
  const rawEmail = typeof payload.email === 'string' ? payload.email : '';
  const rawPhone = typeof payload.phone === 'string' ? payload.phone : '';
  const rawDescription = typeof payload.description === 'string' ? payload.description : '';

  const name = stripControlChars(rawName, false).trim();
  const email = stripControlChars(rawEmail, false).trim().toLowerCase();
  const phone = normalisePhone(rawPhone);
  const description = stripControlChars(rawDescription, true).trim();

  // 3. Validate Name
  if (!name) {
    fieldErrors.name = 'Please enter your full name.';
  } else if (name.length < 2) {
    fieldErrors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 120) {
    fieldErrors.name = 'Name must not exceed 120 characters.';
  }

  // 4. Validate Email
  if (!email) {
    fieldErrors.email = 'Please enter your email address.';
  } else if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    fieldErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
  }

  // 5. Validate Phone Number (Malaysian & International formats)
  if (!phone) {
    fieldErrors.phone = 'Please enter your phone number.';
  } else {
    const digitsOnly = phone.replace(/\D/g, '');
    if (
      !PHONE_ALLOWED_CHARS_REGEX.test(phone) ||
      digitsOnly.length < 7 ||
      digitsOnly.length > 15
    ) {
      fieldErrors.phone =
        'Please enter a valid Malaysian (e.g., 0183933371) or international phone number (7–15 digits).';
    }
  }

  // 6. Validate Description / Message
  if (!description) {
    fieldErrors.description = 'Please describe your enquiry or collaboration idea.';
  } else if (description.length < 10) {
    fieldErrors.description =
      'Please provide a brief description of at least 10 characters.';
  } else if (description.length > 3000) {
    fieldErrors.description =
      'Description must not exceed 3,000 characters.';
  } else {
    // Basic spam heuristic: excessive URLs in a single message
    const urlMatches = description.match(/https?:\/\/[^\s]+/gi) || [];
    if (urlMatches.length > 5) {
      return {
        isValid: false,
        isSpam: true,
        spamReason: 'Too many links in message.',
        fieldErrors: {
          description: 'Please remove excessive links from your enquiry.',
        },
        data: null,
      };
    }
  }

  const isValid = Object.keys(fieldErrors).length === 0;

  return {
    isValid,
    isSpam: false,
    fieldErrors,
    data: isValid
      ? {
          name,
          email,
          phone,
          description,
        }
      : null,
  };
}

/**
 * Neutralise spreadsheet formula injection and escape a value for RFC 4180 CSV storage.
 * - Prevents '=', '@', '\t', '\r', and non-phone '+' / '-' formula triggers in Excel/Sheets
 * - Properly doubles internal quotes (") -> ("")
 * - Wraps in double quotes so commas, quotes, and multi-line breaks never corrupt the CSV
 */
export function escapeCsvField(rawVal, options = { isPhone: false }) {
  if (rawVal === null || rawVal === undefined) {
    return '""';
  }
  let str = String(rawVal).replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  if (str.length > 0) {
    const firstChar = str[0];
    if (DANGEROUS_FORMULA_PREFIXES.includes(firstChar)) {
      str = `'${str}`;
    } else if (!options.isPhone && (firstChar === '+' || firstChar === '-')) {
      str = `'${str}`;
    }
  }

  const escapedQuotes = str.replace(/"/g, '""');
  return `"${escapedQuotes}"`;
}

/**
 * Format a complete CSV line with header columns:
 * submitted_at_utc,name,email,phone,description
 */
export function formatCsvRow({ submitted_at_utc, name, email, phone, description }) {
  const columns = [
    escapeCsvField(submitted_at_utc),
    escapeCsvField(name),
    escapeCsvField(email),
    escapeCsvField(phone, { isPhone: true }),
    escapeCsvField(description),
  ];
  return `${columns.join(',')}\n`;
}
