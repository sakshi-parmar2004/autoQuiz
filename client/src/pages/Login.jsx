import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';

const Login = () => {
  const [state, setState] = useState('signup');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const Navigate = useNavigate();
  const { backendURL, setIsLoggedIn, theme } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(`${backendURL}/api/auth/${state}`, { name, email, password });
      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(true);
        Navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === 'day' ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      {/* Navbar fixed at the top */}
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div
          className={`p-8 rounded-lg shadow-md w-full max-w-md ${
            theme === 'day' ? 'bg-white text-black' : 'bg-gray-800 text-white'
          }`}
        >
          <h2
            className={`text-2xl font-bold text-center mb-6 ${
              theme === 'day' ? 'text-blue-600' : 'text-yellow-400'
            }`}
          >
            {state === 'signup' ? 'Sign Up' : 'Login'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {state === 'signup' && (
              <div className='flex gap-2 items-center'>
                <img 
                className='w-6 h-6'
                src={assets.person_icon} alt="" />
              
                
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === 'day'
                      ? 'border-gray-300 focus:ring-blue-500'
                      : 'border-gray-600 bg-gray-700 text-white focus:ring-yellow-400'
                  }`}
                />
              </div>
            )}
            <div  className='flex gap-2 items-center'>
            <img 
                className='w-6 h-6'
                src={assets.mail_icon} alt="" />
              
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'day'
                    ? 'border-gray-300 focus:ring-blue-500'
                    : 'border-gray-600 bg-gray-700 text-white focus:ring-yellow-400'
                }`}
              />
            </div>
            <div  className='flex gap-2 items-center'>
            <img 
                className='w-6 h-6'
                src={assets.lock_icon} alt="" />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'day'
                    ? 'border-gray-300 focus:ring-blue-500'
                    : 'border-gray-600 bg-gray-700 text-white focus:ring-yellow-400'
                }`}
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg transition duration-200 cursor-pointer ${
                theme === 'day'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-yellow-500 text-black hover:bg-yellow-600'
              }`}
            >
              {state === 'signup' ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center">
            {state === 'signup' ? (
              <>
                <p
                  className={`text-sm ${
                    theme === 'day' ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  Already have an account?
                </p>
                <span
                  onClick={() => setState('login')}
                  className={`cursor-pointer hover:underline ${
                    theme === 'day' ? 'text-blue-600' : 'text-yellow-400'
                  }`}
                >
                  Login
                </span>
              </>
            ) : (
              <>
                <p
                  className={`text-sm ${
                    theme === 'day' ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  Don't have an account?
                </p>
                <span
                  onClick={() => setState('signup')}
                  className={`cursor-pointer hover:underline ${
                    theme === 'day' ? 'text-blue-600' : 'text-yellow-400'
                  }`}
                >
                  Sign Up
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
