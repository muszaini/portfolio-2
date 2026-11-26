import React from 'react';
import { Award, GraduationCap } from 'lucide-react';
import { m } from 'framer-motion';
import { PROFILE } from '../../data/profile';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

export function ExperienceSection() {
  const academicCredentials = PROFILE.credentials.filter(
    (item) => item.year === '2006' || item.year === '1996'
  );

  return (
    <section
      id="experience"
      className="py-24 lg:py-32 bg-[#101010] border-t border-[#F4F0E8]/8"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Verified Track Record"
            title="Experience &amp; Academic Distinction"
            subtitle="Over two decades of institutional legal governance, commercial contract execution and operational ownership — now informing practical digital and AI solution architecture."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Career Chronology Timeline */}
          <div className="lg:col-span-8 relative pl-7 sm:pl-9">
            <m.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="absolute top-2 bottom-2 left-2 w-px bg-[#C6A15B]/35"
            />

            <ol className="space-y-6">
              {PROFILE.experience.map((job, index) => (
                <Reveal key={job.id} delay={index * 0.06}>
                  <li className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[25px] sm:-left-[33px] top-7 w-2.5 h-2.5 bg-[#101010] border border-[#C6A15B] rotate-45"
                    />

                    <article className="bg-[#191919] border border-[#F4F0E8]/10 hover:border-[#C6A15B]/45 transition-colors duration-300 p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-2xl text-[#F4F0E8] leading-snug">
                            {job.role}
                          </h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#C6A15B]">
                            {job.company}
                          </p>
                        </div>

                        <span className="text-xs uppercase tracking-[0.16em] text-[#A7A29A] bg-[#101010] border border-[#F4F0E8]/10 px-3 py-1">
                          {job.period}
                          {job.duration ? ` · ${job.duration}` : ''}
                        </span>
                      </div>

                      {job.highlight && (
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#101010] border border-[#C6A15B]/45 text-xs text-[#F4F0E8]">
                          <Award
                            className="w-3.5 h-3.5 text-[#C6A15B] shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="font-medium text-[#C6A15B]">
                              Verified Milestone:
                            </strong>{' '}
                            {job.highlight}
                          </span>
                        </div>
                      )}

                      <ul className="mt-4 space-y-2">
                        {job.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-[#A7A29A] font-light"
                          >
                            <span
                              className="w-1.5 h-1.5 bg-[#C6A15B]/80 shrink-0 mt-2"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Academic Degrees & Key Metrics Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <Reveal delay={0.1}>
              <div className="bg-[#191919] border border-[#C6A15B]/25 p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <GraduationCap
                    className="w-4 h-4 text-[#C6A15B]"
                    aria-hidden="true"
                  />
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-medium">
                    Academic Credentials
                  </h3>
                </div>

                <div className="space-y-6">
                  {academicCredentials.map((degree) => (
                    <div
                      key={degree.title}
                      className="pb-6 border-b border-[#F4F0E8]/8 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A7A29A]">
                          Graduated {degree.year}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl text-[#F4F0E8] leading-snug">
                        {degree.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#C6A15B]/90">
                        {degree.institution}
                      </p>
                      {degree.accolades && (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {degree.accolades.map((accolade) => (
                            <li
                              key={accolade}
                              className="px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#F4F0E8]/90 bg-[#101010] border border-[#C6A15B]/30"
                            >
                              {accolade}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-3 text-xs leading-relaxed text-[#A7A29A] font-light">
                        {degree.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="bg-[#151515] border border-[#F4F0E8]/10 p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#C6A15B] mb-4">
                  At a Glance
                </p>
                <dl className="grid grid-cols-2 gap-4">
                  {PROFILE.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#101010] border border-[#F4F0E8]/8 p-3.5"
                    >
                      <dt className="font-serif text-2xl text-[#C6A15B] leading-none">
                        {item.value}
                      </dt>
                      <dd className="mt-2 text-[11px] leading-snug text-[#A7A29A]">
                        {item.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
