import React from 'react';
import { Scale, Palette, Sparkles, Check } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="section-wrapper">
      <div className="container">
        <SectionHeader
          eyebrow="Competencies &amp; Focus"
          title="Skills, Tools &amp; Emerging Capabilities"
          lead="Distinguishing established legal specializations from active, ongoing explorations in AI and digital craft."
        />

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="skill-category-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className={`gold-badge gold-badge-sm ${cat.isLearning ? 'badge-pulsing' : ''}`}>
                    {cat.badge}
                  </span>
                  {idx === 0 && <Scale size={18} color="var(--color-gold-base)" />}
                  {idx === 1 && <Palette size={18} color="var(--color-gold-base)" />}
                  {idx === 2 && <Sparkles size={18} color="var(--color-gold-base)" />}
                </div>
                <h3 className="skill-category-title">{cat.category}</h3>
                <p className="skill-category-desc">{cat.description}</p>
              </div>

              <div className="skills-pill-group">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
