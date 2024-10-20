import React, { useContext } from 'react';
import { UserContext } from '../pages/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
const Navbar = () => {
  const { userName, clearUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData(); 
    navigate('/'); 
  };

  return (
    <nav className="relative px-5 md:px-10 flex justify-between items-center bg-white h-[60px]">
      <a className="text-lg font-semibold leading-none uppercase tracking-wide" href="#">
        Bandage
      </a>
      <div className="flex items-center space-x-4">
        <p className="text-gray-600 focus:outline-none flex items-center justify-center gap-2 whitespace-nowrap overflow-ellipsis max-w-[100px] md:w-auto text-sm" aria-label="Profile">
        {userName || 'User'}
        </p>
        <button
          className="py-1 px-5 bg-neutral-600 hover:bg-red-600 text-white font-normal rounded-full transition duration-200 text-xs whitespace-nowrap"
          onClick={handleLogout} 
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
