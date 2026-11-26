import React from 'react';
import { m } from 'framer-motion';
import { APPROACH_STEPS } from '../../data/approach';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="py-24 lg:py-32 bg-[#101010] border-t border-[#F4F0E8]/8 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="My Approach"
            title="From Business Problems to Digital Solutions"
            subtitle="Technology should serve operational clarity, never complicate it. Every engagement follows a disciplined four-stage progression from problem discovery to verified delivery."
          />
        </Reveal>

        {/* Visually Distinctive Architectural 4-Step Track */}
        <div className="mt-16 relative">
          {/* Desktop animated horizontal connecting gold rule */}
          <m.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="hidden lg:block absolute top-11 left-0 right-0 h-px bg-[#C6A15B]/35"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {APPROACH_STEPS.map((item, index) => (
              <Reveal key={item.step} delay={0.08 + index * 0.1} className="h-full">
                <m.li
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full bg-[#191919] border border-[#F4F0E8]/10 hover:border-[#C6A15B]/50 transition-colors duration-300 p-7 flex flex-col justify-between"
                >
                  <div>
                    {/* Step Marker */}
                    <div className="flex items-center justify-between mb-7">
                      <span className="inline-flex items-center justify-center w-11 h-11 bg-[#101010] border border-[#C6A15B]/60 group-hover:bg-[#C6A15B] group-hover:text-[#101010] font-serif text-xl text-[#C6A15B] transition-colors duration-300 relative z-10">
                        {item.step}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#A7A29A]/70">
                        Stage {index + 1} of 4
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl leading-snug text-[#F4F0E8]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-[#A7A29A] font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-7 pt-4 border-t border-[#C6A15B]/18">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] mb-1">
                      Outcome
                    </p>
                    <p className="text-xs text-[#F4F0E8]/85 font-light">
                      {item.deliverable}
                    </p>
                  </div>
                </m.li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
