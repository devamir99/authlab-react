import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useLanguage } from '../../../context/LanguageContext';
import { sendMagicLink, maskEmail } from '../../../services/mockMagicLink';
import Breadcrumb from '../../../components/Breadcrumb';
import Stepper from '../../../components/Stepper';
import FormInput from '../../../components/FormInput';
import Loader from '../../../components/Loader';

const magicSteps = [
  { key: 'email', labelKey: 'magicLink.steps.email' },
  { key: 'inbox', labelKey: 'magicLink.steps.inbox' },
];

const MagicLinkEntry = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('magicLink.validation.emailInvalid'))
      .required(t('magicLink.validation.emailRequired')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');

    const result = await sendMagicLink(values.email);

    if (result.success) {
      navigate('/auth/magic-link/sent', {
        state: { email: result.email, masked: maskEmail(result.email) },
      });
    } else {
      setError(t(result.messageKey ?? 'magicLink.errors.generic'));
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="py-10 md:py-14">
      <div className="max-w-md mx-auto px-4">
        <Breadcrumb
          items={[
            { labelKey: 'breadcrumb.home', to: '/' },
            { labelKey: 'breadcrumb.authHub', to: '/auth' },
            { labelKey: 'breadcrumb.magicLink' },
          ]}
        />

        <Stepper steps={magicSteps} currentStep={1} />

        <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg">
          <header className="text-center mb-6">
            <span className="text-3xl mb-3 block" aria-hidden>🔗</span>
            <h1 className="text-xl md:text-2xl font-bold text-app mb-2">
              {t('magicLink.enterTitle')}
            </h1>
            <p className="text-sm text-app-muted">{t('magicLink.enterSubtitle')}</p>
          </header>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
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
                  label={t('magicLink.email')}
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  placeholder="you@example.com"
                  required
                />

                <p className="text-xs text-center text-app-muted px-2 py-2 rounded-lg bg-[var(--color-primary-soft)]">
                  {t('magicLink.demoHint')}
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg btn-primary font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader size="small" text="" /> : t('magicLink.sendLink')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MagicLinkEntry;
