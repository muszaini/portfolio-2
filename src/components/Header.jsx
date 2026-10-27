import React, { useState, useEffect } from 'react';
import { profileData, navLinks } from '../data/portfolioData.js';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" role="banner">
      <div className="container site-header__inner">
        <a href="#home" className="brand" aria-label={`${profileData.name} — Home`}>
          <span className="brand__wordmark">{profileData.wordmark}</span>
          <span className="brand__descriptor">{profileData.descriptor}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Primary navigation">
          <ul className="nav-list">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--primary btn--sm">
            Let’s Collaborate
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          className="nav-mobile"
          aria-label="Mobile navigation"
        >
          <div className="container">
            <ul className="nav-mobile__list">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="nav-mobile__link"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn btn--primary"
              style={{ width: '100%' }}
              onClick={handleLinkClick}
            >
              Let’s Collaborate
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
