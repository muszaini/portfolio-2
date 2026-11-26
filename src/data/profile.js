const env = import.meta.env || {};

const cleanEnvUrl = (value) => {
  if (!value || typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes('your-username') || trimmed.includes('your-profile')) {
    return '';
  }
  return trimmed;
};

export const PROFILE = {
  name: 'Muszaini Musa',
  fullName: 'Muszaini Binti Musa',
  monogram: 'MM',
  location: 'Kuala Lumpur, Malaysia',
  eyebrow: 'Independent Digital Solutions Practice',
  headline: 'Business Thinking. Technology Building. Intelligent Solutions.',
  supportingStatement:
    'I combine a foundation in law, business law and company secretarial practice with emerging expertise in software development, AI and automation to build practical digital solutions for businesses and professional services.',
  positioningStatement:
    'I understand business problems and build practical digital solutions using technology, AI and automation.',
  roleLabels: [
    'Legal Professional',
    'Digital Solutions Builder',
    'AI & Automation Enthusiast',
  ],
  highlights: [
    { value: 'LL.M.', label: 'Business Law (Distinction)' },
    { value: 'RM1.7M', label: 'Verified Contract Recovery' },
    { value: 'CICA', label: 'Company Secretary' },
    { value: 'AI & Web', label: 'Digital Solutions Builder' },
  ],
  links: {
    github: cleanEnvUrl(env.VITE_GITHUB_URL) || 'https://github.com/muszaini',
    linkedin: cleanEnvUrl(env.VITE_LINKEDIN_URL),
    email: typeof env.VITE_CONTACT_EMAIL === 'string' ? env.VITE_CONTACT_EMAIL.trim() : '',
    cv: cleanEnvUrl(env.VITE_CV_URL),
  },
  credentials: [
    {
      title: 'Master of Laws (LL.M), Business Law',
      institution: 'International Islamic University Malaysia (IIUM)',
      year: '2006',
      category: 'Commercial & Corporate Law',
      accolades: ['Graduated with Distinction', "Dean's List Honouree"],
      detail:
        'Postgraduate focus on commercial jurisprudence, corporate governance, cross-border business law and statutory compliance frameworks.',
    },
    {
      title: 'Bachelor of Laws (LL.B Hons)',
      institution: 'Staffordshire University, Stoke-on-Trent, United Kingdom',
      year: '1996',
      category: 'Legal Foundation',
      accolades: ['Conferred with Honours', 'Active Member of the Law Society'],
      detail:
        'Common law foundation in contracts, equity, commercial law, statutory interpretation and structured legal drafting.',
    },
    {
      title: 'CICA, Company Secretary',
      institution: 'Corporate Secretarial Practice',
      year: 'Governance',
      category: 'Corporate Governance',
      accolades: ['Statutory Compliance & Board Records'],
      detail:
        'Trained in corporate compliance, statutory record-keeping, company secretarial filings and procedural accountability.',
    },
    {
      title: 'Hibah and Faraid Consultancy',
      institution: 'Islamic Estate Planning Advisory',
      year: 'Advisory',
      category: 'Advisory & Client Workflows',
      accolades: ['Structured Estate Documentation'],
      detail:
        'Practical advisory experience guiding clients through sensitive estate planning documentation and consultation workflows.',
    },
  ],
  /**
   * Verified career chronology from owner's CV.
   * Note: Unconfirmed 2007-2011 UK offshore entry remains intentionally excluded
   * from public display pending explicit owner confirmation.
   */
  experience: [
    {
      id: 'dea-management',
      role: 'Legal Professional / Contract & Regulatory Executive',
      company: 'DEA Management & Manufacturing Sdn Bhd',
      period: '2015 – 2018',
      responsibilities: [
        'Structured, drafted and negotiated commercial supply and manufacturing contracts.',
        'Coordinated overseas stakeholder management to ensure clear cross-border contract execution.',
        'Monitored and enforced compliance with industrial, trade and corporate statutory guidelines.',
      ],
    },
    {
      id: 'post-office-services',
      role: 'Post Office Services Operator & Management',
      company: 'Post Office Services',
      period: '2012 – 2015',
      responsibilities: [
        'Oversaw daily postal branch operations, retail agency services and remittance compliance.',
        'Managed counter customer enquiries, courier dispatch workflows and financial reconciliations.',
        'Maintained strict adherence to national postal operational standards and security protocols.',
      ],
    },
    {
      id: 'independent-venture',
      role: 'Entrepreneur / Commercial Operations',
      company: 'Independent Business Venture',
      period: '2011 – 2015',
      responsibilities: [
        'Led commercial direction, cash-flow planning and service delivery for an independent enterprise.',
        'Managed customer relationships, vendor agreements and day-to-day operational logistics.',
      ],
    },
    {
      id: 'petronas-sponsorship',
      role: 'Legal Team Member',
      company: 'Petronas — KLCC Education Sponsorship Unit',
      period: '2004 – 2007',
      duration: '3 years',
      highlight: 'Recovered RM1.7 Million from breach-of-contract cases',
      responsibilities: [
        'Formulated and reviewed procurement contracts, joint-venture frameworks and institutional sponsorship agreements.',
        'Conducted structured risk assessments and advised executive teams on supplier agreement enforcement.',
        'Successfully recovered RM1.7 million from breach-of-contract cases through disciplined legal analysis and dispute resolution.',
      ],
    },
    {
      id: 'telekom-international',
      role: 'Legal Executive',
      company: 'Telekom International / Menara Rebung, Lembah Pantai',
      period: '2002 – 2004',
      duration: '2 years',
      responsibilities: [
        'Drafted and reviewed commercial agreements and regulatory filings for international telecommunication connectivity.',
        'Liaised across engineering, product and finance teams to align legal safeguards with operational rollouts.',
        'Supported organisational adherence to Malaysian telecommunication regulatory frameworks.',
      ],
    },
  ],
  techExplorationAreas: [
    'Artificial Intelligence',
    'Agentic Engineering',
    'Vibe Coding',
    'Web Application Development',
    'Business Workflow Automation',
    'Patent & Trademark Workflows (IP Tech)',
  ],
};

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Approach', href: '#approach' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
