import React, { useEffect } from 'react';
import { X, Printer, Mail } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { PROJECTS } from '../../data/projects';
import { SKILL_GROUPS } from '../../data/skills';
import { Button } from './Button';
import { Dialog } from './Dialog';

/**
 * Executive Profile / Printable CV Sheet shown when a static PDF CV URL
 * has not yet been configured in VITE_CV_URL. Strictly factual — contains
 * only verified CV and portfolio data and prints cleanly via @media print CSS.
 */
export function CvSummaryModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add('printing-cv-active');
    return () => {
      document.body.classList.remove('printing-cv-active');
    };
  }, [isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="cv-modal-title"
      backdropClassName="cv-print-backdrop"
      panelClassName="cv-print-sheet max-h-[88vh]"
    >
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#C6A15B]/20 cv-print-border">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] cv-print-accent mb-2">
            Curriculum Vitae — Executive Summary
          </p>
          <h2
            id="cv-modal-title"
            className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] cv-print-heading"
          >
            {PROFILE.fullName}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#A7A29A] cv-print-muted">
            {PROFILE.roleLabels.join('  •  ')}  •  {PROFILE.location}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close CV summary"
          className="no-print p-2 text-[#A7A29A] hover:text-[#F4F0E8] border border-[#F4F0E8]/12 hover:border-[#C6A15B]/45 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-6 space-y-8 text-sm leading-relaxed">
        <section>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] cv-print-accent mb-2">
            Professional Positioning
          </h3>
          <p className="text-[#F4F0E8]/90 cv-print-body font-light">
            {PROFILE.supportingStatement}
          </p>
        </section>

        <section>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] cv-print-accent mb-3">
            Verified Experience
          </h3>
          <ul className="space-y-3">
            {PROFILE.experience.map((job) => (
              <li
                key={job.id}
                className="bg-[#191919] border border-[#F4F0E8]/8 p-4 cv-print-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-serif text-lg text-[#F4F0E8] cv-print-heading">
                    {job.role}
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#C6A15B] cv-print-accent">
                    {job.period}
                  </span>
                </div>
                <p className="text-xs text-[#A7A29A] cv-print-muted mt-0.5">{job.company}</p>
                {job.highlight && (
                  <p className="text-xs text-[#C6A15B] cv-print-accent mt-1.5 font-medium">
                    Key Milestone: {job.highlight}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] cv-print-accent mb-3">
            Education &amp; Professional Foundation
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROFILE.credentials.map((item) => (
              <li
                key={item.title}
                className="bg-[#191919] border border-[#F4F0E8]/8 p-3.5 cv-print-card"
              >
                <p className="text-[#F4F0E8] cv-print-heading font-medium">{item.title}</p>
                <p className="text-xs text-[#A7A29A] cv-print-muted mt-1">
                  {item.institution} ({item.year})
                </p>
                {item.accolades && (
                  <p className="text-[11px] text-[#C6A15B] cv-print-accent mt-1">
                    {item.accolades.join(' · ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] cv-print-accent mb-3">
            Selected Digital &amp; AI Projects
          </h3>
          <ul className="space-y-3">
            {PROJECTS.map((project) => (
              <li
                key={project.id}
                className="bg-[#191919] border border-[#F4F0E8]/8 p-4 cv-print-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-serif text-lg text-[#F4F0E8] cv-print-heading">
                    {project.title}
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#C6A15B] cv-print-accent">
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-[#A7A29A] cv-print-muted mt-1">{project.tagline}</p>
                <p className="text-[11px] text-[#A7A29A]/85 cv-print-body mt-2">
                  Stack: {project.technologies.join(', ')}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] cv-print-accent mb-3">
            Capabilities &amp; Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="bg-[#191919] border border-[#F4F0E8]/8 p-3.5 cv-print-card"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[#C6A15B] cv-print-accent">
                  {group.category}
                </p>
                <p className="text-xs text-[#F4F0E8]/85 cv-print-body mt-1.5">
                  {group.items.map((item) => item.name).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="no-print mt-8 pt-6 border-t border-[#F4F0E8]/10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-[#A7A29A]">
          Prints cleanly as a white-background executive CV PDF, or request the full CV below.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            Print / Save PDF
          </Button>
          <Button
            as="a"
            href="#contact"
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            Request Full CV
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default CvSummaryModal;
