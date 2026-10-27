# Muszaini Binti Musa — Personal Portfolio Website (v1.0)

A responsive, vintage black-and-antique-gold editorial portfolio website built with **React.js (Vite)** and a **Node.js + Express** private contact enquiry API.

## Overview

This portfolio presents the documented legal foundation of **Muszaini Binti Musa** (LL.M. in Business Law, International Islamic University; LL.B. Hons, Staffordshire University, UK) alongside digital design services (websites, Canva design, brochures, flyers, posters) and ongoing learning in AI, machine learning, Agentic Engineering, and vibe coding.

### Key Architectural Highlights
- **Vintage Black-and-Gold Editorial Design**: Uses warm obsidian (`#11100E`), deep charcoal (`#201D18`), antique gold (`#C6A15B` / `#B18B36`), warm ivory (`#F3EBDD`), and muted stone (`#B9B1A2`) with `Cormorant Garamond` serif headings and `Source Sans 3` body typography.
- **Strict CV Fidelity**: Only verified facts from the owner's CV are published. The unclear `2007–2011` OCR entry (`"2 h Offshore, Surrey United Kingdom"`) is intentionally kept unpublished in internal developer comments in `src/data/portfolioData.js` until confirmed by the owner.
- **Private CSV Enquiry Persistence (`POST /api/contact`)**: Validates and sanitises `name`, `email`, `phone`, and `description`, applies honeypot spam checks and per-IP rate limiting, neutralises spreadsheet formula injection, escapes quotes/commas/newlines per RFC 4180, and writes to a private server-side file (`server/data/contact-submissions.csv`).

---

## Repository Structure

```text
.
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── ExperienceTimeline.jsx
│   │   ├── SkillGroup.jsx
│   │   ├── EducationCard.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ContactForm.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── AboutSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── EducationSection.jsx
│   │   ├── PortfolioSection.jsx
│   │   └── ContactSection.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── styles/
│   │   └── index.css
│   ├── tests/
│   │   └── contact.test.js
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── data/
│   │   └── .gitkeep
│   ├── src/
│   │   ├── routes/
│   │   │   └── contact.js
│   │   ├── storage/
│   │   │   └── csvStorage.js
│   │   ├── validation/
│   │   │   └── contactValidation.js
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── docs/
│   └── PRD.md
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Local Setup & Development Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional for Local Dev)
Copy `.env.example` to `.env` if you wish to customise the port, rate limit, or CSV storage location:
```bash
cp .env.example .env
```

### 3. Start the Backend API Server (`http://127.0.0.1:8000`)
```bash
npm run server
```

### 4. Start the React + Vite Frontend (`http://localhost:5173`)
In a separate terminal:
```bash
npm run dev
```
Vite automatically proxies `/api/*` requests to `http://127.0.0.1:8000`.

### 5. Run Verification Checks (Tests, Linter & Production Build)
```bash
npm test
npm run lint
npm run build
```

---

## Where Private Submissions Are Stored & Deployment Requirements

- **Default Local Path**: `server/data/contact-submissions.csv` (configurable via `CONTACT_CSV_PATH`).
- **CSV Columns**: `submitted_at_utc,name,email,phone,description`
- **Security Controls**:
  - The CSV file is stored outside `public/` and `dist/` and is blocked by `.gitignore` (`server/data/*.csv`, `*.csv`) so real enquiry data is never committed to Git.
  - `server/src/storage/csvStorage.js` explicitly refuses any path inside `public/` or `dist/` and creates the file with `0600` (owner read/write only) permissions where supported.
  - `GET /api/contact` returns `405 Method Not Allowed`; the API never returns saved enquiries to visitors.
- **Production Deployment & Persistent Storage Note**:
  - Ephemeral container filesystems (such as free-tier serverless instances or ephemeral PaaS dynos) wipe local files on redeploy or restart.
  - **For production**, mount a persistent private disk/volume (e.g., Render Persistent Disk, Fly.io Volume, Railway Volume, or a dedicated VPS directory) and set `CONTACT_CSV_PATH=/mnt/private-data/contact-submissions.csv` over HTTPS.
  - Restrict server access to the site owner/administrator, back up the CSV regularly, and periodically purge enquiries that have passed your retention period.
