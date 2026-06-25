import { useTranslation } from 'react-i18next';
import { useTents } from '../../hooks/useTents';
import { TentCard } from './TentCard';
import { BuntingDivider } from '../layout/BuntingDivider';
import { SectionHeading } from '../ui/SectionHeading';

export function TentsGrid() {
  const { t } = useTranslation();
  const { tents, loading, error } = useTents();

  return (
    <section id="tents" className="bg-bg2 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          kicker={t('tents.kicker')}
          title={t('tents.heading')}
          subtitle={t('tents.subheading')}
        />

        {loading && <p className="mt-12 text-center text-muted">{t('tents.loading')}</p>}
        {error && <p className="mt-12 text-center text-sun-dim">{t('tents.error')}</p>}
        {!loading && !error && tents.length === 0 && (
          <p className="mt-12 text-center text-muted">{t('tents.empty')}</p>
        )}

        {!loading && !error && tents.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tents.map((tent, index) => (
              <TentCard key={tent.id} tent={tent} index={index} />
            ))}
          </div>
        )}
      </div>
      <BuntingDivider className="mt-20" />
    </section>
  );
}
