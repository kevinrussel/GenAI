import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hardcodedEmail = "testing@gmail.com";
    const hardcodedPassword = "123";

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setError("Sign-up successful! Please log in.");
      setIsSignUp(false);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // ✅ Check hardcoded credentials first
    if (
      formData.email === hardcodedEmail &&
      formData.password === hardcodedPassword
    ) {
      setError("");
      navigate("/startup");
    }
    // ✅ Then check localStorage
    else if (
      storedUser &&
      formData.email === storedUser.email &&
      formData.password === storedUser.password
    ) {
      setError("");
      navigate("/startup");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-[#0D001A]">
      <div className="bg-[#1C1B2A] shadow-lg rounded-lg p-6 w-96 text-white">
        {/* Tabs */}
        <div className="flex justify-around border-b border-[#C084FC] mb-4">
          <button
            className={`pb-2 text-lg font-semibold transition ${
              !isSignUp
                ? "border-b-2 border-[#FF4D9D] text-[#FF4D9D]"
                : "text-gray-400"
            }`}
            onClick={() => {
              setIsSignUp(false);
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`pb-2 text-lg font-semibold transition ${
              isSignUp
                ? "border-b-2 border-[#FF4D9D] text-[#FF4D9D]"
                : "text-gray-400"
            }`}
            onClick={() => {
              setIsSignUp(true);
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-[#C084FC]">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Enter your full name"
                onChange={handleChange}
                className="w-full p-2 border border-[#FF4D9D] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D9D]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#C084FC]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-2 border border-[#FF4D9D] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D9D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#C084FC]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-2 border border-[#FF4D9D] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D9D]"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-[#C084FC]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                onChange={handleChange}
                className="w-full p-2 border border-[#FF4D9D] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D9D]"
              />
            </div>
          )}

          {!isSignUp && (
            <div className="text-sm text-[#C084FC] hover:underline text-right">
              <button
                type="button"
                onClick={() =>
                  alert("A password reset link has been sent to your email.")
                }
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#FF4D9D] text-white p-2 rounded-md hover:bg-pink-600 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Prompt */}
        <div className="text-center mt-4 text-sm text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-[#C084FC] font-medium hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupLogin;
