import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="brand-block" style={{ marginBottom: '8px' }}>
              <div className="brand-monogram">MM</div>
              <div className="brand-text">
                <span className="brand-name">MUSZAINI MUSA</span>
                <span className="brand-subtitle">Legal Professional &middot; AI &amp; Web</span>
              </div>
            </div>
            <p className="footer-desc">
              Grounded in contract governance, regulatory compliance, and dispute resolution. Actively applying legal diligence to emerging AI and digital web craft.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-heading">Navigation</span>
            <a href="#about" className="footer-link">About &amp; Values</a>
            <a href="#experience" className="footer-link">Career Experience</a>
            <a href="#skills" className="footer-link">Skills &amp; Capabilities</a>
            <a href="#education" className="footer-link">Academic Credentials</a>
            <a href="#areas-of-interest" className="footer-link">Areas of Interest</a>
            <a href="#contact" className="footer-link">Contact &amp; Enquiry</a>
          </div>

          <div className="footer-nav-col">
            <span className="footer-heading">Direct Contact</span>
            <a href={`mailto:${personalInfo.email}`} className="footer-link">
              {personalInfo.email}
            </a>
            <a href={`tel:${personalInfo.phone}`} className="footer-link">
              {personalInfo.phone}
            </a>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
              {personalInfo.location}
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Muszaini Binti Musa. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Private Submission Storage</span>
            <span>&middot;</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', border: 'none' }}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
