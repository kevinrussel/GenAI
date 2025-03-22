import { useState } from "react";

export default function AboutPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:your-email@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 mt-20">
      
      <section className="flex flex-col md:flex-row items-center gap-10">
      <img src="../../../images/study.png" alt="About Us" className="w-40 h-70 rounded-lg shadow-md object-cover" />
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700">
            As an aspiring set of developers we aim to use AI to help empower the empowering change of tomorrow
            to help aid with human betterment. As a result we've created out product to cater towards minimizing
            procrastination by catering hours of locking in with emotions during the sessions.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        {submitted ? (
          <p className="text-green-600 text-center">Thank you for reaching out! We will get back to you soon.</p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
