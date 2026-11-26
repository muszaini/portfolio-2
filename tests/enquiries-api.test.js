import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createEnquiryHandler,
  resetRateLimiterForTests,
} from '../api/enquiries.js';
import { PROJECT_TYPES } from '../shared/validation.js';

function createMockRes() {
  const headers = {};
  const res = {
    statusCode: 200,
    body: null,
    headers,
    setHeader(key, value) {
      headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

const VALID_BODY = {
  fullName: 'Daniel Tan',
  email: 'daniel@sme-group.com',
  phone: '+60 19-888 1234',
  companyName: 'Tan Logistics Sdn Bhd',
  projectType: PROJECT_TYPES[1],
  budgetRange: 'To be discussed',
  projectDescription:
    'Looking to automate incoming customer enquiries and route appointment bookings into an internal dashboard.',
  consent: true,
  website: '',
  formLoadedAt: 1000,
};

describe('POST /api/enquiries handler', () => {
  beforeEach(() => {
    resetRateLimiterForTests();
  });

  it('rejects non-POST methods with 405', async () => {
    const handler = createEnquiryHandler();
    const res = createMockRes();
    await handler({ method: 'GET', headers: {} }, res);

    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe('POST');
    expect(res.body.ok).toBe(false);
  });

  it('rejects disallowed Origin when ALLOWED_ORIGIN is configured', async () => {
    const handler = createEnquiryHandler({
      env: { ALLOWED_ORIGIN: 'https://muszaini.dev' },
      nowFn: () => 10000,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          origin: 'https://evil.example',
          'content-type': 'application/json',
        },
        body: VALID_BODY,
      },
      res
    );

    expect(res.statusCode).toBe(403);
    expect(res.body.ok).toBe(false);
  });

  it('rejects non-JSON Content-Type with 415', async () => {
    const handler = createEnquiryHandler({ nowFn: () => 10000 });
    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: 'plain text',
      },
      res
    );

    expect(res.statusCode).toBe(415);
    expect(res.body.ok).toBe(false);
  });

  it('rejects oversized payloads above 16 KB with 413', async () => {
    const handler = createEnquiryHandler({ nowFn: () => 10000 });
    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: { ...VALID_BODY, projectDescription: 'a'.repeat(18000) },
      },
      res
    );

    expect(res.statusCode).toBe(413);
    expect(res.body.ok).toBe(false);
  });

  it('silently accepts honeypot submissions without calling Supabase', async () => {
    const createSupabaseClient = vi.fn();
    const handler = createEnquiryHandler({
      createSupabaseClient,
      env: {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
      },
      nowFn: () => 10000,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.10',
        },
        body: { ...VALID_BODY, website: 'https://spam.example' },
      },
      res
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(createSupabaseClient).not.toHaveBeenCalled();
  });

  it('blocks ultra-fast bot submissions under the minimum interaction threshold', async () => {
    const createSupabaseClient = vi.fn();
    const handler = createEnquiryHandler({
      createSupabaseClient,
      env: {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
      },
      nowFn: () => 2500,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.11',
        },
        body: VALID_BODY,
      },
      res
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(createSupabaseClient).not.toHaveBeenCalled();
  });

  it('returns 400 with fieldErrors when backend validation fails', async () => {
    const handler = createEnquiryHandler({
      nowFn: () => 10000,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.12',
        },
        body: { ...VALID_BODY, email: 'bad-email', projectDescription: 'short' },
      },
      res
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.fieldErrors.email).toBeTruthy();
    expect(res.body.fieldErrors.projectDescription).toBeTruthy();
  });

  it('rejects submissions where privacy consent is not explicitly granted', async () => {
    const handler = createEnquiryHandler({
      nowFn: () => 10000,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.19',
        },
        body: { ...VALID_BODY, consent: false },
      },
      res
    );

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.fieldErrors.consent).toBeTruthy();
  });

  it('returns 503 honestly when Supabase env variables are not configured', async () => {
    const handler = createEnquiryHandler({
      env: {},
      nowFn: () => 10000,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.13',
        },
        body: VALID_BODY,
      },
      res
    );

    expect(res.statusCode).toBe(503);
    expect(res.body.ok).toBe(false);
  });

  it('inserts sanitized enquiry into Supabase and returns 201 with referenceId', async () => {
    const single = vi.fn().mockResolvedValue({
      data: { id: 'enq-uuid-123' },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    const from = vi.fn().mockReturnValue({ insert });
    const createSupabaseClient = vi.fn().mockReturnValue({ from });

    const handler = createEnquiryHandler({
      createSupabaseClient,
      env: {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
      },
      nowFn: () => 10000,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.14',
        },
        body: VALID_BODY,
      },
      res
    );

    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.referenceId).toBe('enq-uuid-123');
    expect(from).toHaveBeenCalledWith('enquiries');
    expect(insert).toHaveBeenCalledWith([
      expect.objectContaining({
        full_name: 'Daniel Tan',
        email: 'daniel@sme-group.com',
        phone: '+60 19-888 1234',
        company_name: 'Tan Logistics Sdn Bhd',
        project_type: PROJECT_TYPES[1],
        consent_given: true,
        source: 'portfolio-website',
        status: 'new',
      }),
    ]);
  });

  it('returns 502 cleanly if Supabase returns an insert error', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'db error' },
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    const from = vi.fn().mockReturnValue({ insert });
    const createSupabaseClient = vi.fn().mockReturnValue({ from });

    const handler = createEnquiryHandler({
      createSupabaseClient,
      env: {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
      },
      nowFn: () => 10000,
    });

    const res = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.15',
        },
        body: VALID_BODY,
      },
      res
    );

    expect(res.statusCode).toBe(502);
    expect(res.body.ok).toBe(false);
  });

  it('rate limits excessive submissions from the same IP with 429', async () => {
    const single = vi.fn().mockResolvedValue({ data: { id: 'ok' }, error: null });
    const createSupabaseClient = vi.fn().mockReturnValue({
      from: () => ({ insert: () => ({ select: () => ({ single }) }) }),
    });

    const handler = createEnquiryHandler({
      createSupabaseClient,
      env: {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
      },
      nowFn: () => 10000,
    });

    for (let i = 0; i < 5; i += 1) {
      const res = createMockRes();
      await handler(
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-forwarded-for': '203.0.113.99',
          },
          body: VALID_BODY,
        },
        res
      );
      expect(res.statusCode).toBe(201);
    }

    const blockedRes = createMockRes();
    await handler(
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '203.0.113.99',
        },
        body: VALID_BODY,
      },
      blockedRes
    );

    expect(blockedRes.statusCode).toBe(429);
    expect(blockedRes.body.ok).toBe(false);
  });
});
