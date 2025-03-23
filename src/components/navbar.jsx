import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="w-full bg-[#0D001A] text-white py-4 shadow-md animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
  
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition">
              MyLogo
            </Link>
          </div>
  
          {/* Navigation Links */}
          <div className="hidden md:flex flex-grow justify-center space-x-6">
            <Link to="/" className="hover:text-purple-300 transition">Home</Link>
            <Link to="/aboutpage" className="hover:text-purple-300 transition">About Me</Link>
            <Link to="/contactme" className="hover:text-purple-300 transition">Contact Us</Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="hover:text-purple-300 transition">Dashboard</Link>
            )}
          </div>
  
          {/* Login/Logout Button */}
          <div className="hidden md:flex">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-medium flex items-center hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-purple-500 text-white px-4 py-2 rounded-md font-medium flex items-center hover:bg-purple-600 transition"
              >
                Login <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
            )}
          </div>
  
        </div>
      </div>
    </nav>
  );
  
  
}
