import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {
  validateContactSubmission,
  escapeCsvField,
  formatCsvRow,
} from '../../server/src/validation/contactValidation.js';
import { resolveCsvFilePath } from '../../server/src/storage/csvStorage.js';
import { createApp } from '../../server/src/app.js';
import { validateClientForm } from '../utils/validateClientForm.js';
import { App } from '../App.jsx';
import {
  profileData,
  navLinks,
  experienceData,
  educationData,
  skillsData,
} from '../data/portfolioData.js';

/**
 * Helper to invoke an Express app in-memory without binding a TCP port.
 */
function invokeExpressApp(app, { method = 'POST', url = '/api/contact', body = null, ip = '127.0.0.1' }) {
  return new Promise((resolve, reject) => {
    const headers = {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    };

    const req = {
      method,
      url,
      originalUrl: url,
      path: url,
      headers,
      ip,
      body: body ?? {},
      socket: { remoteAddress: ip },
      get(headerName) {
        return headers[headerName.toLowerCase()];
      },
    };

    const resHeaders = {};
    const res = {
      statusCode: 200,
      setHeader(name, value) {
        resHeaders[name.toLowerCase()] = value;
      },
      getHeader(name) {
        return resHeaders[name.toLowerCase()];
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        resolve({
          status: this.statusCode,
          headers: resHeaders,
          body: payload,
        });
        return this;
      },
      end(payload) {
        resolve({
          status: this.statusCode,
          headers: resHeaders,
          body: payload,
        });
        return this;
      },
    };

    try {
      app.handle(req, res, (err) => {
        if (err) reject(err);
        else resolve({ status: res.statusCode, headers: resHeaders, body: null });
      });
    } catch (err) {
      reject(err);
    }
  });
}

describe('Pre-Deployment UI, Accessibility & Semantic Markup Audit', () => {
  const html = renderToStaticMarkup(React.createElement(App));

  it('renders skip-link, main landmark, header wordmark, and all 7 navigation targets', () => {
    expect(html).toContain('href="#main-content"');
    expect(html).toContain('<main id="main-content">');
    expect(html).toContain('MUSZAINI MUSA');

    for (const nav of navLinks) {
      expect(html).toContain(`href="${nav.href}"`);
      const sectionId = nav.href.replace('#', '');
      expect(html).toContain(`id="${sectionId}"`);
    }
  });

  it('renders accessible form labels, inputs, privacy/retention notice, and submit CTA', () => {
    expect(html).toContain('for="contact-name"');
    expect(html).toContain('id="contact-name"');
    expect(html).toContain('for="contact-email"');
    expect(html).toContain('id="contact-email"');
    expect(html).toContain('for="contact-phone"');
    expect(html).toContain('id="contact-phone"');
    expect(html).toContain('for="contact-description"');
    expect(html).toContain('id="contact-description"');
    expect(html).toContain('Send Collaboration Enquiry');
    expect(html).toContain('Privacy &amp; Retention Notice:');
  });

  it('does not leak any unverified 2007-2011 employer text or fabricated credentials in rendered HTML', () => {
    const lowerHtml = html.toLowerCase();
    expect(lowerHtml).not.toContain('offshore');
    expect(lowerHtml).not.toContain('surrey');
    expect(lowerHtml).not.toContain('2007 – 2011');
    expect(lowerHtml).not.toContain('2007-2011');
  });
});

describe('CV Source-of-Truth Fidelity', () => {
  it('contains exact profile details for Muszaini Binti Musa', () => {
    expect(profileData.name).toBe('Muszaini Binti Musa');
    expect(profileData.email).toBe('muszainimusa224@gmail.com');
    expect(profileData.phone).toBe('0183933371');
  });

  it('publishes only confirmed roles and keeps the unclear 2007-2011 entry unpublished', () => {
    const orgNames = experienceData.map((item) => item.organisation.toLowerCase());
    expect(orgNames.some((name) => name.includes('telekom international'))).toBe(true);
    expect(orgNames.some((name) => name.includes('petronas'))).toBe(true);
    expect(orgNames.some((name) => name.includes('post office'))).toBe(true);
    expect(orgNames.some((name) => name.includes('dea management'))).toBe(true);

    // 2007-2011 "2 h Offshore" must NOT be published until confirmed by owner
    const serialized = JSON.stringify(experienceData).toLowerCase();
    expect(serialized.includes('offshore')).toBe(false);
    expect(serialized.includes('2007 – 2011')).toBe(false);
  });

  it('highlights the RM1.7 million recovery achievement at Petronas', () => {
    const petronasRole = experienceData.find((item) => item.id === 'petronas-klcc');
    expect(petronasRole).toBeDefined();
    expect(petronasRole.achievementBadge).toContain('RM1.7 Million');
  });

  it('includes LL.M. (2006, IIUM) and LL.B. (1996, Staffordshire University) credentials', () => {
    expect(educationData).toHaveLength(2);
    expect(educationData[0].graduationYear).toBe('2006');
    expect(educationData[0].institution).toContain('International Islamic University');
    expect(educationData[1].graduationYear).toBe('1996');
    expect(educationData[1].institution).toContain('Staffordshire University');
  });

  it('presents AI, Agentic Engineering, and Vibe Coding as ongoing learning', () => {
    const emergingGroup = skillsData.find((g) => g.id === 'learning-emerging');
    expect(emergingGroup).toBeDefined();
    expect(emergingGroup.badge).toContain('Ongoing');
  });
});

describe('Contact Validation & CSV Escaping', () => {
  it('rejects empty required fields on both client and server', () => {
    const clientErrors = validateClientForm({});
    expect(clientErrors.name).toBeDefined();
    expect(clientErrors.email).toBeDefined();
    expect(clientErrors.phone).toBeDefined();
    expect(clientErrors.description).toBeDefined();

    const serverResult = validateContactSubmission({});
    expect(serverResult.isValid).toBe(false);
    expect(serverResult.fieldErrors.name).toBeDefined();
    expect(serverResult.fieldErrors.email).toBeDefined();
    expect(serverResult.fieldErrors.phone).toBeDefined();
    expect(serverResult.fieldErrors.description).toBeDefined();
  });

  it('rejects malformed email addresses and normalises valid emails', () => {
    const invalid = validateContactSubmission({
      name: 'Sarah Lim',
      email: 'not-an-email',
      phone: '0183933371',
      description: 'Looking to collaborate on a brochure and website project.',
    });
    expect(invalid.isValid).toBe(false);
    expect(invalid.fieldErrors.email).toBeDefined();

    const valid = validateContactSubmission({
      name: 'Sarah Lim',
      email: '  SARAH.LIM@Example.com ',
      phone: '0183933371',
      description: 'Looking to collaborate on a brochure and website project.',
    });
    expect(valid.isValid).toBe(true);
    expect(valid.data.email).toBe('sarah.lim@example.com');
  });

  it('accepts Malaysian and international phone formats and rejects invalid ones', () => {
    const myPhone = validateContactSubmission({
      name: 'Ahmad',
      email: 'ahmad@example.my',
      phone: '018-393 3371',
      description: 'Interested in contract review workflow collaboration.',
    });
    expect(myPhone.isValid).toBe(true);

    const ukPhone = validateContactSubmission({
      name: 'James',
      email: 'james@example.co.uk',
      phone: '+44 20 7946 0958',
      description: 'Interested in cross-border compliance collaboration.',
    });
    expect(ukPhone.isValid).toBe(true);

    const badPhone = validateContactSubmission({
      name: 'Test',
      email: 'test@example.com',
      phone: '123',
      description: 'Valid description length here.',
    });
    expect(badPhone.isValid).toBe(false);
    expect(badPhone.fieldErrors.phone).toBeDefined();
  });

  it('rejects overly long messages (>3000 chars) and honeypot spam', () => {
    const tooLong = validateContactSubmission({
      name: 'Visitor',
      email: 'visitor@example.com',
      phone: '0183933371',
      description: 'A'.repeat(3005),
    });
    expect(tooLong.isValid).toBe(false);
    expect(tooLong.fieldErrors.description).toBeDefined();

    const honeypotTriggered = validateContactSubmission({
      name: 'Spam Bot',
      email: 'bot@example.com',
      phone: '0183933371',
      description: 'Buy cheap backlinks today!',
      website: 'https://spamsite.example.com',
    });
    expect(honeypotTriggered.isValid).toBe(false);
    expect(honeypotTriggered.isSpam).toBe(true);
  });

  it('correctly escapes commas, double quotes, newlines, and formula triggers in CSV rows', () => {
    const row = formatCsvRow({
      submitted_at_utc: '2026-10-22T12:00:00.000Z',
      name: 'Dr. "Alicia" Tan, Esq.',
      email: 'alicia@example.com',
      phone: '+60183933371',
      description: 'Line 1, with comma\r\nLine 2 with "quotes"\n=SUM(1,2)',
    });

    expect(row).toBe(
      '"2026-10-22T12:00:00.000Z","Dr. ""Alicia"" Tan, Esq.","alicia@example.com","+60183933371","Line 1, with comma\nLine 2 with ""quotes""\n=SUM(1,2)"\n'
    );

    // Formula trigger at start of field is prefixed with single quote
    expect(escapeCsvField('=CMD|" /C calc"!A0')).toBe('"\'=CMD|"" /C calc""!A0"');
  });

  it('refuses to configure CSV storage path inside public/ or dist/', () => {
    expect(() => resolveCsvFilePath('./public/submissions.csv')).toThrow(/Security configuration error/);
    expect(() => resolveCsvFilePath('./dist/submissions.csv')).toThrow(/Security configuration error/);
  });
});

describe('POST /api/contact Express Endpoint & Security Integration', () => {
  let tempDir;
  let csvFilePath;
  let app;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'muszaini-contact-test-'));
    csvFilePath = path.join(tempDir, 'private', 'contact-submissions.csv');

    app = createApp({
      csvPath: csvFilePath,
      serveStatic: false,
      rateLimiter: { windowMs: 60000, maxRequests: 3 },
    });
  });

  afterEach(async () => {
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  it('persists valid enquiries to private CSV, sets security headers, and returns HTTP 201', async () => {
    const res = await invokeExpressApp(app, {
      method: 'POST',
      url: '/api/contact',
      body: {
        name: 'Farah Aziz',
        email: 'farah@lawfirm.my',
        phone: '0183933371',
        description:
          'Hello Muszaini, we would love to discuss a website and brochure project,\nincluding "custom" layouts.',
      },
    });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('created');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-frame-options']).toBe('DENY');

    const csvContent = await fs.readFile(csvFilePath, 'utf8');
    expect(csvContent.startsWith('submitted_at_utc,name,email,phone,description\n')).toBe(true);
    expect(csvContent).toContain('"Farah Aziz","farah@lawfirm.my","0183933371"');
    expect(csvContent).toContain('including ""custom"" layouts.');
  });

  it('blocks GET /api/contact (405) and any direct .csv path request (403)', async () => {
    const getRes = await invokeExpressApp(app, {
      method: 'GET',
      url: '/api/contact',
    });
    expect(getRes.status).toBe(405);

    const csvRes = await invokeExpressApp(app, {
      method: 'GET',
      url: '/server/data/contact-submissions.csv',
    });
    expect(csvRes.status).toBe(403);
  });

  it('enforces rate limiting with HTTP 429 after maxRequests', async () => {
    const payload = {
      name: 'Rate Test User',
      email: 'rate@example.com',
      phone: '0183933371',
      description: 'Testing rate limiter behaviour on contact endpoint.',
    };

    for (let i = 0; i < 3; i++) {
      const okRes = await invokeExpressApp(app, {
        method: 'POST',
        url: '/api/contact',
        body: payload,
      });
      expect(okRes.status).toBe(201);
    }

    const blockedRes = await invokeExpressApp(app, {
      method: 'POST',
      url: '/api/contact',
      body: payload,
    });
    expect(blockedRes.status).toBe(429);
  });

  it('returns HTTP 500 and does not report false success if storage fails', async () => {
    const failingApp = createApp({
      serveStatic: false,
      persistFn: async () => {
        throw new Error('Simulated disk write failure');
      },
    });

    const res = await invokeExpressApp(failingApp, {
      method: 'POST',
      url: '/api/contact',
      body: {
        name: 'Test Visitor',
        email: 'visitor@example.com',
        phone: '0183933371',
        description: 'Enquiry that triggers simulated disk write error.',
      },
    });

    expect(res.status).toBe(500);
    expect(res.body.error).toContain('unable to record your enquiry');
  });
});
