import { useTranslation } from 'react-i18next';
import { PickupIcon, TruckIcon } from '../ui/icons';
import type { DeliveryMethod } from '../../types/booking';

interface DeliveryMethodSelectProps {
  value: DeliveryMethod | null;
  onChange: (method: DeliveryMethod) => void;
}

const OPTIONS = [
  { value: 'delivery' as const, Icon: TruckIcon, key: 'delivery' },
  { value: 'pickup' as const, Icon: PickupIcon, key: 'pickup' },
];

export function DeliveryMethodSelect({ value, onChange }: DeliveryMethodSelectProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-3">
      {OPTIONS.map(({ value: optionValue, Icon, key }) => {
        const selected = value === optionValue;
        return (
          <button
            key={optionValue}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(optionValue)}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
              selected ? 'bg-canopy text-bg' : 'bg-card text-ink hover:bg-canopy/10'
            }`}
          >
            <Icon className="h-5 w-5" />
            {t(`booking.${key}`)}
          </button>
        );
      })}
    </div>
  );
}
