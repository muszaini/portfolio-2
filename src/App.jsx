import React from 'react';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { AboutSection } from './sections/AboutSection.jsx';
import { ExperienceSection } from './sections/ExperienceSection.jsx';
import { SkillsSection } from './sections/SkillsSection.jsx';
import { EducationSection } from './sections/EducationSection.jsx';
import { PortfolioSection } from './sections/PortfolioSection.jsx';
import { ContactSection } from './sections/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';

export function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
