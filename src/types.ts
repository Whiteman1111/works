export type Language = 'ar' | 'en';

export interface Project {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  year: string;
  cover: string;
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'wide';
  images: {
    url: string;
    captionAr?: string;
    captionEn?: string;
  }[];
  descriptionAr: string;
  descriptionEn: string;
  roleAr: string;
  roleEn: string;
  clientAr?: string;
  clientEn?: string;
  challengeAr?: string;
  challengeEn?: string;
  directionAr?: string;
  directionEn?: string;
  resultAr?: string;
  resultEn?: string;
  featured: boolean;
  externalUrl?: string;
}

export interface Capability {
  number: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  previewImage: string;
  tagsAr: string[];
  tagsEn: string[];
}

export interface BioData {
  summaryAr: string;
  summaryEn: string;
  yearsExperience: string;
  specializationsAr: string[];
  specializationsEn: string[];
  tools: {
    name: string;
    category: string;
  }[];
  clients: string[];
  education: {
    degreeAr: string;
    degreeEn: string;
    institutionAr: string;
    institutionEn: string;
    year: string;
  }[];
  certificates: {
    titleAr: string;
    titleEn: string;
    issuer: string;
    year: string;
  }[];
  achievements: {
    titleAr: string;
    titleEn: string;
    year: string;
  }[];
}

export interface LogoConfig {
  mode: 'monogram' | 'image' | 'textOnly';
  imageUrl?: string;
  imageHeight?: number; // In pixels, default 36
  monogramText?: string; // Custom letter/characters e.g. 'N', 'ن', 'HS'
  monogramShape?: 'rounded' | 'circle' | 'square';
  showAccentDot?: boolean;
  hideTagline?: boolean;
  customTaglineAr?: string;
  customTaglineEn?: string;
}

export interface SiteConfig {
  logo?: LogoConfig;
  designerName: {
    ar: string;
    en: string;
  };
  title: {
    ar: string;
    en: string;
  };
  roles: {
    ar: string;
    en: string;
  };
  heroHeadline: {
    ar: string;
    en: string;
  };
  heroSupportingText: {
    ar: string;
    en: string;
  };
  aboutIntro?: {
    ar: string;
    en: string;
  };
  aboutQuote?: {
    ar: string;
    en: string;
  };
  establishedYear?: string;
  accentColor?: string;
  ownerPasscode?: string;
  hiddenPlatforms?: string[];
  customPlatforms?: {
    id: string;
    name: string;
    nameAr: string;
    url: string;
    icon?: string;
    enabled?: boolean;
  }[];
  socials: {
    instagram: string;
    behance: string;
    dribbble?: string;
    linkedin: string;
    pinterest?: string;
    tiktok?: string;
    x?: string;
    youtube?: string;
  };
  email: string;
  location: {
    ar: string;
    en: string;
  };
  availabilityStatus: {
    ar: string;
    en: string;
  };
  portraitImage: string;
  bio: BioData;
  capabilities: Capability[];
}
