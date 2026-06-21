import React, { useRef, useEffect } from 'react';
import { OTP_LENGTH } from '../services/mockPhoneAuth';

const OtpInput = ({ value, onChange, disabled = false, error }) => {
  const inputsRef = useRef([]);
  const digits = value.padEnd(OTP_LENGTH, ' ').split('').slice(0, OTP_LENGTH);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const updateDigit = (index, char) => {
    const cleaned = char.replace(/\D/g, '').slice(-1);
    const arr = value.split('');
    arr[index] = cleaned;
    const next = arr.join('').slice(0, OTP_LENGTH);
    onChange(next);

    if (cleaned && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div>
      <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index]?.trim() ?? ''}
            disabled={disabled}
            aria-label={`Digit ${index + 1}`}
            onChange={(e) => updateDigit(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`
              w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-lg
              surface focus:outline-none focus:ring-2 ring-primary text-app
              disabled:opacity-50 transition-colors
              ${error ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'}
            `}
          />
        ))}
      </div>
      {error && (
        <p className="mt-3 text-sm text-center text-[var(--color-danger)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default OtpInput;
