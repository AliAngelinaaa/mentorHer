// src/pages/Home.jsx
import React from 'react';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Empowering Women Through Mentorship
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Connect with inspiring mentors and ambitious mentees in a supportive community designed for women's professional growth.
        </p>
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Find a Mentor</h3>
              <p className="text-gray-600">Get guidance from experienced professionals who've been there before.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Become a Mentor</h3>
              <p className="text-gray-600">Share your expertise and help shape the next generation of leaders.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Grow Together</h3>
              <p className="text-gray-600">Join a community that celebrates and supports women's success.</p>
            </div>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
