import React from 'react';
import bg from '../../assets/login_img.jpeg';
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

const WorkerLogin = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col md:flex-row items-center justify-center p-5">
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-5">
        <form className="space-y-7 w-full max-w-md flex flex-col">
        <div className="w-full">
            <h1 className='text-2xl md:text-4xl font-semibold text-[var(--primary-color)] mb-2'>Welcome Back!</h1>
            <p className='text-base font-normal'>Login as a worker</p>
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-[420] text-gray-500 w-full">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" className="mt-1 block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm" />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-[420] text-gray-500 w-full">Password</label>
            <div className="relative mt-1">
              <input type="password" id="password" name="password" placeholder="Enter your password" className="block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm" />
              <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-base leading-5 text-gray-500">
                <LuEyeOff/>
              </span>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-4 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#23A6F0] hover:bg-[#4b8aff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
            <p className="mt-6 text-center text-sm text-gray-500">
              Shop Over? <a href="#" className="text-[#23A6F0] hover:text-[#4b8aff]">Continue with Google</a>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2 overflow-hidden h-full pl-10">
        <img src={bg} alt="..." className='w-full h-full object-cover object-center rounded-2xl' />
      </div>
    </div>
  )
}

export default WorkerLogin;
