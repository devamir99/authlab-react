import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader size="large" text={t('auth.checking')} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/email/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
