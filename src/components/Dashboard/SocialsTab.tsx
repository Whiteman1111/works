import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Share2, Instagram, Linkedin, Globe } from 'lucide-react';

export const SocialsTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, language } = usePortfolio();
  const socials = siteConfig.socials;

  const handleUpdateSocial = (platform: keyof typeof socials, value: string) => {
    updateSiteConfig((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value,
      },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Primary Direct Channels */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Mail className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'البريد الإلكتروني وقنوات التواصل المباشرة' : 'Direct Inquiries & Channels'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'البريد الإلكتروني الرسمي للاستفسارات' : 'Official Inquiry Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-[#77736F]" />
              <input
                type="email"
                value={siteConfig.email}
                onChange={(e) => updateSiteConfig((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                placeholder="hello@yourdomain.com"
                dir="ltr"
              />
            </div>
            <p className="text-[11px] text-[#77736F] mt-1">
              {language === 'ar'
                ? 'يستخدم في أزرار نسخ البريد وزر التواصل السريع في أسفل الموقع.'
                : 'Powering the copy email buttons and direct bottom contact bar.'}
            </p>
          </div>

          {/* Instagram */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'رابط حساب انستقرام (Instagram)' : 'Instagram Direct Profile URL'}
            </label>
            <div className="relative">
              <Instagram className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-[#B49A7A]" />
              <input
                type="url"
                value={socials.instagram}
                onChange={(e) => handleUpdateSocial('instagram', e.target.value)}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                placeholder="https://instagram.com/..."
                dir="ltr"
              />
            </div>
            <p className="text-[11px] text-[#77736F] mt-1">
              {language === 'ar'
                ? 'القناة الرئيسية للتواصل المباشر مع العملاء ومشاريع الهوية.'
                : 'Primary direct conversation channel for brand commissions.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Professional Portfolios & Networks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Share2 className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'المنصات الإبداعية والشبكات المهنية' : 'Creative Platforms & Networks'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Behance */}
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              Behance Portfolio URL
            </label>
            <input
              type="url"
              value={socials.behance}
              onChange={(e) => handleUpdateSocial('behance', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              placeholder="https://behance.net/..."
              dir="ltr"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={socials.linkedin}
              onChange={(e) => handleUpdateSocial('linkedin', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              placeholder="https://linkedin.com/in/..."
              dir="ltr"
            />
          </div>

          {/* Dribbble */}
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              Dribbble Shots URL
            </label>
            <input
              type="url"
              value={socials.dribbble || ''}
              onChange={(e) => handleUpdateSocial('dribbble', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              placeholder="https://dribbble.com/..."
              dir="ltr"
            />
          </div>

          {/* Pinterest */}
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              Pinterest Moodboards URL
            </label>
            <input
              type="url"
              value={socials.pinterest || ''}
              onChange={(e) => handleUpdateSocial('pinterest', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              placeholder="https://pinterest.com/..."
              dir="ltr"
            />
          </div>

          {/* TikTok */}
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              TikTok Profile URL
            </label>
            <input
              type="url"
              value={socials.tiktok || ''}
              onChange={(e) => handleUpdateSocial('tiktok', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              placeholder="https://tiktok.com/@..."
              dir="ltr"
            />
          </div>

          {/* X / Twitter */}
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              X (formerly Twitter) URL
            </label>
            <input
              type="url"
              value={socials.x || ''}
              onChange={(e) => handleUpdateSocial('x', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              placeholder="https://x.com/..."
              dir="ltr"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
