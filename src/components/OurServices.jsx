import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaTasks, FaMoneyCheckAlt, FaChartLine } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Employee Management",
    description:
      "Efficiently manage employee records, performance, and payroll with our streamlined tools.",
    icon: <FaUserTie />,
    bgColor: "bg-primary",
  },
  {
    id: 2,
    title: "HR Solutions",
    description:
      "Simplify HR processes, recruitment, and onboarding with advanced solutions.",
    icon: <FaTasks />,
    bgColor: "bg-secondary",
  },
  {
    id: 3,
    title: "Payroll Processing",
    description:
      "Automate salary processing and ensure timely and accurate payouts.",
    icon: <FaMoneyCheckAlt />,
    bgColor: "bg-accent",
  },
  {
    id: 4,
    title: "Performance Tracking",
    description:
      "Monitor employee performance and provide valuable feedback for growth.",
    icon: <FaChartLine />,
    bgColor: "bg-text",
  },
];

export default function OurServices() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Section Heading */}
        <motion.h2
          className="text-primary text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`flex flex-col items-center rounded-lg shadow-lg p-6 ${service.bgColor} transition-transform transform hover:-translate-y-2`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2, // Add a stagger effect for each card
              }}
            >
              <div className="text-5xl text-white mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-white">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
