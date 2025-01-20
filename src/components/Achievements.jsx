import { motion } from "framer-motion";
import { FaRegThumbsUp, FaUsers, FaUserCog, FaTrophy } from "react-icons/fa";

export default function Achievements() {
  const stats = [
    {
      id: 1,
      value: "10+",
      label: "Years of Experience",
      icon: <FaRegThumbsUp />,
      bgColor: "bg-primary",
    },
    {
      id: 2,
      value: "100+",
      label: "Happy Clients",
      icon: <FaUsers />,
      bgColor: "bg-secondary",
    },
    {
      id: 3,
      value: "50K+",
      label: "Employees Managed",
      icon: <FaUserCog />,
      bgColor: "bg-accent",
    },
    {
      id: 4,
      value: "5",
      label: "Industry Awards",
      icon: <FaTrophy />,
      bgColor: "bg-gray-500",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="mx-4 lg:mx-14 text-center">
        {/* Section Heading */}
        <motion.h2
          className="text-primary text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Proud Moments That Define Us
        </motion.h2>
        <motion.p
          className="text-lg text-secondary mb-6 md:mb-12 md:w-10/12 lg:w-7/12 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Over the years, we’ve reached incredible milestones that reflect our
          unwavering commitment to innovation and excellence. These achievements
          inspire us to keep striving for the extraordinary.
        </motion.p>

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
