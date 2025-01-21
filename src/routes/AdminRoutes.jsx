import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../customHooks/useRole";
import useAuth from "../customHooks/useAuth";
import { useEffect } from "react";
export default function AdminRoutes({ children }) {
  const [role, loading] = useRole();
  const { isAdmin } = role;
  const { logoutUser } = useAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      logoutUser();
    }
  }, [loading, role, logoutUser]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isAdmin) {
    return children;
  }
  return <Navigate to={"/auth/login"}></Navigate>;
}
