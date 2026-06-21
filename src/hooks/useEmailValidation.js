import { useMemo } from 'react';
import * as Yup from 'yup';
import { useLanguage } from '../context/LanguageContext';

export const useEmailValidationSchemas = () => {
  const { t, locale } = useLanguage();

  const loginSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email(t('emailForm.validation.emailInvalid'))
          .required(t('emailForm.validation.emailRequired')),
        password: Yup.string()
          .min(6, t('emailForm.validation.passwordMin'))
          .required(t('emailForm.validation.passwordRequired')),
        rememberMe: Yup.boolean(),
      }),
    [t, locale]
  );

  const registerSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .min(2, t('emailForm.validation.nameMin'))
          .required(t('emailForm.validation.nameRequired')),
        email: Yup.string()
          .email(t('emailForm.validation.emailInvalid'))
          .required(t('emailForm.validation.emailRequired')),
        password: Yup.string()
          .min(6, t('emailForm.validation.passwordMin'))
          .required(t('emailForm.validation.passwordRequired')),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], t('emailForm.validation.passwordMismatch'))
          .required(t('emailForm.validation.confirmRequired')),
      }),
    [t, locale]
  );

  return { loginSchema, registerSchema };
};
