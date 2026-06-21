import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { authFlowCategories } from '../../config/authFlows';
import Breadcrumb from '../../components/Breadcrumb';
import AuthHubCard from '../../components/AuthHubCard';

const AuthHub = () => {
  const { t } = useLanguage();

  const breadcrumbItems = [
    { labelKey: 'breadcrumb.home', to: '/' },
    { labelKey: 'breadcrumb.authHub' },
  ];

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-app mb-3">
            {t('authHub.title')}
          </h1>
          <p className="text-app-muted leading-relaxed">{t('authHub.subtitle')}</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-5">
          {authFlowCategories.map((flow) => (
            <AuthHubCard
              key={flow.id}
              icon={flow.icon}
              title={t(flow.titleKey)}
              description={t(flow.descKey)}
              providers={t(flow.providersKey)}
              to={flow.route}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthHub;
