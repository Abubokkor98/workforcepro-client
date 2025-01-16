import { Helmet } from "react-helmet-async";

export default function ContactUs() {
  return (
    <div className="pt-5">
      <Helmet>
        <title>Contact | WorkForce Pro</title>
      </Helmet>
      <div className="bg-background text-text py-16 px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-primary">
          Contact Us
        </h2>
        <form className="max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 border rounded-md"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 mb-4 border rounded-md"
            rows="5"
          ></textarea>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-accent transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
