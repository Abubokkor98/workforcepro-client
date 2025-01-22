import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FaChartLine, FaLock, FaPlug, FaSyncAlt } from "react-icons/fa";

const FeaturesOverview = () => {
  const features = [
    {
      id: 1,
      title: "Advanced Analytics",
      description: "Gain valuable insights with our robust analytics tools.",
      icon: "📊",
      icon1: <FaChartLine className="text-white text-5xl" />,
    },
    {
      id: 2,
      title: "Secure Data Storage",
      description: "Your data is protected with industry-leading encryption.",
      icon: "🔒",
      icon1: <FaLock className="text-white text-5xl" />,
    },
    {
      id: 3,
      title: "Real-Time Updates",
      description: "Get instant notifications and updates without delays.",
      icon: "⏱",
      icon1: <FaSyncAlt className="text-white text-5xl" />,
    },
    {
      id: 4,
      title: "Easy Integrations",
      description: "Seamlessly connect with your favorite third-party tools.",
      icon: "🔌",
      icon1: <FaPlug className="text-white text-5xl" />,
    },
  ];

  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">
          Our Key Features
        </h2>
        <p className="text-lg text-secondary mb-6 md:mb-12">
          Simplifying workforce management with powerful tools for every need.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feature) => (
            <ReactCardFlip
              key={feature.id}
              isFlipped={flippedCards[feature.id] || false}
              flipDirection="horizontal"
            >
              {/* Front Side */}
              <div
                className="flex flex-col items-center justify-center w-full h-44 bg-primary shadow-md rounded-lg cursor-pointer hover:bg-accent transition-colors duration-300"
                onClick={() => handleFlip(feature.id)}
              >
                <span className="text-5xl mb-4 text-white">
                  {feature.icon1}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>

              {/* Back Side */}
              <div
                className="flex flex-col items-center justify-center w-full h-44 bg-accent shadow-md rounded-lg p-6 text-white cursor-pointer"
                onClick={() => handleFlip(feature.id)}
              >
                <span className="text-5xl mb-4">{feature.icon}</span>
                <p className="text-lg">{feature.description}</p>
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
