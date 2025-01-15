import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

export default function Register() {
  const { registerUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    if (password.length < 6) {
      setError("Password must be 6 characters or longer.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      return;
    }
    registerUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("User registered successfully");
        updateUserProfile({
          displayName: name,
          photoURL: photo,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Helmet>
        <title>Register | WorkForce Pro</title>
      </Helmet>
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
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
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-secondary hover:text-accent transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-secondary">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
