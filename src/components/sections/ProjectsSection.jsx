import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Layers } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { PROFILE } from '../../data/profile';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { ProjectVisual } from '../ui/ProjectVisual';

const ProjectDetailModal = lazy(() => import('../ui/ProjectDetailModal'));

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Projects' },
  { id: 'LegalTech Platform', label: 'LegalTech' },
  { id: 'AI Business Intelligence', label: 'AI & Data' },
  { id: 'Community & Marketplace App', label: 'Platforms' },
  { id: 'Advisory & Enquiry Platform', label: 'Advisory' },
];

export function ProjectsSection({ onRequestWalkthrough }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-24 lg:py-32 bg-[#141414] border-t border-[#F4F0E8]/8"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <Reveal>
            <SectionHeader
              eyebrow="Featured Projects"
              title="Selected Case Studies"
              subtitle="Practical software prototypes and platforms built around real operational workflows — presented honestly with their exact scope, architecture and current development status."
            />
          </Reveal>

          {/* Subtle Editorial Category Filter */}
          <Reveal delay={0.08}>
            <div
              role="group"
              aria-label="Filter projects by domain"
              className="flex flex-wrap gap-2"
            >
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(option.id)}
                    className={`px-3.5 py-2 text-[11px] uppercase tracking-[0.16em] border transition-all duration-200 cursor-pointer rounded-[2px] ${
                      isActive
                        ? 'bg-[#C6A15B] text-[#101010] border-[#C6A15B] font-medium'
                        : 'bg-[#191919] text-[#A7A29A] border-[#F4F0E8]/10 hover:border-[#C6A15B]/45 hover:text-[#F4F0E8]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 space-y-8"
          >
            {visibleProjects.map((project, index) => {
              const effectiveGithubUrl = project.githubUrl || PROFILE.links.github;

              return (
                <Reveal key={project.id} delay={index * 0.06}>
                  <m.article
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="group bg-[#191919] border border-[#F4F0E8]/10 hover:border-[#C6A15B]/45 transition-colors duration-300 p-7 sm:p-9 lg:p-10"
                  >
                    {/* Top Meta Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F4F0E8]/8">
                      <div className="flex flex-wrap items-center gap-3.5">
                        <span className="font-serif text-2xl text-[#C6A15B]">
                          {project.number}
                        </span>
                        <span className="h-4 w-px bg-[#F4F0E8]/15" aria-hidden="true" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#A7A29A]">
                          {project.category}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#C6A15B] border border-[#C6A15B]/35 bg-[#101010]">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]"
                          aria-hidden="true"
                        />
                        {project.status}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-3xl sm:text-[2.1rem] text-[#F4F0E8] leading-tight">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-[0.98rem] text-[#A7A29A] font-light max-w-2xl">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Technology Pills */}
                      <ul
                        aria-label={`${project.title} technologies`}
                        className="flex flex-wrap gap-2"
                      >
                        {project.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="px-2.5 py-1 text-[11px] text-[#F4F0E8]/85 bg-[#101010] border border-[#F4F0E8]/10"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bespoke Architectural Workflow Schematic */}
                    <div className="mt-7">
                      <ProjectVisual projectId={project.id} title={project.title} />
                    </div>

                    {/* Structured Case-Study Grid */}
                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                      {/* Problem & Proposed Solution */}
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">
                            Problem
                          </h4>
                          <p className="text-sm leading-relaxed text-[#A7A29A] font-light">
                            {project.problem}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">
                            Proposed Solution
                          </h4>
                          <p className="text-sm leading-relaxed text-[#A7A29A] font-light">
                            {project.solution}
                          </p>
                        </div>

                        <div className="sm:col-span-2 pt-4 border-t border-[#F4F0E8]/8">
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">
                            My Contribution
                          </h4>
                          <p className="text-sm leading-relaxed text-[#F4F0E8]/85 font-light">
                            {project.contribution}
                          </p>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="lg:col-span-5 bg-[#121212] border border-[#F4F0E8]/8 p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3.5">
                            <Layers className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
                            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B]">
                              Key Features
                            </h4>
                          </div>
                          <ul className="space-y-2.5">
                            {project.keyFeatures.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2.5 text-sm text-[#F4F0E8]/85 font-light"
                              >
                                <span
                                  className="w-1.5 h-1.5 bg-[#C6A15B] shrink-0 mt-2"
                                  aria-hidden="true"
                                />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Links */}
                    <div className="mt-8 pt-6 border-t border-[#F4F0E8]/8 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.16em]">
                        {effectiveGithubUrl ? (
                          <a
                            href={effectiveGithubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#F4F0E8] hover:text-[#C6A15B] transition-colors"
                          >
                            <Github className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                            {project.githubUrl ? 'GitHub Repository' : 'GitHub Profile'}
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              onRequestWalkthrough && onRequestWalkthrough(project.title)
                            }
                            className="inline-flex items-center gap-2 text-[#A7A29A] hover:text-[#C6A15B] transition-colors cursor-pointer"
                          >
                            <Github className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                            Code Walkthrough on Request
                          </button>
                        )}

                        {project.liveDemoUrl ? (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#C6A15B] hover:text-[#F4F0E8] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            Live Demo
                          </a>
                        ) : (
                          <span className="text-[11px] tracking-[0.14em] text-[#A7A29A]/75">
                            Live Demo: Local Build / Walkthrough Available
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C6A15B] hover:text-[#F4F0E8] transition-colors cursor-pointer"
                      >
                        Inspect Case Study
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </m.article>
                </Reveal>
              );
            })}
          </m.div>
        </AnimatePresence>
      </div>

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onRequestWalkthrough={onRequestWalkthrough}
          />
        </Suspense>
      )}
    </section>
  );
}
