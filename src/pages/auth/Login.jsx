import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

export default function Login() {
  const { loginUser, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
        toast.success("Login successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>Login | WorkForce Pro</title>
      </Helmet>
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-6 tracking-wide">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-text mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-primary hover:text-accent transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:bg-gradient-to-l hover:from-accent hover:to-primary transition duration-200 ease-in-out"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-primary font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
