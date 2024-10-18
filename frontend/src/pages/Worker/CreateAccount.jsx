import React from 'react';
import bg from '../../assets/worker_createbg.jpeg';
import { LuEyeOff } from 'react-icons/lu';
import { LuEye } from 'react-icons/lu';
import { HiOutlineUser } from "react-icons/hi";
const CreateAccount = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="user absolute top-5 right-10 z-10">
        <p className='flex items-center justify-between gap-5 text-[#23A6F0]'><HiOutlineUser/>Logesh</p>
      </div>
      <div className="hidden md:block md:w-[60%] h-full bg-cover bg-center -z-10 absolute inset-y-0 left-0" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white px-5 absolute inset-y-0 right-0 rounded-3xl">
        <form className="space-y-5 md:space-y-6 w-full max-w-md flex flex-col">
          <div className="w-full mb-5">
            <h1 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)]">Create Worker Account</h1>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-500 w-full">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter worker email address"
              className="mt-1 block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-500 w-full">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter worker full name"
              className="mt-1 block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-500 w-full">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
              />
              <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 text-gray-400">
                <LuEyeOff />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-500 w-full">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Retype password"
                className="block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
              />
              <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 text-gray-400">
                <LuEyeOff />
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#23A6F0] hover:bg-[#4b8aff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create an account
            </button>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account? <a href="#" className="text-[#23A6F0] hover:text-[#4b8aff">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
