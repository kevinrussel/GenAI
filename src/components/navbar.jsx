import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">MyLogo</Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex flex-grow justify-center space-x-6">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
            )}
          </div>

          {/* Login / Logout Button */}
          <div className="hidden md:flex">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-medium flex items-center hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-white text-black px-4 py-2 rounded-md font-medium flex items-center hover:bg-gray-200">
                Login <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
