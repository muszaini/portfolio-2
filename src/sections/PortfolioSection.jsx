import React from 'react';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { areasOfInterestData } from '../data/portfolioData.js';

export function PortfolioSection() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          index="V"
          eyebrow="Projects • Areas of Interest"
          title="Areas of Interest & Collaboration Focus"
          subtitle="Until owner-verified client case studies are published, this section highlights current areas available for legal-workflow collaboration, website creation, Canva design, and ongoing AI workflow exploration."
        />

        <div className="projects-grid">
          {areasOfInterestData.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
