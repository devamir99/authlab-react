import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AuthHubCard = ({ icon, title, description, providers, to, badge }) => {
  const { t } = useLanguage();

  return (
    <Link
      to={to}
      className="group surface rounded-2xl p-6 backdrop-blur-lg transition-all hover:border-[var(--color-border-strong)] hover:shadow-lg focus:outline-none focus-visible:ring-2 ring-primary"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="text-3xl" aria-hidden>
          {icon}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-[var(--color-primary-soft)] text-primary">
          {badge ?? t('authHub.mockBadge')}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-app mb-2 group-hover:text-primary transition-colors">
        {title}
      </h2>
      <p className="text-sm text-app-muted mb-4 leading-relaxed">{description}</p>
      <p className="text-xs text-app-muted">{providers}</p>
      <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary">
        {t('authHub.explore')}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
};

export default AuthHubCard;
