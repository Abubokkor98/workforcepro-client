import { motion } from "framer-motion";
import { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What features does WorkForce Pro offer?",
      answer:
        "WorkForce Pro includes features such as employee management, payroll processing, HR solutions, performance tracking, team collaboration, and compliance management.",
    },
    {
      id: 2,
      question: "Is WorkForce Pro compatible with mobile devices?",
      answer:
        "Yes, WorkForce Pro is optimized for both desktop and mobile devices, offering a smooth experience on smartphones and tablets.",
    },
    {
      id: 3,
      question: "How secure is the data in WorkForce Pro?",
      answer:
        "We use industry-standard encryption and secure cloud storage to ensure your data is safe. Our platform complies with all relevant data protection regulations.",
    },
    {
      id: 4,
      question: "What industries is this tool best suited for?",
      answer:
        "WorkForce Pro is ideal for industries such as human resources, retail, manufacturing, healthcare, technology, and professional services, where employee management, compliance, and performance tracking are essential.",
    },
    {
      id: 5,
      question: "How can I get support for WorkForce Pro?",
      answer:
        "Our customer support team is available 24/7 via email, live chat, or phone. We also provide a comprehensive knowledge base for self-help.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-background text-text">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-primary text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="w-full max-w-xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-4 px-6 bg-primary text-white font-semibold text-lg border-b border-gray-300"
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <div className="py-4 px-6 bg-gray-100 text-text/90">
                  <p>{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
