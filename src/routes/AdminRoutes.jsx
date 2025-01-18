import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../customHooks/useRole";

export default function AdminRoutes({ children }) {
  const [role, loading] = useRole();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "Admin") {
    return children;
  }
  return <Navigate to={"/auth/login"}></Navigate>;
}
