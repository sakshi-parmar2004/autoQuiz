import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AppContext } from '../context/AppContext';

const Results = () => {
  const { state } = useLocation(); // Access state passed via navigation
  const { score, total } = state || {}; // Destructure score and total
  const { theme } = useContext(AppContext); // Access theme from AppContext
  const navigate = useNavigate();

  useEffect(() => {
    if (score === undefined || total === undefined) {
      // Redirect to home or quiz if accessed directly
    //   navigate("/");
    }
  }, [score, total, navigate]);
  return (
    <>
      <Navbar />
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === 'day' ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        <div
          className={`p-10 rounded-lg shadow-lg text-center max-w-md w-full ${
            theme === 'day' ? 'bg-white text-black' : 'bg-gray-800 text-white'
          }`}
        >
          <h1
            className={`text-4xl font-bold mb-6 ${
              theme === 'day' ? 'text-blue-600' : 'text-yellow-400'
            }`}
          >
            Quiz Results
          </h1>
          <div
            className={`text-6xl font-extrabold mb-4 ${
              theme === 'day' ? 'text-blue-600' : 'text-yellow-400'
            }`}
          >
            {score} / {total}
          </div>
          <p
            className={`text-lg mb-8 ${
              theme === 'day' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            You scored <span className="font-bold">{score}</span> out of{' '}
            <span className="font-bold">{total}</span> questions!
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className={`py-3 px-6 rounded-lg shadow-md transition duration-200 cursor-pointer ${
              theme === 'day'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-yellow-500 text-black hover:bg-yellow-600'
            }`}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Results;
