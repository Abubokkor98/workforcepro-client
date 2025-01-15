import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
