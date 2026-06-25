import { useEffect, useState } from 'react';
import { subscribeToAllTents } from '../lib/tents';
import type { Tent } from '../types/tent';

export function useAdminTents() {
  const [tents, setTents] = useState<Tent[]>([]);

  useEffect(() => subscribeToAllTents(setTents), []);

  return { tents };
}
