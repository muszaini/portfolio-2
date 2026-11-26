const env = import.meta.env || {};

const cleanUrl = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value.trim();
};

export const PROJECTS = [
  {
    id: 'lawflow-ai',
    number: '01',
    title: 'LawFlow AI',
    category: 'LegalTech Platform',
    tagline: 'Legal workflow and matter management platform for structured practice operations.',
    status: 'In Active Development',
    problem:
      'Small and mid-sized legal practices frequently juggle client records, matter timelines and document checklists across disconnected folders and emails — increasing administrative friction and oversight risk.',
    solution:
      'A centralized legal workflow web application that organizes user roles, client profiles, active matters and structured document workflows inside a unified operational interface.',
    keyFeatures: [
      'Role-based user management for legal teams',
      'Centralized client directory and intake records',
      'Structured matter lifecycle tracking and status visibility',
      'Document workflow organization tied directly to individual matters',
    ],
    contribution:
      'Designed the legal workflow domain model based on firsthand legal training, defined matter and documentation structures, and built the full-stack application architecture with React, FastAPI and PostgreSQL.',
    technologies: ['React', 'FastAPI', 'PostgreSQL'],
    githubUrl: cleanUrl(env.VITE_PROJECT_LAWFLOW_GITHUB),
    liveDemoUrl: cleanUrl(env.VITE_PROJECT_LAWFLOW_DEMO),
  },
  {
    id: 'restaurant-analytics',
    number: '02',
    title: 'Restaurant Analytics',
    category: 'AI Business Intelligence',
    tagline: 'AI-assisted restaurant business analytics turning operational data into plain-language answers.',
    status: 'Functional Prototype',
    problem:
      'Restaurant operators generate daily sales, menu and operational data, yet non-technical owners rarely have the time or SQL expertise to extract timely insights for pricing, staffing or inventory decisions.',
    solution:
      'An AI-assisted analytical web application enabling business owners to ask natural-language questions about performance metrics and receive structured analytical outputs backed by a clean API and relational store.',
    keyFeatures: [
      'Natural-language business question interface powered by LLM integration',
      'Structured analytical summaries and readable metric breakdowns',
      'Type-safe React and TypeScript frontend for responsive exploration',
      'FastAPI backend paired with lightweight SQLite persistence',
    ],
    contribution:
      'Shaped the business-owner query experience, built the typed React/TypeScript interface, developed FastAPI endpoints and integrated LLM-assisted analytical reasoning over structured restaurant datasets.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'LLM Integration'],
    githubUrl: cleanUrl(env.VITE_PROJECT_RESTAURANT_GITHUB),
    liveDemoUrl: cleanUrl(env.VITE_PROJECT_RESTAURANT_DEMO),
  },
  {
    id: 'skillswap',
    number: '03',
    title: 'SkillSwap',
    category: 'Community & Marketplace App',
    tagline: 'Peer-to-peer skill exchange platform connecting learners and practitioners.',
    status: 'Functional Prototype',
    problem:
      'Professionals and self-directed learners often possess valuable skills to teach while wanting to learn adjacent capabilities, but lack a structured, low-friction system to discover mutual matches and coordinate exchanges.',
    solution:
      'A peer-to-peer web platform that pairs structured member profiles with mutual skill matching and clear exchange request workflows backed by FastAPI and Supabase.',
    keyFeatures: [
      'Structured user profiles highlighting skills offered and skills sought',
      'Skill matching logic to surface complementary exchange partners',
      'End-to-end exchange request creation and status management',
      'Cloud-backed persistence using Supabase with RESTful FastAPI services',
    ],
    contribution:
      'Architected the exchange workflow, designed user profile and request lifecycles, and implemented the full-stack integration across React, FastAPI and Supabase.',
    technologies: ['React', 'FastAPI', 'Supabase'],
    githubUrl: cleanUrl(env.VITE_PROJECT_SKILLSWAP_GITHUB),
    liveDemoUrl: cleanUrl(env.VITE_PROJECT_SKILLSWAP_DEMO),
  },
  {
    id: 'hibah-wasiat-platform',
    number: '04',
    title: 'Hibah & Wasiat Digital Platform',
    category: 'Advisory & Enquiry Platform',
    tagline: 'Digital information and client enquiry platform for Islamic estate planning services.',
    status: 'In Active Development',
    problem:
      'Prospective clients seeking Hibah and Wasiat guidance often encounter fragmented explanations and informal messaging channels, making it difficult to understand options or submit structured consultation enquiries.',
    solution:
      'A clear, dignified digital advisory portal combining accessible educational content on Hibah and Wasiat with a structured enquiry capture and management workflow.',
    keyFeatures: [
      'Clear, structured digital knowledge guides for estate planning concepts',
      'Guided client enquiry capture tailored to advisory consultation needs',
      'Backend enquiry storage and administrative review workflow',
      'Clean, mobile-friendly reading experience designed for trust and clarity',
    ],
    contribution:
      'Translated real-world Hibah and Faraid consultancy experience into clear client-facing digital architecture, authoring the information flow and implementing the React, FastAPI and SQLite platform.',
    technologies: ['React', 'FastAPI', 'SQLite'],
    githubUrl: cleanUrl(env.VITE_PROJECT_HIBAH_GITHUB),
    liveDemoUrl: cleanUrl(env.VITE_PROJECT_HIBAH_DEMO),
  },
];
