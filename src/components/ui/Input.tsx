import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, name, className = '', ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className={`rounded-lg border border-muted/30 bg-bg2 px-4 py-2.5 text-ink placeholder:text-muted focus-visible:border-canopy ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-sun-dim">{error}</p>}
    </div>
  );
}
