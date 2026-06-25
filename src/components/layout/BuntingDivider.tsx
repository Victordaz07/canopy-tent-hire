interface BuntingDividerProps {
  variant?: 'divider' | 'overlay';
  className?: string;
}

// Kept as literals here since CSS/SVG can't reference Tailwind theme tokens
// directly — must stay in sync with `canopy`/`sun`/`sand` in tailwind.config.js.
const CANOPY = '#2F7A52';
const SUN = '#E0923C';
const SAND = '#D9A954';

// Triangular pennant-flag bunting, a generic event/celebration motif fitting
// a tent-and-marquee rental brand.
const BUNTING_TILE = `
<svg xmlns='http://www.w3.org/2000/svg' width='90' height='40' viewBox='0 0 90 40'>
  <g>
    <path d='M5 2 L20 2 L12.5 28 Z' fill='${CANOPY}'/>
    <path d='M35 2 L50 2 L42.5 28 Z' fill='${SUN}'/>
    <path d='M65 2 L80 2 L72.5 28 Z' fill='${SAND}'/>
  </g>
  <line x1='0' y1='2' x2='90' y2='2' stroke='${CANOPY}' stroke-width='2'/>
</svg>`;

const BUNTING_PATTERN_OVERLAY = {
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(BUNTING_TILE)}")`,
  backgroundSize: '90px 40px',
  backgroundRepeat: 'repeat',
};

const BUNTING_PATTERN_STRIP = {
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(BUNTING_TILE)}")`,
  backgroundSize: '90px 40px',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'top center',
};

export function BuntingDivider({ variant = 'divider', className = '' }: BuntingDividerProps) {
  if (variant === 'overlay') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-[0.06] ${className}`}
        style={BUNTING_PATTERN_OVERLAY}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`h-7 w-full ${className}`}
      style={BUNTING_PATTERN_STRIP}
    />
  );
}
