# Product Requirements Document (PRD)
## Muszaini Musa — Vintage Black & Gold Portfolio

- **Version:** 1.0  
- **Date:** 19 October 2026  
- **Stack:** React.js + Vite frontend, Node.js + Express contact API, private CSV storage  

---

## 1. Product Overview
Build a responsive personal portfolio for **Muszaini Binti Musa**. Present her legal-professional foundation alongside current learning in AI, machine learning, Agentic Engineering, vibe coding, website creation, and Canva-based design. The primary conversion goal is to receive collaboration and freelance enquiries through a contact form.

---

## 2. Goals
- Present CV information clearly without inventing qualifications, employers, dates, or achievements.
- Establish a vintage black-and-gold visual identity.
- Help visitors understand professional background, skills, education, and current areas of development.
- Collect name, email, phone number, and message/description and store submissions server-side in a private file.
- Provide a responsive, accessible, fast-loading site.

---

## 3. Target Audience
- Law firms and legal professionals.
- SMEs interested in website, design, or early-stage AI/automation support.
- Freelance clients seeking Canva design or website support.
- Potential collaborators, recruiters, and professional contacts.

---

## 4. CV Source Content

### Profile
- **Name:** Muszaini Binti Musa  
- **Headline:** Legal Professional  
- **Email:** [muszainimusa224@gmail.com](mailto:muszainimusa224@gmail.com)  
- **Phone:** 0183933371  
- **Skills/themes:** Contract drafting, regulatory compliance, legal research, risk assessment, stakeholder management, AI and machine learning (listed in CV), ongoing Agentic Engineering and vibe coding, Canva design, websites, brochures, flyers, posters.

### Experience
- **Legal Executive — Menara Rebung, Lembah Pantai / Telekom International | 2002–2004:**  
  Drafted and reviewed commercial/regulatory documents, coordinated cross-functional teams, supported regulatory compliance.
- **Legal Team — KLCC Education Sponsorship Unit, Petronas | 2004–2007:**  
  Contract drafting/review for procurement and joint ventures, risk assessments, supplier agreements, and recovery of RM1.7 million from breach-of-contract cases.
- **2007–2011 entry:**  
  CV text appears as “2 h Offshore, Surrey United Kingdom”; exact employer and title are unclear. Do not publish this entry until confirmed. Duties listed: contract drafting/review, overseas stakeholder management, regulatory compliance, legal research.
- **Entrepreneur / Business | 2011–2015:**  
  CV also lists Post Office Services | 2012–2015, daily post-office tasks. Keep as separate entries unless the owner clarifies the relationship.
- **DEA Management & Manufacturing Sdn Bhd | 2015–2018 (marked “last job” in CV):**  
  Contract drafting/review, overseas stakeholder management, regulatory compliance.

### Education
- **LL.M. in Business Law** — International Islamic University; 2006; distinction and Dean’s List as stated in CV.
- **LL.B. in Law** — Staffordshire University, Stoke-on-Trent, UK; 1996; honours; active Law Society member as stated in CV.

> **Verification note:** Confirm official employer names and the 2007–2011 job title before launch. Do not add photo, social links, testimonials, client logos, certificates, or project case studies unless supplied.

---

## 5. Information Architecture
- **Header:** `MUSZAINI MUSA` wordmark; Home, About, Experience, Skills, Education, Projects, Contact; CTA “Let’s Collaborate”.
- **Hero:** “Legal Insight. Thoughtful Design. Emerging AI Solutions.” Supporting copy should be factual. Describe AI/Agentic Engineering and vibe coding as ongoing learning, not established credentials.
- **About:** Concise summary connecting legal drafting, research, compliance, risk awareness, stakeholder coordination, and current digital interests.
- **Experience:** Editorial vertical timeline; highlight the RM1.7 million recovery achievement. Do not publish the unclear 2007–2011 employer entry until confirmed.
- **Skills:** Legal, Digital/Creative, and Learning/Emerging groups. Avoid misleading proficiency bars.
- **Education:** Credential cards or academic timeline.
- **Projects/Areas of Interest:** Show real owner-provided work only. Until then, use a clearly labelled “Areas of Interest” section.
- **Contact:** Form fields: name, email, phone number, description/message. Include validation, loading, success and error states, and a privacy note.
- **Footer:** Email, approved contact links, copyright.

---

## 6. Visual Design
- **Mood:** vintage editorial, understated luxury, timeless and professional.
- **Background:** `#11100E` or `#151515`.
- **Gold:** `#C6A15B` or `#B18B36`.
- **Surface:** `#201D18`.
- **Text:** warm ivory `#F3EBDD`; secondary `#B9B1A2`.
- **Typography:** elegant serif headings (Cormorant Garamond / Playfair Display) and readable sans-serif body (Inter / Source Sans 3), with fallbacks.
- Use thin gold rules, restrained borders, editorial spacing, small uppercase labels, and subtle texture only if it preserves readability/performance.
- Avoid clutter, excessive glow, too many animations, and low-contrast gold text.

### Accessibility / Responsive
- Mobile-first, no horizontal overflow.
- Semantic headings, connected labels, keyboard-accessible navigation and form, visible focus.
- Meaningful alt text; do not rely on colour alone for errors.
- Aim for WCAG AA contrast; respect reduced-motion settings.

---

## 7. Technical Architecture

### Frontend
- React.js + Vite + JavaScript.
- Single-page section navigation is acceptable; use React Router only if separate routes are needed.
- Reusable components: Header, Hero, SectionHeading, ExperienceTimeline, SkillGroup, EducationCard, ProjectCard, ContactForm, Footer.
- Use CSS variables and CSS Modules or well-organised plain CSS.
- Never put file-writing logic or secrets in browser code.

### Backend / CSV Persistence
- Node.js + Express API.
- `POST /api/contact` validates and sanitises inputs, applies rate limiting and spam checks, and appends a record to a private CSV such as `server/data/contact-submissions.csv`.
- Store CSV outside public/static frontend assets; never expose its contents or a download endpoint.
- Columns: `submitted_at_utc,name,email,phone,description`.
- Escape quotes, commas, and newlines correctly; mitigate spreadsheet formula injection when exporting/opening CSV.
- Store path in an environment variable, create directory/file safely, and exclude the file from Git.
- Show success only after storage succeeds.
- Ephemeral hosting filesystems may erase data on redeploy. Use persistent disk or a database in production while keeping the CSV requirement where supported.
- Use HTTPS, request-size limits, and avoid unnecessary logs of personal data.

### API Contract
- **Request JSON:** `{ "name": "...", "email": "...", "phone": "...", "description": "..." }`
- **Success:** HTTP 201 with a short confirmation.
- **Invalid input:** HTTP 400 with field-level errors.
- **Rate limit:** HTTP 429.
- **Storage/server error:** HTTP 500 with a generic user-facing message.
- Never return stored CSV contents to public visitors.

---

## 8. Privacy and Security
- Collect only the four requested fields plus a server-generated timestamp.
- Display a concise privacy notice; define retention and deletion practices.
- Restrict access to the server-side file and back it up securely.
- Validate on client and server, accept reasonable international phone formats, and limit request size.
- Never collect passwords, payment data, identity documents, or unrelated sensitive information.

---

## 9. Non-Functional Requirements
- Optimise images and avoid unnecessary dependencies.
- SEO title, meta description, Open Graph metadata, semantic content, favicon/wordmark.
- Clear loading, success, validation, network, and server-error states.
- Document setup, environment variables, commands, deployment, and storage location.
- Support current Chrome, Safari, Firefox, Edge, iOS, and Android browsers.

---

## 10. Suggested Repository Structure
```
muszaini-portfolio/
  client/
    src/
      components/
      sections/
      data/
      styles/
      App.jsx
      main.jsx
    public/
    package.json
  server/
    data/
      .gitkeep
    src/
      routes/
        contact.js
      validation/
      app.js
    package.json
    .env.example
  docs/
    PRD.md
  .gitignore
  README.md
```

---

## 11. Acceptance Criteria
- All published experience, education, skills, and achievements are supported by the CV or approved by the owner.
- Vintage black-and-gold styling is consistent across sections.
- Navigation, CTA buttons, and mobile menu work.
- Contact form requires name, email, phone, and description; errors are clear.
- Valid submission is saved to private CSV and success appears only after confirmed storage.
- Server-side validation, rate limiting, and spam protection are present.
- CSV is not publicly accessible and is excluded from Git.
- Site works on mobile/tablet/desktop and supports keyboard navigation.
- No fake testimonials, fabricated projects, invented clients, or unverified credentials.
- README covers setup, deployment, environment variables, and private storage.

---

## 12. Testing
- Check mobile/tablet/desktop layout.
- Test missing fields, malformed email, international phone, long message, commas/quotes/newlines, network/API errors, and successful submission.
- Verify CSV escaping, timestamp, and all fields.
- Confirm no public access to CSV and no real submission data committed to Git.
- Test keyboard focus, labels, contrast, reduced motion, broken-image fallback, and external links.

---

## 13. Delivery Phases
1. Confirm unclear CV details and approve bio/contact display.
2. Build design system and responsive React sections.
3. Implement contact API, validation, rate limiting, and CSV storage.
4. Add SEO, accessibility, error states, and documentation.
5. Test end-to-end and deploy with persistent private storage.

---

## 14. Out of Scope
- Admin dashboard to read enquiries.
- User accounts, payments, CMS, chatbot, or email marketing.
- Claims of formal AI engineering credentials or guaranteed outcomes.
- Fabricated projects, testimonials, endorsements, or client logos.

---

## 15. Vibe-Coding Master Prompt
Build a responsive personal portfolio website for Muszaini Binti Musa using React.js and Vite, with a vintage black-and-antique-gold editorial design. Follow docs/PRD.md. First inspect the repository and report what exists; do not overwrite working files without explaining the change.

Create reusable components and clean responsive CSS for navigation, hero, about, experience timeline, skills, education, projects/areas of interest, contact form, and footer. Use only CV facts in the PRD. Do not invent credentials, job titles, projects, clients, testimonials, or dates. The 2007–2011 employer/title is unclear and must remain unpublished until confirmed. Describe Agentic Engineering and vibe coding as ongoing learning.

Implement a separate Node.js/Express POST /api/contact endpoint. Collect name, email, phone, and description; validate server-side; add basic rate limiting and spam protection; append valid submissions to a private CSV outside the public frontend; add a server-generated UTC timestamp; escape CSV fields; never expose the file; and keep real submissions out of Git. Show success only after the server confirms the write. Document persistent storage needs for deployment.

Add accessible labels, keyboard focus, responsive mobile navigation, loading/success/error states, SEO metadata, .env.example, .gitignore, and a README. Run available checks and report what was tested and remaining limitations. Do not add a photo or fabricate projects; use real owner-supplied assets only.

---

## 16. Owner Decisions Before Launch
- Confirm employer/title for 2007–2011.
- Confirm whether to display the phone number publicly or rely on email/contact form.
- Supply portrait, project screenshots, links, or design samples if desired.
- Choose deployment provider with private persistent storage.
- Approve final bio, project descriptions, privacy notice, and enquiry-retention period.
