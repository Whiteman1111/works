import { Language } from '../types';

export interface Translations {
  nav: {
    home: string;
    work: string;
    about: string;
    expertise: string;
    bio: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    greeting: string;
    exploreWork: string;
    aboutMe: string;
    viewInstagram: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    allFilter: string;
    viewProject: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  projectDetail: {
    backToWork: string;
    overview: string;
    client: string;
    year: string;
    role: string;
    challenge: string;
    creativeDirection: string;
    gallery: string;
    finalResult: string;
    nextProject: string;
    prevProject: string;
    shareProject: string;
    copiedLink: string;
    visitLive: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    quote: string;
    quoteAuthor: string;
    experienceBadge: string;
    openBio: string;
  };
  bioModal: {
    title: string;
    subtitle: string;
    close: string;
    summaryTab: string;
    experienceTab: string;
    toolsTab: string;
    credentialsTab: string;
    yearsOfExperience: string;
    specializations: string;
    toolsAndSoftware: string;
    selectedClients: string;
    education: string;
    certifications: string;
    achievements: string;
    contactAction: string;
  };
  expertise: {
    eyebrow: string;
    title: string;
    subtitle: string;
    deliverables: string;
  };
  contactCTA: {
    headline: string;
    subheadline: string;
    button: string;
    emailLabel: string;
  };
  bottomBar: {
    status: string;
    ctaInstagram: string;
    copyEmail: string;
    emailCopied: string;
    locationLabel: string;
  };
  footer: {
    tagline: string;
    allRightsReserved: string;
    backToTop: string;
    designedWithIntention: string;
  };
  notFound: {
    code: string;
    title: string;
    desc: string;
    backHome: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      work: 'أعمال مختارة',
      about: 'من أنا',
      expertise: 'الخدمات',
      bio: 'السيرة المهنية',
      contact: 'تواصل معي',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },
    hero: {
      greeting: 'مرحباً، أنا نوران طارق',
      exploreWork: 'اكتشف أعمالي',
      aboutMe: 'من أنا',
      viewInstagram: 'إنستغرام',
    },
    portfolio: {
      eyebrow: 'معرض الأعمال',
      title: 'أعمال مختارة',
      allFilter: 'الكل',
      viewProject: 'عرض المشروع',
      emptyTitle: 'نعمل حالياً على إضافة أحدث المشاريع.',
      emptySubtitle: 'ترقبوا قريباً مشاريع جديدة في الهويات البصرية والتغليف الفاخر.',
    },
    projectDetail: {
      backToWork: 'العودة إلى الأعمال',
      overview: 'نظرة عامة',
      client: 'العميل',
      year: 'السنة',
      role: 'الدور الإبداعي',
      challenge: 'التحدي الإبداعي',
      creativeDirection: 'التوجيه الفني والرؤية',
      gallery: 'معرض المشروع',
      finalResult: 'النتيجة والأثر',
      nextProject: 'المشروع التالي',
      prevProject: 'المشروع السابق',
      shareProject: 'مشاركة المشروع',
      copiedLink: 'تم نسخ الرابط إلى الحافظة',
      visitLive: 'زيارة المشروع',
    },
    about: {
      eyebrow: 'الفلسفة والرؤية',
      title: 'من أنا',
      intro: 'مصممة متعددة التخصصات، أركز على بناء الهويات البصرية والتجارب الرقمية التي تجمع بين الجمال والوضوح والهدف. أؤمن أن التصميم الناجح لا يقتصر على المظهر، بل يصنع تواصلاً حقيقياً ويترك أثراً.',
      quote: 'التصميم العظيم لا يصرخ لجذب الانتباه، بل يخلق حالة من السكون الواثق والارتباط العاطفي الصادق.',
      quoteAuthor: 'نوران طارق',
      experienceBadge: 'سنوات من الممارسة الإبداعية المتقنة',
      openBio: 'عرض السيرة المهنية الكاملة',
    },
    bioModal: {
      title: 'السيرة المهنية',
      subtitle: 'مسيرة إبداعية تركز على صقل الهويات البصرية وتوجيه الفنون',
      close: 'إغلاق',
      summaryTab: 'نظرة عامة',
      experienceTab: 'الخبرات والتخصص',
      toolsTab: 'الأدوات والعملاء',
      credentialsTab: 'التعليم والجوائز',
      yearsOfExperience: 'سنوات الخبرة',
      specializations: 'مجالات التخصص الدقيق',
      toolsAndSoftware: 'البرمجيات والأدوات المعتمدة',
      selectedClients: 'عملاء مختارون ومؤسسات',
      education: 'المؤهلات الأكاديمية',
      certifications: 'الشهادات الاحترافية',
      achievements: 'الجوائز والتقديرات',
      contactAction: 'بدء مشروع جديد معاً',
    },
    expertise: {
      eyebrow: 'القدرات الإبداعية',
      title: 'مجالات الخبرة',
      subtitle: 'حلول تصميمية مصممة خصيصاً للعلامات التجارية التي تقدر التميز والفرادة.',
      deliverables: 'المخرجات',
    },
    contactCTA: {
      headline: 'عندك فكرة لمشروع؟',
      subheadline: 'خلينا نحوّل فكرتك إلى تجربة بصرية مميزة تترك انطباعاً لا يُنسى.',
      button: 'تواصل معي على إنستغرام',
      emailLabel: 'أو راسلني عبر البريد الإلكتروني',
    },
    bottomBar: {
      status: 'متاحة للتعاقد والمشاريع الإبداعية',
      ctaInstagram: 'تواصل معي عبر إنستغرام',
      copyEmail: 'نسخ البريد',
      emailCopied: 'تم نسخ البريد الإلكتروني',
      locationLabel: 'المقر',
    },
    footer: {
      tagline: 'أصنع هويات بصرية وتجارب رقمية بهدوء وإتقان.',
      allRightsReserved: 'جميع الحقوق محفوظة.',
      backToTop: 'العودة للأعلى',
      designedWithIntention: 'صُمم بنية وهدف.',
    },
    notFound: {
      code: '404',
      title: 'يبدو أن هذه الصفحة تجولت خارج لوحة الرسم.',
      desc: 'المشروع أو الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      backHome: 'العودة للرئيسية',
    },
  },
  en: {
    nav: {
      home: 'Home',
      work: 'Portfolio',
      about: 'About',
      expertise: 'Expertise',
      bio: 'Professional Bio',
      contact: 'Contact',
      openMenu: 'Open Menu',
      closeMenu: 'Close Menu',
    },
    hero: {
      greeting: "Hello, I'm Nouran Tariq",
      exploreWork: 'Explore My Work',
      aboutMe: 'About Me',
      viewInstagram: 'Instagram',
    },
    portfolio: {
      eyebrow: 'Curated Works',
      title: 'Selected Work',
      allFilter: 'All',
      viewProject: 'View Project',
      emptyTitle: 'New work is being prepared.',
      emptySubtitle: 'Check back soon for latest case studies in brand identity and tactile packaging.',
    },
    projectDetail: {
      backToWork: 'Back to Portfolio',
      overview: 'Overview',
      client: 'Client',
      year: 'Year',
      role: 'Creative Role',
      challenge: 'The Challenge',
      creativeDirection: 'Creative Direction',
      gallery: 'Project Gallery',
      finalResult: 'Impact & Result',
      nextProject: 'Next Project',
      prevProject: 'Previous Project',
      shareProject: 'Share Project',
      copiedLink: 'Link copied to clipboard',
      visitLive: 'Visit Live Site',
    },
    about: {
      eyebrow: 'Philosophy & Craft',
      title: 'About Me',
      intro: "I'm a multidisciplinary designer focused on creating thoughtful visual identities and digital experiences. I believe good design should not only look beautiful — it should communicate, connect, and leave a lasting impression.",
      quote: 'Great design never shouts for attention; it cultivates a poised stillness and creates a genuine emotional resonance.',
      quoteAuthor: 'Nouran Tariq',
      experienceBadge: 'Years of rigorous creative practice',
      openBio: 'View Full Professional Bio',
    },
    bioModal: {
      title: 'Professional Biography',
      subtitle: 'A practice dedicated to typographic nuance and high-touch art direction',
      close: 'Close',
      summaryTab: 'Overview',
      experienceTab: 'Practice & Specializations',
      toolsTab: 'Tools & Clients',
      credentialsTab: 'Education & Honors',
      yearsOfExperience: 'Years of Experience',
      specializations: 'Core Specializations',
      toolsAndSoftware: 'Software & Production Tools',
      selectedClients: 'Selected Clients & Collaborators',
      education: 'Academic Background',
      certifications: 'Professional Accreditations',
      achievements: 'Honors & Recognition',
      contactAction: 'Initiate a Commission',
    },
    expertise: {
      eyebrow: 'Capabilities',
      title: 'Areas of Expertise',
      subtitle: 'Tailored visual solutions built for brands and founders who value distinction.',
      deliverables: 'Deliverables',
    },
    contactCTA: {
      headline: 'Have a project in mind?',
      subheadline: "Let's create something memorable together that leaves an enduring mark.",
      button: 'Contact Me on Instagram',
      emailLabel: 'Or reach out directly via email',
    },
    bottomBar: {
      status: 'Available for freelance commissions',
      ctaInstagram: 'CONTACT ME ON INSTAGRAM',
      copyEmail: 'Copy Email',
      emailCopied: 'Email copied to clipboard',
      locationLabel: 'Base',
    },
    footer: {
      tagline: 'Crafting thoughtful visual identities with poise and intent.',
      allRightsReserved: 'All rights reserved.',
      backToTop: 'Back to Top',
      designedWithIntention: 'Designed with intention.',
    },
    notFound: {
      code: '404',
      title: 'Looks like this page wandered outside the canvas.',
      desc: 'The project or destination you are seeking does not exist or has been archived.',
      backHome: 'Back Home',
    },
  },
};
