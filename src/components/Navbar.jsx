import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../customHooks/useAuth";

export default function Navbar() {
  const { user, logoutUser, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        toast.error("User Logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="bg-background sticky top-0 z-50 text-text px-4 py-3 flex justify-between items-center shadow-md">
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
          <>
            <Link to="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
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
          </>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/auth/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
