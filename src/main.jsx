import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <Toaster position="top-center" />
        <div className="max-w-screen-xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
