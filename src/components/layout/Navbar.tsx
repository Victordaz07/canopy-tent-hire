import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';

const NAV_LINKS = [
  { href: '#tents', key: 'tents' },
  { href: '#reviews', key: 'reviews' },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-muted/10 bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-semibold text-muted transition-colors hover:text-canopy"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <Button onClick={() => (window.location.hash = '#booking')}>{t('nav.bookNow')}</Button>
        </div>

        <button
          type="button"
          className="text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-muted/10 bg-bg px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-muted hover:text-canopy"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <LanguageToggle />
              <Button onClick={() => setMenuOpen(false)}>{t('nav.bookNow')}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
