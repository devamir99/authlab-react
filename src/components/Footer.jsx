import React from 'react';
import { site, contactLinks } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

const ExternalLink = ({ href, children, external = true }) => (
  <a
    href={href}
    className="link-primary hover:underline transition-colors"
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
  >
    {children}
  </a>
);

const Footer = () => {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] surface-nav">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-app font-semibold">
              {site.name}
              <span className="text-app-muted font-normal"> — {t('footer.tagline')}</span>
            </p>
            <p className="text-sm text-app-muted mt-1">
              {t('footer.builtBy')}{' '}
              <ExternalLink href={site.url}>{site.author}</ExternalLink>
              {' · '}
              <ExternalLink href={site.url}>{site.brand}</ExternalLink>
            </p>
          </div>
          <a
            href={site.contactPage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg btn-primary text-sm font-semibold transition-colors shrink-0"
          >
            {site.cta.contact[locale]}
          </a>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-app-muted mb-3">
            {t('footer.contact')}
          </h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {contactLinks.map((link) => (
              <li key={link.id}>
                <ExternalLink href={link.href} external={link.external}>
                  {link.label[locale]}
                  {link.id === 'email' && (
                    <span className="text-app-muted"> · {site.email}</span>
                  )}
                  {link.id === 'phone' && (
                    <span className="text-app-muted"> · {site.phone}</span>
                  )}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-app-muted">
          <p>
            © {year} {site.brand}. {t('footer.rights')}
          </p>
          <ExternalLink href={site.repo}>{site.name} on GitHub</ExternalLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
