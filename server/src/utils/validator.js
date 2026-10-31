/**
 * Validation utilities for contact enquiries
 */

// Basic RFC-compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Flexible phone regex allowing local (e.g., 018-3933371) and international formats (+60 18 393 3371)
const PHONE_REGEX = /^\+?[0-9\s\-()]{7,25}$/;

/**
 * Validates and cleans contact form submission data.
 * Returns { isValid, errors, cleanedData }
 */
export function validateContactSubmission(body) {
  const errors = {};
  const cleaned = {};

  // Check honeypot field (anti-spam)
  if (body.website_hp && body.website_hp.trim().length > 0) {
    return {
      isValid: false,
      isSpam: true,
      errors: { form: 'Spam detected.' },
      cleanedData: null
    };
  }

  // Name validation
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.name = 'Please provide your full name.';
  } else {
    const trimmedName = body.name.trim();
    if (trimmedName.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    } else if (trimmedName.length > 100) {
      errors.name = 'Name must not exceed 100 characters.';
    } else {
      cleaned.name = trimmedName;
    }
  }

  // Email validation
  if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
    errors.email = 'Please provide an email address.';
  } else {
    const trimmedEmail = body.email.trim().toLowerCase();
    if (trimmedEmail.length > 120) {
      errors.email = 'Email address is too long.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    } else {
      cleaned.email = trimmedEmail;
    }
  }

  // Phone validation
  if (!body.phone || typeof body.phone !== 'string' || body.phone.trim().length === 0) {
    errors.phone = 'Please provide a contact phone number.';
  } else {
    const trimmedPhone = body.phone.trim();
    const digitCount = (trimmedPhone.match(/\d/g) || []).length;
    if (digitCount < 7 || digitCount > 18 || !PHONE_REGEX.test(trimmedPhone)) {
      errors.phone = 'Please enter a valid phone number (e.g., 018-3933371 or +60 18 393 3371).';
    } else {
      cleaned.phone = trimmedPhone;
    }
  }

  // Description / Message validation
  if (!body.description || typeof body.description !== 'string' || body.description.trim().length === 0) {
    errors.description = 'Please explain the nature of your enquiry or collaboration proposal.';
  } else {
    const trimmedDesc = body.description.trim();
    if (trimmedDesc.length < 10) {
      errors.description = 'Please provide a little more detail (at least 10 characters).';
    } else if (trimmedDesc.length > 3000) {
      errors.description = 'Message cannot exceed 3000 characters.';
    } else {
      cleaned.description = trimmedDesc;
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    isSpam: false,
    errors,
    cleanedData: isValid ? cleaned : null
  };
}
