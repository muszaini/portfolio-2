import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE, NAV_ITEMS } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101010] border-t border-[#C6A15B]/20 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F4F0E8]/10">
          {/* Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 border border-[#C6A15B]/50 bg-[#191919] flex items-center justify-center font-serif text-sm text-[#C6A15B]">
                {PROFILE.monogram}
              </span>
              <span className="font-serif text-xl tracking-[0.08em] uppercase text-[#F4F0E8]">
                {PROFILE.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#A7A29A] max-w-sm font-light">
              {PROFILE.positioningStatement}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-[#A7A29A] hover:text-[#F4F0E8] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#C6A15B] mb-4">
              Connect
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                {PROFILE.links.linkedin ? (
                  <a
                    href={PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-[#A7A29A] hover:text-[#F4F0E8] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    LinkedIn Profile
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 text-[#A7A29A] hover:text-[#F4F0E8] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    LinkedIn (Connect via Enquiry)
                  </a>
                )}
              </li>
              <li>
                {PROFILE.links.github ? (
                  <a
                    href={PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-[#A7A29A] hover:text-[#F4F0E8] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    GitHub Repositories
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 text-[#A7A29A] hover:text-[#F4F0E8] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    GitHub (Available on Request)
                  </a>
                )}
              </li>
              <li>
                {PROFILE.links.email ? (
                  <a
                    href={`mailto:${PROFILE.links.email}`}
                    className="inline-flex items-center gap-2.5 text-[#A7A29A] hover:text-[#F4F0E8] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    {PROFILE.links.email}
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 text-[#A7A29A] hover:text-[#F4F0E8] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    Direct Email via Enquiry Form
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7A29A]">
          <p>
            &copy; {year} {PROFILE.name}. All rights reserved.
          </p>
          <a
            href="#top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 uppercase tracking-[0.18em] text-[#A7A29A] hover:text-[#C6A15B] transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
