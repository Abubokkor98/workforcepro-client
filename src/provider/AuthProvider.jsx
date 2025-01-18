import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../customHooks/useAxiosPublic";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // register user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   login existing user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   logout user
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  // update user functionality for using in register page
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // google login
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // firease observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Get token and store it in local storage
        const userInfo = { email: currentUser.email };
        const { data } = await axiosPublic.post("jwt", userInfo);
        // Store token
        localStorage.setItem("access-token", data.token);
      } else {
        // Remove token if there is no user
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const userInfo = {
    user,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    googleSignIn,
    setUser,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}
