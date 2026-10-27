import React, { useState } from 'react';
import { validateClientForm } from '../utils/validateClientForm.js';

const DEFAULT_API_ENDPOINT = `${
  (import.meta.env && import.meta.env.VITE_API_BASE_URL
    ? String(import.meta.env.VITE_API_BASE_URL).replace(/\/+$/, '')
    : '')
}/api/contact`;

export function ContactForm({ apiEndpoint = DEFAULT_API_ENDPOINT }) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    website: '', // Honeypot field (must remain empty)
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Clear inline error for edited field
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerMessage('');

    // Client-side validation first
    const validationErrors = validateClientForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setStatus('error');
      setServerMessage('Please review the highlighted fields before submitting.');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          phone: formValues.phone.trim(),
          description: formValues.description.trim(),
          website: formValues.website,
        }),
      });

      let payload = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (response.status === 201) {
        setStatus('success');
        setServerMessage(
          payload.message ||
            'Thank you for your enquiry. Your message has been securely recorded.'
        );
        setFormValues({
          name: '',
          email: '',
          phone: '',
          description: '',
          website: '',
        });
        return;
      }

      if (response.status === 400) {
        setStatus('error');
        if (payload.fieldErrors && typeof payload.fieldErrors === 'object') {
          setFieldErrors(payload.fieldErrors);
        }
        setServerMessage(
          payload.error || 'Please review the highlighted form fields and try again.'
        );
        return;
      }

      if (response.status === 429) {
        setStatus('error');
        setServerMessage(
          payload.error ||
            'Too many enquiries submitted recently. Please wait a few minutes and try again.'
        );
        return;
      }

      setStatus('error');
      setServerMessage(
        payload.error ||
          'We could not save your enquiry right now. Please try again later or email muszainimusa224@gmail.com directly.'
      );
    } catch {
      setStatus('error');
      setServerMessage(
        'Network error: Unable to reach the enquiry server. Please check your connection or email muszainimusa224@gmail.com directly.'
      );
    }
  };

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Collaboration enquiry form">
        {/* Lightweight Honeypot Field for Spam Protection */}
        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="contact-website-hp">Company Website (Leave blank)</label>
          <input
            id="contact-website-hp"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formValues.website}
            onChange={handleChange}
          />
        </div>

        {/* Name Field */}
        <div className="form-field">
          <label htmlFor="contact-name" className="form-label">
            <span>Full Name</span>
            <span className="form-required">Required *</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="e.g., Ahmad Razak"
            className="form-input"
            value={formValues.name}
            onChange={handleChange}
            aria-invalid={fieldErrors.name ? 'true' : 'false'}
            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            disabled={status === 'submitting'}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className="form-error" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{fieldErrors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="contact-email" className="form-label">
            <span>Email Address</span>
            <span className="form-required">Required *</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="e.g., name@organisation.com"
            className="form-input"
            value={formValues.email}
            onChange={handleChange}
            aria-invalid={fieldErrors.email ? 'true' : 'false'}
            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
            disabled={status === 'submitting'}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className="form-error" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="form-field">
          <label htmlFor="contact-phone" className="form-label">
            <span>Phone Number</span>
            <span className="form-required">Required *</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            maxLength={25}
            autoComplete="tel"
            placeholder="e.g., 0183933371 or +60 18-393 3371"
            className="form-input"
            value={formValues.phone}
            onChange={handleChange}
            aria-invalid={fieldErrors.phone ? 'true' : 'false'}
            aria-describedby={
              fieldErrors.phone ? 'contact-phone-error contact-phone-hint' : 'contact-phone-hint'
            }
            disabled={status === 'submitting'}
          />
          <span id="contact-phone-hint" className="form-hint">
            Malaysian (e.g., 0183933371) and international formats (+44, +65, etc.) are accepted.
          </span>
          {fieldErrors.phone && (
            <p id="contact-phone-error" className="form-error" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{fieldErrors.phone}</span>
            </p>
          )}
        </div>

        {/* Description / Message Field */}
        <div className="form-field">
          <label htmlFor="contact-description" className="form-label">
            <span>Description / Message</span>
            <span className="form-required">Required *</span>
          </label>
          <textarea
            id="contact-description"
            name="description"
            required
            maxLength={3000}
            placeholder="Please share details about your legal-workflow enquiry, website or Canva design project, or collaboration idea..."
            className="form-textarea"
            value={formValues.description}
            onChange={handleChange}
            aria-invalid={fieldErrors.description ? 'true' : 'false'}
            aria-describedby={
              fieldErrors.description ? 'contact-description-error' : undefined
            }
            disabled={status === 'submitting'}
          />
          {fieldErrors.description && (
            <p id="contact-description-error" className="form-error" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{fieldErrors.description}</span>
            </p>
          )}
        </div>

        {/* Privacy Notice (PRD Section 5.8 & Section 8) */}
        <div className="form-privacy">
          <strong>Privacy &amp; Retention Notice:</strong> Only the four fields above (name, email, phone number, and description) plus a UTC submission timestamp are recorded in a private server file so Muszaini Binti Musa can respond to your enquiry. Submissions are never shared publicly, are retained for up to 12 months for enquiry follow-up (or deleted earlier once no longer needed), and can be removed at any time upon email request.
        </div>

        {/* Status Banner */}
        {status === 'success' && (
          <div className="form-status form-status--success" role="status" aria-live="polite">
            <strong>Enquiry Recorded:</strong> {serverMessage}
          </div>
        )}

        {status === 'error' && serverMessage && (
          <div className="form-status form-status--error" role="alert" aria-live="assertive">
            <strong>Unable to Submit:</strong> {serverMessage}
          </div>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === 'submitting'}
          style={{ width: '100%' }}
        >
          {status === 'submitting' ? 'Sending Collaboration Enquiry...' : 'Send Collaboration Enquiry'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
