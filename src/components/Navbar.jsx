import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../customHooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { user, logoutUser, setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        toast.error("User Logged out");
        setDropdownOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="text-2xl font-bold text-white">
            WorkForce Pro
          </Link>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text focus:outline-none"
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
                className="text-lg text-primary hover:text-accent transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="text-lg text-primary hover:text-accent transition"
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
                    className="text-lg text-primary hover:text-accent transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className="block text-lg text-text hover:text-primary"
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
                  <Link
                    to="/auth/login"
                    className="block text-lg bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    className="block text-lg bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Navbar Links for Medium and Large Devices */}
        <div className="hidden sm:flex sm:items-center sm:gap-6">
          <Link to="/" className="text-lg hover:text-accent transition">
            Home
          </Link>
          <Link to="/contact-us" className="text-lg hover:text-accent transition">
            Contact Us
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-lg hover:text-accent transition">
                Dashboard
              </Link>
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/auth/login"
                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-secondary"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-accent"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
