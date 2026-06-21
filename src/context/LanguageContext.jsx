import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '../locales/en.json';
import fa from '../locales/fa.json';
import { site } from '../config/site';

const STORAGE_KEY = 'authlab-locale';

const messages = { en, fa };

const LanguageContext = createContext(null);

const getNestedValue = (obj, path) =>
  path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);

const interpolate = (template, params = {}) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{{${key}}}`
  );

const getInitialLocale = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'fa') return stored;
  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocaleState] = useState(getInitialLocale);

  const isRtl = locale === 'fa';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    localStorage.setItem(STORAGE_KEY, locale);
    document.title = getNestedValue(messages[locale], 'meta.title') ?? site.name;
  }, [locale, isRtl]);

  const setLocale = (next) => {
    if (next === 'en' || next === 'fa') {
      setLocaleState(next);
    }
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === 'en' ? 'fa' : 'en'));
  };

  const t = useCallback((key, params) => {
    const value = getNestedValue(messages[locale], key);
    if (typeof value === 'string') {
      return params ? interpolate(value, params) : value;
    }
    return key;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      isRtl,
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, isRtl, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
