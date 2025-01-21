import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <h1 className="text-2xl font-bold mb-4">WorkForce Pro</h1>
            <p className="text-secondary text-sm">
              Simplifying employee management with innovative tools for
              businesses of all sizes.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-accent transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-accent transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              {/* todo: will replace link with ancor */}
              <Link
                // href=""s
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-xl hover:text-accent transition"
              >
                <FaFacebook />
              </Link>
              <Link
                // href=""
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-xl hover:text-accent transition"
              >
                <FaTwitter />
              </Link>
              <Link
                // href=""
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-xl hover:text-accent transition"
              >
                <FaLinkedin />
              </Link>
              <Link
                // href=""
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-xl hover:text-accent transition"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-bold">Address:</span> 123 Workforce Lane,
                Business City
              </li>
              <li>
                <span className="font-bold">Phone:</span> +123-456-7890
              </li>
              <li>
                <span className="font-bold">Email:</span>{" "}
                <a
                  href="mailto:contact@workforcepro.com"
                  className="hover:text-accent transition"
                >
                  contact@workforcepro.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary mt-8"></div>

        {/* Footer Bottom */}
        <p className="text-center text-sm text-secondary mt-4">
          &copy; {new Date().getFullYear()} WorkForce Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
