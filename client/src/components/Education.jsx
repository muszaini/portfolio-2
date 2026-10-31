import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { educationList } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section-wrapper">
      <div className="container">
        <SectionHeader
          eyebrow="Academic Foundation"
          title="Education &amp; Qualifications"
          lead="Formal legal qualifications earned across Malaysia and the United Kingdom."
        />

        <div className="education-grid">
          {educationList.map((item, idx) => (
            <div key={idx} className="education-card">
              <div className="education-header">
                <div>
                  <h3 className="education-degree">{item.degree}</h3>
                  <div className="education-institution">{item.institution}</div>
                </div>
                <span className="education-year">{item.year}</span>
              </div>

              <div className="accolades-list">
                {item.accolades.map((acc, aIdx) => (
                  <span key={aIdx} className="accolade-badge">
                    <Award size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                    {acc}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '0.925rem', marginTop: '12px' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
