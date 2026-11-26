import React from 'react';
import { Scale, Cpu, FileCheck2 } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-[#141414] border-t border-[#F4F0E8]/8"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="About"
            title="Grounded in Law &amp; Governance. Building for the Digital Economy."
            subtitle="A deliberate bridge between understanding how real organisations operate and building clean software, AI workflows and automation that solve practical problems."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Narrative Column */}
          <Reveal delay={0.08} className="lg:col-span-6 space-y-6">
            <p className="text-[1.03rem] leading-[1.85] text-[#F4F0E8]/90 font-light">
              My professional foundation was formed in law, business governance and advisory work —
              environments where precision, clear documentation and reliable processes are not
              optional, they are the core of client trust.
            </p>
            <p className="text-[0.98rem] leading-[1.85] text-[#A7A29A] font-light">
              Working closely with business processes, legal workflows and client consultations
              revealed a consistent gap: many SMEs and professional service practices still rely on
              fragmented manual steps, disconnected documents and slow enquiry handling — not
              because they lack ambition, but because off-the-shelf tools rarely reflect how their
              work actually runs.
            </p>
            <p className="text-[0.98rem] leading-[1.85] text-[#A7A29A] font-light">
              That observation motivated my transition into building digital solutions directly.
              Today, I am actively developing web applications and practical workflow systems while
              exploring how modern AI tools can support business operations, legal documentation,
              and emerging areas such as patent and trademark administration.
            </p>

            {/* Technology Exploration Block */}
            <div className="pt-6 border-t border-[#C6A15B]/20">
              <div className="flex items-center gap-2.5 mb-4">
                <Cpu className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium">
                  Exploring &amp; Developing Solutions With
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {PROFILE.techExplorationAreas.map((area) => (
                  <li
                    key={area}
                    className="px-3.5 py-2 text-xs text-[#F4F0E8]/90 bg-[#191919] border border-[#F4F0E8]/10 hover:border-[#C6A15B]/45 transition-colors rounded-[2px]"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Credentials & Differentiator Column */}
          <Reveal delay={0.14} className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5 mb-2">
              <Scale className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium">
                Academic &amp; Professional Foundation
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROFILE.credentials.map((credential) => (
                <article
                  key={credential.title}
                  className="bg-[#191919] border border-[#F4F0E8]/10 hover:border-[#C6A15B]/40 transition-colors duration-300 p-5 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">
                      {credential.category}
                    </p>
                    <h4 className="font-serif text-xl text-[#F4F0E8] leading-snug">
                      {credential.title}
                    </h4>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#A7A29A] font-light">
                    {credential.detail}
                  </p>
                </article>
              ))}
            </div>

            {/* Operational Edge Callout */}
            <div className="bg-[#101010] border border-[#C6A15B]/25 p-6 flex items-start gap-4">
              <FileCheck2
                className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#F4F0E8] font-medium">
                  Why This Background Matters
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#A7A29A] font-light">
                  Understanding legal workflows, statutory documentation, client confidentiality and
                  day-to-day operational friction enables me to translate business requirements into
                  digital systems without getting lost in purely technical jargon.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
