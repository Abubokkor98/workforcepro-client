import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../customHooks/useAxiosPublic";

export default function GoogleLogin() {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogle = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        // console.log(user);
        setUser(user);

        // save user to db
        const userInfoForDB = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "Employee",
          designation: "not set",
          bank_account_no: parseInt(""),
          salary: parseInt(100),
          isVerified: false,
          isFired: false,
        };
        // console.log(userInfoForDB);
        const userRes = await axiosPublic.post("/users", userInfoForDB);
        if (userRes.data?.insertedId) {
          toast.success("Successfully registered");
        } else {
          navigate(location?.state ? location.state : "/");
          toast.success("Login successfully.");
        }
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
