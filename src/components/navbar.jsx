import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <div className="flex-shrink-0">
            <a href="/home" className="text-2xl font-bold">MyLogo</a>
          </div>

          <div className="hidden md:flex flex-grow justify-center space-x-6">
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="/contact" className="hover:text-gray-400">Contact</a>
          </div>

          <div className="hidden md:flex">
            <a href="/login" className="bg-white text-black px-4 py-2 rounded-md font-medium flex items-center hover:bg-gray-200">
              Login <ArrowRightIcon className="h-5 w-5 ml-2" />
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}
