import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import Breadcrumb from '../../../components/Breadcrumb';
import Loader from '../../../components/Loader';

const providerNames = {
  google: 'Google',
  github: 'GitHub',
  apple: 'Apple',
  microsoft: 'Microsoft',
};

const providerColors = {
  google: '#4285F4',
  github: '#24292f',
  apple: '#000000',
  microsoft: '#0078D4',
};

const SocialProvider = () => {
  const { provider } = useParams();
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const name = providerNames[provider] ?? provider;
  const color = providerColors[provider] ?? 'var(--color-primary)';

  const breadcrumbItems = [
    { labelKey: 'breadcrumb.home', to: '/' },
    { labelKey: 'breadcrumb.authHub', to: '/auth' },
    { labelKey: 'breadcrumb.social', to: '/auth/social' },
    { label: name },
  ];

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      login(
        { id: provider, name: name, email: `demo@${provider}.com` },
        `mock_social_${provider}_${Date.now()}`,
        true,
        'social'
      );
      navigate('/dashboard');
    }, 1800);
  };

  if (!providerNames[provider]) {
    return (
      <div className="py-10 px-4 text-center">
        <p className="text-app-muted mb-4">Provider not found.</p>
        <Link to="/auth/social" className="text-primary hover:underline">
          {t('authHub.providerStub.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-md mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="surface rounded-2xl p-8 backdrop-blur-lg text-center">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: color }}
            aria-hidden
          >
            {name.charAt(0)}
          </div>

          <h1 className="text-xl font-bold text-app mb-2">{name}</h1>
          <p className="text-sm text-app-muted mb-2">{t('authHub.providerStub.phaseNote')}</p>
          <p className="text-xs text-app-muted mb-8">{t('authHub.providerStub.redirecting', { provider: name })}</p>

          {loading ? (
            <Loader size="medium" text={t('authHub.providerStub.redirecting', { provider: name })} />
          ) : (
            <>
              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-3 rounded-lg btn-primary font-semibold transition-colors mb-4"
              >
                {t('authHub.providerStub.continue', { provider: name })}
              </button>
              <Link to="/auth/social" className="text-sm text-app-muted hover:text-primary transition-colors">
                {t('authHub.providerStub.back')}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialProvider;
