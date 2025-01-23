import React from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaTasks,
  FaMoneyCheckAlt,
  FaChartLine,
  FaDatabase,
  FaUsers,
  FaFileContract,
  FaChartPie,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Employee Management",
    description:
      "Organize and oversee employee data, schedules, and profiles seamlessly through intuitive tools tailored for scalability.",
    icon: <FaUserTie />,
    bgColor: "bg-primary",
  },
  {
    id: 2,
    title: "HR Solutions",
    description:
      "Streamline HR operations, including recruitment, training, and onboarding, to enhance workforce efficiency and satisfaction.",
    icon: <FaTasks />,
    bgColor: "bg-secondary",
  },
  {
    id: 3,
    title: "Payroll Processing",
    description:
      "Simplify payroll management with automated calculations, tax compliance, and secure payment processing.",
    icon: <FaMoneyCheckAlt />,
    bgColor: "bg-gray-500",
  },
  {
    id: 4,
    title: "Performance Tracking",
    description:
      "Track employee performance with detailed analytics and feedback tools to foster growth and development.",
    icon: <FaChartLine />,
    bgColor: "bg-accent",
  },
  {
    id: 5,
    title: "Team Collaboration",
    description:
      "Boost teamwork with integrated collaboration tools designed for real-time communication and project management.",
    icon: <FaUsers />,
    bgColor: "bg-secondary",
  },
  {
    id: 6,
    title: "Workforce Analytics",
    description:
      "Leverage powerful analytics to make data-driven decisions and optimize workforce productivity.",
    icon: <FaDatabase />,
    bgColor: "bg-primary",
  },
  {
    id: 7,
    title: "Compliance Management",
    description:
      "Ensure regulatory compliance with built-in tools for policy management, audits, and reporting.",
    icon: <FaFileContract />,
    bgColor: "bg-accent",
  },
  {
    id: 8,
    title: "Custom Reporting",
    description:
      "Generate detailed, customizable reports to gain insights into workforce trends and metrics.",
    icon: <FaChartPie />,
    bgColor: "bg-gray-500",
  },
];

export default function OurServices() {
  return (
    <section className="bg-background  py-16">
      <div className="mx-4 lg:mx-14 text-center">
        <motion.h2
          className="text-primary md:w-10/12 lg:w-6/12 mx-auto text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Efficient Workforce Management at Your Fingertips
        </motion.h2>
        <motion.p
          className="text-lg text-secondary mb-6 md:mb-12 md:w-10/12 lg:w-7/12 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Manage your team effortlessly with WorkForce Pro. From tracking tasks
          to handling payroll, our platform makes employee management simple,
          efficient, and secure. Everything you need, all in one place!
        </motion.p>

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
                delay: index * 0.2,
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
