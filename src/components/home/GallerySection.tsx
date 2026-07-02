import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';

interface GalleryItemProps {
  src: string;
  alt: string;
  className?: string;
}

function GalleryItem({ src, alt, className = '' }: GalleryItemProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-bg2 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
    </div>
  );
}

export function GallerySection() {
  const { t } = useTranslation();

  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          kicker={t('gallery.kicker')}
          title={t('gallery.heading')}
          subtitle={t('gallery.subtitle')}
        />

        {/* Primary grid: tall left + 4 tiles right */}
        <div className="mt-12 grid auto-rows-[240px] grid-cols-2 gap-3 md:grid-cols-3 md:auto-rows-[260px]">
          {/* Tall feature image — spans 2 rows */}
          <GalleryItem
            src="/tent-images/canopy-01.jpg"
            alt="Evening dinner event inside a large canopy with string lights"
            className="row-span-2"
          />
          <GalleryItem
            src="/tent-images/canopy-03.jpg"
            alt="Birthday celebration under canopy at dusk"
          />
          <GalleryItem
            src="/tent-images/canopy-04.jpg"
            alt="Large birthday party under canopy at night"
          />
          <GalleryItem
            src="/tent-images/canopy-05.jpg"
            alt="Daytime community gathering under white canopy"
          />
          <GalleryItem
            src="/tent-images/canopy-11.jpg"
            alt="Indoor birthday event with warm string lights"
          />
        </div>

        {/* Bottom strip: 3 more */}
        <div className="mt-3 grid grid-cols-3 gap-3" style={{ height: 200 }}>
          <GalleryItem
            src="/tent-images/canopy-06.jpg"
            alt="Outdoor event under canopy"
          />
          <GalleryItem
            src="/tent-images/canopy-09.jpg"
            alt="Baby shower celebration inside decorated canopy"
          />
          <GalleryItem
            src="/tent-images/canopy-08.jpg"
            alt="Canopy hire event setup"
          />
        </div>
      </div>
    </section>
  );
}
