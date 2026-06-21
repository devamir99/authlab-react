import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { site } from '../config/site';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-primary mb-4" aria-hidden>404</p>
        <h1 className="text-2xl font-bold text-app mb-2">{t('notFound.title')}</h1>
        <p className="text-app-muted mb-8">{t('notFound.subtitle')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="px-5 py-2.5 rounded-lg btn-primary text-sm font-semibold">
            {t('notFound.home')}
          </Link>
          <Link
            to="/auth"
            className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-app text-sm font-medium hover:border-[var(--color-border-strong)] transition-colors"
          >
            {t('nav.authHub')}
          </Link>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm text-app-muted hover:text-primary transition-colors"
          >
            {t('nav.portfolio')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
