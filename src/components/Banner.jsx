import { Fade } from "react-awesome-reveal";
import bannerImg from "../assets/banner-img.png";

export default function Banner() {
  return (
    <div className="bg-gray-400 mt-6 py-16 px-6 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center  justify-between gap-12">
        {/* Left Section */}
        <div className="text-center w-7/12 md:text-left max-w-xl">
          <Fade direction="left" triggerOnce>
            <h1 className="text-4xl font-bold leading-snug text-white">
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
          <div className="w-full rounded-lg">
            <div>
              <img
                src={bannerImg}
                alt="Teamwork Success"
                className="relative z-10 rounded-lg shadow-2xl w-[320px] h-[320px]"
              />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
