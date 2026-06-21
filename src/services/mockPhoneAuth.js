const PENDING_PHONE_KEY = 'authlab_pending_phone';
const PENDING_OTP_KEY = 'authlab_pending_otp';
const OTP_EXPIRES_KEY = 'authlab_otp_expires';
const MOCK_DELAY_MS = 900;

export const DEMO_OTP = '123456';
export const OTP_LENGTH = 6;
export const RESEND_COOLDOWN_SEC = 60;

const delay = (ms = MOCK_DELAY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatPhoneDisplay = (countryCode, phone) => {
  const digits = phone.replace(/\D/g, '');
  if (countryCode === '+98' && digits.length >= 10) {
    return `${countryCode} ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return `${countryCode} ${digits}`;
};

export const maskPhone = (fullPhone) => {
  const digits = fullPhone.replace(/\D/g, '');
  if (digits.length < 4) return fullPhone;
  return `*** *** ${digits.slice(-4)}`;
};

export const sendOtp = async (countryCode, phone) => {
  await delay();

  const normalized = phone.replace(/\D/g, '');
  if (normalized.length < 10) {
    return { success: false, messageKey: 'phoneOtp.validation.phoneInvalid' };
  }

  const fullPhone = `${countryCode}${normalized}`;
  const expiresAt = Date.now() + 5 * 60 * 1000;

  sessionStorage.setItem(PENDING_PHONE_KEY, fullPhone);
  sessionStorage.setItem(PENDING_OTP_KEY, DEMO_OTP);
  sessionStorage.setItem(OTP_EXPIRES_KEY, String(expiresAt));

  return {
    success: true,
    fullPhone,
    expiresAt,
  };
};

export const resendOtp = async () => {
  await delay(600);

  const phone = sessionStorage.getItem(PENDING_PHONE_KEY);
  if (!phone) {
    return { success: false, messageKey: 'phoneOtp.errors.sessionExpired' };
  }

  const expiresAt = Date.now() + 5 * 60 * 1000;
  sessionStorage.setItem(PENDING_OTP_KEY, DEMO_OTP);
  sessionStorage.setItem(OTP_EXPIRES_KEY, String(expiresAt));

  return { success: true, expiresAt };
};

export const verifyOtp = async (code) => {
  await delay();

  const expected = sessionStorage.getItem(PENDING_OTP_KEY);
  const phone = sessionStorage.getItem(PENDING_PHONE_KEY);
  const expiresAt = Number(sessionStorage.getItem(OTP_EXPIRES_KEY));

  if (!expected || !phone) {
    return { success: false, messageKey: 'phoneOtp.errors.sessionExpired' };
  }

  if (expiresAt && Date.now() > expiresAt) {
    return { success: false, messageKey: 'phoneOtp.errors.otpExpired' };
  }

  if (code !== expected) {
    return { success: false, messageKey: 'phoneOtp.errors.invalidOtp' };
  }

  sessionStorage.removeItem(PENDING_OTP_KEY);
  sessionStorage.removeItem(OTP_EXPIRES_KEY);

  const digits = phone.replace(/\D/g, '');
  const lastFour = digits.slice(-4);

  return {
    success: true,
    user: {
      id: `phone_${digits.slice(-8)}`,
      name: `User ${lastFour}`,
      phone,
      email: `+${digits}@sms.authlab.dev`,
    },
    token: `mock_phone_${Date.now()}`,
  };
};

export const getPendingPhone = () => sessionStorage.getItem(PENDING_PHONE_KEY);

export const clearPhoneSession = () => {
  sessionStorage.removeItem(PENDING_PHONE_KEY);
  sessionStorage.removeItem(PENDING_OTP_KEY);
  sessionStorage.removeItem(OTP_EXPIRES_KEY);
};
