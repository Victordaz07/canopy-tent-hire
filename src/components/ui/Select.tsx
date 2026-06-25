import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function Select({ label, error, id, name, className = '', children, ...props }: SelectProps) {
  const selectId = id ?? name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        className={`rounded-lg border border-muted/30 bg-bg2 px-4 py-2.5 text-ink focus-visible:border-canopy ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-sm text-sun-dim">{error}</p>}
    </div>
  );
}
