import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import GoogleLogin from "../../components/auth/GoogleLogin";
import useAuth from "../../customHooks/useAuth";

export default function Login() {
  const { loginUser, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(from, { replace: true });
        toast.success("Login successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen p-4">
      <Helmet>
        <title>Login | WorkForce Pro</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-white max-w-4xl w-full">
        {/* Left Section */}
        <div className="p-8 lg:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Welcome Back!
          </h2>
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="block w-full  px-4 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="block w-full px-4 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 top-7 right-4 flex items-center text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-secondary text-white rounded-lg hover:bg-accent focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-secondary text-white p-8 lg:w-1/2 flex flex-col justify-center items-center rounded-lg h-80 lg:h-96">
          <Lottie animationData={loginAnimation} className="w-3/4 h-48 mb-6" />
          <GoogleLogin />

          <p className="my-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-gray-700 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
