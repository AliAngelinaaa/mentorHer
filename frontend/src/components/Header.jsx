// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
            Mentor-Mentee Matching
          </h1>
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className="text-pink-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/login" 
              className="text-pink-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/dashboard" 
              className="text-pink-100 hover:text-white transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
