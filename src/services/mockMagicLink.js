const EMAIL_KEY = 'authlab_magic_email';
const TOKEN_KEY = 'authlab_magic_token';
const EXPIRES_KEY = 'authlab_magic_expires';
const MOCK_DELAY_MS = 900;
const LINK_TTL_MS = 15 * 60 * 1000;

const delay = (ms = MOCK_DELAY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

export const maskEmail = (email) => {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}${'*'.repeat(Math.max(local.length - 2, 2))}@${domain}`;
};

export const sendMagicLink = async (email) => {
  await delay();

  const normalized = email.trim().toLowerCase();
  const token = `ml_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const expiresAt = Date.now() + LINK_TTL_MS;

  sessionStorage.setItem(EMAIL_KEY, normalized);
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(EXPIRES_KEY, String(expiresAt));

  return {
    success: true,
    email: normalized,
    token,
    expiresAt,
  };
};

export const resendMagicLink = async () => {
  const email = sessionStorage.getItem(EMAIL_KEY);
  if (!email) {
    return { success: false, messageKey: 'magicLink.errors.sessionExpired' };
  }
  return sendMagicLink(email);
};

export const verifyMagicLink = async (token) => {
  await delay(700);

  const expected = sessionStorage.getItem(TOKEN_KEY);
  const email = sessionStorage.getItem(EMAIL_KEY);
  const expiresAt = Number(sessionStorage.getItem(EXPIRES_KEY));

  if (!expected || !email) {
    return { success: false, messageKey: 'magicLink.errors.sessionExpired' };
  }

  if (token !== expected) {
    return { success: false, messageKey: 'magicLink.errors.invalidLink' };
  }

  if (expiresAt && Date.now() > expiresAt) {
    return { success: false, messageKey: 'magicLink.errors.linkExpired' };
  }

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);

  const name = email.split('@')[0].replace(/[._-]/g, ' ');

  return {
    success: true,
    user: {
      id: `magic_${email.replace(/[@.]/g, '_')}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
    },
    token: `mock_magic_${Date.now()}`,
  };
};

export const getPendingMagicEmail = () => sessionStorage.getItem(EMAIL_KEY);
export const getStoredMagicToken = () => sessionStorage.getItem(TOKEN_KEY);

export const clearMagicSession = () => {
  sessionStorage.removeItem(EMAIL_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
};
