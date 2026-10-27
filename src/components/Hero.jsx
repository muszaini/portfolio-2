import React from 'react';
import { heroData } from '../data/portfolioData.js';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__frame">
          <span className="hero__eyebrow">{heroData.eyebrow}</span>
          <h1 id="hero-heading" className="hero__title">
            {heroData.headline}
          </h1>
          <p className="hero__lead">{heroData.lead}</p>
          <p className="hero__note">
            <span aria-hidden="true" style={{ color: 'var(--gold-primary)' }}>
              ✦
            </span>
            <span>{heroData.statusNote}</span>
          </p>

          <div className="hero__actions">
            <a href={heroData.primaryCta.href} className="btn btn--primary">
              {heroData.primaryCta.label}
            </a>
            <a href={heroData.secondaryCta.href} className="btn btn--secondary">
              {heroData.secondaryCta.label}
            </a>
          </div>

          <div className="hero__highlights" role="list" aria-label="Career and study highlights">
            {heroData.highlights.map((item) => (
              <div key={item.label} className="hero__highlight-card" role="listitem">
                <span className="hero__highlight-label">{item.label}</span>
                <div className="hero__highlight-value">{item.value}</div>
                <p className="hero__highlight-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
