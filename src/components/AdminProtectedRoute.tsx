import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

export default function AdminProtectedRoute() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
