import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Message sent successfully!");
    setTimeout(() => setStatus(""), 3000); // Reset status after 3 seconds
    setFormData({ email: "", message: "" }); // Clear form
  };

  return (
    <>
     {/* Section Header */}
     <div className="text-center mb-12">
          <h2 className="text-primary text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-secondary">
            We'd love to hear from you! Please feel free to reach out with any
            feedback or inquiries.
          </p>
        </div>
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg">
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Address Section */}
            <div className="p-6 md:border-r border-gray-300">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-primary mt-1" />
                  <p className="text-gray-700">
                    123 Sports Lane, Fitness City, FC 45678
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <FaPhoneAlt className="text-primary mt-1" />
                  <p className="text-gray-700">+1 (123) 456-7890</p>
                </div>
                <div className="flex items-start space-x-2">
                  <FaEnvelope className="text-primary mt-1" />
                  <p className="text-gray-700">contact@sportstore.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                    placeholder="Type your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  Send Message
                </button>
                {status && (
                  <p className="text-center text-accent mt-2">{status}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
