import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../customHooks/useRole";
import useAuth from "../customHooks/useAuth";

export default function EmployeeRoutes({ children }) {
  const [role, loading] = useRole();
  const {isEmployee} = role
  const { logoutUser } = useAuth();

  useEffect(() => {
    if (!loading && !isEmployee) {
      logoutUser();
    }
  }, [loading, role, logoutUser]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isEmployee) {
    return children;
  }

  return <Navigate to={"/auth/login"} />;
}
