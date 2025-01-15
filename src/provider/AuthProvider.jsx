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

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
