import { useEffect, useState } from 'react';
import { fetchActiveTents } from '../lib/tents';
import type { Tent } from '../types/tent';

export function useTents() {
  const [tents, setTents] = useState<Tent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchActiveTents()
      .then((data) => {
        if (!cancelled) setTents(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { tents, loading, error };
}
