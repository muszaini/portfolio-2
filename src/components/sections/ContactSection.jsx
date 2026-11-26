import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Clock, RotateCcw } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import {
  PROJECT_TYPES,
  BUDGET_RANGES,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  validateEnquiry,
} from '../../lib/validation';
import { submitEnquiry } from '../../lib/enquiryApi';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  projectType: PROJECT_TYPES[0],
  budgetRange: '',
  projectDescription: '',
  consent: false,
  website: '', // Hidden honeypot for spam protection
};

const FIELD_ORDER = [
  'fullName',
  'email',
  'phone',
  'companyName',
  'projectType',
  'budgetRange',
  'projectDescription',
  'consent',
];

const INPUT_BASE =
  'w-full bg-[#121212] border text-sm text-[#F4F0E8] placeholder:text-[#A7A29A]/50 px-4 py-3.5 rounded-[2px] transition-colors focus:outline-none focus:border-[#C6A15B]';

export function ContactSection({ enquiryIntent }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '', referenceId: null });
  const [submitting, setSubmitting] = useState(false);

  const formLoadedAtRef = useRef(Date.now());
  const lastPrefilledNoteRef = useRef('');

  useEffect(() => {
    if (!enquiryIntent || !enquiryIntent.triggerId) return;

    setFormData((prev) => {
      const next = { ...prev };

      if (
        enquiryIntent.projectType &&
        PROJECT_TYPES.includes(enquiryIntent.projectType)
      ) {
        next.projectType = enquiryIntent.projectType;
      }

      if (enquiryIntent.note) {
        const isUneditedOrPreviousPrefill =
          !prev.projectDescription.trim() ||
          prev.projectDescription === lastPrefilledNoteRef.current;

        if (isUneditedOrPreviousPrefill) {
          next.projectDescription = enquiryIntent.note;
          lastPrefilledNoteRef.current = enquiryIntent.note;
        }
      }

      return next;
    });

    setStatus((prev) =>
      prev.type === 'success' ? { type: 'idle', message: '', referenceId: null } : prev
    );
  }, [enquiryIntent]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const focusFirstInvalidField = (errors) => {
    const firstKey = FIELD_ORDER.find((key) => Boolean(errors[key]));
    if (!firstKey) return;
    const element = document.getElementById(firstKey);
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  };

  const handleResetAfterSuccess = () => {
    setFormData({ ...INITIAL_FORM });
    setFieldErrors({});
    setStatus({ type: 'idle', message: '', referenceId: null });
    lastPrefilledNoteRef.current = '';
    formLoadedAtRef.current = Date.now();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '', referenceId: null });

    const { valid, errors } = validateEnquiry(formData);
    if (!valid) {
      setFieldErrors(errors);
      setStatus({
        type: 'error',
        message: 'Please review and complete the highlighted fields before submitting.',
        referenceId: null,
      });
      focusFirstInvalidField(errors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitEnquiry({
        ...formData,
        formLoadedAt: formLoadedAtRef.current,
      });

      if (!result.ok) {
        const serverErrors = result.fieldErrors || {};
        setFieldErrors(serverErrors);
        setStatus({
          type: 'error',
          message: result.message,
          referenceId: null,
        });
        focusFirstInvalidField(serverErrors);
        return;
      }

      setFormData({ ...INITIAL_FORM });
      setFieldErrors({});
      lastPrefilledNoteRef.current = '';
      formLoadedAtRef.current = Date.now();
      setStatus({
        type: 'success',
        message: result.message,
        referenceId: result.referenceId,
      });
    } catch {
      setStatus({
        type: 'error',
        message:
          'A network error occurred while submitting your enquiry. Please check your connection and try again.',
        referenceId: null,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const descriptionLength = formData.projectDescription.trim().length;

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[#101010] border-t border-[#F4F0E8]/8"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Editorial Column */}
          <Reveal className="lg:col-span-5 space-y-8">
            <SectionHeader
              eyebrow="Contact &amp; Enquiries"
              title="Have a Business Problem? Let's Build a Solution."
              subtitle="Whether you need a refined digital presence, an internal business tool, or an AI-assisted workflow for your practice — share the operational challenge and we will explore a practical path forward."
            />

            <div className="space-y-4 pt-2">
              <div className="bg-[#191919] border border-[#F4F0E8]/10 p-5 flex items-start gap-4">
                <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-[#F4F0E8]">
                    Structured Discovery
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#A7A29A] font-light">
                    Every enquiry is reviewed personally to understand your workflow, goals and
                    realistic implementation scope before proposing next steps.
                  </p>
                </div>
              </div>

              <div className="bg-[#191919] border border-[#F4F0E8]/10 p-5 flex items-start gap-4">
                <ShieldCheck
                  className="w-4 h-4 text-[#C6A15B] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-[#F4F0E8]">
                    Confidentiality First
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#A7A29A] font-light">
                    Submissions are validated server-side with explicit consent and stored in a
                    private Row-Level-Security database. Contact details are never shared publicly.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Form Column */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#191919] border border-[#C6A15B]/22 p-7 sm:p-10 space-y-6"
              aria-label="Project enquiry form"
            >
              {/* Hidden Honeypot Field for Spam Bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#A7A29A] mb-2"
                  >
                    Full Name <span className="text-[#C6A15B]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                    className={`${INPUT_BASE} ${
                      fieldErrors.fullName ? 'border-red-400/70' : 'border-[#F4F0E8]/12'
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p id="fullName-error" className="mt-1.5 text-xs text-red-300">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#A7A29A] mb-2"
                  >
                    Email Address <span className="text-[#C6A15B]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={160}
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    className={`${INPUT_BASE} ${
                      fieldErrors.email ? 'border-red-400/70' : 'border-[#F4F0E8]/12'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-300">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#A7A29A] mb-2"
                  >
                    Phone Number <span className="text-[#C6A15B]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={40}
                    autoComplete="tel"
                    placeholder="+60 12 345 6789"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                    className={`${INPUT_BASE} ${
                      fieldErrors.phone ? 'border-red-400/70' : 'border-[#F4F0E8]/12'
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p id="phone-error" className="mt-1.5 text-xs text-red-300">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* Company Name (Optional) */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#A7A29A] mb-2"
                  >
                    Company / Practice{' '}
                    <span className="text-[#A7A29A]/60 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    maxLength={140}
                    autoComplete="organization"
                    placeholder="Firm or organisation name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`${INPUT_BASE} border-[#F4F0E8]/12`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Project Type */}
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#A7A29A] mb-2"
                  >
                    Project Type <span className="text-[#C6A15B]">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.projectType)}
                    aria-describedby={
                      fieldErrors.projectType ? 'projectType-error' : undefined
                    }
                    className={`${INPUT_BASE} ${
                      fieldErrors.projectType ? 'border-red-400/70' : 'border-[#F4F0E8]/12'
                    }`}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#121212] text-[#F4F0E8]">
                        {type}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.projectType && (
                    <p id="projectType-error" className="mt-1.5 text-xs text-red-300">
                      {fieldErrors.projectType}
                    </p>
                  )}
                </div>

                {/* Budget Range (Optional) */}
                <div>
                  <label
                    htmlFor="budgetRange"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#A7A29A] mb-2"
                  >
                    Budget Range{' '}
                    <span className="text-[#A7A29A]/60 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.budgetRange)}
                    className={`${INPUT_BASE} border-[#F4F0E8]/12`}
                  >
                    <option value="" className="bg-[#121212] text-[#A7A29A]">
                      Select an indicative range
                    </option>
                    {BUDGET_RANGES.map((range) => (
                      <option
                        key={range}
                        value={range}
                        className="bg-[#121212] text-[#F4F0E8]"
                      >
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <label
                    htmlFor="projectDescription"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#A7A29A]"
                  >
                    Project Description <span className="text-[#C6A15B]">*</span>
                  </label>
                  <span
                    className={`text-[11px] tabular-nums ${
                      descriptionLength > 0 && descriptionLength < MIN_DESCRIPTION_LENGTH
                        ? 'text-[#C6A15B]'
                        : 'text-[#A7A29A]/70'
                    }`}
                  >
                    {descriptionLength} / {MAX_DESCRIPTION_LENGTH}
                  </span>
                </div>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  required
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  rows={5}
                  placeholder="Briefly describe the business challenge, workflow you want to improve, or digital solution you have in mind..."
                  value={formData.projectDescription}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors.projectDescription)}
                  aria-describedby={
                    fieldErrors.projectDescription
                      ? 'projectDescription-error'
                      : 'projectDescription-hint'
                  }
                  className={`${INPUT_BASE} resize-y min-h-[132px] ${
                    fieldErrors.projectDescription
                      ? 'border-red-400/70'
                      : 'border-[#F4F0E8]/12'
                  }`}
                />
                {fieldErrors.projectDescription ? (
                  <p id="projectDescription-error" className="mt-1.5 text-xs text-red-300">
                    {fieldErrors.projectDescription}
                  </p>
                ) : (
                  <p id="projectDescription-hint" className="mt-1.5 text-[11px] text-[#A7A29A]/65">
                    Minimum {MIN_DESCRIPTION_LENGTH} characters for helpful initial scoping.
                  </p>
                )}
              </div>

              {/* Explicit Privacy Consent Checkbox (validated both client & server-side) */}
              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.consent)}
                    aria-describedby={fieldErrors.consent ? 'consent-error' : undefined}
                    className="mt-1 h-4 w-4 accent-[#C6A15B] bg-[#121212] border border-[#F4F0E8]/20 cursor-pointer shrink-0"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs leading-relaxed text-[#A7A29A] cursor-pointer"
                  >
                    I consent to Muszaini Musa storing and reviewing the submitted contact details
                    solely for the purpose of responding to this enquiry.{' '}
                    <span className="text-[#C6A15B]">*</span>
                  </label>
                </div>
                {fieldErrors.consent && (
                  <p id="consent-error" className="mt-1.5 text-xs text-red-300">
                    {fieldErrors.consent}
                  </p>
                )}
              </div>

              {/* Feedback Banner */}
              {status.type === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 bg-[#121C16] border border-emerald-500/40 text-sm text-emerald-200 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p>{status.message}</p>
                      {status.referenceId && (
                        <p className="mt-1 text-xs text-emerald-300/80">
                          Reference ID: {status.referenceId}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetAfterSuccess}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-emerald-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    Submit another enquiry
                  </button>
                </div>
              )}

              {status.type === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 p-4 bg-[#221414] border border-red-400/40 text-sm text-red-200"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p>{status.message}</p>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[11px] text-[#A7A29A]/80">
                  Fields marked with <span className="text-[#C6A15B]">*</span> are required.
                </p>
                <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                  {submitting ? 'Submitting Enquiry...' : 'Send Enquiry'}
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
