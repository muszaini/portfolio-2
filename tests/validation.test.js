import { describe, it, expect } from 'vitest';
import {
  validateEnquiry,
  PROJECT_TYPES,
  BUDGET_RANGES,
} from '../shared/validation.js';

describe('validateEnquiry', () => {
  const validPayload = {
    fullName: 'Amina Rahman',
    email: 'Amina@LawPractice.my',
    phone: '+60 12-345 6789',
    companyName: 'Rahman & Partners',
    projectType: PROJECT_TYPES[3],
    budgetRange: BUDGET_RANGES[2],
    projectDescription:
      'We need a structured client intake and document management workflow for our boutique legal practice.',
    consent: true,
  };

  it('accepts a valid enquiry and normalizes email & whitespace', () => {
    const result = validateEnquiry({
      ...validPayload,
      fullName: '  Amina Rahman  ',
      email: '  Amina@LawPractice.my ',
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.sanitized.fullName).toBe('Amina Rahman');
    expect(result.sanitized.email).toBe('amina@lawpractice.my');
    expect(result.sanitized.consent).toBe(true);
  });

  it('allows optional fields (companyName and budgetRange) to be omitted', () => {
    const result = validateEnquiry({
      ...validPayload,
      companyName: '',
      budgetRange: '',
    });

    expect(result.valid).toBe(true);
    expect(result.sanitized.companyName).toBe('');
    expect(result.sanitized.budgetRange).toBe('');
  });

  it('accepts Patent & Trademark / IP Digital Solutions as a valid project type', () => {
    const result = validateEnquiry({
      ...validPayload,
      projectType: 'Patent & Trademark / IP Digital Solutions',
    });

    expect(result.valid).toBe(true);
    expect(result.sanitized.projectType).toBe('Patent & Trademark / IP Digital Solutions');
  });

  it('rejects missing or false privacy consent', () => {
    const result = validateEnquiry({
      ...validPayload,
      consent: false,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.consent).toBeTruthy();
  });

  it('handles null or malformed input safely without throwing', () => {
    const result = validateEnquiry(null);
    expect(result.valid).toBe(false);
    expect(result.errors.fullName).toBeTruthy();
    expect(result.errors.consent).toBeTruthy();
  });

  it('rejects missing or invalid required fields with clear messages', () => {
    const result = validateEnquiry({
      fullName: 'A',
      email: 'not-an-email',
      phone: '123',
      projectType: 'Unknown Type',
      budgetRange: 'Invalid Budget',
      projectDescription: 'Too short',
      consent: false,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.fullName).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.phone).toBeTruthy();
    expect(result.errors.projectType).toBeTruthy();
    expect(result.errors.budgetRange).toBeTruthy();
    expect(result.errors.projectDescription).toBeTruthy();
    expect(result.errors.consent).toBeTruthy();
  });
});
