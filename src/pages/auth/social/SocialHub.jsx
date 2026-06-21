import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { socialProviders } from '../../../config/socialProviders';
import Breadcrumb from '../../../components/Breadcrumb';
import SocialProviderIcon from '../../../components/social/SocialProviderIcon';

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
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-border)] bg-white"
                aria-hidden
              >
                <SocialProviderIcon provider={provider.id} />
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-app group-hover:text-primary transition-colors block">
                  {t(`socialOAuth.providers.${provider.id}`)}
                </span>
                <span className="text-xs text-app-muted">
                  {t(`socialOAuth.hubDesc.${provider.id}`)}
                </span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[var(--color-primary-soft)] text-primary shrink-0">
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
