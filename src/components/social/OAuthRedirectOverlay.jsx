import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SocialProviderIcon from './SocialProviderIcon';
import Loader from '../Loader';

const OAuthRedirectOverlay = ({ provider, providerName }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="surface rounded-2xl p-8 max-w-sm w-full mx-4 text-center backdrop-blur-lg">
        <SocialProviderIcon provider={provider} className="justify-center mb-4 scale-150" />
        <p className="text-app font-semibold mb-2">
          {t('socialOAuth.redirecting', { provider: providerName })}
        </p>
        <p className="text-sm text-app-muted mb-6">{t('socialOAuth.redirectHint')}</p>
        <Loader size="medium" text="" />
      </div>
    </div>
  );
};

export default OAuthRedirectOverlay;
