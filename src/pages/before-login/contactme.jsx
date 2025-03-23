import { useState } from "react";

export default function ContactMe()  {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:your-email@gmail.com?subject=Contact from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(formData.message)}`;
    setSubmitted(true);
  };

  return (
    <div className="h-[calc(100vh-6rem)] bg-[#0D001A] flex justify-center items-center px-4 py-8">
      <div className="bg-[#12021F] p-10 rounded-xl w-full max-w-5xl shadow-lg">

        <div className="mb-10 animate-fade-in text-center">
          <h2 className="text-4xl font-extrabold text-purple-400">
            Contact Us
          </h2>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-fade-in-up">
  
   
          <div className="text-gray-300 text-sm md:text-base leading-relaxed text-center md:text-left">
            <p>
              We'd love to hear from you! Whether you have a question, feedback, or just want to say hi,
              feel free to drop us a message. We're here to help you stay emotionally balanced and productive.
            </p>
            <br />
            <p>
              Our team typically responds within 24 hours. Let’s work together to build a better future —
              one focused and emotionally strong day at a time.
            </p>
          </div>
  
        
          <div className="bg-[#1C1B28] p-6 rounded-lg shadow-md w-full">
            {submitted ? (
              <p className="text-green-400 text-center">
                Thank you for reaching out! We’ll get back to you soon.
              </p>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#262434] border border-pink-400 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#262434] border border-pink-400 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#262434] border border-pink-400 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white font-semibold py-3 rounded hover:bg-pink-600 transition"
                >
                  Send
                </button>
              </form>
            )}
          </div>
  
        </div>
      </div>
    </div>
  );
  
  
}
