# Project Audit — `https://github.com/muszaini/portfolio-2`

**Audit Date:** 2026-11-25  
**Target Repository Inspected:** `https://github.com/muszaini/portfolio-2` (cloned read-only for full inspection)  
**Phase:** Phase 1 — Repository Audit ONLY (no application code modified, deleted, or generated)

> **Workspace Alignment Note:** The active local folder (`/Users/muszainimusa/Downloads/portfolio Legal Tech  and Vibe Coding Consultant`) currently contains an unconnected draft repository from earlier in this session rather than a checkout of `https://github.com/muszaini/portfolio-2`. Every finding in Sections 1–5 below strictly documents the **existing codebase inside `https://github.com/muszaini/portfolio-2`** — clearly separated from proposed changes in Section 6 and `docs/IMPLEMENTATION_PLAN.md`.

---

## 1. Project Architecture (Existing Repository)

### Technology Stack
| Layer | Existing Implementation | Version |
| :--- | :--- | :--- |
| Frontend | React + React DOM + Vite (JavaScript) | `react ^19.0.0`, `vite ^6.2.0` |
| Styling | Plain CSS (`variables.css`, `index.css`, `components.css`) | Custom (1,059 lines in `components.css`) |
| Icons | `lucide-react` | `^1.16.0` |
| Motion / Linting / Frontend Tests | **None present** | — |
| Backend | Node.js ES Modules + Express REST API (`server/`) | `express ^4.21.2`, `cors ^2.8.5`, `dotenv ^16.4.7` |
| Data Storage | Local flat CSV file (`server/data/contact-submissions.csv`) | `fs.promises` (`csvStorage.js`) |
| Backend Tests | Custom Node `assert` script (`server/test-contact.js`) | Node built-in `assert` |

### Folder & File Structure (`muszaini/portfolio-2`)
```text
portfolio-2/
├── package.json                       # Root npm --prefix orchestration scripts
├── vercel.json                        # Experimental multi-service Vercel config
├── README.md                          # Project overview (contains owner phone number on L151)
├── .gitignore                         # Ignores node_modules, dist, .env, server/data/*.csv
├── docs/
│   └── PRD.md                         # v1.0 PRD (dated 19 Oct 2026)
├── client/
│   ├── package.json                   # Frontend deps (react, react-dom, lucide-react, vite)
│   ├── vite.config.js                 # Vite config + /api proxy to localhost:5001
│   ├── index.html                     # SEO tags, OG/Twitter tags, Cormorant Garamond + Plus Jakarta Sans
│   ├── .env.example                   # VITE_API_BASE_URL
│   ├── public/
│   │   ├── favicon.svg
│   │   └── og-image.svg
│   └── src/
│       ├── main.jsx                   # Entry point mounting <App /> + index.css & components.css
│       ├── App.jsx                    # Single-page layout assembling 9 components
│       ├── data/
│       │   └── portfolioData.js       # Single source-of-truth CV/content file (233 lines)
│       ├── styles/
│       │   ├── variables.css          # "Black Gradient Glow" CSS custom properties
│       │   ├── index.css              # Base reset, fixed radial halos, button/badge classes
│       │   └── components.css         # All component & responsive CSS (1,059 lines)
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── About.jsx
│           ├── Experience.jsx
│           ├── Skills.jsx
│           ├── Education.jsx
│           ├── AreasOfInterest.jsx
│           ├── ContactSection.jsx
│           ├── Footer.jsx
│           └── SectionHeader.jsx
└── server/
    ├── package.json                   # Backend deps (express, cors, dotenv)
    ├── .env.example                   # PORT, CORS_ORIGIN, STORAGE_FILE_PATH, RATE_LIMIT_*
    ├── test-contact.js                # 5-step Node integration test against local Express app
    ├── data/                          # Private CSV directory (.gitkeep)
    └── src/
        ├── server.js                  # Entry point (starts Express on PORT 5001 unless VERCEL)
        ├── app.js                     # Express app, headers, CORS, JSON parser, routes, error handler
        ├── routes/
        │   └── contact.js             # POST /api/contact route
        └── utils/
            ├── validator.js           # Input validation & honeypot check
            ├── csvStorage.js          # RFC 4180 CSV writer + spreadsheet formula neutralization
            └── rateLimiter.js         # In-memory per-IP rate limiter (10 req / 15 min)
```

### Main Application Entry Points
- **Frontend:** `client/index.html` → `client/src/main.jsx` → `client/src/App.jsx`
- **Backend:** `server/src/server.js` → `server/src/app.js` → `server/src/routes/contact.js`

---

## 2. Current Website Review

### Existing Pages & Sections (Single-Page Architecture)
1. **`Navbar`:** Sticky header (`MM` monogram + `MUSZAINI MUSA`), 6 anchor links (`About`, `Experience`, `Skills`, `Education`, `Areas of Interest`, `Contact`), `Let's Collaborate` gold button, and mobile drawer toggle.
2. **`Hero`:** Centered layout with eyebrow badge, headline (*"Legal Insight. Thoughtful Design. Emerging AI Solutions."*), subheadline, 2 CTAs (`Let's Collaborate`, `Explore Career & Background`), and a 4-stat bar (`20+ Yrs`, `RM1.7M Contract Recovery`, `LL.M. Dean's List Distinction`, `AI & Web Active Exploration`).
3. **`About`:** 2-column layout with 2 bio paragraphs + 3 core-value pillar cards (*Analytical Rigour*, *Pragmatic Risk Awareness*, *Continuous Learning*).
4. **`Experience`:** Vertical gold-spine timeline listing 5 verified roles (2002–2018): *DEA Management & Manufacturing Sdn Bhd* (2015–2018), *Post Office Services* (2012–2015), *Independent Business Venture* (2011–2015), *Petronas KLCC Education Sponsorship Unit* (2004–2007, highlighting RM1.7M recovery), and *Telekom International* (2002–2004). Correctly keeps the unconfirmed 2007–2011 UK offshore entry excluded from public display.
5. **`Skills`:** 3 cards (*Legal & Governance*, *Creative & Digital Production*, *Emerging AI & Technical Exploration*) rendered as text pills without fake percentage bars.
6. **`Education`:** 2 credential cards (*LL.M. in Business Law*, IIUM 2006 — Distinction & Dean's List; *LL.B. in Law (Hons)*, Staffordshire University UK 1996).
7. **`AreasOfInterest`:** 4 generic domain cards (*Legal Workflow Optimization*, *Bespoke Web Creation*, *Brand & Print Collateral* via Canva, *Early-Stage AI Workflow Support*) with a footnote stating no real project demos or case studies are published yet.
8. **`ContactSection`:** 2-column layout — direct contact card (displaying personal email, personal phone number, and Kuala Lumpur) + 4-field enquiry form with consent checkbox.
9. **`Footer`:** Brand summary, section links, direct email/phone again, copyright, and smooth *Back to Top* button.

### Visual Design & Positioning Assessment
- **Design Drift from Brief/PRD:** Although `README.md` and `docs/PRD.md` specify understated vintage editorial black-and-gold (`#11100E`, `#C6A15B`, *avoid excessive glow*), `client/src/styles/variables.css`, `index.css`, and `components.css` actually implement a **heavy "Black Gradient Glow" style** (`#030304`, radial gold ambient halos on `body::before`/`body::after`, metallic gradient buttons, glowing box shadows on every card, and a pulsing badge animation). This reads closer to a dark flashy template than an understated luxury consultancy.
- **Positioning Gap vs. Intended Identity:**
  - Currently frames Muszaini around 2002–2018 legal roles + Canva flyers/brochures rather than **Law, Business Law & Company Secretarial practice → Digital Solutions, AI Integration & Business Automation**.
  - **No Featured Projects / Case Studies section** (critical for GitHub, LinkedIn, employers, and freelance proposals).
  - **No structured Services or Consulting Engagement section** for SMEs and professional firms.
  - **No Methodology / Approach section** (*how* business/legal problems become digital solutions).
  - **No GitHub link, LinkedIn link, or CV Download option** anywhere on the site.

### Navigation & UX
- Desktop navigation works via hash anchors, but there is **no active-section highlight**, **no skip-to-content link**, and **no scroll progress indicator**.
- On narrow mobile viewports (`320px–420px`), `Navbar` keeps the brand block (`MUSZAINI MUSA`), the `Let's Collaborate` CTA button, AND the menu hamburger icon on the same horizontal row, causing crowding/wrapping on small screens.
- Mobile drawer opens via CSS `.open` toggle without locking background scroll, handling `Escape`, or managing focus.

### Reusable Components & Assets
- **Strongly Reusable (Content & Logic):**
  - Verified factual career history & education data in `client/src/data/portfolioData.js` (especially Petronas RM1.7M milestone, IIUM LL.M., Staffordshire LL.B., and the explicit verification hold on the 2007–2011 entry).
  - `SectionHeader.jsx` concept and clean section-per-component structure (`Navbar`, `Hero`, `About`, `Experience`, `Education`, `Skills`, `ContactSection`, `Footer`).
  - `client/public/favicon.svg` and `og-image.svg` assets (or updated refinements).
  - RFC 4180 / CSV formula neutralization utility (`server/src/utils/csvStorage.js`) — useful if CSV export is ever added as an admin feature later, though unsuitable as primary production storage on Vercel.

---

## 3. Existing Functionality Audit

### Contact Form & Submission Flow
- **Fields currently implemented:** `name`, `email`, `phone`, `description`, hidden honeypot `website_hp`, and `consent` checkbox.
- **Fields NOT present:** Company / Firm Name, Project Type / Service Category, Budget Range.
- **Flow:** Client validates -> sends `POST ${VITE_API_BASE_URL}/api/contact` -> Express rate limiter -> `validateContactSubmission()` -> `appendEnquiryToCsv()` -> returns `201 Created`.

### Validation & Error Handling
- Frontend validates required fields, basic email syntax, phone digit count (`7–18`), description length (`>= 10`), and `consent === true`.
- Backend (`server/src/utils/validator.js`) re-validates `name` (`2–100`), `email` (`<= 120`, RFC-like regex), `phone` (`7–18` digits + regex), `description` (`10–3000`), and `website_hp`.

### Incomplete, Defective, or Non-Functional Aspects
1. **Consent Not Validated Server-Side:** `ContactSection.jsx` requires the user to check `consent`, yet `consent` is **omitted from the `POST /api/contact` JSON body** and never checked in `server/src/utils/validator.js`.
2. **Placeholder "Areas of Interest" Instead of Projects:** The site currently has zero portfolio projects, live demos, GitHub links, or case studies.
3. **No Notification or Retrieval Mechanism for Enquiries:** Because enquiries are appended only to a private CSV file with no email alert, dashboard, or database, the owner has **no practical way to read submissions in production on Vercel**.
4. **Dead / Unused Imports Across 7 Components:** `Hero.jsx`, `About.jsx`, `Experience.jsx`, `Education.jsx`, `Skills.jsx`, `AreasOfInterest.jsx`, and `Navbar.jsx` import unused `lucide-react` icons or `personalInfo`.

---

## 4. Technical Quality Assessment

### Bugs & Security Issues
| Severity | Issue | Exact Location |
| :--- | :--- | :--- |
| **Critical (Data Loss)** | On Vercel (`process.env.VERCEL`), submissions are written to `/tmp/contact-submissions.csv`, which is **ephemeral, isolated per serverless container, and erased on cold start/redeploy**. Client leads will be permanently lost. | `server/src/app.js:60-62` |
| **High (Privacy Exposure)** | Personal phone number (`[redacted]`) and personal Gmail (`[redacted]`) are hardcoded in public client JS, server 500 error responses, validation error strings, `README.md`, and `docs/PRD.md`. | `client/src/data/portfolioData.js:12-13`, `server/src/routes/contact.js:40`, `server/src/utils/validator.js:64`, `README.md:151` |
| **Medium (Crash Bug)** | If `POST /api/contact` receives a missing/non-object `req.body` (e.g., wrong `Content-Type`), `validateContactSubmission(req.body)` throws `TypeError: Cannot read properties of undefined` instead of returning `400`. | `server/src/utils/validator.js:20` |
| **Medium (Security Headers & CORS)** | Missing `Content-Security-Policy` (CSP) and `Strict-Transport-Security` (HSTS); sets deprecated `X-XSS-Protection`; CORS automatically whitelists insecure `http://` variants of Vercel domains (`app.js:37`). | `server/src/app.js:15-38` |
| **Medium (Anti-Spam Leak)** | Returning `HTTP 400` when `website_hp` is populated reveals honeypot detection to bots; lacks minimum form-fill timing check; `express.json({ limit: '100kb' })` is larger than needed. | `server/src/routes/contact.js:12-18`, `server/src/app.js:57` |
| **Low (Rate Limiter)** | In-memory `Map` in `rateLimiter.js` does not persist across Vercel serverless instances, and `setInterval(...).unref()` is ineffective in short-lived serverless runtimes. | `server/src/utils/rateLimiter.js` |

### Performance & Accessibility
- **Performance:**
  - `background-attachment: fixed` on `body` + two full-viewport `position: fixed` radial-gradient pseudo-elements (`body::before`, `body::after`) + stacked `backdrop-filter: blur(16px)` and heavy multi-layer glow `box-shadow`s cause unnecessary compositing and mobile scroll jank.
  - `client/index.html` requests 11 Google Font weight/style variants (`Cormorant Garamond` 6 + `Plus Jakarta Sans` 5).
  - No code splitting, no ESLint, no frontend build/bundle analysis.
- **Accessibility:**
  - Missing `Skip to main content` link (`#main-content` exists in `App.jsx`, but no skip anchor points to it).
  - Mobile navigation button lacks `aria-controls`; drawer stays hidden via CSS without `Escape` close, focus trap, or scroll lock.
  - Contact form uses `role="alert"` for success banner (should be `role="status"`), does not focus the first invalid field on validation failure, and lacks a live character counter for the description field.
  - Several inline `style={{ ... }}` overrides mix presentation into JSX rather than semantic CSS tokens.

### Code Organisation & Mobile Responsiveness
- Clean separation of `portfolioData.js` and section components, though `components.css` has grown to a single 1,059-line file.
- Responsive grids collapse cleanly at `768px` / `850px` / `900px` for most sections, **except** the `Navbar` action bar (`Let's Collaborate` button remains visible alongside the brand block and hamburger toggle on small mobile widths, risking overflow/crowding below `420px`).

---

## 5. Deployment Readiness (Vercel)

| Dimension | Current State | Assessment |
| :--- | :--- | :--- |
| **`vercel.json` Configuration** | Uses `"services": { "client": ..., "server": ... }` with `"bindings"` and service-targeted rewrites | **High Risk / Non-Standard:** Not compatible with standard single-project Vercel Vite + Serverless Functions deployments; can fail deployment or routing on standard Vercel accounts. |
| **Backend Hosting** | Standalone Express server (`server/src/server.js`) intended for persistent disk | **Misaligned for Vercel:** Express + filesystem CSV expects a long-running VPS/disk host (Render/Railway), whereas Vercel is stateless serverless. |
| **Data Persistence** | CSV file falling back to `/tmp/contact-submissions.csv` on Vercel | **Not Production-Safe:** Leads stored in `/tmp` are ephemeral and unretrievable. Must be replaced with **Supabase (PostgreSQL with RLS)** or another managed database. |
| **Environment Variables** | `PORT`, `CORS_ORIGIN`, `STORAGE_FILE_PATH`, `RATE_LIMIT_*`, `VITE_API_BASE_URL` | Missing database credentials (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) and env-backed profile links (`VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_CV_URL`). |

---

## 6. Recommended Improvements Summary

### Retain
- Verified legal career chronology (`portfolioData.js`: Telekom International, Petronas KLCC RM1.7M recovery, Independent Venture, Post Office Services, DEA Management & Manufacturing) and the strict verification hold on the 2007–2011 UK offshore entry.
- Verified academic credentials (IIUM LL.M. Business Law — Distinction & Dean's List; Staffordshire University LL.B. Hons).
- Single-source-of-truth data-driven architecture (`src/data/*`).
- Honest framing of ongoing AI/Agentic Engineering learning with zero fake skill bars or invented testimonials.
- Explicit user privacy consent checkbox on the contact form.

### Improve
- **Visual Direction:** Transition from the heavy "Black Gradient Glow" CSS (`#030304`, radial halos, pulsing glow badges) to refined luxury editorial minimalism (`#101010` matte obsidian, `#191919` surfaces, `#C6A15B` antique gold, `#F4F0E8` warm ivory, `#A7A29A` muted stone, `Cormorant Garamond` + `Inter`, crisp hairline borders, subtle `LazyMotion` Framer Motion reveals).
- **Positioning:** Update copy and IA to clearly communicate **Law, Business Law & Company Secretarial practice → Digital Solutions, AI Integration & Business Automation** for employers, SMEs, professional firms, and freelance clients.
- **Privacy & Security:** Remove hardcoded personal phone/email from public source files, docs, and API error messages; add server-side consent validation, silent honeypot handling, fill-time spam guard, strict payload caps (`16 KB`), `Content-Type` enforcement, and `CSP`/`HSTS` headers.
- **UX & Accessibility:** Fix mobile navbar crowding, add skip link, active-section navigation tracking, focus-trapping modals, focus-first-error on form submit, and `@media print` executive CV output.

### Replace
- Replace the separate Express server (`server/`) + ephemeral CSV storage + non-standard `vercel.json` `services` config with a clean **single-repo Vite + React frontend + Vercel Serverless Function (`api/enquiries.js`) + Supabase PostgreSQL (strict RLS)**.
- Replace the 1,059-line monolithic `components.css` with a structured Tailwind CSS v4 + semantic CSS design-token system.

### Missing (To Add)
- **Featured Projects / Case Studies** section (with Problem, Proposed Solution, Key Features, Contribution, Tech Stack, honest Project Status, architectural workflow diagrams, GitHub links, and conditional Live Demo links).
- **Services / Consultancy Offerings** section tailored to SMEs, law/professional firms, and freelance proposals (with CTAs wired to pre-select the Contact form).
- **My Approach** 4-step methodology section (*From Business Problems to Digital Solutions*).
- **LinkedIn, GitHub, and Download CV** actions in Hero and Footer (env-backed, with printable factual CV summary fallback when a PDF is not yet supplied).
- **Automated Quality Gates:** ESLint + Vitest unit/API test suite + production bundle optimization (`LazyMotion`, lazy-loaded modals, vendor chunk splitting).
