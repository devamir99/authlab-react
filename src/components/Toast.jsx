import React from 'react';
import { IconCheck, IconX, IconAlert, IconInfo } from './icons';

const toastIcons = {
  success: IconCheck,
  error: IconX,
  warning: IconAlert,
  info: IconInfo,
};

const Toast = ({ message, type = 'info', onClose, position = 'right' }) => {
  const styles = {
    success: {
      bg: 'var(--color-primary-soft)',
      border: 'var(--color-primary)',
      text: 'var(--color-primary)',
    },
    error: {
      bg: 'var(--color-danger-bg)',
      border: 'var(--color-danger)',
      text: 'var(--color-danger)',
    },
    warning: {
      bg: 'var(--color-primary-soft)',
      border: 'var(--color-primary)',
      text: 'var(--color-text)',
    },
    info: {
      bg: 'var(--color-surface)',
      border: 'var(--color-border-strong)',
      text: 'var(--color-text)',
    },
  };

  const style = styles[type] ?? styles.info;
  const horizontal = position === 'left' ? 'left-4' : 'right-4';
  const Icon = toastIcons[type] ?? IconInfo;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed top-20 ${horizontal} z-[100] max-w-sm w-[calc(100%-2rem)]`}
    >
      <div
        className="rounded-xl border shadow-lg p-4 backdrop-blur-lg"
        style={{
          background: style.bg,
          borderColor: style.border,
          color: style.text,
        }}
      >
        <div className="flex items-start gap-3">
          <Icon className="w-5 h-5 shrink-0 mt-0.5" aria-hidden />
          <p className="text-sm font-medium flex-1 leading-relaxed">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
