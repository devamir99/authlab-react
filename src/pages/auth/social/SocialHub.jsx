import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { socialProviders } from '../../../config/authFlows';
import Breadcrumb from '../../../components/Breadcrumb';

const providerNames = {
  google: 'Google',
  github: 'GitHub',
  apple: 'Apple',
  microsoft: 'Microsoft',
};

const SocialHub = () => {
  const { t } = useLanguage();

  const breadcrumbItems = [
    { labelKey: 'breadcrumb.home', to: '/' },
    { labelKey: 'breadcrumb.authHub', to: '/auth' },
    { labelKey: 'breadcrumb.social' },
  ];

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-lg mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-app mb-2">
            {t('authHub.social.pageTitle')}
          </h1>
          <p className="text-app-muted">{t('authHub.social.pageSubtitle')}</p>
        </header>

        <div className="space-y-3">
          {socialProviders.map((provider) => (
            <Link
              key={provider.id}
              to={provider.route}
              className="group flex items-center gap-4 surface rounded-xl p-4 backdrop-blur-lg transition-all hover:border-[var(--color-border-strong)]"
            >
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: provider.color }}
                aria-hidden
              >
                {provider.icon || providerNames[provider.id]?.charAt(0)}
              </span>
              <span className="font-semibold text-app group-hover:text-primary transition-colors flex-1">
                {providerNames[provider.id]}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[var(--color-primary-soft)] text-primary">
                {t('authHub.mockBadge')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialHub;
