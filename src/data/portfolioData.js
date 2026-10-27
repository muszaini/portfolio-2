/**
 * Source-of-Truth Portfolio & CV Data for Muszaini Binti Musa
 *
 * IMPORTANT EDITORIAL NOTE (PRD Section 4, 5.4 & 15):
 * - All published content below is strictly traceable to the owner's CV.
 * - Details to confirm (INTERNAL NOTE ONLY — DO NOT PUBLISH UNTIL VERIFIED):
 *   The uploaded CV contains an entry rendered as "2 h Offshore, Surrey United Kingdom"
 *   with dates 2007–2011 and duties: contract drafting and review, overseas stakeholder
 *   management, regulatory compliance, and legal research. Because the exact employer
 *   name and job title were unclear in the OCR scan, this role is intentionally kept
 *   unpublished in internal development notes until confirmed by the owner.
 */

export const profileData = {
  name: 'Muszaini Binti Musa',
  wordmark: 'MUSZAINI MUSA',
  descriptor: 'Legal Professional • Digital Design & Emerging AI',
  headline: 'Legal Professional',
  email: 'muszainimusa224@gmail.com',
  phone: '0183933371',
  phoneFormatted: '018-393 3371',
  phoneHref: 'tel:+60183933371',
  location: 'Malaysia',
};

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const heroData = {
  eyebrow: 'Legal Foundation • Digital Craft • Ongoing AI Exploration',
  headline: 'Legal Insight. Thoughtful Design. Emerging AI Solutions.',
  lead: 'A legal professional experienced in contract drafting and review, regulatory compliance, legal research, risk assessment, and stakeholder management—now expanding into AI, machine learning, Agentic Engineering, vibe coding, website creation, and Canva design.',
  statusNote:
    'Currently exploring Agentic Engineering, AI-assisted workflows, and vibe coding as ongoing areas of study alongside digital design and legal-workflow collaboration.',
  primaryCta: {
    label: 'Let’s Collaborate',
    href: '#contact',
  },
  secondaryCta: {
    label: 'Explore My Background',
    href: '#experience',
  },
  highlights: [
    {
      label: 'Academic Credentials',
      value: 'LL.M. (Distinction) & LL.B. (Hons)',
      detail: 'International Islamic University (2006) & Staffordshire University, UK (1996)',
    },
    {
      label: 'Documented Legal Impact',
      value: 'RM1.7 Million Recovered',
      detail: 'Breach-of-contract recovery during tenure with KLCC Education Sponsorship Unit, Petronas',
    },
    {
      label: 'Current Direction',
      value: 'Design, Web & Ongoing AI Study',
      detail: 'Websites, Canva collateral (brochures, flyers, posters), vibe coding & Agentic Engineering',
    },
  ],
};

export const aboutData = {
  sectionIndex: 'I',
  eyebrow: 'Professional Narrative',
  title: 'Bridging Disciplined Legal Practice with Thoughtful Digital Execution',
  paragraphs: [
    'My professional foundation was built in legal practice and corporate compliance—drafting and reviewing commercial agreements, conducting legal research, evaluating contractual and operational risks, and coordinating across domestic and overseas stakeholders.',
    'Working within major telecommunications, energy-sponsorship, manufacturing, and independent business environments taught me the value of precision, clarity, and structured thinking. Every clause, compliance requirement, and communication piece serves a distinct purpose.',
    'Today, I bring that same care and structural rigour to creative and digital work: creating clear websites, designing brochures, flyers, and posters in Canva, and actively studying AI, machine learning concepts, Agentic Engineering, and vibe coding. Whether supporting a legal-workflow initiative or crafting visual and web materials for a growing business, my focus remains grounded in clarity, reliability, and practical collaboration.',
  ],
  coreThemes: [
    {
      title: 'Rigorous Review & Compliance',
      description:
        'Grounded in years of commercial contract drafting, supplier-agreement advisory, regulatory compliance, and structured risk assessment.',
    },
    {
      title: 'Clear Visual & Web Communication',
      description:
        'Translating complex information into approachable websites, brochures, flyers, and posters tailored for businesses and professional audiences.',
    },
    {
      title: 'Continuous Learning in AI & Vibe Coding',
      description:
        'Actively developing practical skills in AI and machine learning concepts, Agentic Engineering, and vibe coding to support modern workflows.',
    },
  ],
};

/**
 * Confirmed Work Experience Entries (from CV)
 *
 * NOTE (Details to confirm — internal only):
 * 2007–2011 entry rendered in CV OCR as "2 h Offshore, Surrey United Kingdom"
 * (duties: contract drafting and review, overseas stakeholder management,
 * regulatory compliance, and legal research) is omitted from public display
 * until the exact employer name and job title are verified by the owner.
 */
export const experienceData = [
  {
    id: 'dea-management',
    period: '2015 – 2018',
    durationNote: 'Most Recent Corporate Role',
    role: 'Contract, Compliance & Stakeholder Management',
    organisation: 'DEA Management & Manufacturing Sdn Bhd',
    location: 'Malaysia',
    context:
      'Corporate legal, compliance, and international stakeholder coordination within a management and manufacturing organisation.',
    responsibilities: [
      'Drafted and reviewed commercial contracts and operational legal documentation.',
      'Managed and coordinated relationships with overseas stakeholders across cross-border matters.',
      'Supported ongoing regulatory compliance and governance requirements.',
    ],
  },
  {
    id: 'post-office-services',
    period: '2012 – 2015',
    durationNote: 'Service Operations',
    role: 'Post Office Services Operations',
    organisation: 'Post Office Services',
    location: 'Malaysia',
    context:
      'Listed as a distinct operational commitment alongside independent business activities during this period.',
    responsibilities: [
      'Executed daily post-office service operations, customer service tasks, and procedural administration.',
      'Maintained accuracy and procedural compliance across day-to-day counter and service workflows.',
    ],
  },
  {
    id: 'entrepreneur-business',
    period: '2011 – 2015',
    durationNote: 'Independent Enterprise',
    role: 'Entrepreneur / Business',
    organisation: 'Independent Business Operations',
    location: 'Malaysia',
    context:
      'Self-directed commercial and business venture applying legal, administrative, and client-facing experience.',
    responsibilities: [
      'Directed day-to-day commercial operations, client coordination, and business administration.',
      'Applied contractual awareness and stakeholder communication to independent business management.',
    ],
  },
  {
    id: 'petronas-klcc',
    period: '2004 – 2007',
    durationNote: '3 Years',
    role: 'Legal Team',
    organisation: 'KLCC Education Sponsorship Unit, Petronas',
    location: 'Kuala Lumpur, Malaysia',
    context:
      'In-house legal team supporting procurement, joint ventures, supplier agreements, and sponsorship enforcement.',
    achievementBadge: 'Recovered RM1.7 Million in Breach-of-Contract Cases',
    responsibilities: [
      'Drafted and reviewed contracts for procurement initiatives and joint-venture arrangements.',
      'Conducted legal risk assessments and provided advisory support on supplier agreements.',
      'Recovered RM1.7 million from breach-of-contract cases through structured legal follow-through.',
    ],
  },
  {
    id: 'telekom-international',
    period: '2002 – 2004',
    durationNote: '2 Years',
    role: 'Legal Executive',
    organisation: 'Menara Rebung, Lembah Pantai / Telekom International',
    location: 'Kuala Lumpur, Malaysia',
    context:
      'Major telecommunications provider focused on connectivity solutions and services.',
    responsibilities: [
      'Drafted and reviewed commercial and regulatory documents across telecommunications operations.',
      'Coordinated closely with cross-functional teams to align legal review with operational goals.',
      'Supported regulatory compliance across connectivity solutions and service offerings.',
    ],
  },
];

export const skillsData = [
  {
    id: 'legal-foundation',
    category: 'Legal Capabilities',
    subtitle: 'Core professional competencies established through corporate and in-house legal roles.',
    badge: 'Established Foundation',
    skills: [
      {
        name: 'Contract Drafting & Review',
        detail: 'Commercial agreements, procurement contracts, supplier terms, and joint-venture documentation.',
      },
      {
        name: 'Regulatory Compliance',
        detail: 'Supporting adherence to statutory, telecommunications, and corporate regulatory frameworks.',
      },
      {
        name: 'Legal Research',
        detail: 'Structured analysis of legal obligations, precedents, and contractual enforcement pathways.',
      },
      {
        name: 'Risk Assessment',
        detail: 'Identifying contractual, supplier, and operational exposures before commitments are finalised.',
      },
      {
        name: 'Stakeholder Management',
        detail: 'Coordinating across cross-functional internal teams and overseas commercial stakeholders.',
      },
    ],
  },
  {
    id: 'digital-creative',
    category: 'Digital & Creative Design',
    subtitle: 'Visual communication and web creation for professionals, small businesses, and community initiatives.',
    badge: 'Creative Practice',
    skills: [
      {
        name: 'Website Creation',
        detail: 'Structuring and building clean, responsive websites with clear editorial hierarchy.',
      },
      {
        name: 'Canva Design',
        detail: 'Layout design, brand-consistent templates, and visual communications tailored for digital and print.',
      },
      {
        name: 'Brochures',
        detail: 'Multi-panel and informational brochures designed to explain services clearly.',
      },
      {
        name: 'Flyers',
        detail: 'Concise promotional and event flyers with strong typographic readability.',
      },
      {
        name: 'Posters',
        detail: 'Visual posters balanced for hierarchy, clarity, and audience engagement.',
      },
    ],
  },
  {
    id: 'learning-emerging',
    category: 'Learning & Emerging Technologies',
    subtitle: 'Ongoing self-directed study and practical experimentation with modern AI and software creation tools.',
    badge: 'Ongoing Learning',
    skills: [
      {
        name: 'AI & Machine Learning',
        detail: 'Exploring foundational AI/ML concepts and practical ways intelligent tools can assist knowledge work.',
        status: 'Ongoing Study',
      },
      {
        name: 'Agentic Engineering',
        detail: 'Learning how structured prompts, specifications, and agentic workflows can support business processes.',
        status: 'Ongoing Learning',
      },
      {
        name: 'Vibe Coding',
        detail: 'Building functional web interfaces and workflow prototypes through AI-assisted software development.',
        status: 'Ongoing Exploration',
      },
    ],
  },
];

export const educationData = [
  {
    id: 'llm-business-law',
    degree: 'Master of Laws (LL.M.) in Business Law',
    institution: 'International Islamic University',
    location: 'Malaysia',
    graduationYear: '2006',
    honours: ['Graduated with Distinction', 'Dean’s List Recognition'],
    description:
      'Postgraduate legal study specialising in commercial and business law, graduated with Distinction and recognized on the Dean’s List.',
  },
  {
    id: 'llb-law',
    degree: 'Bachelor of Laws (LL.B.) in Law',
    institution: 'Staffordshire University',
    location: 'Stoke-on-Trent, United Kingdom',
    graduationYear: '1996',
    honours: ['Graduated with Honours', 'Active Member of the Law Society'],
    description:
      'Undergraduate legal degree completed in the United Kingdom with Honours, alongside active participation in the University Law Society.',
  },
];

/**
 * Portfolio / Areas of Interest (PRD Section 5.7)
 * Rather than fabricating client case studies, Version 1.0 presents clearly labelled
 * Areas of Interest & Collaboration Focus using the reusable ProjectCard component.
 */
export const areasOfInterestData = [
  {
    id: 'legal-workflows',
    category: 'Legal Operations & Documentation',
    title: 'Legal Workflows & Commercial Document Structuring',
    role: 'Legal Drafting, Review & Process Clarity',
    status: 'Area of Collaboration',
    description:
      'Supporting legal professionals and businesses with structured document review, compliance checklists, contract organisation, and clearer stakeholder workflows.',
    tools: ['Contract Review', 'Compliance Structuring', 'Risk Assessment', 'Stakeholder Coordination'],
  },
  {
    id: 'website-creation',
    category: 'Web & Digital Presence',
    title: 'Responsive Editorial & Small-Business Websites',
    role: 'Website Creation & Vibe Coding',
    status: 'Area of Collaboration',
    description:
      'Designing and building approachable, well-structured portfolio, service, and informational websites that communicate credibility on desktop and mobile.',
    tools: ['Website Creation', 'React & Modern Web', 'Vibe Coding (Ongoing)', 'Editorial Layout'],
  },
  {
    id: 'canva-design-collateral',
    category: 'Visual Communications',
    title: 'Brochures, Flyers & Poster Design in Canva',
    role: 'Visual & Print-Ready Design',
    status: 'Area of Collaboration',
    description:
      'Creating polished brochures, promotional flyers, and event or informational posters for small businesses, educators, and community projects.',
    tools: ['Canva Design', 'Brochures', 'Flyers', 'Posters'],
  },
  {
    id: 'ai-assisted-workflows',
    category: 'Emerging Technology Study',
    title: 'Early-Stage AI & Agentic Workflow Exploration',
    role: 'Ongoing Learning & Practical Prototyping',
    status: 'Ongoing Exploration',
    description:
      'Exploring practical ways to combine structured specifications, Agentic Engineering, and AI tools to organize information and streamline everyday business tasks.',
    tools: ['AI & Machine Learning', 'Agentic Engineering (Ongoing)', 'Prompt & Spec Structuring'],
  },
];
