import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import errorImg from "../assets/error.png";

export default function ErrorPage({ error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      {/* Animated Heading */}
      <motion.h1
        className="text-9xl font-extrabold text-accent mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>
      {/* Error Status or Message */}
      <motion.i
        className="text-lg italic text-secondary mb-4 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </motion.i>

      {/* Error Message */}
      <motion.p
        className="text-2xl font-semibold text-center text-secondary mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Back to Homepage Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Link
          to="/"
          className="bg-primary text-background px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-accent hover:shadow-xl transition duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Illustration */}
      <motion.img
        src={errorImg}
        alt="Error Illustration"
        className="w-full h-72 max-w-md mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
    </div>
  );
}
