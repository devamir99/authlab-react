import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import { verifyMagicLink, clearMagicSession } from '../../../services/mockMagicLink';
import Loader from '../../../components/Loader';

const MagicLinkVerify = () => {
  const { token } = useParams();
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setError(t('magicLink.errors.invalidLink'));
        return;
      }

      const result = await verifyMagicLink(token);

      if (result.success) {
        login(result.user, result.token, true, 'magic-link');
        clearMagicSession();
        navigate('/dashboard', { replace: true, state: { welcome: true } });
      } else {
        setError(t(result.messageKey ?? 'magicLink.errors.generic'));
      }
    };

    run();
  }, [token, login, navigate, t]);

  if (error) {
    return (
      <div className="py-16 px-4 text-center max-w-md mx-auto">
        <p className="text-[var(--color-danger)] mb-4" role="alert">{error}</p>
        <Link to="/auth/magic-link" className="text-primary hover:underline">
          {t('magicLink.tryAgain')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader size="large" text={t('magicLink.verifying')} />
    </div>
  );
};

export default MagicLinkVerify;
