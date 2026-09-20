import React from 'react';
import {
  InstagramIcon,
  BehanceIcon,
  DribbbleIcon,
  LinkedInIcon,
  PinterestIcon,
  XIcon,
  TikTokIcon,
  YouTubeIcon,
} from './SocialIcons';
import { Language } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface SocialLinksProps {
  language: Language;
  variant?: 'hero' | 'footer' | 'compact';
}

interface PlatformItem {
  id: string;
  name: string;
  nameAr: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ language, variant = 'hero' }) => {
  const { siteConfig } = usePortfolio();
  const platforms: PlatformItem[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      nameAr: 'إنستغرام',
      url: siteConfig.socials.instagram,
      icon: InstagramIcon,
    },
    {
      id: 'behance',
      name: 'Behance',
      nameAr: 'بيهانس',
      url: siteConfig.socials.behance,
      icon: BehanceIcon,
    },
    {
      id: 'dribbble',
      name: 'Dribbble',
      nameAr: 'دريبل',
      url: siteConfig.socials.dribbble,
      icon: DribbbleIcon,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      nameAr: 'لينكدإن',
      url: siteConfig.socials.linkedin,
      icon: LinkedInIcon,
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      nameAr: 'بينترست',
      url: siteConfig.socials.pinterest,
      icon: PinterestIcon,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      nameAr: 'تيك توك',
      url: siteConfig.socials.tiktok,
      icon: TikTokIcon,
    },
    {
      id: 'x',
      name: 'X',
      nameAr: 'إكس',
      url: siteConfig.socials.x,
      icon: XIcon,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      nameAr: 'يوتيوب',
      url: siteConfig.socials.youtube,
      icon: YouTubeIcon,
    },
  ].filter((p) => Boolean(p.url));

  if (platforms.length === 0) return null;

  return (
    <div
      id="social-presence-section"
      className={`w-full ${
        variant === 'hero' ? 'py-6 md:py-8' : 'py-2'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {variant === 'hero' && (
          <span className="text-[12px] uppercase font-medium tracking-wider text-[#77736F] me-2 select-none">
            {language === 'ar' ? 'المنصات الإبداعية' : 'Creative Channels'}
          </span>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const displayName = language === 'ar' ? platform.nameAr : platform.name;

            return (
              <a
                key={platform.id}
                id={`social-link-${platform.id}`}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${platform.name} - ${siteConfig.designerName[language]}`}
                className="group relative flex items-center justify-center rounded-full bg-[#EFECE7] hover:bg-[#171717] text-[#171717] hover:text-[#F7F5F2] border border-[#171717]/10 hover:border-[#171717] transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A] h-11 px-3.5 sm:px-4 md:hover:scale-105"
              >
                {/* Platform Icon */}
                <div className="transition-transform duration-300 ease-out group-hover:scale-110">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Platform Label (Readable on mobile and expands elegantly on desktop) */}
                <span className="text-[12px] font-medium tracking-tight ms-2.5 transition-colors duration-300">
                  {displayName}
                </span>

                {/* Subtle gold accent dot on hover */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#B49A7A] ms-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline-block" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
