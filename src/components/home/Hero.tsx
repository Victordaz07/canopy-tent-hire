import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { BuntingDivider } from '../layout/BuntingDivider';
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-canopy/[0.07] via-bg to-sun/[0.07]"
      />
      <BuntingDivider variant="overlay" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16">

          {/* ── Text ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-block rounded-full bg-canopy/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-canopy">
              {t('hero.kicker')}
            </span>

            <h1 className="mt-5 font-heading text-4xl leading-tight text-ink md:text-5xl xl:text-6xl">
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

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
              {BADGES.map(({ Icon, key }) => (
                <div key={key} className="flex items-center gap-2 text-sm font-semibold text-ink/80">
                  <Icon className="h-5 w-5 text-sun-dim" />
                  {t(`hero.${key}`)}
                </div>
              ))}
            </div>
          </div>

          {/* ── Photo collage ── */}
          <div className="relative flex justify-center pb-10 pt-6 lg:justify-end lg:pb-6">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-[420px] w-[420px] rounded-full bg-canopy/10 blur-3xl"
            />

            <div className="relative z-10 w-full max-w-[400px] lg:max-w-none">
              {/* Main photo */}
              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src="/tent-images/canopy-07.jpg"
                  alt="Elegant wedding reception under a beautifully decorated canopy"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                {/* Bottom gradient for badge readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/50 to-transparent" />
                {/* Event type label */}
                <div className="absolute bottom-5 right-5 rounded-xl bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-canopy">
                    Wedding Reception
                  </p>
                  <p className="text-sm font-semibold text-ink">Tongatapu, Tonga</p>
                </div>
              </div>

              {/* Floating secondary photo — bottom-left */}
              <div className="absolute -bottom-8 -left-5 z-20 h-36 w-36 overflow-hidden rounded-2xl border-[3px] border-bg shadow-2xl md:-left-8 md:h-44 md:w-44">
                <img
                  src="/tent-images/canopy-09.jpg"
                  alt="Baby shower celebration inside a decorated canopy"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Events counter chip — top-left */}
              <div className="absolute -left-3 top-8 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl md:-left-6">
                <p className="font-heading text-2xl font-bold leading-none text-canopy">100+</p>
                <p className="mt-0.5 text-xs font-semibold text-muted">Events Hosted</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <BuntingDivider />
    </section>
  );
}
