import React, { useState, useCallback, lazy, Suspense } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ApproachSection } from './components/sections/ApproachSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';

const CvSummaryModal = lazy(() => import('./components/ui/CvSummaryModal'));

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [enquiryIntent, setEnquiryIntent] = useState(null);

  const scrollToContact = useCallback(() => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectService = useCallback(
    (projectType) => {
      setEnquiryIntent({
        projectType,
        note: '',
        triggerId: Date.now(),
      });
      scrollToContact();
    },
    [scrollToContact]
  );

  const handleRequestWalkthrough = useCallback(
    (projectTitle) => {
      setEnquiryIntent({
        projectType: 'General Consultation / Collaboration',
        note: `I would like to request a walkthrough or discuss the architecture behind ${projectTitle}.`,
        triggerId: Date.now(),
      });
      scrollToContact();
    },
    [scrollToContact]
  );

  return (
    <ErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <div className="min-h-screen bg-[#101010] text-[#F4F0E8] flex flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#C6A15B] focus:text-[#101010] focus:text-xs focus:uppercase focus:tracking-widest"
            >
              Skip to main content
            </a>

            <Navbar onEnquireClick={scrollToContact} />

            <main id="main-content" className="flex-1">
              <HeroSection
                onOpenCvModal={() => setCvModalOpen(true)}
                onEnquireClick={scrollToContact}
              />
              <AboutSection />
              <ExperienceSection />
              <ServicesSection onSelectService={handleSelectService} />
              <ProjectsSection onRequestWalkthrough={handleRequestWalkthrough} />
              <ApproachSection />
              <SkillsSection />
              <ContactSection enquiryIntent={enquiryIntent} />
            </main>

            <Footer />

            {cvModalOpen && (
              <Suspense fallback={null}>
                <CvSummaryModal
                  isOpen={cvModalOpen}
                  onClose={() => setCvModalOpen(false)}
                />
              </Suspense>
            )}
          </div>
        </MotionConfig>
      </LazyMotion>
    </ErrorBoundary>
  );
}
