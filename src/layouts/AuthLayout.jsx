import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthLayout() {
  return (
    <div className="bg-background">
      <Navbar></Navbar>
      <main className="min-h-[calc(100vh-140px)]">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}
