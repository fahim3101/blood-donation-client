import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Search from '../pages/Search';
import BloodDonationRequests from '../pages/BloodDonationRequests';
import DonationRequestDetails from '../pages/DonationRequestDetails';
import Funding from '../pages/Funding';
import ErrorPage from '../pages/ErrorPage';

import DashboardHome from '../pages/Dashboard/DashboardHome';
import Profile from '../pages/Dashboard/Profile';
import MyDonationRequests from '../pages/Dashboard/MyDonationRequests';
import CreateDonationRequest from '../pages/Dashboard/CreateDonationRequest';
import EditDonationRequest from '../pages/Dashboard/EditDonationRequest';
import AllUsers from '../pages/Dashboard/AllUsers';
import AllBloodDonationRequests from '../pages/Dashboard/AllBloodDonationRequests';

import PrivateRoute from '../components/PrivateRoute';
import RoleRoute from '../components/RoleRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'search', element: <Search /> },
      { path: 'blood-donation-requests', element: <BloodDonationRequests /> },
      {
        path: 'donation-requests/:id',
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'funding',
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'profile', element: <Profile /> },
      {
        path: 'my-donation-requests',
        element: (
          <RoleRoute allowedRoles={['donor', 'admin', 'volunteer']}>
            <MyDonationRequests />
          </RoleRoute>
        ),
      },
      {
        path: 'create-donation-request',
        element: (
          <RoleRoute allowedRoles={['donor', 'admin', 'volunteer']}>
            <CreateDonationRequest />
          </RoleRoute>
        ),
      },
      {
        path: 'edit-donation-request/:id',
        element: (
          <RoleRoute allowedRoles={['donor', 'admin', 'volunteer']}>
            <EditDonationRequest />
          </RoleRoute>
        ),
      },
      {
        path: 'all-users',
        element: (
          <RoleRoute allowedRoles={['admin']}>
            <AllUsers />
          </RoleRoute>
        ),
      },
      {
        path: 'all-blood-donation-request',
        element: (
          <RoleRoute allowedRoles={['admin', 'volunteer']}>
            <AllBloodDonationRequests />
          </RoleRoute>
        ),
      },
    ],
  },
]);

export default router;
