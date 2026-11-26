# Implementation Plan — Transforming `muszaini/portfolio-2` into a Premium Professional Portfolio

**Plan Date:** 2026-11-25  
**Source Repository:** `https://github.com/muszaini/portfolio-2`  
**Audit Basis:** `docs/PROJECT_AUDIT.md`  
**Status:** Awaiting owner approval before any code modification or implementation.

---

## 1. Existing vs. Proposed Architecture Comparison

| Area | Existing (`muszaini/portfolio-2`) | Proposed Target |
| :--- | :--- | :--- |
| **Repo Layout** | Dual-package (`client/` + `server/`) with experimental `vercel.json` `services` | Unified root Vite + React app + standard Vercel Serverless Function (`api/enquiries.js`) + `shared/validation.js` |
| **Visual System** | Plain CSS (`components.css`, 1,059 lines) with heavy dark-glow halos (`#030304`, `#D4AF37`) | Tailwind CSS v4 + editorial CSS tokens (`#101010`, `#191919`, `#C6A15B`, `#F4F0E8`, `#A7A29A`), `Cormorant Garamond` + `Inter`, zero noisy glows |
| **Motion** | None (only CSS pulsing badge) | Framer Motion (`LazyMotion` + `domAnimation`, honoring `prefers-reduced-motion`) |
| **Content & Positioning** | 2002–2018 Legal CV + Canva collateral + placeholder `AreasOfInterest` (no projects, no GitHub/LinkedIn/CV links) | Law, Business Law & Company Secretarial foundation → Digital Solutions, AI Integration & Business Automation; retains verified Petronas/Telekom/IIUM/Staffordshire history + adds Services, Featured Projects, Approach, LinkedIn/GitHub/CV links |
| **Enquiry Persistence** | Express `POST /api/contact` → ephemeral `/tmp/contact-submissions.csv` on Vercel (data loss risk) | Vercel Serverless `POST /api/enquiries` → **Supabase PostgreSQL (`public.enquiries`)** with strict Row Level Security (RLS) & server-side `service_role` key |
| **Privacy & Security** | Personal phone & Gmail hardcoded in public client JS, README, PRD, and API 500 responses; consent unchecked on server | Zero hardcoded private contact data; server-side consent + validation + silent honeypot + timing guard + IP rate limit + `16 KB` cap + `CSP` & `HSTS` headers |
| **Testing & Quality** | 1 Node `assert` backend script; no linter; no frontend tests | ESLint (`npm run lint`) + Vitest (`npm test`) + `npm audit` (0 vulnerabilities) + Playwright desktop/mobile browser QA |

---

## 2. Phased Implementation Roadmap

### Phase 0 — Repository Alignment & Backup Branch (Prerequisite)
**Tasks:**
1. Confirm working repository setup: clone/link `https://github.com/muszaini/portfolio-2` as the active Git remote (`origin`) and preserve the existing `main` history on a backup tag/branch (`backup/v1-csv-portfolio`) before applying changes on a feature branch (e.g., `feat/v2-premium-portfolio`).
2. Confirm owner-verified facts to include or omit:
   - Whether to include the verified 2002–2018 employment chronology (`Telekom International`, `Petronas KLCC RM1.7M recovery`, `Independent Business Venture`, `Post Office Services`, `DEA Management & Manufacturing`) alongside `LL.B.`, `LL.M. (Business Law, Distinction & Dean's List)`, `CICA Company Secretary`, and `Hibah & Faraid Consultancy`.
   - Confirm personal privacy preference: remove personal phone number and personal Gmail from public source files/README/PRD and route enquiries strictly through the form (or configure public contact email via `VITE_CONTACT_EMAIL`).
   - Confirm real LinkedIn URL, GitHub profile/repo URLs, and optional CV PDF.

**Dependencies:** Owner confirmation on the items above.  
**Risk:** Overwriting `muszaini/portfolio-2` without preserving v1 history.  
**Mitigation:** Create backup branch/tag before any refactor commit.

---

### Phase 1 — Unified Architecture, Design System & Privacy Remediation
**Tasks:**
1. Migrate project structure to standard Vercel-compatible Vite + React + Tailwind CSS v4 + Framer Motion (`LazyMotion`) at repository root (retiring `client/` + `server/` split cleanly after preserving all verified data).
2. Establish editorial design tokens (`#101010`, `#191919`, `#C6A15B`, `#F4F0E8`, `#A7A29A`), trimmed Google Fonts (`Cormorant Garamond` + `Inter`), custom SVG monogram favicon, branded `og-card.svg`, `sitemap.xml`, and `ErrorBoundary`.
3. Configure ESLint (`eslint.config.js`), Vitest (`^5.1.1` with `0` audit vulnerabilities), and `"engines": { "node": ">=20.0.0" }`.
4. Scrub hardcoded personal phone numbers and personal email addresses from public source files, API error responses, `README.md`, and docs.

**Dependencies:** Phase 0 approval.  
**Risks:** Font loading latency or CSS regressions during Tailwind migration.  
**Testing Requirements:**
- `npm audit` → **0 vulnerabilities**
- `npm run lint` → **0 errors, 0 warnings**
- `npm run build` → succeeds cleanly with vendor chunk splitting (`react-vendor`, `motion`, `icons`).

---

### Phase 2 — Navigation, Hero, About, Verified Experience & Credentials
**Tasks:**
1. Build sticky `Navbar` with `IntersectionObserver` active-section highlighting, `1px` antique-gold scroll progress hairline, accessible skip-to-content link, and uncluttered mobile header + scroll-locked drawer (fixing the existing `<420px` crowding bug).
2. Build editorial `Hero` with staggered `LazyMotion` reveal, clear positioning (*Law, Business Law & Company Secretarial practice → Digital Solutions, AI Integration & Business Automation*), role labels, CTAs (*Explore My Work*, *Let's Work Together*, *Download CV*), and env-backed GitHub/LinkedIn links.
3. Build `About` combining legal/business/company secretarial foundation with honest transition into AI, Agentic Engineering, Vibe Coding, Web Development, and Workflow Automation.
4. Build refined `Experience & Credentials` (retaining verified Petronas RM1.7M milestone, Telekom International, DEA Management, IIUM LL.M. Distinction & Dean's List, Staffordshire LL.B. Hons, CICA Company Secretary, and Hibah/Faraid Consultancy while keeping the unconfirmed 2007–2011 UK offshore entry excluded).
5. Build `Footer` with LinkedIn, GitHub, env-backed email/contact link, copyright, and smooth *Back to Top*.

**Dependencies:** Phase 1 design system & verified content confirmation.  
**Risks:** Mixing unconfirmed CV details or overstating AI credentials.  
**Testing Requirements:**
- Desktop (`1440×900`) and mobile (`390×844` and `320×568`) responsive layout check with `0` horizontal overflow.
- Keyboard tab-order and focus-ring verification across header, hero, and footer.

---

### Phase 3 — Services, Featured Projects, Approach & Technical Skills
**Tasks:**
1. Replace the placeholder `AreasOfInterest` section with:
   - **Services Section:** 4 premium consultancy cards (*Professional Website Development*, *AI & Workflow Automation*, *Business Applications*, *Digital Solutions for Professional Services*) + optional *Emerging Scope: Patent & Trademark Digital Workflows* callout, each wired to pre-select the Contact form.
   - **Featured Projects Section:** Case-study cards (*LawFlow AI*, *Restaurant Analytics*, *SkillSwap*, *Hibah & Wasiat Digital Platform* — or owner-updated project list) with Problem, Proposed Solution, Key Features, Contribution, Tech Stack, honest Project Status, bespoke dark-gold SVG workflow schematics, domain quick-filters, GitHub links, conditional Live Demo links (never fabricated), and lazy-loaded focus-trapping `ProjectDetailModal`.
2. Build visually distinctive 4-step **My Approach** section (*From Business Problems to Digital Solutions*) with animated connecting spine.
3. Build **Technical Skills** section grouped honestly across Frontend, Backend, Database, AI & Automation, and Tools (plus Legal & Governance core strength) with **zero fake percentage bars**.
4. Build focus-trapping, `@media print`-styled `CvSummaryModal` fallback for *Download CV* when no static PDF is uploaded.

**Dependencies:** Phase 2 layout primitives (`Dialog`, `Reveal`, `SectionHeader`).  
**Risks:** Modal accessibility regressions or broken print layout.  
**Testing Requirements:**
- Verify keyboard focus trap, `Escape` dismissal, and focus restoration on both `ProjectDetailModal` and `CvSummaryModal`.
- Verify `@media print` CSS isolates the white-paper CV sheet cleanly.
- Verify zero broken links or fabricated demo URLs.

---

### Phase 4 — Contact Form, Serverless API Hardening & Supabase Persistence
**Tasks:**
1. Create `shared/validation.js` shared by frontend and backend covering: Full Name, Email, Phone, optional Company Name, Project Type, optional Budget Range, Project Description (`20–3000` chars), and **server-validated privacy Consent** (`consent === true`).
2. Build accessible `ContactSection` with inline validation, live character counter, automatic focus-on-first-error, timestamped prefill intent (fixing multi-click stale-state bugs), loading/success/error states, and *Submit another enquiry* reset flow.
3. Build Vercel Serverless Function `api/enquiries.js` replacing `server/` Express + CSV storage:
   - `POST`-only (`405`), `Content-Type: application/json` enforcement (`415`), `16 KB` payload cap (`413`), optional `ALLOWED_ORIGIN` guard (`403`).
   - Multi-layer spam protection: silent honeypot (`200` no-op), minimum human interaction time (`>= 2s`), self-pruning per-IP sliding-window rate limiter (`429`).
   - Server-only Supabase insertion using `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; honest `503` if unconfigured.
4. Mount `/api/enquiries` inside `vite.config.js` local dev middleware (with `16 KB` cap) so local development mirrors Vercel production.
5. Author idempotent `supabase/migrations/001_create_enquiries.sql` creating `public.enquiries` with check constraints, indexes, strict RLS enabled, and `revoke all` from `anon`/`authenticated`.

**Dependencies:** Supabase project creation (for live end-to-end DB verification; mocked tests run immediately offline).  
**Risks:**
- Serverless in-memory rate limiter is per-warm-instance (document Upstash Redis / Supabase RPC upgrade path for high scale).
- Missing Supabase env vars on Vercel will prevent persistence until configured.  
**Testing Requirements:**
- Vitest suites (`tests/validation.test.js` & `tests/enquiries-api.test.js`) covering valid submission, consent enforcement, invalid fields, non-POST, invalid `Content-Type`, oversized payload, origin block, silent honeypot, fast-bot block, rate limiting, missing-env `503`, and mocked Supabase success (`201`) & failure (`502`).
- Live Supabase write verification once `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` are supplied.

---

### Phase 5 — Vercel Deployment Configuration, Full QA & Push to GitHub
**Tasks:**
1. Replace non-standard `vercel.json` `services` schema with standard Vite + Serverless Functions config (`framework: "vite"`, `outputDirectory: "dist"`, `/api/*`-safe SPA rewrite, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`, `CSP`).
2. Update `.env.example` and `README.md` with clear architecture docs, Supabase SQL verification query, environment variable reference, and step-by-step Vercel deployment instructions.
3. Run full pre-release verification suite:
   - `npm audit` (0 vulnerabilities)
   - `npm run lint` (0 errors/warnings)
   - `npm test` (100% passing)
   - `npm run build` (verify optimized chunk sizes)
   - Playwright browser QA across desktop (`1440×900`) and mobile (`390×844` & `320×568`): zero console errors/warnings, zero broken links, verified interactive flows.
4. Commit cleanly and push to `https://github.com/muszaini/portfolio-2` (preserving v1 on a backup branch/tag).

**Dependencies:** Phases 1–4 complete + GitHub push authentication / commit email confirmed by owner.  
**Testing Requirements:** Full automated + visual regression pass before pushing to GitHub and deploying on Vercel.

---

## 3. Items Requiring Owner Approval Before Implementation Begins

1. **Approve Plan (Phases 0–5):** Confirm you want me to transform `https://github.com/muszaini/portfolio-2` according to this plan (replacing Express/CSV with Vercel Serverless + Supabase while preserving v1 on a backup branch).
2. **Career & Credential Scope:** Confirm you want to **merge** your verified 2002–2018 employment history & IIUM/Staffordshire degrees from `portfolio-2` together with CICA Company Secretary, Hibah & Faraid Consultancy, Patent & Trademark exploration, and the 4 digital/AI projects (*LawFlow AI*, *Restaurant Analytics*, *SkillSwap*, *Hibah & Wasiat Digital Platform*).
3. **Privacy Preference:** Confirm we should **remove** your personal phone number and personal Gmail from public source files/README/error messages and handle enquiries via the secure form (with any public contact email configured only through `VITE_CONTACT_EMAIL`).
4. **Optional Real Links / Credentials:** Share your LinkedIn URL, project GitHub repo URLs (if public), optional CV PDF, and Supabase credentials whenever ready.
