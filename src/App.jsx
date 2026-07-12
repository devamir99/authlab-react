import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/auth/email/Login';
import Register from './pages/auth/email/Register';
import Dashboard from './pages/Dashboard';
import AuthHub from './pages/auth/AuthHub';
import EmailHub from './pages/auth/email/EmailHub';
import SocialHub from './pages/auth/social/SocialHub';
import SocialProvider from './pages/auth/social/SocialProvider';
import PhoneEntry from './pages/auth/phone/PhoneEntry';
import PhoneVerify from './pages/auth/phone/PhoneVerify';
import MagicLinkEntry from './pages/auth/magic-link/MagicLinkEntry';
import MagicLinkSent from './pages/auth/magic-link/MagicLinkSent';
import MagicLinkVerify from './pages/auth/magic-link/MagicLinkVerify';
import NotFound from './pages/NotFound';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <Router basename={routerBasename || undefined}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

                <Route path="/auth" element={<AuthHub />} />
                <Route path="/auth/email" element={<EmailHub />} />
                <Route path="/auth/email/login" element={<Login />} />
                <Route path="/auth/email/register" element={<Register />} />
                <Route path="/auth/social" element={<SocialHub />} />
                <Route path="/auth/social/:provider" element={<SocialProvider />} />
                <Route path="/auth/phone" element={<PhoneEntry />} />
                <Route path="/auth/phone/verify" element={<PhoneVerify />} />
                <Route path="/auth/magic-link" element={<MagicLinkEntry />} />
                <Route path="/auth/magic-link/sent" element={<MagicLinkSent />} />
                <Route path="/auth/magic-link/verify/:token" element={<MagicLinkVerify />} />

                <Route path="/login" element={<Navigate to="/auth/email/login" replace />} />
                <Route path="/register" element={<Navigate to="/auth/email/register" replace />} />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
