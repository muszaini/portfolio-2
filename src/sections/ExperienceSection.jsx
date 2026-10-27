import React from 'react';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ExperienceTimeline } from '../components/ExperienceTimeline.jsx';
import { experienceData } from '../data/portfolioData.js';

export function ExperienceSection() {
  return (
    <section id="experience" className="section section--alt" aria-labelledby="experience-heading">
      <div className="container">
        <SectionHeading
          id="experience-heading"
          index="II"
          eyebrow="Career Chronicle"
          title="Confirmed Legal & Professional Experience"
          subtitle="A documented record of corporate legal roles, contract drafting and review, regulatory compliance, and independent enterprise."
        />

        <ExperienceTimeline items={experienceData} />
      </div>
    </section>
  );
}

export default ExperienceSection;
