import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import Breadcrumb from '../../../components/Breadcrumb';

const MagicLinkEntry = () => {
  const { t } = useLanguage();

  const breadcrumbItems = [
    { labelKey: 'breadcrumb.home', to: '/' },
    { labelKey: 'breadcrumb.authHub', to: '/auth' },
    { labelKey: 'breadcrumb.magicLink' },
  ];

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-md mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="surface rounded-2xl p-8 backdrop-blur-lg">
          <header className="mb-6 text-center">
            <span className="text-3xl mb-3 block" aria-hidden>🔗</span>
            <h1 className="text-2xl font-bold text-app mb-2">{t('authHub.magicLink.pageTitle')}</h1>
            <p className="text-sm text-app-muted">{t('authHub.magicLink.pageSubtitle')}</p>
          </header>

          <p className="text-sm text-center text-app-muted mb-6 px-2 py-3 rounded-lg bg-[var(--color-primary-soft)]">
            {t('authHub.magicLink.comingPhase')}
          </p>

          <Link
            to="/auth"
            className="block w-full text-center py-3 rounded-lg border border-[var(--color-border)] text-app hover:border-[var(--color-border-strong)] font-medium transition-colors"
          >
            {t('breadcrumb.authHub')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MagicLinkEntry;
