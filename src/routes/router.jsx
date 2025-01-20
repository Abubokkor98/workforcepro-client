import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import DashBoardLayout from "../layouts/DashBoardLayout";
import WorkSheet from "../pages/dashboard/employee/WorkSheet";
import PaymentHistory from "../pages/dashboard/employee/PaymentHistory";
import EmployeeList from "../pages/dashboard/HR/EmployeeList";
import EmployeeDetails from "../pages/dashboard/HR/EmployeeDetails";
import ProgressPage from "../pages/dashboard/HR/ProgressPage";
import AllEmployeeList from "../pages/dashboard/Admin/AllEmployeeList";
import Payroll from "../pages/dashboard/Admin/Payroll";
import DashBoard from "../test/DashBoard";
import PrivateRoute from "./PrivateRoute";
import AdminRoutes from "./AdminRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import HrRoutes from "./HrRoutes";
import ContactPage from "../pages/contact/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // home start here
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "contact-us",
        element: <ContactPage></ContactPage>,
      },
    ],
  },
  // dashboard start here
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),

    children: [
      // employee
      {
        path: "work-sheet",
        element: (
          <EmployeeRoutes>
            <WorkSheet></WorkSheet>
          </EmployeeRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <EmployeeRoutes>
            <PaymentHistory></PaymentHistory>
          </EmployeeRoutes>
        ),
      },
      // HR
      {
        path: "employee-list",
        element: (
          <HrRoutes>
            <EmployeeList></EmployeeList>
          </HrRoutes>
        ),
        // element: <DashBoard></DashBoard>
      },
      {
        path: "employee-details/:email",
        element: (
          <HrRoutes>
            <EmployeeDetails></EmployeeDetails>
          </HrRoutes>
        ),
      },
      {
        path: "progress",
        element: (
          <HrRoutes>
            <ProgressPage></ProgressPage>
          </HrRoutes>
        ),
      },
      // Admin
      {
        path: "all-employees",
        element: (
          <AdminRoutes>
            <AllEmployeeList></AllEmployeeList>
          </AdminRoutes>
        ),
      },
      {
        path: "payroll",
        element: (
          <AdminRoutes>
            <Payroll></Payroll>
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
export default router;
