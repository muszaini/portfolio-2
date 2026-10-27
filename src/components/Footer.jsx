import React from 'react';
import { profileData, navLinks } from '../data/portfolioData.js';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const currentYear = CURRENT_YEAR;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <div className="brand__wordmark" style={{ marginBottom: '0.35rem' }}>
              {profileData.wordmark}
            </div>
            <div className="brand__descriptor" style={{ marginBottom: '0.9rem' }}>
              {profileData.descriptor}
            </div>
            <p style={{ fontSize: '0.92rem', maxWidth: '420px' }}>
              Personal portfolio presenting legal experience in contract drafting, regulatory compliance, research, and risk assessment alongside digital design and ongoing study in AI and vibe coding.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--gold-primary)',
                marginBottom: '0.85rem',
              }}
            >
              Sections
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--gold-primary)',
                marginBottom: '0.85rem',
              }}
            >
              Direct Contact
            </h3>
            <p style={{ fontSize: '0.92rem', marginBottom: '0.4rem' }}>
              <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
            </p>
            <p style={{ fontSize: '0.92rem', marginBottom: '0.75rem' }}>
              <a href={profileData.phoneHref}>{profileData.phone}</a>
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Information presented on this website is for portfolio and professional collaboration purposes only and does not constitute formal legal advice.
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {currentYear} {profileData.name}. All rights reserved.
          </span>
          <span>
            LL.M. in Business Law (IIUM) • LL.B. (Hons) (Staffordshire University, UK)
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
