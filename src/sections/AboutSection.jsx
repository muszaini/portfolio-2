import React from 'react';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { aboutData } from '../data/portfolioData.js';

export function AboutSection() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <SectionHeading
          id="about-heading"
          index={aboutData.sectionIndex}
          eyebrow={aboutData.eyebrow}
          title={aboutData.title}
        />

        <div className="about-grid">
          <div className="about-prose">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="about-pillars" role="list" aria-label="Core professional pillars">
            {aboutData.coreThemes.map((pillar) => (
              <article key={pillar.title} className="about-pillar" role="listitem">
                <h3 className="about-pillar__title">{pillar.title}</h3>
                <p className="about-pillar__desc">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
