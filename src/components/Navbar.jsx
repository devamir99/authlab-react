import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { site } from '../config/site';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="surface-nav border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="text-xl font-bold text-app hover:text-primary transition-colors truncate">
              {site.name}
            </Link>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline text-xs text-app-muted hover:text-primary transition-colors truncate"
            >
              {site.brand}
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline text-sm text-app-muted hover:text-primary px-2 py-1 transition-colors"
            >
              {t('nav.portfolio')}
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline text-sm text-app-muted hover:text-primary px-2 py-1 transition-colors"
            >
              {t('nav.github')}
            </a>

            <LanguageToggle />
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <span className="hidden lg:inline text-sm text-app-muted max-w-[140px] truncate">
                  {t('nav.welcome', { name: user?.name ?? '' })}
                </span>
                <Link
                  to="/dashboard"
                  className="text-sm text-app-muted hover:text-primary px-2 py-1 transition-colors"
                >
                  {t('nav.dashboard')}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm px-3 py-1.5 rounded-lg border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="hidden sm:inline text-sm text-app-muted hover:text-primary px-2 py-1 transition-colors"
                >
                  {t('nav.authHub')}
                </Link>
                <Link
                  to="/auth/email/login"
                  className="text-sm text-app-muted hover:text-primary px-2 py-1 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/auth/email/register"
                  className="text-sm px-3 py-1.5 rounded-lg btn-primary font-medium transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
