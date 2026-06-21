import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`
        ${sizeClasses[size]} 
        border-4 border-[var(--color-primary-soft)] border-t-[var(--color-primary)] rounded-full animate-spin
      `}></div>
      {text && (
        <p className="mt-2 text-sm text-app-muted">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
