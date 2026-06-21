import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { site } from '../config/site';

const methodLabels = {
  email: { en: 'Email & Password', fa: 'ایمیل و رمز عبور' },
  social: { en: 'Social OAuth', fa: 'ورود اجتماعی' },
  phone: { en: 'Phone OTP', fa: 'پیامک OTP' },
  'magic-link': { en: 'Magic Link', fa: 'لینک جادویی' },
};

const Dashboard = () => {
  const { user, authMethod, logout } = useAuth();
  const { t, locale } = useLanguage();

  const methodLabel =
    methodLabels[authMethod]?.[locale] ?? authMethod ?? '—';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-app mb-1">
          {t('dashboard.title')}
        </h1>
        <p className="text-app-muted">{t('dashboard.subtitle')}</p>
      </div>

      <div className="surface rounded-2xl p-6 backdrop-blur-lg mb-6">
        <h2 className="text-lg font-semibold text-app mb-4">{t('dashboard.userInfo')}</h2>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
            style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-medium text-app">{user?.name}</p>
            <p className="text-sm text-app-muted">{user?.email}</p>
          </div>
        </div>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-app-muted mb-1">ID</dt>
            <dd className="font-medium text-app">#{user?.id}</dd>
          </div>
          <div>
            <dt className="text-app-muted mb-1">{t('dashboard.authMethod')}</dt>
            <dd className="font-medium text-primary">{methodLabel}</dd>
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

      <div className="surface rounded-xl p-4 mb-8 text-center text-sm text-app-muted">
        {t('footer.builtBy')}{' '}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {site.author} — {site.brand}
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/auth"
          className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-app hover:border-[var(--color-border-strong)] text-sm font-medium transition-colors"
        >
          {t('nav.authHub')}
        </Link>
        <button
          type="button"
          onClick={logout}
          className="px-5 py-2.5 rounded-lg border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] text-sm font-semibold transition-colors"
        >
          {t('dashboard.logout')}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
