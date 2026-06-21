import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { site } from '../config/site';
import { authFlowCategories } from '../config/authFlows';

const methodLabels = {
  email: { en: 'Email & Password', fa: 'ایمیل و رمز عبور' },
  social: { en: 'Social OAuth', fa: 'ورود اجتماعی' },
  phone: { en: 'Phone OTP', fa: 'پیامک OTP' },
  'magic-link': { en: 'Magic Link', fa: 'لینک جادویی' },
};

const methodIcons = {
  email: '✉️',
  social: '🌐',
  phone: '📱',
  'magic-link': '🔗',
};

const Dashboard = () => {
  const { user, authMethod, logout } = useAuth();
  const { t, locale } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const methodLabel = (() => {
    if (authMethod === 'social' && user?.socialProvider) {
      const name = t(`socialOAuth.providers.${user.socialProvider}`);
      return locale === 'fa' ? `${name} (OAuth)` : `${name} OAuth`;
    }
    return methodLabels[authMethod]?.[locale] ?? authMethod ?? '—';
  })();

  useEffect(() => {
    if (location.state?.welcome) {
      showToast({ message: t('toast.welcome', { name: user?.name ?? '' }), type: 'success' });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.welcome, location.pathname, navigate, showToast, t, user?.name]);

  const handleLogout = () => {
    logout();
    showToast({ message: t('toast.logout'), type: 'info' });
    navigate('/');
  };

  const loginTime = new Date().toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              {t('dashboard.mockSession')}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-app mb-1">
              {t('dashboard.title')}
            </h1>
            <p className="text-app-muted">{t('dashboard.subtitle')}</p>
          </div>
          <span
            className="text-3xl shrink-0"
            aria-hidden
            title={methodLabel}
          >
            {methodIcons[authMethod] ?? '🔐'}
          </span>
        </div>
      </div>

      <div className="surface rounded-2xl p-6 backdrop-blur-lg mb-6">
        <h2 className="text-lg font-semibold text-app mb-4">{t('dashboard.userInfo')}</h2>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
            style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-app truncate">{user?.name}</p>
            <p className="text-sm text-app-muted truncate" dir="ltr">
              {user?.email}
            </p>
            {user?.phone && (
              <p className="text-sm text-app-muted truncate" dir="ltr">
                {user.phone}
              </p>
            )}
          </div>
        </div>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-app-muted mb-1">{t('dashboard.sessionId')}</dt>
            <dd className="font-medium text-app font-mono text-xs break-all">#{user?.id}</dd>
          </div>
          <div>
            <dt className="text-app-muted mb-1">{t('dashboard.authMethod')}</dt>
            <dd className="font-medium text-primary">{methodLabel}</dd>
          </div>
          <div>
            <dt className="text-app-muted mb-1">{t('dashboard.loginTime')}</dt>
            <dd className="font-medium text-app">{loginTime}</dd>
          </div>
          <div>
            <dt className="text-app-muted mb-1">{t('dashboard.status')}</dt>
            <dd>
              <span
                className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: 'var(--color-primary-soft)',
                  color: 'var(--color-primary)',
                }}
              >
                {t('dashboard.active')}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-app mb-3">{t('dashboard.exploreFlows')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {authFlowCategories.map((flow) => (
            <Link
              key={flow.id}
              to={flow.route}
              className="surface rounded-xl p-3 text-center hover:border-[var(--color-border-strong)] transition-colors group"
            >
              <span className="text-2xl block mb-1" aria-hidden>{flow.icon}</span>
              <span className="text-xs font-medium text-app-muted group-hover:text-primary transition-colors">
                {t(flow.titleKey)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-6 mb-8 text-center border"
        style={{
          background: 'var(--color-primary-soft)',
          borderColor: 'var(--color-border-strong)',
        }}
      >
        <p className="text-sm text-app mb-3">{t('dashboard.portfolioPitch')}</p>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-6 py-2.5 rounded-lg btn-primary text-sm font-semibold transition-colors"
        >
          {site.cta.contact[locale]}
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/auth"
          className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-app hover:border-[var(--color-border-strong)] text-sm font-medium transition-colors"
        >
          {t('nav.authHub')}
        </Link>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-app-muted hover:text-primary text-sm font-medium transition-colors"
        >
          {t('dashboard.backHome')}
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-lg border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] text-sm font-semibold transition-colors"
        >
          {t('dashboard.logout')}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
