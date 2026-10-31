import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-inner">
        <a href="#hero" className="brand-block" onClick={closeMenu}>
          <div className="brand-monogram">MM</div>
          <div className="brand-text">
            <span className="brand-name">MUSZAINI MUSA</span>
            <span className="brand-subtitle">Legal Professional &middot; AI &amp; Web</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links-desktop">
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#experience" className="nav-link">Experience</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#education" className="nav-link">Education</a></li>
            <li><a href="#areas-of-interest" className="nav-link">Areas of Interest</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-gold" style={{ padding: '8px 18px', fontSize: '0.825rem' }}>
            <span>Let's Collaborate</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            className="menu-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#hero" className="mobile-nav-link" onClick={closeMenu}>Home</a></li>
          <li><a href="#about" className="mobile-nav-link" onClick={closeMenu}>About</a></li>
          <li><a href="#experience" className="mobile-nav-link" onClick={closeMenu}>Experience</a></li>
          <li><a href="#skills" className="mobile-nav-link" onClick={closeMenu}>Skills</a></li>
          <li><a href="#education" className="mobile-nav-link" onClick={closeMenu}>Education</a></li>
          <li><a href="#areas-of-interest" className="mobile-nav-link" onClick={closeMenu}>Areas of Interest</a></li>
          <li><a href="#contact" className="mobile-nav-link" onClick={closeMenu}>Contact &amp; Enquiry</a></li>
        </ul>
      </div>
    </header>
  );
}
