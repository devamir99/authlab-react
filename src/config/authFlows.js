export { socialProviders } from './socialProviders.js';

export const authFlowCategories = [
  {
    id: 'social',
    icon: 'social',
    route: '/auth/social',
    titleKey: 'authHub.social.title',
    descKey: 'authHub.social.desc',
    providersKey: 'authHub.social.providers',
  },
  {
    id: 'email',
    icon: 'email',
    route: '/auth/email',
    titleKey: 'authHub.email.title',
    descKey: 'authHub.email.desc',
    providersKey: 'authHub.email.providers',
  },
  {
    id: 'phone',
    icon: 'phone',
    route: '/auth/phone',
    titleKey: 'authHub.phone.title',
    descKey: 'authHub.phone.desc',
    providersKey: 'authHub.phone.providers',
  },
  {
    id: 'magic-link',
    icon: 'magic-link',
    route: '/auth/magic-link',
    titleKey: 'authHub.magicLink.title',
    descKey: 'authHub.magicLink.desc',
    providersKey: 'authHub.magicLink.providers',
  },
];

export const techStack = [
  'React 19',
  'React Router',
  'Tailwind CSS',
  'Formik',
  'Yup',
  'Context API',
];
