# Muszaini Binti Musa — Personal Portfolio

> **Legal Professional · Digital & AI Explorer**  
> A responsive, high-aesthetic personal portfolio with a vintage black-and-gold visual identity, credible legal foundation, ongoing AI/Agentic learning showcase, and a secure server-side enquiry system.

---

## 1. Visual & Editorial Identity
- **Mood:** Vintage editorial, understated luxury, professional, timeless, and warm.
- **Palette:**
  - Charcoal Noir background (`#11100E`)
  - Deep Espresso / Umber surfaces (`#1E1B16`, `#1B1814`)
  - Antique Gold accents (`#C6A15B`, `#DFBF7A`)
  - Warm Ivory primary typography (`#F5EFE6`)
  - Muted Stone body text (`#B8B0A0`)
- **Typography:**
  - Headings: *Cormorant Garamond* (editorial serif)
  - Body: *Plus Jakarta Sans* / *Inter* (modern clean sans-serif)

---

## 2. Source-of-Truth Content & Factual Integrity
- **No Fabrications:** All career dates, qualifications, and achievements strictly reflect verified CV entries.
- **Key Achievement:** Highlighted factual milestone: **RM1.7 Million recovered** from breach-of-contract cases at Petronas KLCC Education Sponsorship Unit.
- **Honours & Distinctions:**
  - **LL.M. in Business Law** (2006, International Islamic University Malaysia) — Graduated with **Distinction & Dean’s List**.
  - **LL.B. in Law (Hons)** (1996, Staffordshire University, UK) — Member of the Law Society.
- **AI & Agentic Engineering:** Explicitly framed as **active, ongoing learning and exploratory competencies** rather than established consulting credentials.
- **Internal Verification Hold (2007–2011 entry):** Per requirements, the OCR-ambiguous entry (*"2 h Offshore, Surrey United Kingdom"*) remains safely excluded from the public career timeline until explicitly confirmed by the owner.

---

## 3. Architecture & Repository Structure

```
Portfolio/
├── docs/
│   └── PRD.md                       # Comprehensive Product Requirements Document
├── client/                          # React + Vite Frontend
│   ├── public/
│   │   ├── favicon.svg              # Antique gold monogram favicon
│   │   └── og-image.svg             # Social share card
│   ├── src/
│   │   ├── components/              # Navbar, Hero, About, Experience, Skills, Education, AreasOfInterest, ContactSection, Footer
│   │   ├── data/
│   │   │   └── portfolioData.js     # Single source-of-truth content file
│   │   ├── styles/
│   │   │   ├── variables.css        # Editorial design tokens
│   │   │   ├── index.css            # Base styles, resets, utilities
│   │   │   └── components.css       # Section and component styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html                   # SEO tags, Google Fonts, Open Graph
│   ├── vite.config.js               # Dev server & /api proxy to port 5001
│   ├── package.json
│   └── .env.example
├── server/                          # Express.js REST API
│   ├── src/
│   │   ├── routes/
│   │   │   └── contact.js           # POST /api/contact handler
│   │   ├── utils/
│   │   │   ├── csvStorage.js        # RFC 4180 CSV escaping & formula injection mitigation
│   │   │   ├── rateLimiter.js       # In-memory IP-based rate limiting
│   │   │   └── validator.js         # Input sanitization & honeypot spam protection
│   │   ├── app.js                   # Express application setup
│   │   └── server.js                # Server entry point
│   ├── data/
│   │   └── .gitkeep                 # Submissions stored privately here (ignored by git)
│   ├── test-contact.js              # Automated backend test suite
│   ├── package.json
│   └── .env.example
├── .gitignore                       # Protects node_modules and private CSV records
├── package.json                     # Root orchestration scripts
└── README.md
```

---

## 4. Security & Privacy Features

1. **Private Server-Side Storage:**
   - Enquiries are appended server-side to `server/data/contact-submissions.csv`.
   - The file is placed outside the public frontend root and excluded from Git via `.gitignore`.
   - Never exposed through any public URL or GET endpoint.
2. **RFC 4180 Escaping & CSV Injection Defense:**
   - Quotes, commas, and newlines are safely quoted.
   - Formula-leading symbols (`=`, `+`, `-`, `@`, `\t`, `\r`) are automatically prefixed with a single apostrophe (`'`) to neutralize spreadsheet execution vulnerabilities.
3. **Spam & Abuse Protection:**
   - Hidden honeypot field (`website_hp`) silently catches automated bots without disrupting genuine users.
   - Built-in rate limiter restricts repeated submissions from a single IP address (default: 10 requests per 15 minutes).
4. **Consent Checkbox & Privacy Notice:**
   - Explicit user consent required before transmission (un-checked by default).
   - Clear notice explaining that contact details are used solely to review and respond to enquiries.

---

## 5. Getting Started (Local Development)

### Prerequisites
- Node.js (v18+ recommended, verified on v24)
- npm (v9+)

### Installation
From the root directory:
```bash
# Install dependencies for both server and client
npm run install:all
```

### Running Locally

**Terminal 1 — API Server (runs on http://localhost:5001):**
```bash
npm run dev:server
```

**Terminal 2 — React Client (runs on http://localhost:5173):**
```bash
npm run dev:client
```

*Note:* Vite automatically proxies `/api` calls from `http://localhost:5173` to `http://localhost:5001`.

---

## 6. Running Automated Tests

Run the backend verification suite to validate validation, honeypot traps, RFC 4180 escaping, and CSV formula neutralization:
```bash
npm run test
```

---

## 7. Production Deployment Notes

1. **Persistent Storage Requirement:**
   - Ephemeral container hosts (such as standard Vercel serverless or basic Heroku dynos) reset filesystems on redeployment.
   - For production file-based persistence, ensure `server/data/` is mounted on a persistent volume (e.g., Render Persistent Disk, Railway Volume, AWS EBS, or Docker volume).
   - Alternatively, point `STORAGE_FILE_PATH` to your persistent mount path in `.env`.
2. **Environment Variables:**
   - `PORT`: API server listening port (default `5001`).
   - `CORS_ORIGIN`: Comma-separated list of allowed frontend domains.
   - `STORAGE_FILE_PATH`: Path to the private CSV storage file.
   - `VITE_API_BASE_URL`: Base URL of the backend API (if client and server are hosted on separate domains).

---

## 8. Owner Launch Checklist
- [ ] Confirm exact organisation name and title for the 2007–2011 UK offshore role before publishing to timeline.
- [ ] Confirm whether phone number (`0183933371`) should be displayed publicly or restricted to email + contact form.
- [ ] Supply optional professional portrait and Canva/design project samples when ready.
- [ ] Verify persistent storage directory configuration on chosen production host.
