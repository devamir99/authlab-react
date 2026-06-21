import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useLanguage } from '../../../context/LanguageContext';
import { sendOtp, formatPhoneDisplay } from '../../../services/mockPhoneAuth';
import Breadcrumb from '../../../components/Breadcrumb';
import Stepper from '../../../components/Stepper';
import Loader from '../../../components/Loader';

const countryCodes = [
  { code: '+98', label: '🇮🇷 +98', placeholder: '912 345 6789' },
  { code: '+1', label: '🇺🇸 +1', placeholder: '555 123 4567' },
];

const phoneSteps = [
  { key: 'enter', labelKey: 'phoneOtp.steps.enter' },
  { key: 'verify', labelKey: 'phoneOtp.steps.verify' },
];

const PhoneEntry = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    countryCode: Yup.string().required(),
    phone: Yup.string()
      .matches(/^[\d\s-]{10,15}$/, t('phoneOtp.validation.phoneInvalid'))
      .required(t('phoneOtp.validation.phoneRequired')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');

    const result = await sendOtp(values.countryCode, values.phone.replace(/\D/g, ''));

    if (result.success) {
      navigate('/auth/phone/verify', {
        state: { displayPhone: formatPhoneDisplay(values.countryCode, values.phone) },
      });
    } else {
      setError(t(result.messageKey ?? 'phoneOtp.errors.generic'));
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
            { labelKey: 'breadcrumb.phone' },
          ]}
        />

        <Stepper steps={phoneSteps} currentStep={1} />

        <div className="surface rounded-2xl p-6 md:p-8 backdrop-blur-lg">
          <header className="text-center mb-6">
            <span className="text-3xl mb-3 block" aria-hidden>📱</span>
            <h1 className="text-xl md:text-2xl font-bold text-app mb-2">
              {t('phoneOtp.enterTitle')}
            </h1>
            <p className="text-sm text-app-muted">{t('phoneOtp.enterSubtitle')}</p>
          </header>

          <Formik
            initialValues={{ countryCode: '+98', phone: '' }}
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

                <div>
                  <label htmlFor="countryCode" className="block text-sm font-medium text-app mb-2">
                    {t('phoneOtp.countryCode')}
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={values.countryCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 surface rounded-lg text-app focus:outline-none focus:ring-2 ring-primary border-[var(--color-border)]"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-app mb-2">
                    {t('phoneOtp.phoneNumber')}
                    <span className="text-[var(--color-danger)] ms-1">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    dir="ltr"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={
                      countryCodes.find((c) => c.code === values.countryCode)?.placeholder
                    }
                    className={`
                      w-full px-3 py-2.5 surface rounded-lg text-app focus:outline-none focus:ring-2 ring-primary
                      placeholder:text-app-muted/60 border-[var(--color-border)]
                      ${touched.phone && errors.phone ? 'border-[var(--color-danger)]' : ''}
                    `}
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1.5 text-sm text-[var(--color-danger)]">{errors.phone}</p>
                  )}
                </div>

                <p className="text-xs text-center text-app-muted px-2 py-2 rounded-lg bg-[var(--color-primary-soft)]">
                  {t('phoneOtp.demoHint')}
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg btn-primary font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader size="small" text="" /> : t('phoneOtp.sendCode')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PhoneEntry;
