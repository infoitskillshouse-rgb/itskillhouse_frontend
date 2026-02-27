import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardHome = lazy(() => import('@/pages/admin/DashboardHome'));
const Users = lazy(() => import('@/pages/admin/Users'));

const adminRoutes = {
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: '', element: <DashboardHome /> },
    { path: 'users', element: <Users /> },
    { path: '*', element: <Navigate to="/dashboard" /> },
  ],
};

export default adminRoutes;
