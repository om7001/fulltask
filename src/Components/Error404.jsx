import React from 'react';

const Error404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-800">Page not found</p>
      </div>
    </div>
  );
};

export default Error404;