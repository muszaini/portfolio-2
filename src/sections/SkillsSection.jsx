import React from 'react';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { SkillGroup } from '../components/SkillGroup.jsx';
import { skillsData } from '../data/portfolioData.js';

export function SkillsSection() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        <SectionHeading
          id="skills-heading"
          index="III"
          eyebrow="Capabilities & Study"
          title="Legal Foundation, Creative Design & Ongoing AI Learning"
          subtitle="Core legal competencies paired with practical web and Canva design skills, alongside ongoing exploration of AI, machine learning, Agentic Engineering, and vibe coding."
        />

        <div className="skills-grid">
          {skillsData.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
