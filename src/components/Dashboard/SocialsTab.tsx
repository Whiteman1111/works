import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Mail,
  Share2,
  Instagram,
  Linkedin,
  Globe,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  InstagramIcon,
  BehanceIcon,
  DribbbleIcon,
  LinkedInIcon,
  PinterestIcon,
  XIcon,
  TikTokIcon,
  YouTubeIcon,
  GlobeIcon,
  GitHubIcon,
  WhatsAppIcon,
  TelegramIcon,
} from '../SocialIcons';

interface PlatformMeta {
  id: string;
  name: string;
  nameAr: string;
  defaultPlaceholder: string;
  category: 'social' | 'portfolio' | 'messaging';
  icon: React.ComponentType<{ className?: string }>;
}

const BUILTIN_PLATFORMS: PlatformMeta[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    nameAr: 'إنستغرام',
    defaultPlaceholder: 'https://instagram.com/username',
    category: 'social',
    icon: InstagramIcon,
  },
  {
    id: 'behance',
    name: 'Behance',
    nameAr: 'بيهانس',
    defaultPlaceholder: 'https://behance.net/username',
    category: 'portfolio',
    icon: BehanceIcon,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    nameAr: 'لينكدإن',
    defaultPlaceholder: 'https://linkedin.com/in/username',
    category: 'portfolio',
    icon: LinkedInIcon,
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    nameAr: 'دريبل',
    defaultPlaceholder: 'https://dribbble.com/username',
    category: 'portfolio',
    icon: DribbbleIcon,
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    nameAr: 'بينترست',
    defaultPlaceholder: 'https://pinterest.com/username',
    category: 'social',
    icon: PinterestIcon,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    nameAr: 'تيك توك',
    defaultPlaceholder: 'https://tiktok.com/@username',
    category: 'social',
    icon: TikTokIcon,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    nameAr: 'إكس (تويتر)',
    defaultPlaceholder: 'https://x.com/username',
    category: 'social',
    icon: XIcon,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    nameAr: 'يوتيوب',
    defaultPlaceholder: 'https://youtube.com/@channel',
    category: 'social',
    icon: YouTubeIcon,
  },
];

export const SocialsTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, language } = usePortfolio();
  const socials = siteConfig.socials;
  const hiddenPlatforms = siteConfig.hiddenPlatforms || [];
  const customPlatforms = siteConfig.customPlatforms || [];

  // New Custom Platform state
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customNameAr, setCustomNameAr] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customIcon, setCustomIcon] = useState('globe');

  const handleUpdateSocial = (platform: keyof typeof socials, value: string) => {
    updateSiteConfig((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value,
      },
    }));
  };

  const togglePlatformVisibility = (platformId: string) => {
    updateSiteConfig((prev) => {
      const currentHidden = prev.hiddenPlatforms || [];
      const isHidden = currentHidden.includes(platformId);
      const newHidden = isHidden
        ? currentHidden.filter((id) => id !== platformId)
        : [...currentHidden, platformId];

      return {
        ...prev,
        hiddenPlatforms: newHidden,
      };
    });
  };

  const handleAddCustomPlatform = () => {
    if (!customName.trim() || !customUrl.trim()) return;

    const newPlatform = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      nameAr: customNameAr.trim() || customName.trim(),
      url: customUrl.trim(),
      icon: customIcon,
      enabled: true,
    };

    updateSiteConfig((prev) => ({
      ...prev,
      customPlatforms: [...(prev.customPlatforms || []), newPlatform],
    }));

    setCustomName('');
    setCustomNameAr('');
    setCustomUrl('');
    setCustomIcon('globe');
    setIsAddingCustom(false);
  };

  const handleDeleteCustomPlatform = (id: string) => {
    updateSiteConfig((prev) => ({
      ...prev,
      customPlatforms: (prev.customPlatforms || []).filter((p) => p.id !== id),
      hiddenPlatforms: (prev.hiddenPlatforms || []).filter((hId) => hId !== id),
    }));
  };

  const handleUpdateCustomPlatformUrl = (id: string, newUrl: string) => {
    updateSiteConfig((prev) => ({
      ...prev,
      customPlatforms: (prev.customPlatforms || []).map((p) =>
        p.id === id ? { ...p, url: newUrl } : p
      ),
    }));
  };

  // Quick helper to see if platform is active/shown on site
  const isPlatformActive = (id: string, url?: string) => {
    if (!url || !url.trim()) return false;
    return !hiddenPlatforms.includes(id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Overview Notice */}
      <div className="p-4 rounded-2xl bg-[#EFECE7] border border-[#171717]/8 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-[#171717] text-[#B49A7A] flex items-center justify-center shrink-0 mt-0.5">
          <Share2 className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-semibold text-[#171717]">
            {language === 'ar'
              ? 'إدارة المنصات الإبداعية وحسابات التواصل'
              : 'Creative Channels & Visibility Controls'}
          </p>
          <p className="text-[#77736F] leading-relaxed">
            {language === 'ar'
              ? 'يمكنك الآن إخفاء أي منصة لا تملك حساباً فيها بضغطة زر، أو إضافة منصة أو رابط مخصص بالكامل. المنصات المخفية أو التي بدون رابط لن تظهر في الموقع.'
              : 'Hide any channel you do not use with a single click, or add custom platforms. Hidden platforms or ones with empty URLs will not appear on the website.'}
          </p>
        </div>
      </div>

      {/* 1. Official Email */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Mail className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'البريد الإلكتروني الرسمي للاستفسارات' : 'Direct Inquiry Email'}
          </h3>
        </div>

        <div className="bg-[#F7F5F2] border border-[#171717]/10 p-4 sm:p-5 rounded-2xl space-y-2">
          <label className="block text-xs font-medium text-[#77736F]">
            {language === 'ar' ? 'عنوان البريد الإلكتروني' : 'Official Email Address'}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-[#77736F]" />
            <input
              type="email"
              value={siteConfig.email}
              onChange={(e) => updateSiteConfig((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-white border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              placeholder="hello@yourdomain.com"
              dir="ltr"
            />
          </div>
          <p className="text-[11px] text-[#77736F]">
            {language === 'ar'
              ? 'يغذي أزرار نسخ البريد الإلكتروني في الشريط السفلي وقسم التواصل.'
              : 'Used for the direct copy email buttons and bottom inquiries bar.'}
          </p>
        </div>
      </section>

      {/* 2. Built-in Creative & Professional Platforms */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#171717]/8">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#B49A7A]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar' ? 'المنصات الإبداعية والشبكات' : 'Creative Platforms & Networks'}
            </h3>
          </div>
          <span className="text-[11px] text-[#77736F] font-mono">
            {language === 'ar' ? 'إظهار / إخفاء بنقرة واحدة' : '1-Click Toggle'}
          </span>
        </div>

        <div className="space-y-3">
          {BUILTIN_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const currentUrl = socials[platform.id as keyof typeof socials] || '';
            const isHidden = hiddenPlatforms.includes(platform.id);
            const active = isPlatformActive(platform.id, currentUrl);

            return (
              <div
                key={platform.id}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  isHidden
                    ? 'bg-[#EFECE7]/50 border-dashed border-[#171717]/15 opacity-70'
                    : active
                    ? 'bg-white border-[#171717]/10 shadow-xs'
                    : 'bg-[#F7F5F2] border-[#171717]/8'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Platform Identity & Status */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                        isHidden
                          ? 'bg-[#77736F]/10 text-[#77736F]'
                          : active
                          ? 'bg-[#171717] text-[#B49A7A]'
                          : 'bg-[#EFECE7] text-[#171717]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-[#171717]">
                          {language === 'ar' ? platform.nameAr : platform.name}
                        </h4>
                        {/* Status Chip */}
                        {isHidden ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#171717]/6 text-[#77736F]">
                            {language === 'ar' ? 'مخفي من الموقع' : 'Hidden'}
                          </span>
                        ) : active ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            {language === 'ar' ? 'ظاهر بالموقع' : 'Active'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100/80 text-amber-900">
                            {language === 'ar' ? 'الرابط فارغ' : 'Empty URL'}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#77736F] font-mono">
                        {platform.name}
                      </span>
                    </div>
                  </div>

                  {/* Right: Visibility Toggle Button */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => togglePlatformVisibility(platform.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                        isHidden
                          ? 'bg-[#171717] text-[#F7F5F2] hover:bg-[#B49A7A]'
                          : 'bg-[#EFECE7] text-[#171717] hover:bg-[#E2DDD5]'
                      }`}
                    >
                      {isHidden ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'إظهار المنصة' : 'Show Channel'}</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-[#77736F]" />
                          <span>{language === 'ar' ? 'إخفاء المنصة' : 'Hide Channel'}</span>
                        </>
                      )}
                    </button>

                    {currentUrl && (
                      <a
                        href={currentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl text-[#77736F] hover:text-[#171717] hover:bg-[#EFECE7] transition-colors"
                        title={language === 'ar' ? 'فتح الرابط لتجربته' : 'Test Link'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* URL Input */}
                <div className="mt-3 pt-3 border-t border-[#171717]/6">
                  <div className="relative">
                    <input
                      type="url"
                      value={currentUrl}
                      onChange={(e) =>
                        handleUpdateSocial(platform.id as keyof typeof socials, e.target.value)
                      }
                      disabled={isHidden}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-[#B49A7A] ${
                        isHidden
                          ? 'bg-[#EFECE7]/60 border-transparent text-[#77736F] cursor-not-allowed'
                          : 'bg-[#F7F5F2] border-[#171717]/10 text-[#171717]'
                      }`}
                      placeholder={platform.defaultPlaceholder}
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Custom Added Platforms */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#171717]/8">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#B49A7A]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar' ? 'منصات وروابط إضافية مخصصة' : 'Custom Platforms & Portals'}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] text-[#F7F5F2] hover:bg-[#B49A7A] text-xs font-medium cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة منصة جديدة' : 'Add Custom Platform'}</span>
          </button>
        </div>

        {/* Add New Custom Platform Form */}
        {isAddingCustom && (
          <div className="p-5 rounded-2xl bg-white border border-[#B49A7A]/40 shadow-md space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#171717]/8 pb-2">
              <h4 className="text-xs font-semibold text-[#171717]">
                {language === 'ar' ? 'إضافة منصة أو رابط مخصص' : 'New Platform Configuration'}
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="text-xs text-[#77736F] hover:text-[#171717]"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-medium text-[#77736F] mb-1">
                  {language === 'ar' ? 'اسم المنصة بالإنجليزية' : 'Platform Name (EN)'}
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. WhatsApp, ArtStation, Threads"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#77736F] mb-1">
                  {language === 'ar' ? 'اسم المنصة بالعربية' : 'Platform Name (AR)'}
                </label>
                <input
                  type="text"
                  value={customNameAr}
                  onChange={(e) => setCustomNameAr(e.target.value)}
                  placeholder="مثلاً: واتساب، آرت ستيشن، ثريدز"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-[#77736F] mb-1">
                  {language === 'ar' ? 'رابط الحساب (URL)' : 'Direct URL'}
                </label>
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://..."
                  dir="ltr"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-[#77736F] mb-1.5">
                  {language === 'ar' ? 'أيقونة المنصة' : 'Icon Style'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'globe', label: 'Globe / Web' },
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'telegram', label: 'Telegram' },
                    { id: 'github', label: 'GitHub' },
                    { id: 'youtube', label: 'YouTube' },
                  ].map((ic) => (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() => setCustomIcon(ic.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                        customIcon === ic.id
                          ? 'bg-[#171717] text-[#F7F5F2]'
                          : 'bg-[#EFECE7] text-[#171717] hover:bg-[#E2DDD5]'
                      }`}
                    >
                      {ic.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleAddCustomPlatform}
                disabled={!customName.trim() || !customUrl.trim()}
                className="px-5 py-2 rounded-xl bg-[#B49A7A] hover:bg-[#9E8465] disabled:opacity-50 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'حفظ وإضافة للموقع' : 'Save & Add Platform'}
              </button>
            </div>
          </div>
        )}

        {/* Custom Platforms List */}
        {customPlatforms.length > 0 ? (
          <div className="space-y-3">
            {customPlatforms.map((cp) => {
              const isHidden = hiddenPlatforms.includes(cp.id);

              return (
                <div
                  key={cp.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    isHidden
                      ? 'bg-[#EFECE7]/50 border-dashed border-[#171717]/15 opacity-70'
                      : 'bg-white border-[#171717]/10 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#171717] text-[#B49A7A] flex items-center justify-center shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-[#171717]">
                            {language === 'ar' ? cp.nameAr : cp.name}
                          </h4>
                          {isHidden ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#171717]/6 text-[#77736F]">
                              {language === 'ar' ? 'مخفي' : 'Hidden'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              {language === 'ar' ? 'ظاهر' : 'Active'}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#77736F] font-mono">
                          {cp.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => togglePlatformVisibility(cp.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                          isHidden
                            ? 'bg-[#171717] text-[#F7F5F2] hover:bg-[#B49A7A]'
                            : 'bg-[#EFECE7] text-[#171717] hover:bg-[#E2DDD5]'
                        }`}
                      >
                        {isHidden ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'إظهار' : 'Show'}</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-[#77736F]" />
                            <span>{language === 'ar' ? 'إخفاء' : 'Hide'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCustomPlatform(cp.id)}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title={language === 'ar' ? 'حذف المنصة' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#171717]/6">
                    <input
                      type="url"
                      value={cp.url}
                      onChange={(e) => handleUpdateCustomPlatformUrl(cp.id, e.target.value)}
                      disabled={isHidden}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-[#B49A7A] ${
                        isHidden
                          ? 'bg-[#EFECE7]/60 border-transparent text-[#77736F] cursor-not-allowed'
                          : 'bg-[#F7F5F2] border-[#171717]/10 text-[#171717]'
                      }`}
                      placeholder="https://..."
                      dir="ltr"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !isAddingCustom && (
            <div className="text-center py-6 px-4 rounded-2xl bg-[#EFECE7]/40 border border-dashed border-[#171717]/10 text-xs text-[#77736F]">
              {language === 'ar'
                ? 'لا توجد منصات إضافية مخصصة حتى الآن. اضغط على زر "إضافة منصة جديدة" بالأعلى لإضافة أي رابط تريده.'
                : 'No custom platforms added yet. Click "Add Custom Platform" to add any custom portal link.'}
            </div>
          )
        )}
      </section>
    </div>
  );
};

