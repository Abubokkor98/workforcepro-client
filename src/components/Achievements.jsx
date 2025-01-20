import { motion } from "framer-motion";
import { FaRegThumbsUp, FaUsers, FaUserCog, FaTrophy } from "react-icons/fa";

export default function Achievements() {
  const stats = [
    { id: 1, value: "10+", label: "Years of Experience", icon: <FaRegThumbsUp />, bgColor: "bg-primary" },
    { id: 2, value: "100+", label: "Happy Clients", icon: <FaUsers />, bgColor: "bg-secondary" },
    { id: 3, value: "50K+", label: "Employees Managed", icon: <FaUserCog />, bgColor: "bg-accent" },
    { id: 4, value: "5", label: "Industry Awards", icon: <FaTrophy />, bgColor: "bg-gray-500" },
  ];

  return (
    <section className="py-16 bg-background text-text">
      <div className="container mx-auto px-4 text-center">
        {/* Section Heading */}
        <motion.h2
          className="text-primary text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Achievements
        </motion.h2>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg ${stat.bgColor} transition-transform transform hover:-translate-y-2`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
            >
              <div className="text-5xl text-white mb-2">{stat.icon}</div>
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-sm text-white">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
