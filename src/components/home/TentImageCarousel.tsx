import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TentIcon } from '../ui/icons';

const ROTATE_INTERVAL_MS = 4000;

export function TentImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const { t } = useTranslation();
  const [activePosition, setActivePosition] = useState(0);
  const [failedIndices, setFailedIndices] = useState<number[]>([]);

  const visible = useMemo(
    () => images.map((_, i) => i).filter((i) => !failedIndices.includes(i)),
    [images, failedIndices],
  );
  const activeIndex = visible.length > 0 ? visible[activePosition % visible.length] : -1;

  useEffect(() => {
    if (visible.length <= 1) return;
    const interval = setInterval(() => {
      setActivePosition((p) => p + 1);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [visible.length]);

  function handleError(index: number) {
    setFailedIndices((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }

  if (visible.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-canopy/15 via-bg2 to-sun/15">
        <TentIcon className="h-10 w-10 text-canopy/50" />
        <span className="text-xs font-semibold text-muted">{t('tents.photoPlaceholder')}</span>
      </div>
    );
  }

  return (
    <>
      {images.map((src, i) =>
        failedIndices.includes(i) ? null : (
          <img
            key={i}
            src={src}
            alt={alt}
            onError={() => handleError(i)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:scale-105 ${
              i === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ),
      )}
      {visible.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {visible.map((i, pos) => (
            <button
              key={i}
              type="button"
              aria-label={`Image ${pos + 1}`}
              onClick={() => setActivePosition(pos)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === activeIndex ? 'bg-ink' : 'bg-ink/30'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
