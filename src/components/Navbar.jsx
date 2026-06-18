import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaTint, FaBars, FaTimes } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors hover:text-primary-600 ${isActive ? 'text-primary-600' : 'text-gray-700'}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <FaTint className="text-primary-600 text-2xl" />
            <span className="font-heading text-xl font-semibold text-gray-800">Lifeline</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/blood-donation-requests" className={navLinkClass}>
              Donation Requests
            </NavLink>
            {user && (
              <NavLink to="/funding" className={navLinkClass}>
                Funding
              </NavLink>
            )}
            {!user && (
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-200"
                  />
                </button>
                {menuOpen && (
                  <div
                    onMouseLeave={() => setMenuOpen(false)}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft border border-blush py-2"
                  >
                    <p className="px-4 py-2 text-sm text-gray-500 truncate">{user.name}</p>
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blush">
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-primary-600 hover:bg-blush"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/register"
                className="bg-primary-600 text-white px-5 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors"
              >
                Join as a donor
              </Link>
            )}
          </div>

          <button className="md:hidden text-2xl text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/blood-donation-requests" className={navLinkClass} onClick={() => setOpen(false)}>
              Donation Requests
            </NavLink>
            {user && (
              <NavLink to="/funding" className={navLinkClass} onClick={() => setOpen(false)}>
                Funding
              </NavLink>
            )}
            {user ? (
              <>
                <Link to="/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={logout} className="text-left font-medium text-primary-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className={navLinkClass} onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
