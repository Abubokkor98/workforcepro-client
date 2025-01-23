import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../customHooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { user, logoutUser, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        toast.error("Successfully Logged out");
        setDropdownOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-lg px-2 py-1 text-white font-semibold border-b-2 border-accent"
      : "text-lg px-2 py-1 text-white font-semibold";

  return (
    <nav className="bg-primary text-background sticky top-0 z-50 px-4 py-3 shadow-md">
      <div className="lg:mx-10 flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/" className="text-2xl font-bold text-background">
            WorkForce Pro
          </NavLink>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-background focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Drawer Menu for Small Devices */}
        <div
          className={`fixed inset-y-0 right-0 w-64 bg-background shadow-lg transform transition-transform duration-300 sm:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 left-4 text-text"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="mt-12 space-y-4 px-6">
            <li>
              <Link
                to="/"
                className="text-lg px-4 py-2 text-primary font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-lg px-4 py-2 text-primary font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-lg px-4 py-2 text-primary font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className="block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    className="block text-lg bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/register"
                    className="block text-lg bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Navbar Links for Medium and Large Devices */}
        <div className="hidden sm:flex sm:items-center sm:gap-6">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact Us
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={getNavLinkClass}>
                Dashboard
              </NavLink>
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white">
                    <button
                      onClick={handleLogout}
                      className="block w-full bg-red-500 text-white text-center px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <NavLink
                to="/auth/login"
                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-secondary"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-accent"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
