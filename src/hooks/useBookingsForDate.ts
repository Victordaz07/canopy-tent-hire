import { useEffect, useState } from 'react';
import { subscribeToBookingsForDate } from '../lib/bookings';
import type { Booking } from '../types/booking';

export function useBookingsForDate(date: string | null) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadedDate, setLoadedDate] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    const unsubscribe = subscribeToBookingsForDate(date, (data) => {
      setBookings(data);
      setLoadedDate(date);
    });

    return unsubscribe;
  }, [date]);

  return {
    bookings: date ? bookings : [],
    loading: Boolean(date) && loadedDate !== date,
  };
}
