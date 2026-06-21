import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import { mockAuth } from '../../../services/mockAuth';
import { useEmailValidationSchemas } from '../../../hooks/useEmailValidation';
import FormInput from '../../../components/FormInput';
import Loader from '../../../components/Loader';
import Breadcrumb from '../../../components/Breadcrumb';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();
  const { registerSchema } = useEmailValidationSchemas();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await mockAuth.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        setSuccess(t(result.messageKey));
        setTimeout(() => {
          login(result.user, result.token, true, 'email');
          navigate('/dashboard');
        }, 1500);
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
            { labelKey: 'breadcrumb.register' },
          ]}
        />

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-app">
            {t('emailForm.registerTitle')}
          </h1>
          <p className="mt-2 text-sm text-app-muted">
            {t('emailForm.registerSubtitle').split('{{link}}')[0]}
            <Link
              to="/auth/email/login"
              className="font-medium text-primary hover:underline mx-1"
            >
              {t('emailForm.signInExisting')}
            </Link>
          </p>
        </div>

        <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
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

                {success && (
                  <div
                    className="text-sm px-4 py-3 rounded-lg border border-[var(--color-primary)] text-primary"
                    style={{ background: 'var(--color-primary-soft)' }}
                    role="status"
                  >
                    {success}
                  </div>
                )}

                <FormInput
                  label={t('emailForm.name')}
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  placeholder={t('emailForm.name')}
                  required
                />

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

                <FormInput
                  label={t('emailForm.confirmPassword')}
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                  placeholder="••••••••"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg btn-primary text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader size="small" text="" /> : t('emailForm.submitRegister')}
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

export default Register;
