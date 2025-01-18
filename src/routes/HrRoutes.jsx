import { Navigate } from "react-router-dom";
import useRole from "../customHooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HrRoutes({ children }) {
  const [role, loading] = useRole();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "HR") {
    return children;
  }
  return <Navigate to={"/auth/login"}></Navigate>;
}
