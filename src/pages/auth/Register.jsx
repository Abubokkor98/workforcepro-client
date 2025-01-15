import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Register() {
  const { registerUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Employee");
  const [file, setFile] = useState(null);
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [salary, setSalary] = useState("");
  const [designation, setDesignation] = useState("");
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

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Upload Your Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
            {file && (
              <div className="mt-2">
                <p className="text-sm text-text">Selected file: {file.name}</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-full mt-2"
                />
              </div>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Role
            </label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
              required
            >
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Bank Account Number */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Bank Account Number
            </label>
            <input
              type="text"
              name="bank_account_no"
              value={bankAccountNo}
              onChange={(e) => setBankAccountNo(e.target.value)}
              placeholder="Enter your bank account number"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter your salary"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Designation
            </label>
            <select
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
              required
            >
              <option value="Sales Assistant">Sales Assistant</option>
              <option value="Social Media Executive">
                Social Media Executive
              </option>
              <option value="Digital Marketer">Digital Marketer</option>
              {/* Add other designations as needed */}
            </select>
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
            to={"/auth/login"}
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
