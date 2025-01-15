import { Fade } from "react-awesome-reveal";
import bannerImg from "../assets/Teamwork.jpg";

export default function Banner() {
  return (
    <div className="py-16 px-6 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="text-center md:text-left max-w-xl">
          <Fade direction="left" triggerOnce>
            <h1 className="text-4xl md:text-5xl font-bold leading-snug text-primary">
              Empowering Employees, Elevating Businesses
            </h1>
            <p className="mt-6 text-lg text-text">
              Join over{" "}
              <span className="text-accent font-semibold">
                10,000 professionals
              </span>{" "}
              who trust{" "}
              <span className="text-secondary font-semibold">
                WorkForce Pro
              </span>{" "}
              for seamless workload and salary management. Let’s help you
              thrive.
            </p>
            <div className="mt-8">
              <button className="bg-primary text-background px-8 py-3 rounded-lg font-medium shadow-md hover:bg-secondary hover:text-text transition duration-300">
                Get Started Today
              </button>
            </div>
          </Fade>
        </div>

        {/* Right Section */}
        <Fade direction="right" triggerOnce>
          <div className="max-w-md w-full flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 rounded-lg blur-lg"></div>
              <img
                src={bannerImg}
                alt="Teamwork Success"
                className="relative z-10 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
