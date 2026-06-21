import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Breadcrumb = ({ items }) => {
  const { t } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-app-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = item.labelKey ? t(item.labelKey) : item.label;

          return (
            <li key={item.labelKey ?? item.label ?? index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden className="text-app-muted/60 select-none">
                  ›
                </span>
              )}
              {isLast || !item.to ? (
                <span className="text-primary font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
