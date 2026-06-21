import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const storedTheme = localStorage.getItem('authlab-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute(
  'data-theme',
  storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : prefersDark ? 'dark' : 'light'
);

const storedLocale = localStorage.getItem('authlab-locale');
if (storedLocale === 'fa') {
  document.documentElement.lang = 'fa';
  document.documentElement.dir = 'rtl';
} else {
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
