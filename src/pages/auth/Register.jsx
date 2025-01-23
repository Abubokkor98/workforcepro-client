import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosPublic from "../../customHooks/useAxiosPublic";
import useAuth from "../../customHooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
export default function Register() {
  const { registerUser, setUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    // const { name, email, password, photo } = data;

    // upload image to the image bb and get an URL
    const userImage = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, userImage, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // send the user data to the server with the image URL
      const user = {
        name: data.name,
        email: data.email,
        photo: res.data.data.display_url,
        role: data.role,
        designation: data.designation,
        bank_account_no: parseInt(data.bank_account_no),
        salary: parseInt(data.salary),
        isVerified: false,
        isFired: false,
      };
      // console.log(user);
      const userRes = await axiosPublic.post("/users", user);
      // console.log(userRes.data);
      if (userRes.data.insertedId) {
        registerUser(data.email, data.password)
          .then((result) => {
            const user = result.user;
            setUser(user);
            toast.success("Successfully registered");

            updateUserProfile({
              displayName: data.name,
              photoURL: res.data.data.display_url,
            })
              .then(() => {
                navigate("/");
                reset();
              })
              .catch((error) => {
                toast.error(error.message);
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    }
  };

  return (
    <div className=" bg-background flex items-center justify-center py-2">
      <Helmet>
        <title>Register | WorkForce Pro</title>
      </Helmet>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full sm:w-[500px]">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Role */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                defaultValue={""}
                className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
                {...register("role", { required: "Role is required" })}
              >
                <option disabled value={""}>
                  Select a role
                </option>
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.role.message}
                </span>
              )}
            </div>

            {/* Designation */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Designation</span>
              </label>
              <select
                defaultValue={""}
                className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
                {...register("designation", {
                  required: "Designation is required",
                })}
              >
                <option disabled value={""}>
                  Select your designation
                </option>
                <option value="Sales Assistant">Sales Assistant</option>
                <option value="Social Media Executive">
                  Social Media Executive
                </option>
                <option value="Digital Marketer">Digital Marketer</option>
              </select>
              {errors.designation && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.designation.message}
                </span>
              )}
            </div>
          </div>

          {/* Bank Account Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bank Account Number</span>
            </label>
            <input
              type="number"
              placeholder="Enter your bank account number"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              {...register("bank_account_no", {
                required: "Bank Account Number is required",
              })}
            />
            {errors.bank_account_no && (
              <span className="text-red-500 text-sm mt-2">
                {errors.bank_account_no.message}
              </span>
            )}
          </div>
          {/* Photo Upload Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Your Photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
              {...register("photo", {
                required: "Image upload is required",
                validate: {
                  isImage: (files) =>
                    (files && files[0]?.type.startsWith("image/")) ||
                    "Only image files are allowed",
                },
              })}
            />
            {errors.photo && (
              <span className="text-red-500 text-sm mt-2">
                {errors.photo.message}
              </span>
            )}
          </div>

          {/* Salary */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Salary</span>
            </label>
            <input
              type="number"
              placeholder="Enter your salary"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              {...register("salary", { required: "Salary is required" })}
            />
            {errors.salary && (
              <span className="text-red-500 text-sm mt-2">
                {errors.salary.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="relative form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text placeholder-gray-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  hasCapitalLetter: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one capital letter",
                  hasSpecialCharacter: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Password must contain at least one special character",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-secondary"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <TbFidgetSpinner className="animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
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
