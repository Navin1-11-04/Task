import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative px-10 py-4 flex justify-between items-center bg-white h-[80px]">
      <a className="text-xl font-medium leading-none" href="#">
        Bandage
      </a>
      <div className="lg:hidden">
        <button
          className="navbar-burger flex items-center text-blue-600 p-3"
          onClick={toggleMenu}
        >
          <span className="block h-4 w-4">☰</span> 
        </button>
      </div>
      <ul className="hidden lg:flex lg:items-center lg:space-x-6">
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Home
          </a>
        </li>
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            About Us
          </a>
        </li>
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Services
          </a>
        </li>
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Pricing
          </a>
        </li>
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Contact
          </a>
        </li>
      </ul>

      <div className="hidden lg:inline-block lg:ml-auto">
        <a
          className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
          href="#"
        >
          Sign In
        </a>
        <a
          className="ml-3 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          href="#"
        >
          Sign Up
        </a>
      </div>

      {isMenuOpen && (
        <div className="navbar-menu absolute top-0 left-0 w-5/6 max-w-sm bg-white shadow-lg z-50">
          <nav className="p-6">
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Services
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Pricing
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <a
                className="block py-3 text-center text-sm text-gray-900 font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl transition duration-200"
                href="#"
              >
                Sign In
              </a>
              <a
                className="block mt-2 py-3 text-center text-sm text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-200"
                href="#"
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
