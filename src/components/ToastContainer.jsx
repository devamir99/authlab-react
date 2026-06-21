import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import Toast from './Toast';

const ToastContainer = () => {
  const { toast, hideToast } = useToast();
  const { isRtl } = useLanguage();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(hideToast, toast.duration ?? 4500);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <Toast
      key={toast.id}
      message={toast.message}
      type={toast.type}
      onClose={hideToast}
      duration={0}
      position={isRtl ? 'left' : 'right'}
    />
  );
};

export default ToastContainer;
