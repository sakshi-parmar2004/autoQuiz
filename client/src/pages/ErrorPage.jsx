import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found or access denied.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-white text-blue-600 font-semibold px-6 py-2 rounded shadow hover:bg-blue-100 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
