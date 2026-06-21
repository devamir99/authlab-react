import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getSocialProvider } from '../../config/socialProviders';
import SocialProviderIcon from './SocialProviderIcon';
import { IconCheck } from '../icons';

const cardThemes = {
  google: {
    wrapper: 'bg-white text-[#202124] border-[#dadce0]',
    muted: 'text-[#5f6368]',
    btn: 'bg-[#1a73e8] hover:bg-[#1765cc] text-white',
    btnSecondary: 'text-[#1a73e8] hover:bg-[#f1f3f4]',
    avatar: 'bg-[#4285F4] text-white',
    scope: 'border-[#dadce0] bg-[#f8f9fa]',
  },
  github: {
    wrapper: 'bg-[#0d1117] text-[#f0f6fc] border-[#30363d]',
    muted: 'text-[#8b949e]',
    btn: 'bg-[#238636] hover:bg-[#2ea043] text-white',
    btnSecondary: 'text-[#58a6ff] hover:bg-[#161b22]',
    avatar: 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]',
    scope: 'border-[#30363d] bg-[#161b22]',
  },
  apple: {
    wrapper: 'bg-[#1d1d1f] text-white border-[#424245]',
    muted: 'text-[#a1a1a6]',
    btn: 'bg-white hover:bg-[#f5f5f7] text-black',
    btnSecondary: 'text-[#2997ff] hover:bg-[#2c2c2e]',
    avatar: 'bg-[#2c2c2e] text-white',
    scope: 'border-[#424245] bg-[#2c2c2e]',
  },
  microsoft: {
    wrapper: 'bg-white text-[#1b1b1b] border-[#e5e5e5]',
    muted: 'text-[#605e5c]',
    btn: 'bg-[#0078D4] hover:bg-[#106ebe] text-white',
    btnSecondary: 'text-[#0078D4] hover:bg-[#f3f2f1]',
    avatar: 'bg-[#0078D4] text-white',
    scope: 'border-[#edebe9] bg-[#faf9f8]',
  },
};

const OAuthConsentCard = ({ provider, onAuthorize, onCancel, loading }) => {
  const { t, locale } = useLanguage();
  const config = getSocialProvider(provider);
  const theme = cardThemes[provider];

  if (!config || !theme) return null;

  const providerName = t(`socialOAuth.providers.${provider}`);
  const demoName = config.demoName[locale] ?? config.demoName.en;

  const scopes = [
    t('socialOAuth.scopes.profile'),
    t('socialOAuth.scopes.email'),
  ];

  return (
    <div
      className={`rounded-2xl border shadow-2xl overflow-hidden ${theme.wrapper}`}
      role="dialog"
      aria-labelledby="oauth-consent-title"
    >
      {/* Provider header bar */}
      <div
        className="px-6 py-4 border-b flex items-center gap-3"
        style={{ borderColor: 'inherit', opacity: 0.9 }}
      >
        <SocialProviderIcon provider={provider} />
        <div>
          <p className={`text-xs ${theme.muted}`}>{t('socialOAuth.signInWith')}</p>
          <p id="oauth-consent-title" className="font-semibold text-sm">
            {providerName}
          </p>
        </div>
        <span className="ms-auto text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-black/10 opacity-70">
          Mock
        </span>
      </div>

      <div className="p-6 md:p-8">
        <p className={`text-sm ${theme.muted} mb-6`}>
          {t('socialOAuth.consentIntro', { provider: providerName, app: 'AuthLab' })}
        </p>

        {/* Account picker */}
        <div className={`flex items-center gap-3 p-3 rounded-xl mb-6 ${theme.scope}`}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${theme.avatar}`}
          >
            {demoName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{demoName}</p>
            <p className={`text-xs truncate ${theme.muted}`}>{config.demoEmail}</p>
          </div>
        </div>

        {/* Permissions */}
        <div className="mb-6">
          <p className={`text-xs font-semibold uppercase tracking-wide mb-3 ${theme.muted}`}>
            {t('socialOAuth.permissionsTitle')}
          </p>
          <ul className="space-y-2">
            {scopes.map((scope) => (
              <li key={scope} className={`flex items-center gap-2 text-sm ${theme.muted}`}>
                <IconCheck className="w-4 h-4 text-green-500 shrink-0" aria-hidden />
                {scope}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onAuthorize}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 ${theme.btn}`}
          >
            {loading
              ? t('socialOAuth.authorizing')
              : t('socialOAuth.authorize', { provider: providerName })}
          </button>
          <Link
            to="/auth/social"
            onClick={onCancel}
            className={`w-full py-2.5 rounded-lg text-sm text-center transition-colors ${theme.btnSecondary}`}
          >
            {t('socialOAuth.cancel')}
          </Link>
        </div>

        <p className={`text-xs text-center mt-5 ${theme.muted}`}>
          {t('socialOAuth.mockNote')}
        </p>
      </div>
    </div>
  );
};

export default OAuthConsentCard;
