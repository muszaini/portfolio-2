import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    website_hp: '', // Honeypot field
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear individual field error on user edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateClientSide = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneDigits = (formData.phone.match(/\d/g) || []).length;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    } else if (phoneDigits < 7 || phoneDigits > 18) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please explain the nature of your collaboration or enquiry.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Please provide at least 10 characters describing your request.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm consent for us to store your contact details to respond.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateClientSide()) {
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);
    setServerMessage('');

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const endpoint = `${apiBase}/api/contact`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description: formData.description,
          website_hp: formData.website_hp
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setServerMessage(data.message || 'Thank you for reaching out. Your enquiry has been received.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          description: '',
          website_hp: '',
          consent: false
        });
        setErrors({});
      } else if (response.status === 400 && data.errors) {
        setSubmitStatus('error');
        setErrors(data.errors);
        setServerMessage('Please correct the highlighted fields before submitting.');
      } else if (response.status === 429) {
        setSubmitStatus('error');
        setServerMessage(data.message || 'Too many submissions. Please wait a few minutes before trying again.');
      } else {
        setSubmitStatus('error');
        setServerMessage(
          data.message || 'Unable to record enquiry at this time. Please reach out directly via email.'
        );
      }
    } catch (err) {
      console.error('Contact submit network error:', err);
      setSubmitStatus('error');
      setServerMessage('Network connectivity error. Please verify your connection or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-wrapper" style={{ borderBottom: 'none' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Initiate Collaboration"
          title="Get in Touch"
          lead="Whether you require legal review support, design collateral, or seek an exploratory conversation on modern AI workflows."
        />

        <div className="contact-layout">
          {/* Left Column: Direct Contact & Context */}
          <div className="contact-info-col">
            <div className="direct-contact-card">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                Direct Communication
              </h3>
              <p style={{ fontSize: '0.925rem', marginBottom: '24px' }}>
                Prospective clients, law practices, and creative collaborators are welcome to submit an enquiry using the form or reach out directly.
              </p>

              <div className="contact-item">
                <Mail className="contact-icon" size={18} />
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="contact-icon" size={18} />
                <div>
                  <div className="contact-label">Phone / WhatsApp</div>
                  <div className="contact-value">
                    <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <MapPin className="contact-icon" size={18} />
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">{personalInfo.location}</div>
                </div>
              </div>
            </div>

            <div className="direct-contact-card" style={{ background: 'rgba(23, 21, 18, 0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Lock size={15} color="var(--color-gold-light)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold-light)' }}>
                  Confidentiality Assured
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Submissions are stored securely in a private server archive solely to review and respond to your collaboration request. Information is never shared with third parties.
              </p>
            </div>
          </div>

          {/* Right Column: Accessible Submission Form */}
          <div className="contact-form-card">
            {submitStatus === 'success' && (
              <div className="status-banner success" role="alert">
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Enquiry Received Successfully</div>
                  <div>{serverMessage}</div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-banner error" role="alert">
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Submission Notice</div>
                  <div>{serverMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Anti-spam honeypot (invisible to legitimate users) */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="website_hp">Leave this empty</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={handleChange}
                />
              </div>

              {/* Name */}
              <div className="form-group">
                <label htmlFor="contact_name" className="form-label">
                  Your Full Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="contact_name"
                  name="name"
                  required
                  placeholder="e.g. Nurul Huda"
                  className={`form-input ${errors.name ? 'has-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name_error' : undefined}
                />
                {errors.name && (
                  <span id="name_error" className="field-error-msg">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="contact_email" className="form-label">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="email"
                  required
                  placeholder="e.g. nurul@firm.com"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email_error' : undefined}
                />
                {errors.email && (
                  <span id="email_error" className="field-error-msg">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="contact_phone" className="form-label">
                  Contact Phone Number <span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="phone"
                  required
                  placeholder="e.g. 018-393 3371 or +60 12 345 6789"
                  className={`form-input ${errors.phone ? 'has-error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone_error' : undefined}
                />
                {errors.phone && (
                  <span id="phone_error" className="field-error-msg">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Description / Message */}
              <div className="form-group">
                <label htmlFor="contact_desc" className="form-label">
                  Collaboration / Project Description <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact_desc"
                  name="description"
                  required
                  rows="4"
                  placeholder="Describe your legal review, design collateral, or digital workflow requirement..."
                  className={`form-textarea ${errors.description ? 'has-error' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? 'desc_error' : undefined}
                ></textarea>
                {errors.description && (
                  <span id="desc_error" className="field-error-msg">
                    {errors.description}
                  </span>
                )}
              </div>

              {/* Consent Checkbox (not pre-checked) */}
              <div className="consent-group">
                <input
                  type="checkbox"
                  id="contact_consent"
                  name="consent"
                  className="consent-checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? 'consent_error' : undefined}
                />
                <label htmlFor="contact_consent" className="consent-label">
                  I consent to Muszaini Musa processing the submitted contact details solely for the purpose of reviewing and responding to this enquiry.
                </label>
              </div>
              {errors.consent && (
                <div style={{ marginTop: '-12px', marginBottom: '16px' }}>
                  <span id="consent_error" className="field-error-msg">
                    {errors.consent}
                  </span>
                </div>
              )}

              {/* Privacy Notice */}
              <div className="privacy-notice-box">
                Privacy Note: Submitted contact details are stored securely server-side and used exclusively to communicate regarding your enquiry.
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', padding: '14px' }}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Transmitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Collaboration Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
