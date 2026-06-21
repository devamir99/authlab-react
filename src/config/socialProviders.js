export const socialProviderConfig = {
  google: {
    id: 'google',
    route: '/auth/social/google',
    brandColor: '#4285F4',
    forceLight: true,
    demoEmail: 'demo@gmail.com',
    demoName: { en: 'Demo User', fa: 'کاربر Demo' },
  },
  github: {
    id: 'github',
    route: '/auth/social/github',
    brandColor: '#238636',
    forceLight: false,
    darkCard: true,
    demoEmail: 'demo@github.com',
    demoName: { en: 'Demo Dev', fa: 'توسعه‌دهنده Demo' },
  },
  apple: {
    id: 'apple',
    route: '/auth/social/apple',
    brandColor: '#000000',
    forceLight: false,
    darkCard: true,
    demoEmail: 'demo@icloud.com',
    demoName: { en: 'Demo User', fa: 'کاربر Demo' },
  },
  microsoft: {
    id: 'microsoft',
    route: '/auth/social/microsoft',
    brandColor: '#0078D4',
    forceLight: true,
    demoEmail: 'demo@outlook.com',
    demoName: { en: 'Demo User', fa: 'کاربر Demo' },
  },
};

export const socialProviders = Object.values(socialProviderConfig);

export const getSocialProvider = (id) => socialProviderConfig[id] ?? null;
