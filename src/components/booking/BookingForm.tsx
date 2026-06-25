import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { BuntingDivider } from '../layout/BuntingDivider';
import { SectionHeading } from '../ui/SectionHeading';
import { DeliveryMethodSelect } from './DeliveryMethodSelect';
import { useTents } from '../../hooks/useTents';
import { useBookingsForDate } from '../../hooks/useBookingsForDate';
import { createBooking, getBookedTentIds } from '../../lib/bookings';
import { useLanguage } from '../../context/LanguageContext';
import type { DeliveryMethod } from '../../types/booking';

const PHONE_REGEX = /^[\d\s\-+().]{7,20}$/;

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

interface FormErrors {
  clientName?: string;
  phone?: string;
  tentId?: string;
  date?: string;
  deliveryMethod?: string;
  address?: string;
}

export function BookingForm() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { tents } = useTents();

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [tentId, setTentId] = useState('');
  const [date, setDate] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null);
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { bookings } = useBookingsForDate(date || null);
  const bookedTentIds = getBookedTentIds(bookings);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!clientName.trim()) nextErrors.clientName = t('validation.required');
    if (!phone.trim()) nextErrors.phone = t('validation.required');
    else if (!PHONE_REGEX.test(phone)) nextErrors.phone = t('validation.invalidPhone');
    if (!tentId) nextErrors.tentId = t('validation.required');
    if (!date) nextErrors.date = t('validation.required');
    else if (date < todayDateString()) nextErrors.date = t('validation.pastDate');
    if (!deliveryMethod) nextErrors.deliveryMethod = t('validation.required');
    if (deliveryMethod === 'delivery' && !address.trim()) nextErrors.address = t('validation.required');

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate() || !deliveryMethod) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      await createBooking({
        clientName: clientName.trim(),
        phone: phone.trim(),
        tentId,
        date,
        deliveryMethod,
        address: deliveryMethod === 'delivery' ? address.trim() : '',
      });
      setConfirmed(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="booking" className="relative bg-bg2 py-20">
      <BuntingDivider variant="overlay" />
      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading title={t('booking.heading')} />

        {confirmed ? (
          <div className="mt-10 rounded-2xl bg-card p-8 text-center">
            <p className="text-lg text-canopy">{t('booking.confirmed')}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-ink/5 bg-card/60 p-6 md:grid-cols-2 md:p-8"
          >
            <Input
              label={t('booking.name')}
              name="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              error={errors.clientName}
            />
            <Input
              label={t('booking.phone')}
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
            <Select
              label={t('booking.tent')}
              name="tentId"
              value={tentId}
              onChange={(e) => setTentId(e.target.value)}
              error={errors.tentId}
            >
              <option value="" disabled>
                {t('booking.selectTent')}
              </option>
              {tents.map((tent) => (
                <option key={tent.id} value={tent.id} disabled={bookedTentIds.has(tent.id)}>
                  {(language === 'to' ? tent.nameTo : tent.nameEn) +
                    ` — $${tent.price}` +
                    (bookedTentIds.has(tent.id) ? ` (${t('booking.tentUnavailable')})` : '')}
                </option>
              ))}
            </Select>
            <Input
              label={t('booking.date')}
              name="date"
              type="date"
              min={todayDateString()}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTentId('');
              }}
              error={errors.date}
            />

            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-semibold text-ink">{t('booking.deliveryMethod')}</p>
              <DeliveryMethodSelect value={deliveryMethod} onChange={setDeliveryMethod} />
              {errors.deliveryMethod && <p className="mt-2 text-sm text-sun-dim">{errors.deliveryMethod}</p>}
            </div>

            {deliveryMethod === 'delivery' && (
              <div className="md:col-span-2">
                <Input
                  label={t('booking.address')}
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={errors.address}
                />
              </div>
            )}

            <div className="md:col-span-2">
              {submitError && <p className="mb-3 text-sm text-sun-dim">{t('booking.error')}</p>}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? t('booking.submitting') : t('booking.submit')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
