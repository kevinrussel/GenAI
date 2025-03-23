import { useState } from "react";

export default function AboutPage() {
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
            About Us
          </h2>
        </div>
  
   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-fade-in-up">
          <img
            src="../../../images/study.png"
            alt="About Us"
            className="w-full h-72 md:h-80 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-500"
          />
  
          <div className="text-gray-300 text-sm md:text-base leading-relaxed text-center md:text-left">
            <p>
              We’re a passionate group of developers using AI to support mental wellness and productivity.
              Our project minimizes procrastination by adapting work sessions to your emotional state —
              helping you lock in while staying emotionally balanced.
            </p>
            <br />
            <p>
              We believe that technology should work with your emotions, not against them.
              By recognizing when you're distracted or overwhelmed, our platform adjusts focus
              intervals, break times, and motivational cues to help you reach your goals efficiently.
            </p>
            <br />
            <p>
              At the heart of everything we do is a commitment to emotional health, effective
              learning, and user-centered design. Whether you’re studying, building a routine,
              or just trying to stay productive, we’re here to support your journey.
            </p>
          </div>
        </div>
  
      </div>
    </div>
  );
  

  
}
