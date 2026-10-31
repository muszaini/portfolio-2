import React from 'react';
import { ArrowUpRight, CheckCircle2, FileText, Globe, Layout, Bot } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { areasOfInterest } from '../data/portfolioData';

export default function AreasOfInterest() {
  const getIcon = (id) => {
    switch (id) {
      case 'legal-workflows':
        return <FileText size={20} color="var(--color-gold-base)" />;
      case 'web-creation':
        return <Globe size={20} color="var(--color-gold-base)" />;
      case 'canva-design':
        return <Layout size={20} color="var(--color-gold-base)" />;
      case 'ai-exploration':
        return <Bot size={20} color="var(--color-gold-base)" />;
      default:
        return <FileText size={20} color="var(--color-gold-base)" />;
    }
  };

  return (
    <section id="areas-of-interest" className="section-wrapper">
      <div className="container">
        <SectionHeader
          eyebrow="Areas of Collaboration"
          title="Practical Domains &amp; Current Interests"
          lead="Where my legal background, creative design skills, and ongoing AI learning can support your organization."
        />

        <div className="areas-grid">
          {areasOfInterest.map((area) => (
            <div key={area.id} className="area-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="area-domain">{area.domain}</span>
                {getIcon(area.id)}
              </div>

              <h3 className="area-title">{area.title}</h3>
              <p className="area-desc">{area.description}</p>

              <ul className="area-capabilities-list">
                {area.capabilities.map((cap, cIdx) => (
                  <li key={cIdx} className="area-capability-item">
                    <span className="area-capability-bullet"></span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
            Note: Client case studies, design previews, and project demonstrations will be published as verified samples become available.
          </p>
        </div>
      </div>
    </section>
  );
}
