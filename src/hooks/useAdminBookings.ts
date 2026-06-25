import { useEffect, useState } from 'react';
import { subscribeToAllBookings } from '../lib/bookings';
import type { Booking } from '../types/booking';

export function useAdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => subscribeToAllBookings(setBookings), []);

  return { bookings };
}
