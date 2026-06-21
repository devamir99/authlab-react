import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="inline-flex rounded-lg border border-[var(--color-border)] p-0.5 text-xs font-semibold"
      role="group"
      aria-label={locale === 'en' ? t('lang.switchToFa') : t('lang.switchToEn')}
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-2.5 py-1.5 rounded-md transition-colors ${
          locale === 'en'
            ? 'btn-primary'
            : 'text-app-muted hover:text-primary'
        }`}
      >
        {t('lang.en')}
      </button>
      <button
        type="button"
        onClick={() => setLocale('fa')}
        aria-pressed={locale === 'fa'}
        className={`px-2.5 py-1.5 rounded-md transition-colors ${
          locale === 'fa'
            ? 'btn-primary'
            : 'text-app-muted hover:text-primary'
        }`}
      >
        {t('lang.fa')}
      </button>
    </div>
  );
};

export default LanguageToggle;
