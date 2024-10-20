import React, { useState } from 'react';

const Navbar = () => {
  return (
    <nav className="relative px-5 md:px-10 flex justify-between items-center bg-white h-[65px]">
      <a className="text-lg font-semibold leading-none uppercase tracking-wide" href="#">
        Bandage
      </a>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 focus:outline-none" aria-label="Profile">
          navin
        </button>
        <a
          className="py-1 px-5 bg-red-500 hover:bg-red-600 text-sm text-white font-normal rounded-xl transition duration-200"
          href="#"
        >
          Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
