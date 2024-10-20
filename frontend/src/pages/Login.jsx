import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/login_img.jpg';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { auth, db } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import UserContext from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUserRole, setUserName, setUserEmail } = useContext(UserContext);
  const navigate = useNavigate();

  const handleError = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        toast.error('No account found with this email.');
        break;
      case 'auth/wrong-password':
        toast.error('Incorrect password. Please try again.');
        break;
      case 'auth/invalid-email':
        toast.error('Please enter a valid email address.');
        break;
      case 'auth/invalid-credential':
        toast.error('Invalid credentials provided. Please try again.');
        break;
      case 'auth/too-many-requests':
        toast.error('Too many login attempts. Please try again later.');
        break;
      default:
        toast.error('An error occurred. Please try again.');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const workerDocRef = doc(db, 'workers', user.uid);
      const workerDocSnap = await getDoc(workerDocRef);

      if (workerDocSnap.exists()) {
        const workerData = workerDocSnap.data();
        const workerName = workerData.name;

        setUserRole('Worker');
        setUserName(workerName);
        setUserEmail(user.email);

        localStorage.setItem('userRole', 'Worker');
        localStorage.setItem('userName', workerName);
        localStorage.setItem('userEmail', user.email);

        navigate('/content');
      } else {
        toast.error('Access denied: You are not authorized to login as a worker.');
        console.log('Access denied: User is not found in the workers collection.');
        await auth.signOut();
      }
    } catch (error) {
      console.error('Error logging in:', error);
      handleError(error.code);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const authorizedEmailRef = doc(db, 'authorizedEmails', user.email);
      const authorizedEmailSnap = await getDoc(authorizedEmailRef);

      if (authorizedEmailSnap.exists()) {
        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          const adminData = adminDocSnap.data();
          setUserRole(adminData.role);
          setUserName(adminData.fullName);
          setUserEmail(user.email);

          localStorage.setItem('userRole', adminData.role);
          localStorage.setItem('userName', adminData.fullName);
          localStorage.setItem('userEmail', user.email);

          navigate('/content');
        } else {
          const newAdminData = {
            fullName: user.displayName,
            email: user.email,
            role: 'Owner'
          };

          await setDoc(adminDocRef, newAdminData);
          setUserRole(newAdminData.role);
          setUserName(newAdminData.fullName);
          setUserEmail(user.email);

          localStorage.setItem('userRole', newAdminData.role);
          localStorage.setItem('userName', newAdminData.fullName);
          localStorage.setItem('userEmail', user.email);

          navigate('/content');
        }
      } else {
        toast.error('Access denied: Your email is not authorized to sign in as an admin.');
        await auth.signOut();
      }
    } catch (error) {
      handleError(error.code);
      console.error('Error during Google login:', error);
    }
  };
  
  return (
    <div className="w-full h-screen bg-white flex flex-col md:flex-row items-center justify-center p-5">
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center px-5">
        <form className="space-y-7 w-full max-w-md flex flex-col" onSubmit={handleEmailLogin}>
          <div className="w-full">
            <h1 className="text-2xl md:text-4xl font-semibold text-[var(--primary-color)] mb-2">Welcome Back!</h1>
            <p className="text-base font-normal">Login as a worker</p>
          </div>
          <div>
            <label htmlFor="worker-email" className="block text-base font-[420] text-gray-500 w-full">Email Address</label>
            <input
              type="email"
              id="worker-email"
              name="email"
              placeholder="Enter worker email address"
              className="mt-1 block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              required
              value={email}
              autoComplete="current-email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="worker-password" className="block text-base font-[420] text-gray-500 w-full">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="worker-password"
                name="password"
                placeholder="Enter your password"
                className="block w-full py-4 px-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-base leading-5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-500 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center cursor-pointer gap-1">
              Shop Owner ? <p onClick={handleGoogleLogin} className="text-violet-500 hover:text-violet-700">Continue with Google</p>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2 overflow-hidden h-full pl-10">
        <img src={bg} alt="..." className="w-full h-full object-cover object-center rounded-2xl" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
