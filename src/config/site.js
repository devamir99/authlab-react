/**
 * Single source of truth for site metadata, author contact, and external links.
 * Used across UI (Navbar, Footer, CTA) and documentation.
 */
export const site = {
  name: 'AuthLab',
  brand: 'DevAmir',
  author: 'Amir',

  tagline: {
    en: 'Auth Experience Lab — Mock UI Showcase',
    fa: 'آزمایشگاه تجربه ورود — نمایش رابط کاربری',
  },

  description: {
    en: 'A bilingual mock authentication UI showcasing email, social, SMS, and passwordless sign-in flows. No backend — demonstration only.',
    fa: 'رابط کاربری دو زبانه mock برای نمایش جریان‌های ورود با ایمیل، شبکه‌های اجتماعی، پیامک و لینک جادویی. بدون backend — فقط برای نمایش.',
  },

  url: 'https://devamir.com',
  projects: 'https://devamir.com/en/projects',
  contactPage: 'https://devamir.com/en/contact',
  email: 'devamir99@gmail.com',
  phone: '09205007494',

  social: {
    github: 'https://github.com/devamir99',
    linkedin: 'https://www.linkedin.com/in/devamir/',
    instagram: 'https://www.instagram.com/devamirr',
    telegram: 'https://t.me/devamir99',
  },

  repo: 'https://github.com/devamir99/authlab-react',

  cta: {
    portfolio: {
      en: 'View Projects',
      fa: 'نمونه‌کارها',
    },
    contact: {
      en: 'Request Consultation',
      fa: 'درخواست مشاوره',
    },
    explore: {
      en: 'Explore Auth Flows',
      fa: 'کاوش جریان‌های ورود',
    },
  },
};

export const contactLinks = [
  {
    id: 'projects',
    label: { en: 'Projects', fa: 'نمونه‌کارها' },
    href: site.projects,
    external: true,
  },
  {
    id: 'contact',
    label: { en: 'Consultation', fa: 'درخواست مشاوره' },
    href: site.contactPage,
    external: true,
  },
  {
    id: 'email',
    label: { en: 'Email', fa: 'ایمیل' },
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    id: 'telegram',
    label: { en: 'Telegram', fa: 'تلگرام' },
    href: site.social.telegram,
    external: true,
  },
  {
    id: 'linkedin',
    label: { en: 'LinkedIn', fa: 'لینکدین' },
    href: site.social.linkedin,
    external: true,
  },
  {
    id: 'instagram',
    label: { en: 'Instagram', fa: 'اینستاگرام' },
    href: site.social.instagram,
    external: true,
  },
  {
    id: 'github',
    label: { en: 'GitHub', fa: 'گیت‌هاب' },
    href: site.social.github,
    external: true,
  },
  {
    id: 'phone',
    label: { en: 'Phone', fa: 'تلفن' },
    href: `tel:+98${site.phone.replace(/^0/, '')}`,
    external: false,
  },
];
