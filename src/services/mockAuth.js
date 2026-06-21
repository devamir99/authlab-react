const USERS_KEY = 'authlab_mock_users';
const MOCK_DELAY_MS = 900;

export const DEMO_ACCOUNT = {
  id: 'demo',
  name: 'Demo User',
  email: 'demo@authlab.dev',
  password: '123456',
};

const delay = (ms = MOCK_DELAY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const mockAuth = {
  register: async ({ name, email, password }) => {
    await delay();

    const users = getStoredUsers();
    const emailTaken =
      users.some((u) => u.email.toLowerCase() === email.toLowerCase()) ||
      email.toLowerCase() === DEMO_ACCOUNT.email.toLowerCase();

    if (emailTaken) {
      return { success: false, messageKey: 'emailForm.errors.emailExists' };
    }

    const newUser = {
      id: String(Date.now()),
      name,
      email,
      password,
    };

    saveUsers([...users, newUser]);

    return {
      success: true,
      messageKey: 'emailForm.registerSuccess',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token: `mock_email_${newUser.id}_${Date.now()}`,
    };
  },

  login: async ({ email, password }) => {
    await delay();

    const normalizedEmail = email.toLowerCase();

    if (
      normalizedEmail === DEMO_ACCOUNT.email.toLowerCase() &&
      password === DEMO_ACCOUNT.password
    ) {
      return {
        success: true,
        user: {
          id: DEMO_ACCOUNT.id,
          name: DEMO_ACCOUNT.name,
          email: DEMO_ACCOUNT.email,
        },
        token: `mock_email_${DEMO_ACCOUNT.id}_${Date.now()}`,
      };
    }

    const users = getStoredUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (match) {
      return {
        success: true,
        user: { id: match.id, name: match.name, email: match.email },
        token: `mock_email_${match.id}_${Date.now()}`,
      };
    }

    return { success: false, messageKey: 'emailForm.errors.invalidCredentials' };
  },
};
