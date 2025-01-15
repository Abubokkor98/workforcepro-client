import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
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
