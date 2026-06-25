import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import type { Tent } from '../../types/tent';
import { TentImageCarousel } from './TentImageCarousel';

export function TentCard({ tent, index = 0 }: { tent: Tent; index?: number }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const name = language === 'to' ? tent.nameTo : tent.nameEn;
  const description = language === 'to' ? tent.descriptionTo : tent.descriptionEn;
  const images = tent.imageUrls ?? [];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink/5 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-canopy/30 hover:shadow-xl hover:shadow-canopy/10">
      <div className="relative aspect-square w-full overflow-hidden">
        <TentImageCarousel images={images} alt={name} />
        <span className="absolute right-4 top-4 font-heading text-4xl text-ink/10 drop-shadow-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-canopy">
          {tent.size}
        </span>
      </div>

      <div className="relative p-6">
        <h3 className="font-heading text-xl tracking-wide text-ink">{name}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-canopy/30 via-ink/10 to-transparent" />

        <div className="mt-5 flex items-center justify-between">
          <span className="text-3xl font-bold text-sun-dim">${tent.price}</span>
          <span className="text-xs font-semibold text-muted">{t('tents.perRental')}</span>
        </div>
      </div>
    </div>
  );
}
