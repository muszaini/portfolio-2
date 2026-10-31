/**
 * Source-of-truth portfolio content for Muszaini Binti Musa.
 * Strictly adheres to verified CV data and PRD specifications.
 * No fabricated credentials, client logos, or false claims.
 */

export const personalInfo = {
  name: "Muszaini Binti Musa",
  preferredName: "Muszaini Musa",
  cvHeadline: "Legal Professional",
  displayHeadline: "Legal Professional · Digital & AI Explorer",
  email: "muszainimusa224@gmail.com",
  phone: "0183933371",
  location: "Kuala Lumpur, Malaysia",
  hero: {
    badge: "Legal Precision · Modern Digital Craft",
    headline: "Legal Insight. Thoughtful Design. Emerging AI Solutions.",
    subheadline:
      "A seasoned legal professional with extensive experience in commercial contracts, regulatory compliance, and corporate risk mitigation—now pairing established legal rigour with active learning in AI, Agentic Engineering, and digital web creation.",
    primaryCta: "Let's Collaborate",
    secondaryCta: "Explore Career & Background"
  },
  about: {
    summaryParagraphs: [
      "With a career built upon meticulous legal analysis, contract drafting, and regulatory governance, I have spent years safeguarding organizational interests across telecommunications, energy sponsorship, and manufacturing sectors. My legal training instills a rare discipline: looking closely at fine print, anticipating structural risk, and coordinating effectively with diverse stakeholders.",
      "Today, I actively bridge this foundational legal acumen with modern digital technologies. I am immersed in hands-on learning around Artificial Intelligence, machine learning principles, Agentic Engineering, and vibe coding—harnessing digital tools and visual design to create clear, high-impact business solutions."
    ],
    coreValues: [
      {
        title: "Analytical Rigour",
        description: "Decades of dissecting agreements and statutory requirements provide sharp, detail-oriented problem-solving."
      },
      {
        title: "Pragmatic Risk Awareness",
        description: "Balancing commercial objectives against legal liability and operational feasibility."
      },
      {
        title: "Continuous Learning",
        description: "Actively acquiring competencies in agentic AI frameworks, modern web development, and digital media."
      }
    ]
  }
};

export const workExperience = [
  {
    id: "dea-management",
    role: "Legal Professional / Contract & Regulatory Executive",
    company: "DEA Management & Manufacturing Sdn Bhd",
    period: "2015 – 2018",
    note: "Final corporate role recorded in CV",
    responsibilities: [
      "Structured, drafted, and negotiated commercial supply and manufacturing contracts.",
      "Facilitated overseas stakeholder management, ensuring seamless cross-border communication and contract execution.",
      "Monitored and enforced compliance with industrial, trade, and corporate statutory guidelines."
    ]
  },
  {
    id: "post-office-services",
    role: "Post Office Services Operator & Management",
    company: "Post Office Services",
    period: "2012 – 2015",
    responsibilities: [
      "Oversaw daily postal branch operations, retail agency services, and remittance compliance.",
      "Managed counter customer inquiries, courier dispatch operations, and financial reconciliations.",
      "Ensured strict adherence to national postal operational standards and security protocols."
    ]
  },
  {
    id: "entrepreneur-business",
    role: "Entrepreneur / Commercial Operations",
    company: "Independent Business Venture",
    period: "2011 – 2015",
    responsibilities: [
      "Led strategic direction, cash flow planning, and service delivery for private commercial enterprise.",
      "Managed business-to-consumer relationships, vendor agreements, and day-to-day administrative logistics."
    ]
  },
  {
    id: "petronas-sponsorship",
    role: "Legal Team Member",
    company: "Petronas — KLCC Education Sponsorship Unit",
    period: "2004 – 2007",
    duration: "3 years",
    highlight: "Recovered RM1.7 Million",
    responsibilities: [
      "Formulated and reviewed complex procurement contracts, joint-venture frameworks, and institutional sponsorship agreements.",
      "Conducted rigorous risk assessments and advised executive units on supplier agreement enforcement.",
      "Successfully recovered RM1.7 million from breach-of-contract cases through methodical legal analysis and dispute resolution."
    ]
  },
  {
    id: "telekom-international",
    role: "Legal Executive",
    company: "Telekom International / Menara Rebung, Lembah Pantai",
    period: "2002 – 2004",
    duration: "2 years",
    responsibilities: [
      "Drafted and reviewed key commercial agreements and regulatory filings for international telecommunication connectivity solutions.",
      "Liaised across cross-functional engineering, product, and financial teams to align legal safeguards with network rollouts.",
      "Supported organizational adherence to Malaysian telecommunication regulatory frameworks."
    ]
  }
];

/**
 * CV verification entry (2007–2011 Surrey UK / 2h Offshore)
 * Maintained in internal dataset for record keeping; excluded from public display per PRD.
 */
export const unconfirmedExperienceNote = {
  rawEntry: "2 h Offshore, Surrey United Kingdom (2007–2011)",
  status: "Details to confirm by owner prior to publication"
};

export const educationList = [
  {
    degree: "LL.M. in Business Law",
    institution: "International Islamic University Malaysia (IIUM)",
    year: "Graduated 2006",
    accolades: [
      "Graduated with Distinction",
      "Dean's List Honouree"
    ],
    description: "Advanced postgraduate focus on commercial jurisprudence, corporate governance, cross-border business law, and statutory compliance frameworks."
  },
  {
    degree: "LL.B. in Law (Honours)",
    institution: "Staffordshire University, Stoke-on-Trent, United Kingdom",
    year: "Graduated 1996",
    accolades: [
      "Conferred with Honours",
      "Active Member of the Law Society"
    ],
    description: "Rigorous common law grounding covering contracts, torts, equity, commercial law, and formal legal drafting."
  }
];

export const skillCategories = [
  {
    category: "Legal & Governance",
    badge: "Core Discipline",
    description: "Over a decade of institutional experience protecting organizations through rigorous legal administration.",
    skills: [
      "Contract Drafting & Review",
      "Regulatory Compliance",
      "Legal Research & Analysis",
      "Corporate Risk Assessment",
      "Stakeholder Management",
      "Dispute Resolution & Breach Recovery",
      "Joint Venture Agreements",
      "Commercial Procurement"
    ]
  },
  {
    category: "Creative & Digital Production",
    badge: "Creative Craft",
    description: "Hands-on execution producing clean marketing materials, editorial layouts, and responsive websites.",
    skills: [
      "Canva Digital Design",
      "Website Creation & Layouts",
      "Corporate Brochures",
      "Promotional Flyers",
      "Event & Commercial Posters",
      "Brand Collateral Design",
      "Visual Presentation Design"
    ]
  },
  {
    category: "Emerging AI & Technical Exploration",
    badge: "Active Learning",
    description: "Ongoing self-directed study and practical experimentation in contemporary AI workflows.",
    isLearning: true,
    skills: [
      "AI & Machine Learning Concepts",
      "Agentic Engineering (Ongoing)",
      "Vibe Coding Practices",
      "AI Workflow Integration",
      "Prompt Strategy & Iteration",
      "Modern Web Architecture"
    ]
  }
];

export const areasOfInterest = [
  {
    id: "legal-workflows",
    title: "Legal Workflow Optimization",
    domain: "Legal Operations",
    description:
      "Assisting legal departments and solo practitioners in structuring clear contract templates, standardizing review processes, and minimizing compliance oversights.",
    capabilities: [
      "Standard contract review checklists",
      "Procurement agreement templates",
      "Risk screening guidelines"
    ]
  },
  {
    id: "web-creation",
    title: "Bespoke Web Creation",
    domain: "Web & Digital Presence",
    description:
      "Crafting clean, responsive websites tailored for professionals, consultants, and small enterprises seeking a refined digital home without bloat.",
    capabilities: [
      "Single-page portfolios & landing pages",
      "Mobile-first responsive architecture",
      "Accessible, fast-loading design"
    ]
  },
  {
    id: "canva-design",
    title: "Brand & Print Collateral",
    domain: "Visual Design",
    description:
      "Designing polished, brand-consistent marketing collateral using Canva for organizations that need quick, high-aesthetic outputs.",
    capabilities: [
      "Corporate brochures & profiles",
      "Event flyers & promotional posters",
      "Digital announcement graphics"
    ]
  },
  {
    id: "ai-exploration",
    title: "Early-Stage AI Workflow Support",
    domain: "Emerging Technology",
    description:
      "Partnering with teams curious about adopting AI tools, automated prompt patterns, or agentic frameworks into everyday administrative and research tasks.",
    capabilities: [
      "Practical AI tool exploration",
      "Workflow task automation ideas",
      "Document summarization processes"
    ]
  }
];
