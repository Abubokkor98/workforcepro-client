import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/banner.json";

const Banner = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full bg-primary text-white py-16 px-8 flex flex-col lg:flex-row justify-between items-center">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Empowering Employees, Elevating Businesses
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Join us in making a difference in the workplace with innovative
          solutions.
        </p>
        <button className="bg-accent text-white px-6 py-3 rounded-lg shadow-lg hover:bg-secondary transition">
          Learn More
        </button>
      </div>

      {/* Right Side - Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie options={lottieOptions} height={300} width={300} />
      </div>
    </div>
  );
};

export default Banner;
