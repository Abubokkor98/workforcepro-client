import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = false;
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-background text-text px-4 py-3 flex justify-between items-center shadow-md">
      <div className="logo">
        <Link to="/" className="text-xl font-bold text-primary">
          WorkForce Pro
        </Link>
      </div>
      <div className="nav-items flex gap-6">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <Link to="/contact-us" className="hover:text-primary">
          Contact Us
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => console.log("Profile clicked")}
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
