# React.js Portfolio Website • Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 19 October 2026  
**Owner:** Muszaini Binti Musa  

**Purpose:** Provide a build-ready specification for a polished personal portfolio that presents the owner’s legal experience, transferable skills, ongoing AI learning, and design/web interests, and lets prospective clients or collaborators submit an enquiry.

---

## 1. Product Overview

Build a responsive personal portfolio for **Muszaini Binti Musa**. The portfolio should communicate a credible legal-professional foundation alongside current exploration of AI, machine learning, Agentic Engineering, vibe coding, website creation, and Canva-based design. The primary conversion goal is to receive collaboration and freelance enquiries through a contact form.

## 2. Goals and Success Criteria

- Present the CV information clearly and professionally without inventing qualifications, employers, dates, or achievements.
- Create a distinctive vintage black-and-gold visual identity with restrained gold accents, editorial typography, and refined section treatments.
- Make it easy for visitors to understand the owner’s background, skills, education, and current areas of development.
- Collect a visitor’s name, email, phone number, and message/description, then persist submissions server-side in a private file.
- Provide a responsive, accessible, fast-loading experience on desktop, tablet, and mobile.
- Make portfolio content easy to update without redesigning the entire site.

## 3. Target Audience

- Law firms and legal professionals interested in collaboration or legal-workflow improvement.
- Small and medium-sized businesses seeking website, design, or early-stage AI/automation support.
- Freelance clients looking for website, brochure, flyer, poster, or Canva design assistance.
- Potential collaborators, recruiters, and professional contacts.

## 4. Source-of-Truth CV Content

Use the uploaded CV as the primary source. Preserve the facts below and do not silently resolve unclear OCR or timeline details.

### Profile Details
- **Name:** Muszaini Binti Musa
- **CV Headline:** Legal Professional
- **Email:** muszainimusa224@gmail.com
- **Phone:** 0183933371
- **Professional Themes:** Legal drafting and review, regulatory compliance, legal research, risk assessment, stakeholder management, AI and machine learning (listed as a skill/interest), ongoing Agentic Engineering and vibe coding, Canva design, websites, brochures, flyers, and posters.

### Work Experience
- **Legal Executive — Menara Rebung, Lembah Pantai / Telekom International; 2002–2004 (2 years).** CV describes the organisation as a major telecommunications provider focused on connectivity solutions and services. Responsibilities: drafted and reviewed commercial and regulatory documents; coordinated with cross-functional teams; supported regulatory compliance.
- **Legal Team — KLCC Education Sponsorship Unit, Petronas; 2004–2007 (3 years).** Responsibilities: contract drafting and review for procurement and joint ventures; risk assessments and supplier-agreement advice; recovered RM1.7 million from breach-of-contract cases.
- **Unverified Entry (2007–2011):** CV contains an entry rendered as “2 h Offshore, Surrey United Kingdom” with dates 2007–2011. The employer name/title is unclear in the uploaded CV and must be confirmed by the owner before publication. Duties listed: contract drafting and review, overseas stakeholder management, regulatory compliance, and legal research.
- **Entrepreneur / Business; 2011–2015.** The CV also lists **Post Office Services, 2012–2015**, with daily post-office tasks. Keep these as separate entries unless the owner confirms how they relate.
- **DEA Management & Manufacturing Sdn Bhd; 2015–2018**, marked “last job” in the CV. Duties listed: contract drafting and review, overseas stakeholder management, and regulatory compliance.

### Education
- **LL.M. in Business Law — International Islamic University; graduated 2006**, with distinction and Dean’s List as stated in the CV.
- **LL.B. in Law — Staffordshire University, Stoke-on-Trent, United Kingdom; graduated 1996**, with honours; active member of the Law Society as stated in the CV.

> **CV Verification Note:** Before launch, confirm the exact name and job title for the 2007–2011 entry, the official employer names, and any wording that may have been distorted by OCR. Do not add a photo, social-media links, testimonials, client logos, certificates, or project case studies unless the owner supplies them.

## 5. Information Architecture and Page Sections

1. **Header / Navigation:** Wordmark “MUSZAINI MUSA” with a small legal/portfolio descriptor; links to Home, About, Experience, Skills, Education, Portfolio/Projects, Contact; primary CTA “Let’s Collaborate”.
2. **Hero:** Headline “Legal Insight. Thoughtful Design. Emerging AI Solutions.”; supporting copy introducing a legal professional expanding into AI, vibe coding, and digital design; CTAs “Explore My Background” and “Let’s Collaborate”.
3. **About:** Concise summary grounded in the CV connecting legal discipline with digital tools.
4. **Experience Timeline:** Vertical editorial timeline of confirmed roles, highlighting the RM1.7 million recovery achievement. Unverified 2007–2011 entry remains in internal development notes only.
5. **Skills:** Legal, Digital / Creative, and Learning / Emerging (ongoing) groups using text labels and restrained icons (no proficiency bars or star ratings).
6. **Education:** Credential cards for LL.M. (2006, Distinction & Dean’s List) and LL.B. (1996, Honours, Active Member of the Law Society).
7. **Portfolio / Projects (Areas of Interest):** Reusable `ProjectCard` component presenting clearly labelled Areas of Interest for v1.0 without fabricating projects.
8. **Contact / Collaboration Form:** Required Name, Email, Phone number, Description/Message, optional consent checkbox, honeypot spam protection, inline validation, and server-side persistence to a private CSV file.

## 6. Visual Design System

- **Primary background:** `#11100E`
- **Secondary surface:** `#201D18`
- **Gold accent:** `#C6A15B` / `#B18B36`
- **Primary text:** `#F3EBDD`
- **Secondary text:** `#B9B1A2`
- **Typography:** Cormorant Garamond (headings) + Source Sans 3 / Inter (body).

## 7. Backend & Private Storage Contract

- `POST /api/contact` validates and sanitises `{ name, email, phone, description }`, checks honeypot and rate limit, and appends a row to `server/data/contact-submissions.csv` (`submitted_at_utc,name,email,phone,description`).
- Returns `201` on verified write, `400` on validation/spam failure, `429` on rate limit, and `500` on storage failure.
- Never exposes the CSV file or saved submissions publicly.
