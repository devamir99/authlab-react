import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import {
  getPendingMagicEmail,
  getStoredMagicToken,
  verifyMagicLink,
  resendMagicLink,
  maskEmail,
  clearMagicSession,
} from '../../../services/mockMagicLink';
import Breadcrumb from '../../../components/Breadcrumb';
import Stepper from '../../../components/Stepper';
import Loader from '../../../components/Loader';

const magicSteps = [
  { key: 'email', labelKey: 'magicLink.steps.email' },
  { key: 'inbox', labelKey: 'magicLink.steps.inbox' },
];

const RESEND_COOLDOWN_SEC = 60;

const MagicLinkSent = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SEC);
  const [pulse, setPulse] = useState(true);

  const pendingEmail = getPendingMagicEmail();
  const masked =
    location.state?.masked ??
    (pendingEmail ? maskEmail(pendingEmail) : '');

  useEffect(() => {
    if (!pendingEmail) {
      navigate('/auth/magic-link', { replace: true });
    }
  }, [pendingEmail, navigate]);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSimulateClick = async () => {
    const token = getStoredMagicToken();
    if (!token) {
      setError(t('magicLink.errors.sessionExpired'));
      return;
    }

    setLoading(true);
    setError('');

    const result = await verifyMagicLink(token);

    if (result.success) {
      login(result.user, result.token, true, 'magic-link');
      clearMagicSession();
      navigate('/dashboard', { state: { welcome: true } });
    } else {
      setError(t(result.messageKey ?? 'magicLink.errors.generic'));
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setResending(true);
    setError('');

    const result = await resendMagicLink();
    if (result.success) {
      setCountdown(RESEND_COOLDOWN_SEC);
    } else {
      setError(t(result.messageKey ?? 'magicLink.errors.generic'));
    }
    setResending(false);
  };

  if (!pendingEmail) return null;

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-md mx-auto px-4">
        <Breadcrumb
          items={[
            { labelKey: 'breadcrumb.home', to: '/' },
            { labelKey: 'breadcrumb.authHub', to: '/auth' },
            { labelKey: 'breadcrumb.magicLink', to: '/auth/magic-link' },
            { labelKey: 'magicLink.steps.inbox' },
          ]}
        />

        <Stepper steps={magicSteps} currentStep={2} />

        <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg text-center">
          <div
            className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl transition-opacity duration-700 ${
              pulse ? 'opacity-100' : 'opacity-60'
            }`}
            style={{ background: 'var(--color-primary-soft)' }}
            aria-hidden
          >
            📬
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-app mb-2">
            {t('magicLink.sentTitle')}
          </h1>
          <p className="text-sm text-app-muted mb-1">{t('magicLink.sentSubtitle')}</p>
          <p dir="ltr" className="font-medium text-primary mb-6 break-all">
            {masked}
          </p>

          <p className="text-xs text-app-muted mb-6 px-3 py-3 rounded-lg bg-[var(--color-primary-soft)] leading-relaxed">
            {t('magicLink.sentHint')}
          </p>

          {error && (
            <div
              className="text-sm px-4 py-3 rounded-lg border border-[var(--color-danger)] text-[var(--color-danger)] mb-4"
              style={{ background: 'var(--color-danger-bg)' }}
              role="alert"
            >
              {error}
            </div>
          )}

          {loading ? (
            <Loader size="medium" text={t('magicLink.verifying')} />
          ) : (
            <button
              type="button"
              onClick={handleSimulateClick}
              className="w-full py-3 rounded-lg btn-primary font-semibold transition-colors mb-4"
            >
              {t('magicLink.simulateClick')}
            </button>
          )}

          <div className="space-y-2">
            {countdown > 0 ? (
              <p className="text-sm text-app-muted">
                {t('magicLink.resendIn', { seconds: countdown })}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-sm text-primary hover:underline font-medium disabled:opacity-50"
              >
                {resending ? t('magicLink.resending') : t('magicLink.resend')}
              </button>
            )}

            <div>
              <Link
                to="/auth/magic-link"
                className="text-sm text-app-muted hover:text-primary transition-colors"
              >
                {t('magicLink.changeEmail')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicLinkSent;
