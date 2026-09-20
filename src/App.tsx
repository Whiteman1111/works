import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { ProjectDetail } from './components/ProjectDetail';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { ProfessionalBioModal } from './components/ProfessionalBioModal';
import { ContactCTA } from './components/ContactCTA';
import { BottomContactBar } from './components/BottomContactBar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { NotFound } from './components/NotFound';
import { OwnerDashboard } from './components/Dashboard/OwnerDashboard';
import { PasscodeModal } from './components/Dashboard/PasscodeModal';
import { Sliders, Sparkles } from 'lucide-react';

function PortfolioAppContent() {
  const {
    siteConfig,
    projects,
    language,
    toggleLanguage,
    isDashboardOpen,
    setIsDashboardOpen,
    requestOpenDashboard,
    appliedToast,
  } = usePortfolio();

  // Active Section Spy
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Current Route / View: null = home, slug = project detail, '404' = not found
  const [currentSlug, setCurrentSlug] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/work/')) {
      return hash.replace('#/work/', '');
    }
    return null;
  });

  // Professional Bio Drawer State
  const [isBioOpen, setIsBioOpen] = useState(false);

  // Sync document direction and lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    if (currentSlug) {
      const activeProject = projects.find((p) => p.slug === currentSlug);
      if (activeProject) {
        const title = language === 'ar' ? activeProject.titleAr : activeProject.titleEn;
        document.title = `${title} — ${siteConfig.designerName[language]}`;
        return;
      }
    }
    document.title = `${siteConfig.designerName[language]} — ${siteConfig.title[language]}`;
  }, [language, currentSlug, siteConfig, projects]);

  // Listen to hash changes for deep-linking & dashboard routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin' || hash === '#/dashboard') {
        requestOpenDashboard();
        return;
      }
      if (hash.startsWith('#/work/')) {
        const slug = hash.replace('#/work/', '');
        setCurrentSlug(slug);
      } else {
        setCurrentSlug(null);
      }
    };

    // Check on initial mount
    if (window.location.hash === '#/admin' || window.location.hash === '#/dashboard') {
      requestOpenDashboard();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [requestOpenDashboard]);

  // Track active section via IntersectionObserver when on home view
  useEffect(() => {
    if (currentSlug) return;

    const sectionIds = ['hero', 'work', 'about', 'expertise', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [currentSlug]);

  const handleSelectProject = useCallback((slug: string) => {
    window.location.hash = `#/work/${slug}`;
    setCurrentSlug(slug);
  }, []);

  const handleBackToPortfolio = useCallback(() => {
    window.location.hash = '';
    setCurrentSlug(null);
  }, []);

  // Check if current project slug is valid
  const currentProject = currentSlug ? projects.find((p) => p.slug === currentSlug) : null;
  const is404 = Boolean(currentSlug && !currentProject);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#171717] selection:bg-[#B49A7A]/20 selection:text-[#171717] relative">
      {/* Desktop fluid custom cursor */}
      <CustomCursor language={language} />

      {/* Persistent sticky navigation */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenBio={() => setIsBioOpen(true)}
        activeSection={activeSection}
        onOpenDashboard={requestOpenDashboard}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {is404 ? (
          <NotFound language={language} onBackHome={handleBackToPortfolio} />
        ) : currentProject ? (
          <ProjectDetail
            project={currentProject}
            allProjects={projects}
            language={language}
            onBack={handleBackToPortfolio}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <Hero
              language={language}
              onExploreClick={() => {
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onAboutClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Selected Work / Curated Gallery */}
            <Portfolio
              projects={projects}
              language={language}
              onSelectProject={handleSelectProject}
            />

            {/* 3. About Section */}
            <About
              language={language}
              onOpenBio={() => setIsBioOpen(true)}
            />

            {/* 4. Minimalist Expertise / Capabilities */}
            <Expertise language={language} />

            {/* 5. Contact CTA */}
            <ContactCTA language={language} />
          </>
        )}
      </main>

      {/* Bottom Contact Strip */}
      <BottomContactBar language={language} />

      {/* Minimal Footer */}
      <Footer language={language} />

      {/* Professional Bio Slide-over Drawer */}
      <ProfessionalBioModal
        isOpen={isBioOpen}
        onClose={() => setIsBioOpen(false)}
        language={language}
      />

      {/* Floating Owner Studio Action Button */}
      <button
        id="floating-owner-studio-btn"
        onClick={requestOpenDashboard}
        className="fixed bottom-5 start-5 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-[#F7F5F2]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
        title={language === 'ar' ? 'لوحة تحكم مالك الموقع لتعديل كل التفاصيل' : 'Site Owner Studio Dashboard'}
        aria-label="Open Owner Dashboard"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B49A7A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B49A7A]"></span>
        </span>
        <Sliders className="w-3.5 h-3.5 text-[#B49A7A] group-hover:text-white" />
        <span className="tracking-wide">
          {language === 'ar' ? 'لوحة المالك' : 'Owner Studio'}
        </span>
      </button>

      {/* Owner Security Passcode Gate */}
      <PasscodeModal />

      {/* Master Site Owner Dashboard Modal */}
      <OwnerDashboard />

      {/* Live Site Update Confirmation Toast */}
      {appliedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-6 start-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] sm:w-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#171717] text-[#F7F5F2] shadow-2xl border border-[#B49A7A]/40 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <p className="text-xs sm:text-sm font-medium leading-normal">{appliedToast}</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
}
