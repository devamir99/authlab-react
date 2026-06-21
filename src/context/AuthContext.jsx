import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  user: null,
  token: null,
  authMethod: null,
  isAuthenticated: false,
  loading: true,
};

const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  RESTORE_SESSION: 'RESTORE_SESSION',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authMethod: action.payload.authMethod,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        authMethod: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authMethod: action.payload.authMethod,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

const readSession = () => {
  for (const storage of [localStorage, sessionStorage]) {
    const token = storage.getItem('authToken');
    const user = storage.getItem('user');
    const authMethod = storage.getItem('authMethod');
    if (token && user) {
      try {
        return { token, user: JSON.parse(user), authMethod, storage };
      } catch {
        storage.removeItem('authToken');
        storage.removeItem('user');
        storage.removeItem('authMethod');
      }
    }
  }
  return null;
};

const clearAllSessions = () => {
  [localStorage, sessionStorage].forEach((storage) => {
    storage.removeItem('authToken');
    storage.removeItem('user');
    storage.removeItem('authMethod');
  });
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const session = readSession();
    if (session) {
      dispatch({
        type: AUTH_ACTIONS.RESTORE_SESSION,
        payload: {
          user: session.user,
          token: session.token,
          authMethod: session.authMethod,
        },
      });
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const login = (user, token, rememberMe = false, authMethod = 'email') => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: { user, token, authMethod },
    });

    clearAllSessions();

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('authToken', token);
    storage.setItem('user', JSON.stringify(user));
    storage.setItem('authMethod', authMethod);
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    clearAllSessions();
  };

  const setLoading = (loading) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: loading });
  };

  const value = {
    ...state,
    login,
    logout,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
