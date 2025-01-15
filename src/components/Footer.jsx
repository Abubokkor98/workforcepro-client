import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} WorkForce Pro. All Rights Reserved.
        </p>
        <p className="text-sm text-secondary">
          Designed and Developed by Abu Bokkor Siddik
        </p>
      </div>
    </footer>
  );
}
