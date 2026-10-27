import React from 'react';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { EducationCard } from '../components/EducationCard.jsx';
import { educationData } from '../data/portfolioData.js';

export function EducationSection() {
  return (
    <section id="education" className="section section--alt" aria-labelledby="education-heading">
      <div className="container">
        <SectionHeading
          id="education-heading"
          index="IV"
          eyebrow="Academic Credentials"
          title="Legal Education & Academic Distinctions"
          subtitle="Postgraduate and undergraduate legal degrees completed in Malaysia and the United Kingdom."
        />

        <div className="education-grid">
          {educationData.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
