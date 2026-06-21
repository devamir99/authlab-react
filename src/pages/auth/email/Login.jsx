import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import { mockAuth } from '../../../services/mockAuth';
import { useEmailValidationSchemas } from '../../../hooks/useEmailValidation';
import FormInput from '../../../components/FormInput';
import Loader from '../../../components/Loader';
import Breadcrumb from '../../../components/Breadcrumb';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();
  const { loginSchema } = useEmailValidationSchemas();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');

    try {
      const result = await mockAuth.login({
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        login(result.user, result.token, values.rememberMe, 'email');
        navigate(from, { replace: true, state: { welcome: true } });
      } else {
        setError(t(result.messageKey ?? 'emailForm.errors.generic'));
      }
    } catch {
      setError(t('emailForm.errors.generic'));
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <Breadcrumb
          items={[
            { labelKey: 'breadcrumb.home', to: '/' },
            { labelKey: 'breadcrumb.authHub', to: '/auth' },
            { labelKey: 'breadcrumb.email', to: '/auth/email' },
            { labelKey: 'breadcrumb.login' },
          ]}
        />

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-app">
            {t('emailForm.loginTitle')}
          </h1>
          <p className="mt-2 text-sm text-app-muted">
            {t('emailForm.loginSubtitle').split('{{link}}')[0]}
            <Link
              to="/auth/email/register"
              className="font-medium text-primary hover:underline mx-1"
            >
              {t('emailForm.createAccount')}
            </Link>
          </p>
        </div>

        <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg">
          <p className="text-xs text-center text-app-muted mb-6 px-3 py-2 rounded-lg bg-[var(--color-primary-soft)]">
            {t('emailForm.demoHint')}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-5">
                {error && (
                  <div
                    className="text-sm px-4 py-3 rounded-lg border border-[var(--color-danger)] text-[var(--color-danger)]"
                    style={{ background: 'var(--color-danger-bg)' }}
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <FormInput
                  label={t('emailForm.email')}
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  placeholder="example@email.com"
                  required
                />

                <FormInput
                  label={t('emailForm.password')}
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  placeholder="••••••••"
                  required
                />

                <div className="flex items-center gap-2">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={values.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-primary"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-app-muted">
                    {t('emailForm.rememberMe')}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg btn-primary text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader size="small" text="" /> : t('emailForm.submitLogin')}
                </button>

                <div className="text-center">
                  <Link to="/" className="text-sm text-app-muted hover:text-primary transition-colors">
                    {t('emailForm.backHome')}
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
