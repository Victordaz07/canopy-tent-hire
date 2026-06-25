import { TentIcon } from '../ui/icons';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 font-heading text-lg text-ink ${className}`}>
      <TentIcon className="h-7 w-7 text-canopy" />
      Canopy Tent Hire
    </span>
  );
}
