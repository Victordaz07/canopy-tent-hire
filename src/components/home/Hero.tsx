import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { BuntingDivider } from '../layout/BuntingDivider';
import { TentIcon } from '../ui/icons';
import { CalendarIcon, GlobeIcon, StarIcon, TruckIcon } from '../ui/icons';

const BADGES = [
  { Icon: GlobeIcon, key: 'badge1' },
  { Icon: TruckIcon, key: 'badge2' },
  { Icon: StarIcon, key: 'badge3' },
] as const;

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-canopy/10 via-bg to-sun/10"
      />
      <BuntingDivider variant="overlay" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32">
        <div className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left">
          <TentIcon className="h-16 w-16 text-canopy md:h-20 md:w-20" />

          <span className="mt-8 inline-block rounded-full bg-canopy/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-canopy">
            {t('hero.kicker')}
          </span>

          <h1 className="mt-5 text-4xl leading-tight text-ink md:text-6xl">
            {t('hero.headline1')}
            <br />
            <span className="text-sun-dim">{t('hero.headline2')}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted">{t('hero.subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="text-lg" onClick={() => (window.location.hash = '#booking')}>
              <CalendarIcon className="h-5 w-5" />
              {t('hero.cta')}
            </Button>
            <Button
              variant="secondary"
              className="text-lg"
              onClick={() => (window.location.hash = '#tents')}
            >
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
            {BADGES.map(({ Icon, key }) => (
              <div key={key} className="flex items-center gap-2 text-sm font-semibold text-ink/80">
                <Icon className="h-5 w-5 text-sun-dim" />
                {t(`hero.${key}`)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BuntingDivider />
    </section>
  );
}
