import React from 'react';
import { Award, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { workExperience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section-wrapper">
      <div className="container">
        <SectionHeader
          eyebrow="Career Chronology"
          title="Verified Professional Experience"
          lead="A record of corporate legal governance, contract dispute resolution, and commercial operations."
        />

        <div className="timeline-container">
          <div className="timeline-spine"></div>

          {workExperience.map((job) => (
            <div key={job.id} className="timeline-entry">
              <div className="timeline-node" aria-hidden="true"></div>

              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <h3 className="timeline-role">{job.role}</h3>
                    <div className="timeline-company">{job.company}</div>
                  </div>
                  <div className="timeline-period">
                    <span>{job.period}</span>
                    {job.duration && <span> &middot; {job.duration}</span>}
                  </div>
                </div>

                {job.highlight && (
                  <div className="timeline-highlight-badge">
                    <Award size={14} />
                    <span>Key Factual Milestone: {job.highlight}</span>
                  </div>
                )}

                <ul className="timeline-responsibilities">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="timeline-responsibility-item">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
