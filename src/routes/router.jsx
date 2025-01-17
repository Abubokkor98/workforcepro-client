import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import ContactUs from "../pages/contact/ContactUs";
import DashBoardLayout from "../layouts/DashBoardLayout";
import WorkSheet from "../pages/dashboard/employee/WorkSheet";
import PaymentHistory from "../pages/dashboard/employee/PaymentHistory";
import EmployeeList from "../pages/dashboard/HR/EmployeeList";
import EmployeeDetails from "../pages/dashboard/HR/EmployeeDetails";
import ProgressPage from "../pages/dashboard/HR/ProgressPage";
import AllEmployeeList from "../pages/dashboard/Admin/AllEmployeeList";
import Payroll from "../pages/dashboard/Admin/Payroll";
import DashBoard from "../test/DashBoard";
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
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  // dashboard start here
  {
    path: "/dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      // employee
      {
        path: "work-sheet",
        element: <WorkSheet></WorkSheet>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      // HR
      {
        path: "employee-list",
        element: <EmployeeList></EmployeeList>,
        // element: <DashBoard></DashBoard>
        // element: <EmployeeDetails></EmployeeDetails>,
      },
      {
        path: "employee-details/:id",
        element: <EmployeeDetails></EmployeeDetails>,
      },
      {
        path: "progress",
        element: <ProgressPage></ProgressPage>,
      },
      // Admin
      {
        path: "all-employees",
        element: <AllEmployeeList></AllEmployeeList>,
      },
      {
        path: "payroll",
        element: <Payroll></Payroll>,
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
