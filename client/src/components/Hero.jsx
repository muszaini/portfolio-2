import React from 'react';
import { ArrowDown, Mail, ShieldCheck, Sparkles, Scale, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const { hero } = personalInfo;

  return (
    <section id="hero" className="hero-wrapper">
      <div className="container hero-content">
        <div className="hero-eyebrow-badge">
          <span className="gold-badge">
            <Sparkles size={13} />
            {hero.badge}
          </span>
        </div>

        <h1 className="hero-headline">
          Legal Insight. <span className="gold-text">Thoughtful Design.</span> Emerging AI Solutions.
        </h1>

        <p className="hero-subheadline">
          {hero.subheadline}
        </p>

        <div className="hero-cta-group">
          <a href="#contact" className="btn btn-gold">
            <Mail size={16} />
            <span>{hero.primaryCta}</span>
          </a>
          <a href="#experience" className="btn btn-outline">
            <span>{hero.secondaryCta}</span>
            <ArrowDown size={16} />
          </a>
        </div>

        {/* Factual Highlights Bar grounded in CV verification */}
        <div className="hero-meta-bar" aria-label="Career Highlights">
          <div className="hero-meta-item">
            <span className="hero-meta-number">20+ Yrs</span>
            <span className="hero-meta-label">Professional Foundation</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-number">RM1.7M</span>
            <span className="hero-meta-label">Contract Recovery</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-number">LL.M.</span>
            <span className="hero-meta-label">Dean’s List Distinction</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-number">AI &amp; Web</span>
            <span className="hero-meta-label">Active Exploration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
