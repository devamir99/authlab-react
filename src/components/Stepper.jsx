import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Stepper = ({ steps, currentStep }) => {
  const { t } = useLanguage();

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;

          return (
            <li key={step.key} className="flex items-center gap-2 sm:gap-4">
              {index > 0 && (
                <span
                  aria-hidden
                  className={`hidden sm:block w-8 h-px ${
                    isComplete ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
                  }`}
                />
              )}
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                    isActive
                      ? 'btn-primary'
                      : isComplete
                        ? 'bg-[var(--color-primary-soft)] text-primary'
                        : 'border border-[var(--color-border)] text-app-muted'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isComplete ? '✓' : stepNum}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium hidden sm:block ${
                    isActive ? 'text-primary' : 'text-app-muted'
                  }`}
                >
                  {t(step.labelKey)}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Stepper;
