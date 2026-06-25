import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, name, className = '', ...props }: TextareaProps) {
  const textareaId = id ?? name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        className={`rounded-lg border border-muted/30 bg-bg2 px-4 py-2.5 text-ink placeholder:text-muted focus-visible:border-canopy ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-sun-dim">{error}</p>}
    </div>
  );
}
