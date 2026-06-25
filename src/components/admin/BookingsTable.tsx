import { useTranslation } from 'react-i18next';
import { useAdminBookings } from '../../hooks/useAdminBookings';
import { updateBookingStatus } from '../../lib/bookings';
import { Button } from '../ui/Button';
import type { BookingStatus } from '../../types/booking';

const NEXT_ACTIONS: Record<BookingStatus, { status: BookingStatus; labelKey: string }[]> = {
  pending: [
    { status: 'confirmed', labelKey: 'admin.confirmAction' },
    { status: 'cancelled', labelKey: 'admin.cancelAction' },
  ],
  confirmed: [
    { status: 'completed', labelKey: 'admin.completeAction' },
    { status: 'cancelled', labelKey: 'admin.cancelAction' },
  ],
  cancelled: [],
  completed: [],
};

export function BookingsTable() {
  const { t } = useTranslation();
  const { bookings } = useAdminBookings();

  if (bookings.length === 0) {
    return <p className="text-muted">{t('admin.noBookings')}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-muted/20 text-muted">
            <th className="py-2 pr-4">{t('booking.name')}</th>
            <th className="py-2 pr-4">{t('booking.phone')}</th>
            <th className="py-2 pr-4">{t('booking.date')}</th>
            <th className="py-2 pr-4">{t('booking.deliveryMethod')}</th>
            <th className="py-2 pr-4">{t('admin.statusLabel')}</th>
            <th className="py-2 pr-4" />
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-muted/10 text-ink">
              <td className="py-2 pr-4">{booking.clientName}</td>
              <td className="py-2 pr-4">{booking.phone}</td>
              <td className="py-2 pr-4">{booking.date}</td>
              <td className="py-2 pr-4">{t(`booking.${booking.deliveryMethod}`)}</td>
              <td className="py-2 pr-4">{t(`admin.status.${booking.status}`)}</td>
              <td className="flex gap-2 py-2 pr-4">
                {NEXT_ACTIONS[booking.status].map((action) => (
                  <Button
                    key={action.status}
                    variant="secondary"
                    className="px-3 py-1 text-xs"
                    onClick={() => updateBookingStatus(booking.id, action.status)}
                  >
                    {t(action.labelKey)}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
