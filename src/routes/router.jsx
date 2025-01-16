import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import ContactUs from "../pages/contact/ContactUs";
import DashBoardLayout from "../layouts/DashBoardLayout";
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
