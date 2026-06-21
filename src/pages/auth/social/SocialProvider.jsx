import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import { getSocialProvider } from '../../../config/socialProviders';
import Breadcrumb from '../../../components/Breadcrumb';
import OAuthConsentCard from '../../../components/social/OAuthConsentCard';
import OAuthRedirectOverlay from '../../../components/social/OAuthRedirectOverlay';

const REDIRECT_DELAY_MS = 1800;

const SocialProvider = () => {
  const { provider } = useParams();
  const { t, locale } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('consent');

  const config = getSocialProvider(provider);
  const providerName = config ? t(`socialOAuth.providers.${provider}`) : provider;

  const breadcrumbItems = [
    { labelKey: 'breadcrumb.home', to: '/' },
    { labelKey: 'breadcrumb.authHub', to: '/auth' },
    { labelKey: 'breadcrumb.social', to: '/auth/social' },
    { label: providerName },
  ];

  const handleAuthorize = () => {
    setStep('redirecting');
    setTimeout(() => {
      const demoName = config.demoName[locale] ?? config.demoName.en;
      login(
        { id: provider, name: demoName, email: config.demoEmail, socialProvider: provider },
        `mock_social_${provider}_${Date.now()}`,
        true,
        'social'
      );
      navigate('/dashboard', { state: { welcome: true } });
    }, REDIRECT_DELAY_MS);
  };

  if (!config) {
    return (
      <div className="py-10 px-4 text-center">
        <p className="text-app-muted mb-4">{t('socialOAuth.notFound')}</p>
        <Link to="/auth/social" className="text-primary hover:underline">
          {t('socialOAuth.backToProviders')}
        </Link>
      </div>
    );
  }

  return (
    <>
      {step === 'redirecting' && (
        <OAuthRedirectOverlay provider={provider} providerName={providerName} />
      )}

      <div className="py-10 md:py-14 min-h-[70vh] flex flex-col">
        <div className="max-w-md w-full mx-auto px-4 flex-1 flex flex-col">
          <Breadcrumb items={breadcrumbItems} />

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full">
              <OAuthConsentCard
                provider={provider}
                onAuthorize={handleAuthorize}
                onCancel={() => {}}
                loading={step === 'redirecting'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialProvider;
