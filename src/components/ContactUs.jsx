import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import useAxiosPublic from "../customHooks/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const message = form.get("message");
    const newMessage = {
      email: email,
      message: message,
    };
    const { data } = await axiosPublic.post("/messages", newMessage);

    if (data.insertedId) {
      setStatus("message send successfully");
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("message failed");
      setTimeout(() => setStatus(""), 3000);
    }
    e.target.reset();
  };

  return (
    <div className=" py-10">
      {/* Section Header */}
      <div className="text-center max-w-4xl w-full mx-auto bg-white pt-4 rounded-t-lg">
        <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
          Let’s Start a Conversation
        </h2>
        <p className="text-secondary pb-6 md:pb-8 md:w-10/12 lg:w-7/12 mx-auto border-b">
          We value your feedback and inquiries. Whether you’re looking for
          support or simply want to connect, we’re just a message away.
        </p>
      </div>
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-b-lg shadow-lg">
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Address */}
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

            {/* Contact Form */}
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
    </div>
  );
};

export default ContactUs;
