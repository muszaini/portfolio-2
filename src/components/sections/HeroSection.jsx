import React from 'react';
import { m } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, ChevronDown } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { Button } from '../ui/Button';

const EASE_EDITORIAL = [0.22, 1, 0.36, 1];

export function HeroSection({ onOpenCvModal, onEnquireClick }) {
  const hasCvFile = Boolean(PROFILE.links.cv);

  return (
    <section
      id="top"
      className="relative min-h-[94vh] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-20 bg-[#101010] overflow-hidden"
    >
      {/* Subtle architectural hairline frame accents — animated drawing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 h-px bg-[#F4F0E8]/6"
      />
      <m.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: EASE_EDITORIAL }}
        style={{ originY: 0 }}
        className="pointer-events-none hidden lg:block absolute right-[max(2rem,calc(50%-36rem))] top-20 bottom-0 w-px bg-[#C6A15B]/16"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          {/* Primary Editorial Column with Staggered Sequence */}
          <div className="lg:col-span-9">
            {/* Eyebrow / Name */}
            <div className="flex items-center gap-3.5 mb-7">
              <m.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                style={{ originX: 0 }}
                className="h-px w-10 bg-[#C6A15B]"
                aria-hidden="true"
              />
              <m.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_EDITORIAL }}
                className="text-xs sm:text-[13px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium"
              >
                {PROFILE.name}
              </m.p>
            </div>

            {/* Main Editorial Headline — Line-by-Line Reveal */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.35rem] font-medium leading-[1.06] tracking-[-0.015em] text-[#F4F0E8]">
              <span className="block overflow-hidden pb-1">
                <m.span
                  className="block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.14, ease: EASE_EDITORIAL }}
                >
                  Business Thinking.
                </m.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <m.span
                  className="block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: EASE_EDITORIAL }}
                >
                  Technology Building.
                </m.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <m.span
                  className="block italic text-[#C6A15B] font-normal"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.34, ease: EASE_EDITORIAL }}
                >
                  Intelligent Solutions.
                </m.span>
              </span>
            </h1>

            {/* Supporting Statement */}
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44, ease: EASE_EDITORIAL }}
              className="mt-7 max-w-2xl text-base sm:text-lg leading-[1.75] text-[#A7A29A] font-light"
            >
              {PROFILE.supportingStatement}
            </m.p>

            {/* Role Labels */}
            <m.ul
              aria-label="Professional roles"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52, ease: EASE_EDITORIAL }}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2.5"
            >
              {PROFILE.roleLabels.map((role) => (
                <li
                  key={role}
                  className="px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#F4F0E8]/90 bg-[#191919] border border-[#C6A15B]/25 hover:border-[#C6A15B]/55 transition-colors rounded-[2px]"
                >
                  {role}
                </li>
              ))}
            </m.ul>

            {/* Primary & Secondary Buttons */}
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.6, ease: EASE_EDITORIAL }}
              className="mt-11 flex flex-wrap items-center gap-4"
            >
              <Button as="a" href="#projects" variant="primary" size="lg">
                Explore My Work
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button
                as="a"
                href="#contact"
                variant="secondary"
                size="lg"
                onClick={(e) => {
                  if (onEnquireClick) {
                    e.preventDefault();
                    onEnquireClick();
                  }
                }}
              >
                Let&apos;s Work Together
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Button>

              {hasCvFile ? (
                <Button
                  as="a"
                  href={PROFILE.links.cv}
                  download
                  variant="ghost"
                  size="lg"
                >
                  <Download className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
                  Download CV
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={onOpenCvModal}
                >
                  <Download className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
                  Download CV
                </Button>
              )}
            </m.div>

            {/* Social Links Bar */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.72, ease: EASE_EDITORIAL }}
              className="mt-10 pt-7 border-t border-[#F4F0E8]/10 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.18em]"
            >
              <span className="text-[#A7A29A]/70">Profiles</span>

              {PROFILE.links.github ? (
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F4F0E8]/85 hover:text-[#C6A15B] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                  GitHub
                  <ArrowUpRight className="w-3 h-3 opacity-70" aria-hidden="true" />
                </a>
              ) : (
                <a
                  href="#projects"
                  title="Direct GitHub URL configurable via VITE_GITHUB_URL"
                  className="inline-flex items-center gap-2 text-[#F4F0E8]/85 hover:text-[#C6A15B] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                  GitHub (Project Showcase)
                </a>
              )}

              {PROFILE.links.linkedin ? (
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F4F0E8]/85 hover:text-[#C6A15B] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 opacity-70" aria-hidden="true" />
                </a>
              ) : (
                <a
                  href="#contact"
                  title="Direct LinkedIn URL configurable via VITE_LINKEDIN_URL"
                  className="inline-flex items-center gap-2 text-[#F4F0E8]/85 hover:text-[#C6A15B] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                  LinkedIn (Connect via Enquiry)
                </a>
              )}
            </m.div>
          </div>

          {/* Editorial Side Dossier */}
          <m.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: EASE_EDITORIAL }}
            whileHover={{ y: -3 }}
            aria-label="Practice overview"
            className="lg:col-span-3 lg:pb-3"
          >
            <div className="bg-[#191919] border border-[#C6A15B]/25 hover:border-[#C6A15B]/50 transition-colors duration-300 p-6 space-y-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#C6A15B]">
                Practice Focus
              </p>
              <p className="font-serif text-xl leading-snug text-[#F4F0E8]">
                &ldquo;Practical digital systems shaped by legal clarity and commercial discipline.&rdquo;
              </p>
              <div className="h-px bg-[#F4F0E8]/10" />
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="uppercase tracking-[0.16em] text-[#A7A29A]/80">
                    Serving
                  </dt>
                  <dd className="text-[#F4F0E8]/90 mt-1">
                    SMEs, Law Firms, Advisory Practices &amp; Startups
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.16em] text-[#A7A29A]/80">
                    Core Lens
                  </dt>
                  <dd className="text-[#F4F0E8]/90 mt-1">
                    Business Workflows · Web Apps · AI Automation
                  </dd>
                </div>
              </dl>
            </div>
          </m.aside>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="max-w-6xl mx-auto px-6 lg:px-8 w-full mt-12 hidden sm:flex items-center"
      >
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#A7A29A]/70 hover:text-[#C6A15B] transition-colors"
        >
          <span>Scroll to explore</span>
          <m.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
          </m.span>
        </a>
      </m.div>
    </section>
  );
}
