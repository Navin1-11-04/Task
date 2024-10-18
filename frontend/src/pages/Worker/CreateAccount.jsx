import React from 'react';
import bg from '../../assets/worker_createbg.jpeg';
import { LuEyeOff } from 'react-icons/lu';
import { LuEye } from 'react-icons/lu';

const CreateAccount = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center p-5">
      <div className="hidden md:block md:w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}></div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white px-5">
        <form className="space-y-7 w-full max-w-md flex flex-col">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--primary-color)]">Create Account</h1>
            <p className="text-base font-medium">Register as Worker</p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-full">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter worker email address"
              className="mt-1 block w-full py-4 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-full">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter worker full name"
              className="mt-1 block w-full py-4 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 w-full">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="block w-full py-4 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400">
                <LuEyeOff />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 w-full">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Retype password"
                className="block w-full py-4 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400">
                <LuEyeOff />
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create an account
            </button>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account? <a href="#" className="text-blue-500 hover:text-blue-600">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
