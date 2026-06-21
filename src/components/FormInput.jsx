import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-app mb-2">
        {label}
        {required && <span className="text-[var(--color-danger)] ms-1">*</span>}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2.5 surface rounded-lg backdrop-blur-sm
          focus:outline-none focus:ring-2 ring-primary text-app
          placeholder:text-app-muted/60 transition-colors
          ${error ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'}
        `}
      />

      {error && (
        <p className="mt-1.5 text-sm text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
