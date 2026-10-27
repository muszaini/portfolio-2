const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const PHONE_ALLOWED_REGEX = /^\+?[0-9][0-9\s\-().]{5,24}$/;

export function validateClientForm(values = {}) {
  const errors = {};
  const name = (values.name || '').trim();
  const email = (values.email || '').trim();
  const phone = (values.phone || '').trim();
  const description = (values.description || '').trim();

  if (!name) {
    errors.name = 'Please enter your full name.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 120) {
    errors.name = 'Name must not exceed 120 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com).';
  }

  if (!phone) {
    errors.phone = 'Please enter your phone number.';
  } else {
    const digits = phone.replace(/\D/g, '');
    if (!PHONE_ALLOWED_REGEX.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone =
        'Please enter a valid Malaysian (e.g., 0183933371) or international phone number (7–15 digits).';
    }
  }

  if (!description) {
    errors.description = 'Please describe your enquiry or collaboration idea.';
  } else if (description.length < 10) {
    errors.description = 'Please provide a brief description of at least 10 characters.';
  } else if (description.length > 3000) {
    errors.description = 'Description must not exceed 3,000 characters.';
  }

  return errors;
}
