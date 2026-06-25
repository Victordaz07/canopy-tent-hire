import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';
import type { Tent } from '../types/tent';

export async function fetchActiveTents(): Promise<Tent[]> {
  const tentsQuery = query(collection(db, 'tents'), where('active', '==', true));
  const snapshot = await getDocs(tentsQuery);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Tent);
}

// Admin-only (requires auth, per security rules): every tent, active or not.
export function subscribeToAllTents(onChange: (tents: Tent[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'tents'), (snapshot) => {
    onChange(snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Tent));
  });
}

export type NewTentInput = Omit<Tent, 'id'>;

export async function createTent(input: NewTentInput): Promise<void> {
  await addDoc(collection(db, 'tents'), input);
}

export async function updateTent(id: string, input: NewTentInput): Promise<void> {
  await updateDoc(doc(db, 'tents', id), input);
}

export async function deleteTent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'tents', id));
}
