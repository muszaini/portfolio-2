import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  console.log('--- Starting Contact API & CSV Storage Tests ---');
  const testStoragePath = path.resolve(__dirname, './data/test-submissions.csv');

  // Clean up any old test file
  if (fs.existsSync(testStoragePath)) {
    fs.unlinkSync(testStoragePath);
  }

  const app = createApp({ storageFilePath: testStoragePath });
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthJson = await healthRes.json();
    assert.strictEqual(healthRes.status, 200);
    assert.strictEqual(healthJson.status, 'healthy');
    console.log('✓ Health check endpoint passed');

    // 2. Missing fields should return 400
    const missingRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const missingJson = await missingRes.json();
    assert.strictEqual(missingRes.status, 400);
    assert.strictEqual(missingJson.success, false);
    assert(missingJson.errors.name, 'Expected error on missing name');
    assert(missingJson.errors.email, 'Expected error on missing email');
    assert(missingJson.errors.phone, 'Expected error on missing phone');
    assert(missingJson.errors.description, 'Expected error on missing description');
    console.log('✓ Required fields validation passed');

    // 3. Honeypot submission should be rejected
    const spamRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bot Spammer',
        email: 'bot@spam.com',
        phone: '0181234567',
        description: 'Spamming content here',
        website_hp: 'http://spamsite.com'
      })
    });
    assert.strictEqual(spamRes.status, 400);
    console.log('✓ Honeypot anti-spam check passed');

    // 4. Valid submission with formula characters and quotes
    const validPayload = {
      name: 'Sarah Tan',
      email: 'sarah.tan@example.com',
      phone: '+60 12-345 6789',
      description: '=CMD|"/C calc"!A0 We would like to collaborate on "corporate governance" & contracts.'
    };

    const submitRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload)
    });
    const submitJson = await submitRes.json();
    assert.strictEqual(submitRes.status, 201);
    assert.strictEqual(submitJson.success, true);
    console.log('✓ Valid contact submission returned 201 Created');

    // 5. Verify CSV contents
    assert(fs.existsSync(testStoragePath), 'Test CSV file was not created');
    const fileContent = fs.readFileSync(testStoragePath, 'utf8');
    const lines = fileContent.trim().split('\n');

    assert.strictEqual(lines[0], 'submitted_at_utc,name,email,phone,description');
    assert(lines.length >= 2, 'CSV should have at least 1 record');
    assert(lines[1].includes('"Sarah Tan"'));
    assert(lines[1].includes('"sarah.tan@example.com"'));
    // Phone starting with '+' is safely neutralized with a leading apostrophe
    assert(lines[1].includes("\"'+60 12-345 6789\""));
    // Verify formula character in description was neutralized with leading apostrophe and inner quotes doubled
    assert(lines[1].includes("'=CMD"));
    assert(lines[1].includes('""corporate governance""'));
    console.log('✓ CSV persistence, RFC 4180 escaping, and formula neutralization verified');

    console.log('🎉 All backend and CSV tests passed successfully!');
  } finally {
    server.close();
    if (fs.existsSync(testStoragePath)) {
      fs.unlinkSync(testStoragePath);
    }
  }
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
