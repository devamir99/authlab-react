import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AuthHub from './pages/auth/AuthHub';
import EmailHub from './pages/auth/email/EmailHub';
import SocialHub from './pages/auth/social/SocialHub';
import SocialProvider from './pages/auth/social/SocialProvider';
import PhoneEntry from './pages/auth/phone/PhoneEntry';
import MagicLinkEntry from './pages/auth/magic-link/MagicLinkEntry';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
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
                <Route path="/auth/magic-link" element={<MagicLinkEntry />} />

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
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
