import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
        {/* Loading Text */}
        <p className="mt-4 text-lg font-medium text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
