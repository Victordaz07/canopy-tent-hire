import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Booking, BookingStatus, DeliveryMethod } from '../types/booking';

export function subscribeToBookingsForDate(
  date: string,
  onChange: (bookings: Booking[]) => void,
): Unsubscribe {
  const bookingsQuery = query(collection(db, 'bookings'), where('date', '==', date));
  return onSnapshot(bookingsQuery, (snapshot) => {
    const bookings = snapshot.docs
      .map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Booking)
      .filter((booking) => booking.status !== 'cancelled');
    onChange(bookings);
  });
}

// A tent is fully booked for a date once any non-cancelled booking already
// claims it — there's only one of each tent in inventory.
export function getBookedTentIds(bookings: Booking[]): Set<string> {
  return new Set(bookings.map((booking) => booking.tentId));
}

export interface NewBookingInput {
  clientName: string;
  phone: string;
  tentId: string;
  date: string;
  deliveryMethod: DeliveryMethod;
  address: string;
}

export async function createBooking(input: NewBookingInput): Promise<void> {
  await addDoc(collection(db, 'bookings'), {
    ...input,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

// Admin-only (requires auth, per security rules): every booking regardless of status.
export function subscribeToAllBookings(onChange: (bookings: Booking[]) => void): Unsubscribe {
  const bookingsQuery = query(collection(db, 'bookings'), orderBy('date', 'desc'));
  return onSnapshot(bookingsQuery, (snapshot) => {
    onChange(snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Booking));
  });
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<void> {
  await updateDoc(doc(db, 'bookings', id), { status });
}
