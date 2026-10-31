import React from 'react';
import { Scale, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const { about } = personalInfo;

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        <SectionHeader
          eyebrow="Background &amp; Perspective"
          title="Bridging Legal Discipline with Digital Innovation"
          lead="Where contract precision, compliance safeguards, and modern AI-assisted tools intersect."
        />

        <div className="about-grid">
          {/* Narrative Bio */}
          <div className="about-bio-card">
            {about.summaryParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
            <div className="editorial-divider" style={{ margin: '24px 0 16px 0' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="gold-badge gold-badge-sm">Current Focus</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Exploring Agentic AI workflows &middot; Clean web creation &middot; Visual communication
              </span>
            </div>
          </div>

          {/* Pillars */}
          <div className="about-pillars">
            {about.coreValues.map((value, idx) => (
              <div key={idx} className="pillar-card">
                <div className="pillar-header">
                  {idx === 0 && <Scale className="pillar-icon" size={20} />}
                  {idx === 1 && <ShieldAlert className="pillar-icon" size={20} />}
                  {idx === 2 && <Cpu className="pillar-icon" size={20} />}
                  <h3 className="pillar-title">{value.title}</h3>
                </div>
                <p style={{ fontSize: '0.925rem' }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
