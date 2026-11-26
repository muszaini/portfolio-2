import React from 'react';
import { SKILL_GROUPS } from '../../data/skills';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 lg:py-32 bg-[#141414] border-t border-[#F4F0E8]/8"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities &amp; Technical Skills"
            title="Domain Expertise &amp; Technology Stack"
            subtitle="An honest inventory distinguishing established legal and governance experience from the web, backend, database and AI engineering tooling I actively build with — zero arbitrary percentage bars."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.05} className="h-full">
              <article className="h-full bg-[#191919] border border-[#F4F0E8]/10 hover:border-[#C6A15B]/40 transition-colors duration-300 p-7">
                <div className="pb-4 border-b border-[#F4F0E8]/8">
                  <h3 className="font-serif text-2xl text-[#F4F0E8]">{group.category}</h3>
                  <p className="mt-1.5 text-xs text-[#A7A29A] font-light">{group.focus}</p>
                </div>

                <ul className="mt-5 space-y-3">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-4 py-1.5 border-b border-[#F4F0E8]/5 last:border-b-0"
                    >
                      <span className="text-sm text-[#F4F0E8]/92 font-normal">
                        {skill.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#C6A15B]/85 bg-[#101010] border border-[#C6A15B]/20 px-2.5 py-1 shrink-0">
                        {skill.stage}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
