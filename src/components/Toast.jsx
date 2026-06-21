import React from 'react';

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

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  const style = styles[type] ?? styles.info;
  const horizontal = position === 'left' ? 'left-4' : 'right-4';

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
          <span className="font-bold text-base shrink-0" aria-hidden>
            {icons[type]}
          </span>
          <p className="text-sm font-medium flex-1 leading-relaxed">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
