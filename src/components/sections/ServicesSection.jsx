import React from 'react';
import { m } from 'framer-motion';
import {
  ArrowUpRight,
  Globe,
  Workflow,
  LayoutDashboard,
  BriefcaseBusiness,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES, EMERGING_SCOPE } from '../../data/services';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

const SERVICE_ICONS = {
  'website-development': Globe,
  'ai-automation': Workflow,
  'business-applications': LayoutDashboard,
  'professional-services': BriefcaseBusiness,
};

export function ServicesSection({ onSelectService }) {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-[#101010] border-t border-[#F4F0E8]/8"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="Practical Digital Solutions Designed Around Real Operations"
            subtitle="Focused capabilities tailored for SME business owners, law firms, advisory practices and growing teams seeking dependable technology without agency bloat."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id] || Globe;

            return (
              <Reveal key={service.id} delay={index * 0.08} className="h-full">
                <m.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full bg-[#191919] border border-[#F4F0E8]/10 hover:border-[#C6A15B]/50 transition-colors duration-300 p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
                >
                  {/* Animated antique-gold top hairline on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-[#C6A15B] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="font-serif text-2xl text-[#C6A15B]/80 tracking-[0.06em]">
                        {service.code}
                      </span>
                      <span className="w-10 h-10 bg-[#101010] border border-[#C6A15B]/25 flex items-center justify-center text-[#C6A15B] group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/10 transition-colors duration-300">
                        <Icon className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-[1.75rem] leading-snug text-[#F4F0E8]">
                      {service.title}
                    </h3>

                    <p className="mt-3.5 text-sm leading-relaxed text-[#A7A29A] font-light">
                      {service.summary}
                    </p>

                    <div className="my-6 h-px bg-[#F4F0E8]/8" />

                    <ul className="space-y-2.5">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-[#F4F0E8]/88 font-light"
                        >
                          <span
                            className="w-1.5 h-1.5 bg-[#C6A15B] shrink-0"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#F4F0E8]/8">
                    <button
                      type="button"
                      onClick={() => onSelectService && onSelectService(service.projectTypeValue)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C6A15B] hover:text-[#F4F0E8] transition-colors cursor-pointer"
                    >
                      {service.ctaLabel}
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </m.article>
              </Reveal>
            );
          })}
        </div>

        {/* Emerging Scope Callout — Patent & Trademark Digital Workflows */}
        <Reveal delay={0.2} className="mt-8">
          <div className="bg-[#151515] border border-[#C6A15B]/30 p-7 sm:p-9 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2.5 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] font-medium">
                    {EMERGING_SCOPE.eyebrow}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F0E8] leading-snug">
                  {EMERGING_SCOPE.title}
                </h3>
                <p className="mt-3.5 text-sm sm:text-[0.96rem] leading-relaxed text-[#A7A29A] font-light">
                  {EMERGING_SCOPE.summary}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-[#A7A29A]/75 italic">
                  {EMERGING_SCOPE.disclaimer}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#101010] border border-[#F4F0E8]/8 p-6 flex flex-col justify-between gap-6">
                <ul className="space-y-2.5">
                  {EMERGING_SCOPE.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-2.5 text-sm text-[#F4F0E8]/88 font-light"
                    >
                      <span
                        className="w-1.5 h-1.5 bg-[#C6A15B] shrink-0 mt-2"
                        aria-hidden="true"
                      />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#F4F0E8]/8">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectService && onSelectService(EMERGING_SCOPE.projectTypeValue)
                    }
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C6A15B] hover:text-[#F4F0E8] transition-colors cursor-pointer"
                  >
                    {EMERGING_SCOPE.ctaLabel}
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
