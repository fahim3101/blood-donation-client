import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  FaTint,
  FaHome,
  FaUser,
  FaList,
  FaPlusCircle,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
      isActive ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-blush'
    }`;

  const SidebarContent = () => (
    <>
      <Link to="/" className="flex items-center gap-2 px-2 mb-8">
        <FaTint className="text-primary-600 text-2xl" />
        <span className="font-heading text-xl font-semibold">Lifeline</span>
      </Link>

      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" end className={linkClass}>
          <FaHome /> Dashboard Home
        </NavLink>
        <NavLink to="/dashboard/profile" className={linkClass}>
          <FaUser /> Profile
        </NavLink>

        {user?.role === 'donor' && (
          <>
            <NavLink to="/dashboard/my-donation-requests" className={linkClass}>
              <FaList /> My Donation Requests
            </NavLink>
            <NavLink to="/dashboard/create-donation-request" className={linkClass}>
              <FaPlusCircle /> Create Request
            </NavLink>
          </>
        )}

        {(user?.role === 'admin' || user?.role === 'volunteer') && (
          <NavLink to="/dashboard/all-blood-donation-request" className={linkClass}>
            <FaList /> All Donation Requests
          </NavLink>
        )}

        {user?.role === 'admin' && (
          <NavLink to="/dashboard/all-users" className={linkClass}>
            <FaUsers /> All Users
          </NavLink>
        )}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 mt-8 rounded-xl text-primary-600 hover:bg-blush font-medium"
      >
        <FaSignOutAlt /> Logout
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 p-5 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2">
          <FaTint className="text-primary-600 text-xl" />
          <span className="font-heading font-semibold">Lifeline</span>
        </Link>
        <button onClick={() => setOpen(true)} className="text-2xl text-gray-700">
          <FaBars />
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-72 bg-white p-5 h-full">
            <button onClick={() => setOpen(false)} className="text-2xl text-gray-700 mb-6">
              <FaTimes />
            </button>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)}></div>
        </div>
      )}

      <main className="flex-1 p-5 md:p-8 mt-14 md:mt-0 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
