import React, { useContext, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';

const AUTH_MODE = {
  LOGIN: 'login',
  SIGNUP: 'signup',
};

const Login = () => {
  const [authMode, setAuthMode] = useState(AUTH_MODE.SIGNUP);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { backendURL, setIsLoggedIn, theme } = useContext(AppContext);

  const isSignup = authMode === AUTH_MODE.SIGNUP;
  const isDayTheme = theme === 'day';

  const inputClassName = useMemo(
    () =>
      `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        isDayTheme
          ? 'border-gray-300 bg-white text-black focus:ring-blue-500'
          : 'border-gray-600 bg-gray-700 text-white focus:ring-yellow-400'
      }`,
    [isDayTheme]
  );

  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (isSignup && !trimmedName) {
      toast.error('Please enter your name');
      return false;
    }

    if (!trimmedEmail) {
      toast.error('Please enter your email');
      return false;
    }

    if (!password) {
      toast.error('Please enter your password');
      return false;
    }

    if (isSignup && password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    const payload = isSignup
      ? {
          name: name.trim(),
          email: email.trim(),
          password,
        }
      : {
          email: email.trim(),
          password,
        };

    try {
      setIsSubmitting(true);

      const { data } = await axios.post(
        `${backendURL}/api/auth/${authMode}`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (!data?.success) {
        toast.error(data?.message || 'Authentication failed');
        return;
      }

      toast.success(
        data?.message ||
          (isSignup ? 'Account created successfully' : 'Logged in successfully')
      );

      setIsLoggedIn(true);

      navigate('/', {
        replace: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          (error.code === 'ERR_NETWORK'
            ? 'Unable to connect to the server'
            : 'Authentication request failed');

        toast.error(message);
        return;
      }

      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthModeChange = (newMode) => {
    if (isSubmitting) return;

    setAuthMode(newMode);

    // Password should not normally persist while switching auth modes.
    setPassword('');

    // Name is only relevant for signup.
    if (newMode === AUTH_MODE.LOGIN) {
      setName('');
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDayTheme ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div
          className={`p-8 rounded-lg shadow-md w-full max-w-md ${
            isDayTheme
              ? 'bg-white text-black'
              : 'bg-gray-800 text-white'
          }`}
        >
          <h1
            className={`text-2xl font-bold text-center mb-6 ${
              isDayTheme ? 'text-blue-600' : 'text-yellow-400'
            }`}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            {isSignup && (
              <div className="flex gap-2 items-center">
                <img
                  className="w-6 h-6 shrink-0"
                  src={assets.person_icon}
                  alt=""
                  aria-hidden="true"
                />

                <div className="w-full">
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <img
                className="w-6 h-6 shrink-0"
                src={assets.mail_icon}
                alt=""
                aria-hidden="true"
              />

              <div className="w-full">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={isSubmitting}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <img
                className="w-6 h-6 shrink-0"
                src={assets.lock_icon}
                alt=""
                aria-hidden="true"
              />

              <div className="w-full">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete={
                    isSignup ? 'new-password' : 'current-password'
                  }
                  disabled={isSubmitting}
                  className={inputClassName}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-lg transition duration-200 ${
                isSubmitting
                  ? 'opacity-60 cursor-not-allowed'
                  : 'cursor-pointer'
              } ${
                isDayTheme
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-yellow-500 text-black hover:bg-yellow-600'
              }`}
            >
              {isSubmitting
                ? isSignup
                  ? 'Creating account...'
                  : 'Logging in...'
                : isSignup
                  ? 'Sign Up'
                  : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p
              className={`text-sm mb-1 ${
                isDayTheme ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              {isSignup
                ? 'Already have an account?'
                : "Don't have an account?"}
            </p>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                handleAuthModeChange(
                  isSignup ? AUTH_MODE.LOGIN : AUTH_MODE.SIGNUP
                )
              }
              className={`cursor-pointer hover:underline disabled:opacity-60 ${
                isDayTheme ? 'text-blue-600' : 'text-yellow-400'
              }`}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
