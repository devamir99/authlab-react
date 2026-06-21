import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const DemoBanner = () => {
  const { t } = useLanguage();

  return (
    <div
      className="w-full text-center text-sm py-2 px-4 border-b"
      style={{
        background: 'var(--color-banner-bg)',
        color: 'var(--color-banner-text)',
        borderColor: 'var(--color-banner-border)',
      }}
      role="status"
    >
      {t('demo.banner')}
    </div>
  );
};

export default DemoBanner;
