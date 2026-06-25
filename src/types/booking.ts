import type { Timestamp } from 'firebase/firestore';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type DeliveryMethod = 'delivery' | 'pickup';

export interface Booking {
  id: string;
  clientName: string;
  phone: string;
  tentId: string;
  date: string;
  deliveryMethod: DeliveryMethod;
  address: string;
  status: BookingStatus;
  createdAt: Timestamp;
}
