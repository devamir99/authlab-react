import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import {
  verifyOtp,
  resendOtp,
  getPendingPhone,
  clearPhoneSession,
  DEMO_OTP,
  OTP_LENGTH,
  RESEND_COOLDOWN_SEC,
  maskPhone,
} from '../../../services/mockPhoneAuth';
import Breadcrumb from '../../../components/Breadcrumb';
import Stepper from '../../../components/Stepper';
import OtpInput from '../../../components/OtpInput';
import Loader from '../../../components/Loader';
import FlowIcon from '../../../components/icons';

const phoneSteps = [
  { key: 'enter', labelKey: 'phoneOtp.steps.enter' },
  { key: 'verify', labelKey: 'phoneOtp.steps.verify' },
];

const PhoneVerify = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SEC);
  const lastAttemptRef = useRef('');

  const pendingPhone = getPendingPhone();
  const displayPhone = location.state?.displayPhone ?? (pendingPhone ? maskPhone(pendingPhone) : '');

  useEffect(() => {
    if (!pendingPhone) {
      navigate('/auth/phone', { replace: true });
    }
  }, [pendingPhone, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = useCallback(async () => {
    if (otp.length < OTP_LENGTH) {
      setError(t('phoneOtp.validation.otpIncomplete'));
      return;
    }

    setLoading(true);
    setError('');

    const result = await verifyOtp(otp);

    if (result.success) {
      login(result.user, result.token, true, 'phone');
      clearPhoneSession();
      navigate('/dashboard', { state: { welcome: true } });
    } else {
      setError(t(result.messageKey ?? 'phoneOtp.errors.generic'));
    }

    setLoading(false);
  }, [otp, login, navigate, t]);

  useEffect(() => {
    if (otp.length < OTP_LENGTH) {
      lastAttemptRef.current = '';
      return;
    }
    if (otp.length === OTP_LENGTH && otp !== lastAttemptRef.current && !loading) {
      lastAttemptRef.current = otp;
      handleVerify();
    }
  }, [otp, loading, handleVerify]);

  const handleResend = async () => {
    if (countdown > 0) return;
    setResending(true);
    setError('');
    setOtp('');

    const result = await resendOtp();
    if (result.success) {
      setCountdown(RESEND_COOLDOWN_SEC);
    } else {
      setError(t(result.messageKey ?? 'phoneOtp.errors.generic'));
    }
    setResending(false);
  };

  if (!pendingPhone) return null;

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-md mx-auto px-4">
        <Breadcrumb
          items={[
            { labelKey: 'breadcrumb.home', to: '/' },
            { labelKey: 'breadcrumb.authHub', to: '/auth' },
            { labelKey: 'breadcrumb.phone', to: '/auth/phone' },
            { labelKey: 'phoneOtp.steps.verify' },
          ]}
        />

        <Stepper steps={phoneSteps} currentStep={2} />

        <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg">
          <header className="text-center mb-6">
            <FlowIcon
              name="sms"
              box
              boxClassName="w-14 h-14 rounded-2xl bg-[var(--color-primary-soft)] text-primary flex items-center justify-center mx-auto mb-3"
              className="w-7 h-7"
              aria-hidden
            />
            <h1 className="text-xl md:text-2xl font-bold text-app mb-2">
              {t('phoneOtp.verifyTitle')}
            </h1>
            <p className="text-sm text-app-muted">
              {t('phoneOtp.verifySubtitle')}{' '}
              <span dir="ltr" className="font-medium text-app">{displayPhone}</span>
            </p>
          </header>

          <div className="mb-6">
            <OtpInput
              value={otp}
              onChange={(val) => { setOtp(val); setError(''); }}
              disabled={loading}
              error={error}
            />
          </div>

          <p className="text-xs text-center text-app-muted mb-6 px-2 py-2 rounded-lg bg-[var(--color-primary-soft)]">
            {t('phoneOtp.otpHint', { code: DEMO_OTP })}
          </p>

          {loading && (
            <div className="flex justify-center mb-4">
              <Loader size="small" text={t('phoneOtp.verifying')} />
            </div>
          )}

          <div className="text-center space-y-3">
            {countdown > 0 ? (
              <p className="text-sm text-app-muted">
                {t('phoneOtp.resendIn', { seconds: countdown })}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-sm text-primary hover:underline font-medium disabled:opacity-50"
              >
                {resending ? t('phoneOtp.resending') : t('phoneOtp.resend')}
              </button>
            )}

            <div>
              <Link
                to="/auth/phone"
                className="text-sm text-app-muted hover:text-primary transition-colors"
              >
                {t('phoneOtp.changeNumber')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerify;
