import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteConfig, Project, Language } from '../types';
import { siteConfig as defaultSiteConfig } from '../data/site';
import { projects as defaultProjects } from '../data/projects';

interface ImportResult {
  success: boolean;
  message: string;
}

interface PortfolioContextType {
  siteConfig: SiteConfig;
  projects: Project[];
  language: Language;
  setLanguage: (lang: Language | ((prev: Language) => Language)) => void;
  toggleLanguage: () => void;
  updateSiteConfig: (updater: Partial<SiteConfig> | ((prev: SiteConfig) => SiteConfig)) => void;
  updateProjects: (updater: Project[] | ((prev: Project[]) => Project[])) => void;
  saveProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => ImportResult;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (isOpen: boolean) => void;
  lastSaved: string | null;
  accentColor: string;
  setAccentColor: (color: string) => void;
  // Security Passcode System
  isPasscodeModalOpen: boolean;
  setIsPasscodeModalOpen: (isOpen: boolean) => void;
  isOwnerUnlocked: boolean;
  ownerPasscode: string;
  unlockWithPasscode: (code: string) => boolean;
  lockDashboard: () => void;
  setOwnerPasscode: (newCode: string) => void;
  requestOpenDashboard: () => void;
  // Live Feedback System
  appliedToast: string | null;
  applyAndCloseDashboard: () => void;
  // Image Helper
  convertFileToDataUrl: (file: File) => Promise<string>;
}

const STORAGE_KEY_CONFIG = 'portfolio_custom_site_config_v2';
const STORAGE_KEY_PROJECTS = 'portfolio_custom_projects_v2';
const STORAGE_KEY_ACCENT = 'portfolio_custom_accent_color_v2';
const STORAGE_KEY_LANG = 'portfolio_lang';
const STORAGE_KEY_PASSCODE = 'portfolio_owner_passcode_v2';
const STORAGE_KEY_SESSION_UNLOCKED = 'portfolio_owner_unlocked_session_v2';

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'ar' || saved === 'en') return saved;
      return 'ar';
    } catch {
      return 'ar';
    }
  });

  // 2. Site configuration state
  const [siteConfig, setSiteConfigState] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Shallow/deep merge with default to guarantee no missing fields
        return {
          ...defaultSiteConfig,
          ...parsed,
          bio: { ...defaultSiteConfig.bio, ...(parsed.bio || {}) },
          socials: { ...defaultSiteConfig.socials, ...(parsed.socials || {}) },
        };
      }
    } catch (e) {
      console.error('Failed to parse saved site configuration', e);
    }
    return defaultSiteConfig;
  });

  // 3. Projects state
  const [projects, setProjectsState] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved projects', e);
    }
    return defaultProjects;
  });

  // 4. Accent color state
  const [accentColor, setAccentColorState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACCENT);
      if (saved) return saved;
    } catch {
      // Ignore
    }
    return siteConfig.accentColor || '#B49A7A';
  });

  // 5. Dashboard modal state & Passcode Security
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Passcode security state
  const [ownerPasscode, setOwnerPasscodeState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PASSCODE);
      if (saved) return saved;
    } catch {
      // Ignore
    }
    return siteConfig.ownerPasscode || '1234';
  });

  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_SESSION_UNLOCKED) === 'true';
    } catch {
      return false;
    }
  });

  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);

  // Apply accent color to CSS root variables dynamically
  useEffect(() => {
    if (accentColor) {
      document.documentElement.style.setProperty('--accent', accentColor);
    }
  }, [accentColor]);

  // Sync language with HTML document
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch {
      // Ignore
    }
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  // Update site config with localStorage sync
  const updateSiteConfig = useCallback(
    (updater: Partial<SiteConfig> | ((prev: SiteConfig) => SiteConfig)) => {
      setSiteConfigState((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
        try {
          localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(next));
          setLastSaved(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
        } catch (e) {
          console.error('Failed to save site config', e);
        }
        return next;
      });
    },
    [language]
  );

  // Update projects with localStorage sync
  const updateProjects = useCallback(
    (updater: Project[] | ((prev: Project[]) => Project[])) => {
      setProjectsState((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        try {
          localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(next));
          setLastSaved(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
        } catch (e) {
          console.error('Failed to save projects', e);
        }
        return next;
      });
    },
    [language]
  );

  // Save or update single project
  const saveProject = useCallback(
    (project: Project) => {
      updateProjects((prev) => {
        const exists = prev.some((p) => p.id === project.id);
        if (exists) {
          return prev.map((p) => (p.id === project.id ? project : p));
        } else {
          return [project, ...prev];
        }
      });
    },
    [updateProjects]
  );

  // Delete project
  const deleteProject = useCallback(
    (projectId: string) => {
      updateProjects((prev) => prev.filter((p) => p.id !== projectId));
    },
    [updateProjects]
  );

  // Reorder projects
  const reorderProjects = useCallback(
    (startIndex: number, endIndex: number) => {
      updateProjects((prev) => {
        const result = Array.from(prev);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      });
    },
    [updateProjects]
  );

  // Set accent color
  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
    try {
      localStorage.setItem(STORAGE_KEY_ACCENT, color);
    } catch {
      // Ignore
    }
  }, []);

  // Reset to original showcase defaults
  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_CONFIG);
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
      localStorage.removeItem(STORAGE_KEY_ACCENT);
    } catch {
      // Ignore
    }
    setSiteConfigState(defaultSiteConfig);
    setProjectsState(defaultProjects);
    setAccentColorState('#B49A7A');
    document.documentElement.style.setProperty('--accent', '#B49A7A');
    setLastSaved(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
  }, [language]);

  // Export full configuration as JSON
  const exportJSON = useCallback(() => {
    const backup = {
      siteConfig,
      projects,
      accentColor,
      version: '2.0',
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(backup, null, 2);
  }, [siteConfig, projects, accentColor]);

  // Import JSON configuration
  const importJSON = useCallback(
    (jsonStr: string): ImportResult => {
      try {
        const parsed = JSON.parse(jsonStr);
        if (!parsed) {
          return { success: false, message: 'ملف JSON فارغ أو غير صالح' };
        }

        if (parsed.siteConfig) {
          const mergedConfig = {
            ...defaultSiteConfig,
            ...parsed.siteConfig,
            bio: { ...defaultSiteConfig.bio, ...(parsed.siteConfig.bio || {}) },
            socials: { ...defaultSiteConfig.socials, ...(parsed.siteConfig.socials || {}) },
          };
          setSiteConfigState(mergedConfig);
          localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(mergedConfig));
        }

        if (Array.isArray(parsed.projects)) {
          setProjectsState(parsed.projects);
          localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(parsed.projects));
        }

        if (parsed.accentColor) {
          setAccentColorState(parsed.accentColor);
          localStorage.setItem(STORAGE_KEY_ACCENT, parsed.accentColor);
          document.documentElement.style.setProperty('--accent', parsed.accentColor);
        }

        setLastSaved(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US'));
        return { success: true, message: 'تم استيراد البيانات وتحديث الموقع بنجاح!' };
      } catch (err) {
        return {
          success: false,
          message: err instanceof Error ? err.message : 'خطأ في معالجة ملف JSON',
        };
      }
    },
    [language]
  );

  // Passcode unlock logic
  const unlockWithPasscode = useCallback(
    (code: string): boolean => {
      const cleanInput = code.trim();
      const currentCode = (ownerPasscode || '1234').trim();
      if (cleanInput === currentCode) {
        setIsOwnerUnlocked(true);
        try {
          sessionStorage.setItem(STORAGE_KEY_SESSION_UNLOCKED, 'true');
        } catch {
          // Ignore
        }
        setIsPasscodeModalOpen(false);
        setIsDashboardOpen(true);
        return true;
      }
      return false;
    },
    [ownerPasscode]
  );

  // Lock dashboard
  const lockDashboard = useCallback(() => {
    setIsOwnerUnlocked(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_SESSION_UNLOCKED);
    } catch {
      // Ignore
    }
    setIsDashboardOpen(false);
    setIsPasscodeModalOpen(false);
  }, []);

  // Update passcode
  const setOwnerPasscode = useCallback(
    (newCode: string) => {
      const clean = newCode.trim();
      setOwnerPasscodeState(clean);
      try {
        localStorage.setItem(STORAGE_KEY_PASSCODE, clean);
      } catch {
        // Ignore
      }
      updateSiteConfig((prev) => ({
        ...prev,
        ownerPasscode: clean,
      }));
    },
    [updateSiteConfig]
  );

  // Open dashboard request (gates behind passcode if locked)
  const requestOpenDashboard = useCallback(() => {
    if (isOwnerUnlocked) {
      setIsDashboardOpen(true);
    } else {
      setIsPasscodeModalOpen(true);
    }
  }, [isOwnerUnlocked]);

  // Live Feedback Toast when closing dashboard with changes applied
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const applyAndCloseDashboard = useCallback(() => {
    // 1. Refresh lastSaved
    const timeStr = new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US');
    setLastSaved(timeStr);
    // 2. Close modal so user can see their live website
    setIsDashboardOpen(false);
    // 3. Trigger toast notification on the live site
    const msg =
      language === 'ar'
        ? 'تم تطبيق التعديلات بنجاح! موقعك يعرض الآن أحدث بياناتك.'
        : 'Changes applied successfully! Your portfolio is now updated.';
    setAppliedToast(msg);
    setTimeout(() => {
      setAppliedToast(null);
    }, 4000);
  }, [language]);

  // Convert uploaded image file to Data URL with automatic optimization to fit browser localStorage safely
  const convertFileToDataUrl = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('الملف المرفوع ليس صورة صالحة'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') {
          reject(new Error('فشل في قراءة ملف الصورة'));
          return;
        }

        const rawDataUrl = reader.result;

        // Automatically optimize & compress high-res image to fit browser localStorage limits smoothly
        const img = new Image();
        img.onload = () => {
          const maxDimension = 1400;
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          try {
            // Prefer WebP with fallback to JPEG for optimal quality/size ratio (~100KB)
            const webp = canvas.toDataURL('image/webp', 0.82);
            resolve(webp.length < rawDataUrl.length ? webp : rawDataUrl);
          } catch {
            try {
              const jpeg = canvas.toDataURL('image/jpeg', 0.82);
              resolve(jpeg.length < rawDataUrl.length ? jpeg : rawDataUrl);
            } catch {
              resolve(rawDataUrl);
            }
          }
        };

        img.onerror = () => {
          resolve(rawDataUrl);
        };

        img.src = rawDataUrl;
      };
      reader.onerror = () => reject(reader.error || new Error('خطأ أثناء قراءة الملف'));
      reader.readAsDataURL(file);
    });
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        siteConfig,
        projects,
        language,
        setLanguage,
        toggleLanguage,
        updateSiteConfig,
        updateProjects,
        saveProject,
        deleteProject,
        reorderProjects,
        resetToDefaults,
        exportJSON,
        importJSON,
        isDashboardOpen,
        setIsDashboardOpen,
        lastSaved,
        accentColor,
        setAccentColor,
        isPasscodeModalOpen,
        setIsPasscodeModalOpen,
        isOwnerUnlocked,
        ownerPasscode,
        unlockWithPasscode,
        lockDashboard,
        setOwnerPasscode,
        requestOpenDashboard,
        appliedToast,
        applyAndCloseDashboard,
        convertFileToDataUrl,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
