import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';

import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/customer/Catalog';
import VehicleDetails from './pages/customer/VehicleDetails';
import NewReservation from './pages/customer/NewReservation';
import MyReservations from './pages/customer/MyReservations';
import MyBillings from './pages/customer/MyBillings';
import Profile from './pages/customer/Profile';
import Dashboard from './pages/admin/Dashboard';
import Vehicles from './pages/admin/Vehicles';
import Reservations from './pages/admin/Reservations';
import Billing from './pages/admin/Billing';
import MaintenancePage from './pages/admin/Maintenance';

const router = createBrowserRouter([
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  {
    path: '/',
    Component: CustomerLayout,
    children: [
      { index: true, element: <Navigate to="/vehicles" replace /> },
      { path: 'vehicles', Component: Catalog },
      { path: 'vehicles/:id', Component: VehicleDetails },
      { path: 'new-reservation', Component: NewReservation },
      { path: 'my-reservations', Component: MyReservations },
      { path: 'my-billings', Component: MyBillings },
      { path: 'profile', Component: Profile },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', Component: Dashboard },
      { path: 'vehicles', Component: Vehicles },
      { path: 'reservations', Component: Reservations },
      { path: 'billing', Component: Billing },
      { path: 'maintenance', Component: MaintenancePage },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
