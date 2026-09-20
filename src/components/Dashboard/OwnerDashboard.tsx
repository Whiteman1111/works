import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { IdentityTab } from './IdentityTab';
import { LogoSection } from './LogoSection';
import { ProjectsTab } from './ProjectsTab';
import { MediaTab } from './MediaTab';
import { CapabilitiesTab } from './CapabilitiesTab';
import { BioTab } from './BioTab';
import { SocialsTab } from './SocialsTab';
import { SettingsTab } from './SettingsTab';
import {
  X,
  User,
  Layers,
  Image as ImageIcon,
  Briefcase,
  FileText,
  Share2,
  Sliders,
  Check,
  Eye,
  Sparkles,
  Save,
  Globe,
  Lock,
} from 'lucide-react';

type TabKey = 'identity' | 'logo' | 'projects' | 'media' | 'capabilities' | 'bio' | 'socials' | 'settings';

export const OwnerDashboard: React.FC = () => {
  const {
    isDashboardOpen,
    setIsDashboardOpen,
    language,
    toggleLanguage,
    lastSaved,
    lockDashboard,
    applyAndCloseDashboard,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<TabKey>('identity');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Lock background scroll when open
  useEffect(() => {
    if (isDashboardOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDashboardOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDashboardOpen) {
        setIsDashboardOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDashboardOpen, setIsDashboardOpen]);

  if (!isDashboardOpen) return null;

  const handleManualSave = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const tabs: { key: TabKey; labelAr: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      key: 'identity',
      labelAr: 'الهوية والواجهة',
      labelEn: 'Identity & Hero',
      icon: <User className="w-4 h-4" />,
    },
    {
      key: 'logo',
      labelAr: 'تعديل الشعار',
      labelEn: 'Logo & Brand',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      key: 'projects',
      labelAr: 'معرض المشاريع',
      labelEn: 'Projects',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      key: 'media',
      labelAr: 'استوديو الصور',
      labelEn: 'Media & Photos',
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      key: 'capabilities',
      labelAr: 'الخدمات والقدرات',
      labelEn: 'Capabilities',
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      key: 'bio',
      labelAr: 'السيرة والخبرات',
      labelEn: 'Bio & CV',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      key: 'socials',
      labelAr: 'التواصل والروابط',
      labelEn: 'Contact & Links',
      icon: <Share2 className="w-4 h-4" />,
    },
    {
      key: 'settings',
      labelAr: 'المظهر والنسخ الاحتياطي',
      labelEn: 'Theme & Backup',
      icon: <Sliders className="w-4 h-4" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#171717]/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-6xl h-full max-h-[96vh] bg-[#F7F5F2] rounded-3xl shadow-2xl border border-[#171717]/10 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="px-5 sm:px-8 py-4 border-b border-[#171717]/8 flex items-center justify-between bg-[#F7F5F2] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#171717] text-[#F7F5F2] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#B49A7A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-[#171717]">
                  {language === 'ar' ? 'لوحة تحكم مالك الموقع' : 'Site Owner Studio Dashboard'}
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#B49A7A]/15 text-[#8C6D46]">
                  {language === 'ar' ? 'تعديل حي وفوري' : 'Live Editing'}
                </span>
              </div>
              <p className="text-xs text-[#77736F] truncate max-w-xs sm:max-w-md">
                {language === 'ar'
                  ? 'أدخلي تفاصيلك الحقيقية، صورك، مشاريعك ومعلومات التواصل'
                  : 'Customize all content, projects, and contact channels'}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auto-saved badge */}
            {lastSaved && (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-[#77736F] font-mono px-2.5 py-1 rounded-full bg-[#EFECE7]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {language === 'ar' ? `محفوظ: ${lastSaved}` : `Saved: ${lastSaved}`}
                </span>
              </span>
            )}

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#EFECE7] hover:bg-[#E5E1D8] text-xs font-medium text-[#171717] transition-colors cursor-pointer"
              title="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#B49A7A]" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Lock Dashboard Session */}
            <button
              type="button"
              onClick={lockDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium border border-red-200 transition-colors cursor-pointer"
              title={language === 'ar' ? 'قفل لوحة التحكم بكلمة المرور' : 'Lock Dashboard with Passcode'}
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {language === 'ar' ? 'قفل' : 'Lock'}
              </span>
            </button>

            {/* PRIMARY ACTION: Apply & Preview Live Site */}
            <button
              type="button"
              onClick={applyAndCloseDashboard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
              title={language === 'ar' ? 'تطبيق التعديلات وإغلاق اللوحة لمعاينة الموقع' : 'Apply changes & view live site'}
            >
              <Eye className="w-4 h-4 text-[#B49A7A]" />
              <span>
                {language === 'ar' ? 'تطبيق ومعاينة الموقع' : 'Apply & View Site'}
              </span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={() => setIsDashboardOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#EFECE7] text-[#77736F] hover:text-[#171717] transition-colors cursor-pointer"
              aria-label="Close Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Informative notice explaining that modifications are saved and ready to view */}
        <div className="bg-[#B49A7A]/12 border-b border-[#B49A7A]/25 px-4 sm:px-8 py-2.5 flex items-center justify-between gap-3 text-xs text-[#171717] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-medium text-xs sm:text-[13px]">
              {language === 'ar'
                ? 'أي تعديل تقوم به يتم حفظه تلقائياً. اضغط على "تطبيق ومعاينة الموقع" بالأعلى أو بالأسفل لإغلاق اللوحة ورؤية النتيجة مباشرة على الموقع!'
                : 'Edits are saved automatically. Click "Apply & View Site" to close this dashboard and preview the live site!'}
            </span>
          </div>
          <button
            type="button"
            onClick={applyAndCloseDashboard}
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-[#B49A7A] hover:text-[#171717] transition-colors cursor-pointer text-xs shrink-0"
          >
            <span>{language === 'ar' ? 'معاينة الموقع الآن ←' : 'View Site Now →'}</span>
          </button>
        </div>

        {/* Horizontal Navigation Tabs */}
        <nav
          className="flex overflow-x-auto border-b border-[#171717]/8 px-4 sm:px-8 bg-[#EFECE7]/40 shrink-0 scrollbar-none"
          aria-label="Dashboard Tabs"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#171717] text-[#171717]'
                    : 'border-transparent text-[#77736F] hover:text-[#171717]'
                }`}
              >
                <span className={isActive ? 'text-[#B49A7A]' : 'text-[#77736F]'}>
                  {tab.icon}
                </span>
                <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Content Body (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-10">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'identity' && <IdentityTab />}
            {activeTab === 'logo' && <LogoSection />}
            {activeTab === 'projects' && <ProjectsTab />}
            {activeTab === 'media' && <MediaTab />}
            {activeTab === 'capabilities' && <CapabilitiesTab />}
            {activeTab === 'bio' && <BioTab />}
            {activeTab === 'socials' && <SocialsTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </main>

        {/* Sticky Footer Bar for instant Apply & Preview */}
        <footer className="border-t border-[#171717]/10 bg-[#F7F5F2] px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#77736F]">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {language === 'ar'
                ? 'كافة التعديلات التي تجريها يتم حفظها فوراً في متصفحك.'
                : 'All modifications are saved automatically in your browser.'}
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setIsDashboardOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#77736F] hover:text-[#171717] hover:bg-[#EFECE7] transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'إغلاق بدون معاينة' : 'Close'}
            </button>
            <button
              type="button"
              onClick={applyAndCloseDashboard}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#B49A7A]" />
              <span>{language === 'ar' ? 'تطبيق التعديلات والعودة للموقع' : 'Apply Changes & View Site'}</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
