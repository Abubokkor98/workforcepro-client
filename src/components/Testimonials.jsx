import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Axd Ab",
    title: "CEO at TechCorp",
    feedback:
      "This company revolutionized our workflow. The employee management tools are intuitive and highly efficient!",
    image: "https://i.ibb.co.com/PQ9K6cZ/logo.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "HR Manager at SoftSolutions",
    feedback:
      "Amazing service! Their HR solutions simplified our recruitment process beyond expectations.",
    image: "https://i.ibb.co.com/3z2ZQg6/1.jpg",
  },
  {
    id: 3,
    name: "King Gopy",
    title: "Operations Head at FastFlow",
    feedback:
      "The payroll processing feature has saved us hours of work every month. Highly recommend their tools!",
    image: "https://i.ibb.co.com/cYsQCFb/6.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "Project Manager at InnovateX",
    feedback:
      "Performance tracking has never been easier. The analytics and insights are invaluable for growth.",
    image: "https://i.ibb.co.com/nmv8DDS/5.jpg",
  },
  {
    id: 5,
    name: "Mike Johnson",
    title: "Operations Head at FastFlow",
    feedback:
      "The payroll processing feature has saved us hours of work every month. Highly recommend their tools!",
    image: "https://i.ibb.co.com/cYsQCFb/6.jpg",
  },

  {
    id: 6,
    name: "Emily Davis",
    title: "Project Manager at InnovateX",
    feedback:
      "Performance tracking has never been easier. The analytics and insights are invaluable for growth.",
    image: "https://i.ibb.co.com/nmv8DDS/5.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold text-text text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Testimonials
        </motion.h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="testimonials-slider"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                className="flex flex-col items-center bg-background text-text shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 flex-grow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 border-4 border-accent"
                />
                <h3 className="text-xl font-semibold text-text">
                  {testimonial.name}
                </h3>
                <p className="text-sm italic text-secondary">
                  {testimonial.title}
                </p>
                <p className="mt-4 text-primary flex-grow">
                  {testimonial.feedback}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
