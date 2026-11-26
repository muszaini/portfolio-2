export const MIN_DESCRIPTION_LENGTH = 20;
export const MAX_DESCRIPTION_LENGTH = 3000;
export const MAX_PAYLOAD_BYTES = 16 * 1024; // 16 KB

export const PROJECT_TYPES = [
  'Professional Website Development',
  'AI & Workflow Automation',
  'Business Applications',
  'Digital Solutions for Professional Services',
  'Patent & Trademark / IP Digital Solutions',
  'General Consultation / Collaboration',
];

export const BUDGET_RANGES = [
  'To be discussed',
  'Under MYR 3,000 / USD 750',
  'MYR 3,000 – 8,000 / USD 750 – 2,000',
  'MYR 8,000 – 20,000 / USD 2,000 – 5,000',
  'MYR 20,000+ / USD 5,000+',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_REGEX = /^[+\d\s().-]+$/;

const cleanText = (value, maxLength = 2000) => {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n/g, '\n').trim().slice(0, maxLength);
};

export function validateEnquiry(input = {}) {
  const safeInput = input && typeof input === 'object' && !Array.isArray(input) ? input : {};

  const sanitized = {
    fullName: cleanText(safeInput.fullName, 120),
    email: cleanText(safeInput.email, 160).toLowerCase(),
    phone: cleanText(safeInput.phone, 40),
    companyName: cleanText(safeInput.companyName, 140),
    projectType: cleanText(safeInput.projectType, 100),
    budgetRange: cleanText(safeInput.budgetRange, 100),
    projectDescription: cleanText(safeInput.projectDescription, MAX_DESCRIPTION_LENGTH),
    consent: safeInput.consent === true,
  };

  const errors = {};

  if (!sanitized.fullName || sanitized.fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!sanitized.email || !EMAIL_REGEX.test(sanitized.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneDigits = sanitized.phone.replace(/\D/g, '');
  if (
    !sanitized.phone ||
    !PHONE_ALLOWED_REGEX.test(sanitized.phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 18
  ) {
    errors.phone = 'Please enter a valid phone number (7–18 digits).';
  }

  if (!sanitized.projectType || !PROJECT_TYPES.includes(sanitized.projectType)) {
    errors.projectType = 'Please select a project type.';
  }

  if (sanitized.budgetRange && !BUDGET_RANGES.includes(sanitized.budgetRange)) {
    errors.budgetRange = 'Please choose one of the listed budget ranges.';
  }

  if (
    !sanitized.projectDescription ||
    sanitized.projectDescription.length < MIN_DESCRIPTION_LENGTH
  ) {
    errors.projectDescription = `Please describe your business problem or project goals (at least ${MIN_DESCRIPTION_LENGTH} characters).`;
  }

  if (!sanitized.consent) {
    errors.consent =
      'Please confirm consent so your enquiry details can be securely stored to respond.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}
