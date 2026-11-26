import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../../data/profile';

export function Navbar({ onEnquireClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, Math.max(0, (y / docHeight) * 100)) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#101010]/95 backdrop-blur-md border-b border-[#C6A15B]/18'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Monogram & Wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-3.5 focus-visible:outline-none"
          aria-label="Muszaini Musa — Back to top"
        >
          <span className="w-9 h-9 border border-[#C6A15B]/55 bg-[#191919] flex items-center justify-center font-serif text-base tracking-[0.08em] text-[#C6A15B] transition-colors duration-300 group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/10">
            {PROFILE.monogram}
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.08em] uppercase text-[#F4F0E8] leading-none">
              {PROFILE.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A7A29A] mt-1 hidden sm:block">
              Digital Solutions Builder
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                className={`text-xs uppercase tracking-[0.16em] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[#C6A15B] after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-[#F4F0E8] after:w-full'
                    : 'text-[#A7A29A] hover:text-[#F4F0E8] after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            onClick={(e) => {
              if (onEnquireClick) {
                e.preventDefault();
                onEnquireClick();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[#C6A15B] border border-[#C6A15B]/45 hover:bg-[#C6A15B] hover:text-[#101010] transition-colors duration-300 rounded-[2px]"
          >
            Start an Enquiry
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-[#F4F0E8] hover:text-[#C6A15B] transition-colors border border-[#F4F0E8]/12 rounded-[2px]"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Subtle 1px Antique-Gold Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        className="h-px bg-[#C6A15B]/75 transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden bg-[#101010] border-t border-[#C6A15B]/15 px-6 py-6"
        >
          <ul className="space-y-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-xs uppercase tracking-[0.2em] border-b border-[#F4F0E8]/6 transition-colors ${
                      isActive ? 'text-[#C6A15B]' : 'text-[#F4F0E8]/90 hover:text-[#C6A15B]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <a
              href="#contact"
              onClick={(e) => {
                setMobileOpen(false);
                if (onEnquireClick) {
                  e.preventDefault();
                  onEnquireClick();
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.18em] bg-[#C6A15B] text-[#101010] font-medium rounded-[2px]"
            >
              Let&apos;s Work Together
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
