import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { CampusToCosmos } from './components/campus-to-cosmos/CampusToCosmos';
import { AboutSection } from './components/about/AboutSection';
import { DigitalObservatory } from './components/observatory/DigitalObservatory';
import { EventsSection } from './components/events/EventsSection';
import { CosmicCalendar } from './components/calendar/CosmicCalendar';
import { AstrophotographyGallery } from './components/gallery/AstrophotographyGallery';
import { LearnAstronomy } from './components/learn/LearnAstronomy';
import { AskAstraSection } from './components/ai/AskAstraSection';
import { TeamSection } from './components/team/TeamSection';
import { AchievementsTimeline } from './components/achievements/AchievementsTimeline';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { TonightSkyModal } from './components/observatory/TonightSkyModal';
import { AskAstraModal } from './components/ai/AskAstraModal';
import { FloatingAIAssistantButton } from './components/ai/FloatingAIAssistantButton';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isTonightSkyModalOpen, setIsTonightSkyModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Intersection observer to highlight current active section in nav
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = [
        'hero',
        'about',
        'cosmos',
        'observatory',
        'events',
        'calendar',
        'gallery',
        'learn',
        'ask-astra',
        'team',
        'achievements',
        'contact',
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <div className="min-h-screen bg-[#03040a] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col antialiased">
      {/* Top Main Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenTonightSky={() => setIsTonightSkyModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreClick={() => handleNavigate('about')}
          onTonightSkyClick={() => setIsTonightSkyModalOpen(true)}
          onObservatoryClick={() => handleNavigate('observatory')}
        />

        {/* 2. Signature Experience: From Campus to Cosmos */}
        <CampusToCosmos />

        {/* 3. About ASTRA & 5 Core Objectives */}
        <AboutSection
          onJoinClick={() => handleNavigate('contact')}
          onExploreEventsClick={() => handleNavigate('events')}
        />

        {/* 4. Digital Observatory & Real-Time Sky Telemetry */}
        <DigitalObservatory />

        {/* 5. Events & Hands-on Observation Camps */}
        <EventsSection />

        {/* 6. Annual Cosmic Calendar */}
        <CosmicCalendar />

        {/* 7. Student Astrophotography Archive */}
        <AstrophotographyGallery />

        {/* 8. Learn Astronomy & Optics Calculator */}
        <LearnAstronomy />

        {/* 9. 'Ask ASTRA' AI Assistant Section */}
        <AskAstraSection />

        {/* 10. Organizational Hierarchy & Club Leadership */}
        <TeamSection />

        {/* 11. Achievements & Milestones Timeline */}
        <AchievementsTimeline />

        {/* 12. Connect & Membership Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Persistent Floating AI Assistant Button */}
      <FloatingAIAssistantButton onOpen={() => setIsAiModalOpen(true)} />

      {/* Modals */}
      <TonightSkyModal
        isOpen={isTonightSkyModalOpen}
        onClose={() => setIsTonightSkyModalOpen(false)}
        onOpenAiModal={() => {
          setIsTonightSkyModalOpen(false);
          setIsAiModalOpen(true);
        }}
      />

      <AskAstraModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
