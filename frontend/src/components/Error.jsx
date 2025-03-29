import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-gray-800">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-lg text-gray-600">
                Oops! The page you're looking for doesn't exist.
            </p>
            <button
                onClick={handleGoBack}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
                Go Back
            </button>
        </div>
    );
};

export default Error;