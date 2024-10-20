import React, { useState, useContext } from 'react';
import axios from 'axios';
import bg from '../assets/worker_createbg.jpeg';
import { LuEyeOff, LuEye } from 'react-icons/lu';
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

  const { userEmail } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      console.log('Owner Email:', userEmail);

      const response = await axios.post('https://task-d5dy.onrender.com/create_worker', {
        email,
        password,
        confirm_password: confirmPassword,
        name,
        role: 'worker',
        owner_email: userEmail,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.error || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh_-_150px)]">
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white rounded-3xl h-full">
        <form className="space-y-5 md:space-y-6 w-full max-w-md flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-[var(--primary-color)] text-center">Create Worker Account</h1>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter worker email address"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full py-3.5 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-500">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter worker full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full py-3.5 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-500">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full py-3.5 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
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
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-500">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                name="confirm-password"
                placeholder="Retype password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full py-3.5 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
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
              className="w-full flex justify-center py-3.5 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create an account'}
            </button>
            {message && <p className="mt-2 text-center text-sm text-red-500">{message}</p>}
            <p className="mt-6 text-center text-sm text-gray-600">
              Login as a worker ? <Link to="/" className="text-violet-500 hover:text-violet-600">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorker;
