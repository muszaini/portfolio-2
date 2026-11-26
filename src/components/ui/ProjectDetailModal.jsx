import React from 'react';
import { X, Github, ExternalLink, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { ProjectVisual } from './ProjectVisual';

export function ProjectDetailModal({ project, onClose, onRequestWalkthrough }) {
  return (
    <Dialog
      isOpen={Boolean(project)}
      onClose={onClose}
      labelledBy="project-modal-title"
    >
      {project && (
        <>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#C6A15B]/20">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-serif text-lg text-[#C6A15B]">{project.number}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A7A29A]">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#C6A15B] border border-[#C6A15B]/35 bg-[#C6A15B]/8">
                  {project.status}
                </span>
              </div>
              <h2
                id="project-modal-title"
                className="font-serif text-3xl sm:text-4xl text-[#F4F0E8]"
              >
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-[#A7A29A] font-light">{project.tagline}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="p-2 text-[#A7A29A] hover:text-[#F4F0E8] border border-[#F4F0E8]/12 hover:border-[#C6A15B]/45 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Architectural Schematic Preview */}
          <div className="mt-6">
            <ProjectVisual projectId={project.id} title={project.title} />
          </div>

          {/* Case Study Body */}
          <div className="mt-7 space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#191919] border border-[#F4F0E8]/8 p-5">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2.5">
                  The Problem
                </h3>
                <p className="text-sm leading-relaxed text-[#F4F0E8]/88 font-light">
                  {project.problem}
                </p>
              </div>
              <div className="bg-[#191919] border border-[#F4F0E8]/8 p-5">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2.5">
                  Proposed Solution
                </h3>
                <p className="text-sm leading-relaxed text-[#F4F0E8]/88 font-light">
                  {project.solution}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-3">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 bg-[#191919] border border-[#F4F0E8]/8 p-3.5 text-sm text-[#F4F0E8]/88 font-light"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#101010] border border-[#C6A15B]/20 p-5">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">
                My Contribution
              </h3>
              <p className="text-sm leading-relaxed text-[#A7A29A] font-light">
                {project.contribution}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-3">
                Technologies Used
              </h3>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1.5 text-xs text-[#F4F0E8]/90 bg-[#191919] border border-[#F4F0E8]/12"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-[#F4F0E8]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl ? (
                <Button
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  View on GitHub
                </Button>
              ) : (
                <span className="text-xs text-[#A7A29A]">
                  GitHub repository available on request
                </span>
              )}

              {project.liveDemoUrl && (
                <Button
                  as="a"
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  Live Demo
                </Button>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onClose();
                if (onRequestWalkthrough) onRequestWalkthrough(project.title);
              }}
            >
              Request Project Walkthrough
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}

export default ProjectDetailModal;
