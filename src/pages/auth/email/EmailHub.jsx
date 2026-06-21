import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import Breadcrumb from '../../../components/Breadcrumb';

const EmailHub = () => {
  const { t } = useLanguage();

  const breadcrumbItems = [
    { labelKey: 'breadcrumb.home', to: '/' },
    { labelKey: 'breadcrumb.authHub', to: '/auth' },
    { labelKey: 'breadcrumb.email' },
  ];

  const options = [
    {
      icon: '🔑',
      titleKey: 'breadcrumb.login',
      descKey: 'authHub.email.pageSubtitle',
      to: '/auth/email/login',
    },
    {
      icon: '📝',
      titleKey: 'breadcrumb.register',
      descKey: 'authHub.email.pageSubtitle',
      to: '/auth/email/register',
    },
  ];

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-lg mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-app mb-2">
            {t('authHub.email.pageTitle')}
          </h1>
          <p className="text-app-muted">{t('authHub.email.pageSubtitle')}</p>
        </header>

        <div className="space-y-4">
          {options.map((opt) => (
            <Link
              key={opt.to}
              to={opt.to}
              className="group flex items-center gap-4 surface rounded-xl p-5 backdrop-blur-lg transition-all hover:border-[var(--color-border-strong)]"
            >
              <span className="text-2xl" aria-hidden>{opt.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-app group-hover:text-primary transition-colors">
                  {t(opt.titleKey)}
                </p>
              </div>
              <span className="text-primary text-sm font-medium">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailHub;
