import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { site } from '../config/site';
import { authFlowCategories, techStack } from '../config/authFlows';
import AuthHubCard from '../components/AuthHubCard';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  const features = [
    { icon: '🧩', titleKey: 'home.feature1Title', descKey: 'home.feature1Desc' },
    { icon: '🌍', titleKey: 'home.feature2Title', descKey: 'home.feature2Desc' },
    { icon: '🎨', titleKey: 'home.feature3Title', descKey: 'home.feature3Desc' },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero */}
        <section className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            {site.brand}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-app mb-5 leading-tight">
            {t('home.heroTitle')}
          </h1>
          <p className="text-lg text-app-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('home.heroSubtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {isAuthenticated ? (
              <>
                <p className="w-full text-app-muted mb-1">
                  {t('home.welcomeBack', { name: user?.name ?? '' })}
                </p>
                <Link to="/dashboard" className="px-6 py-3 rounded-lg btn-primary font-semibold transition-colors">
                  {t('home.goDashboard')}
                </Link>
                <Link to="/auth" className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-app hover:border-[var(--color-border-strong)] font-semibold transition-colors">
                  {t('home.exploreCta')}
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth" className="px-6 py-3 rounded-lg btn-primary font-semibold transition-colors">
                  {t('home.exploreCta')}
                </Link>
                <a
                  href={site.projects}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-app hover:border-[var(--color-border-strong)] font-semibold transition-colors"
                >
                  {t('home.portfolioCta')}
                </a>
                <a
                  href={site.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg text-app-muted hover:text-primary font-semibold transition-colors"
                >
                  {t('home.githubCta')}
                </a>
              </>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((f) => (
            <div key={f.titleKey} className="surface rounded-2xl p-6 backdrop-blur-lg">
              <span className="text-2xl mb-3 block" aria-hidden>{f.icon}</span>
              <h2 className="font-semibold text-app mb-2">{t(f.titleKey)}</h2>
              <p className="text-sm text-app-muted leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
        </section>

        {/* Flow preview */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-app mb-2">{t('home.flowsTitle')}</h2>
            <p className="text-app-muted">{t('home.flowsSubtitle')}</p>
          </div>
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
        </section>

        {/* Tech stack */}
        <section className="text-center">
          <h2 className="text-xl font-semibold text-app mb-6">{t('home.techTitle')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="surface px-4 py-2 rounded-full text-sm font-medium text-app-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
