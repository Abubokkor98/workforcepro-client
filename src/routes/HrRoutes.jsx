import { Navigate } from "react-router-dom";
import useRole from "../customHooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../customHooks/useAuth";
import { useEffect } from "react";

export default function HrRoutes({ children }) {
  const [role, loading] = useRole();
  const { isHR } = role;
  const { logoutUser } = useAuth();

  useEffect(() => {
    if (!loading && !isHR) {
      logoutUser();
    }
  }, [loading, role, logoutUser]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isHR) {
    return children;
  }
  return <Navigate to={"/auth/login"}></Navigate>;
}
