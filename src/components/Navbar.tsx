import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Sliders } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenBio: () => void;
  activeSection: string;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenBio,
  activeSection,
  onOpenDashboard,
}) => {
  const { siteConfig, setIsDashboardOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const handleOpenStudio = () => {
    if (onOpenDashboard) {
      onOpenDashboard();
    } else {
      setIsDashboardOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'bio') {
      onOpenBio();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'work', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'expertise', label: t.nav.expertise },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ease-out ${
          scrolled
            ? 'py-3.5 bg-[#F7F5F2]/90 backdrop-blur-md border-b border-[#171717]/6 shadow-[0_4px_20px_-8px_rgba(23,23,23,0.03)]'
            : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Logo
            language={language}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Desktop Navigation */}
          <nav
            id="desktop-nav-menu"
            className="hidden md:flex items-center gap-1.5 lg:gap-2 p-1.5 rounded-full bg-[#EFECE7]/70 backdrop-blur-md border border-[#171717]/6 shadow-sm"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A] ${
                    isActive
                      ? 'text-[#171717] bg-[#F7F5F2] shadow-[0_2px_8px_-2px_rgba(23,23,23,0.06)]'
                      : 'text-[#77736F] hover:text-[#171717] hover:bg-[#F7F5F2]/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 inset-x-0 mx-auto w-1 h-1 rounded-full bg-[#B49A7A]" />
                  )}
                </button>
              );
            })}

            {/* Professional Bio Button */}
            <button
              id="nav-link-bio"
              onClick={onOpenBio}
              className="px-4 py-2 text-[13px] font-medium rounded-full text-[#171717] hover:bg-[#F7F5F2] transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
            >
              <span>{t.nav.bio}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B49A7A]" />
            </button>
          </nav>

          {/* Right Action: Language Switcher & Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Owner Dashboard Studio Button */}
            <button
              id="nav-owner-studio-btn"
              onClick={handleOpenStudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border border-[#171717]/10 hover:border-[#171717] bg-[#EFECE7]/60 hover:bg-[#171717] text-[#171717] hover:text-[#F7F5F2] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
              title={language === 'ar' ? 'لوحة تحكم مالك الموقع' : 'Owner Content Studio'}
            >
              <Sliders className="w-3.5 h-3.5 text-[#B49A7A]" />
              <span className="hidden lg:inline">{language === 'ar' ? 'لوحة المالك' : 'Studio'}</span>
            </button>

            {/* Language Switcher */}
            <button
              id="language-switcher-btn"
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold border border-[#171717]/10 hover:border-[#171717] bg-[#EFECE7]/60 hover:bg-[#171717] text-[#171717] hover:text-[#F7F5F2] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
              aria-label={`Switch to ${language === 'ar' ? 'English' : 'العربية'}`}
            >
              <span className={language === 'ar' ? 'font-bold text-[#B49A7A]' : 'opacity-70'}>
                AR
              </span>
              <span className="text-[#9E9A95] opacity-50">/</span>
              <span className={language === 'en' ? 'font-bold text-[#B49A7A]' : 'opacity-70'}>
                EN
              </span>
            </button>

            {/* Direct Instagram / Let's Talk CTA */}
            <a
              id="nav-contact-btn"
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium bg-[#171717] text-[#F7F5F2] hover:bg-[#B49A7A] transition-colors duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
            >
              <span>{t.nav.contact}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Right Controls: Language & Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-language-switcher"
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-full text-[12px] font-semibold border border-[#171717]/10 bg-[#EFECE7] text-[#171717] transition-colors cursor-pointer"
              aria-label={`Switch language`}
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-full bg-[#EFECE7] flex items-center justify-center text-[#171717] border border-[#171717]/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-30 bg-[#F7F5F2] flex flex-col justify-between p-6 sm:p-10 pt-28 animate-in fade-in duration-200 md:hidden"
        >
          <div className="flex flex-col gap-6">
            <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-semibold">
              {language === 'ar' ? 'قائمة التصفح' : 'Navigation'}
            </span>

            <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className="text-start text-2xl sm:text-3xl font-semibold text-[#171717] hover:text-[#B49A7A] py-2 transition-colors flex items-center justify-between border-b border-[#171717]/6"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#77736F]">0{navItems.indexOf(item) + 1}</span>
                </button>
              ))}

              <button
                id="mobile-nav-bio"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBio();
                }}
                className="text-start text-2xl sm:text-3xl font-semibold text-[#B49A7A] py-2 transition-colors flex items-center justify-between border-b border-[#171717]/6"
              >
                <span>{t.nav.bio}</span>
                <span className="text-xs text-[#B49A7A]">✦</span>
              </button>

              <button
                id="mobile-nav-dashboard"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenStudio();
                }}
                className="text-start text-xl sm:text-2xl font-semibold text-[#171717] hover:text-[#B49A7A] py-2 transition-colors flex items-center justify-between border-b border-[#171717]/6"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#B49A7A]" />
                  <span>{language === 'ar' ? 'لوحة تحكم المالك' : 'Owner Studio'}</span>
                </span>
                <span className="text-xs text-[#77736F]">⚙</span>
              </button>
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#171717]/10">
            <a
              id="mobile-instagram-cta"
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl bg-[#171717] text-[#F7F5F2] font-medium flex items-center justify-center gap-2"
            >
              <span>{t.bottomBar.ctaInstagram}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-between text-xs text-[#77736F] pt-2">
              <span>{siteConfig.location[language]}</span>
              <span>{siteConfig.availabilityStatus[language]}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
