import React from "react";
import Marquee from "react-fast-marquee";


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
    <section className="py-16 mx-4 lg:mx-14">
      <div className=" shadow-md py-4">
        {/* Heading */}
        <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6 text-center">
        Trusted by Professionals
        </h2>
        <p className="text-lg text-secondary text-center mb-6 md:mb-12 md:w-10/12 lg:w-7/12 mx-auto">
        Discover how WorkForce Pro has transformed workplaces across industries. Hear from our happy clients about their success stories and how our tools have made their workflows seamless and efficient.
        </p>

        {/* Marquee Slider */}
        <Marquee
          gradient={false}
          speed={70}
          pauseOnHover={false}
          className="testimonials-marquee"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center w-64 bg-accent text-white rounded-lg p-6 mx-4 text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-accent"
              />
              <h3 className="text-xl font-semibold ">
                {testimonial.name}
              </h3>
              <p className="text-sm italic text-white/90">
                {testimonial.title}
              </p>
              <p className="mt-4 text-text/80">
                {testimonial.feedback}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
