import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ADMIN_UID = import.meta.env.VITE_ADMIN_UID as string;

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || user.uid !== ADMIN_UID) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
