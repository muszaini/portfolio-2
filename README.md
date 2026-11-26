# Muszaini Musa — Professional Portfolio

A luxury editorial-inspired technology consultancy portfolio built for **Muszaini Musa** — positioning a foundation in law, corporate governance and advisory work alongside practical web development, AI and workflow automation.

> *"I understand business problems and build practical digital solutions using technology, AI and automation."*

---

## Tech Stack

- **Frontend:** React 19, Vite, JavaScript, Tailwind CSS v4
- **Motion & Icons:** Framer Motion (`LazyMotion` + `domAnimation`, respecting `prefers-reduced-motion`), Lucide React
- **Typography:** Cormorant Garamond (editorial display) & Inter (body/UI)
- **Backend API:** Vercel Serverless Function (`api/enquiries.js`)
- **Database:** Supabase (PostgreSQL with strict Row Level Security)
- **Quality & Testing:** ESLint + Vitest
- **Deployment:** Vercel

---

## Architecture Overview

- `shared/validation.js` — Pure validation & sanitization module shared cleanly by frontend and Vercel serverless API
- `src/data/` — Centralized, truthful content modules (`profile.js`, `services.js`, `projects.js`, `approach.js`, `skills.js`)
- `src/components/layout/` — Sticky editorial `Navbar` (active-section tracking, `1px` scroll progress, mobile drawer scroll lock) and `Footer`
- `src/components/sections/` — `HeroSection`, `AboutSection`, `ServicesSection`, `ProjectsSection` (with domain filters & workflow schematics), `ApproachSection`, `SkillsSection`, `ContactSection`
- `src/components/ui/` — Reusable primitives (`Button`, `SectionHeader`, `Reveal`, `Dialog` with focus trap & restore, `ErrorBoundary`, `ProjectVisual`, lazy-loaded `ProjectDetailModal`, print-ready `CvSummaryModal`)
- `api/enquiries.js` — Serverless endpoint with `Content-Type` enforcement, `16 KB` payload cap, optional `ALLOWED_ORIGIN` guard, honeypot, minimum fill-time check, self-pruning per-IP rate limiter, and server-side Supabase insertion
- `supabase/migrations/001_create_enquiries.sql` — PostgreSQL schema with strict RLS enabled
- `docs/PROJECT_AUDIT.md` & `docs/IMPLEMENTATION_PLAN.md` — Full technical audit & phased plan

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in your real values:

```bash
cp .env.example .env.local
```

| Variable | Scope | Purpose |
| :--- | :--- | :--- |
| `SUPABASE_URL` | Server only | Your Supabase project URL (`https://<ref>.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service role key used exclusively inside `api/enquiries.js` |
| `ALLOWED_ORIGIN` | Server only (optional) | Comma-separated production origins permitted to call `/api/enquiries` |
| `VITE_GITHUB_URL` | Public client | Your real GitHub profile URL |
| `VITE_LINKEDIN_URL` | Public client | Your real LinkedIn profile URL |
| `VITE_CONTACT_EMAIL` | Public client (optional) | Optional public email displayed in the footer |
| `VITE_CV_URL` | Public client (optional) | Optional PDF path (e.g. `/Muszaini-Musa-CV.pdf` placed in `public/`) |
| `VITE_PROJECT_*_GITHUB` | Public client (optional) | Individual project GitHub repository URLs |
| `VITE_PROJECT_*_DEMO` | Public client (optional) | Verified live demo URLs (leave blank if not yet deployed) |

> **Security Note:** Never commit `.env.local` or prefix `SUPABASE_SERVICE_ROLE_KEY` with `VITE_`. Sensitive personal details are never stored in publicly accessible files.

### 3. Set Up & Verify Supabase Database
1. Open your Supabase dashboard -> **SQL Editor**.
2. Run `supabase/migrations/001_create_enquiries.sql`.
3. Verify RLS and table readiness with:
   ```sql
   select relname, relrowsecurity
   from pg_class
   where relname = 'enquiries';
   ```
   Confirm `relrowsecurity` is `true`.

### 4. Run Locally & Verify Quality Gates
```bash
npm run dev     # Starts Vite with local /api/enquiries middleware
npm run lint    # Runs ESLint across frontend, shared, API & tests
npm test        # Runs Vitest validation & serverless API suites
npm run build   # Builds production bundle into dist/
```

---

## Deploying to Vercel

1. Initialize Git (if not already done) and push the repository to GitHub.
2. Import the repository in **Vercel** (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
3. Configure environment variables in **Vercel Project Settings -> Environment Variables**:
   - Server variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, optional `ALLOWED_ORIGIN`
   - Public variables: `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_CV_URL`, project links
4. Deploy and submit a live test enquiry through the contact form, then verify the inserted row inside Supabase (`Table Editor -> public.enquiries`).
5. **Note on Rate Limiting:** The built-in IP rate limiter runs in-memory per warm serverless instance. For high-traffic distributed rate limiting across Vercel regions, upgrade `isRateLimited` in `api/enquiries.js` to use Upstash Redis or a Supabase RPC counter.
