import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../customHooks/useRole";

export default function EmployeeRoutes({ children }) {
  const [role, loading] = useRole();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "Employee") {
    return children;
  }
  return <Navigate to={"/auth/login"}></Navigate>;
}
