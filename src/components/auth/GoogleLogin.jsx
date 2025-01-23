import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../provider/AuthProvider";

export default function GoogleLogin() {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
        toast.success("User login successfully.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogle}
        className="w-full md:w-8/12 lg:w-full mx-auto py-3 flex items-center justify-center bg-accent rounded-lg shadow hover:shadow-lg hover:border-gray-400 transition duration-200 text-white"
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        <span className="text-sm font-medium">Sign in with Google</span>
      </button>
    </div>
  );
}
