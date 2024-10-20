import React, { useState, useContext } from 'react';
import axios from 'axios';
import bg from '../assets/worker_createbg.jpeg';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { HiOutlineUser } from "react-icons/hi";
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

const CreateWorker = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { userEmail } = useContext(UserContext); // Access the logged-in user's email

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      console.log("Owner Email:", userEmail); // Add this line for debugging

      const response = await axios.post('https://task-d5dy.onrender.com/create_worker', {
        email,
        password,
        confirm_password: confirmPassword,
        name,
        role: 'worker',
        owner_email: userEmail,
      });

      setMessage(response.data.message); // Handle success message
    } catch (error) {
      setMessage(error.response?.data.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="hidden md:block md:w-1/2 h-full bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white px-5 rounded-3xl h-full">
        <form className="space-y-5 md:space-y-6 w-full max-w-md flex flex-col" onSubmit={handleSubmit}>
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
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-500 w-full">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter worker full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-500 w-full">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
                required
              />
              <span 
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-500 w-full">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                name="confirm-password"
                placeholder="Retype password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
                required
              />
              <span 
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#23A6F0] hover:bg-[#4b8aff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create an account'}
            </button>
            {message && <p className="mt-2 text-center text-sm text-red-500">{message}</p>}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-[#23A6F0] hover:text-[#4b8aff]">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorker;
