// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-3">Mentor-Mentee Matching</h3>
            <p className="text-sm">Connecting mentors and mentees for meaningful growth</p>
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-pink-200 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-pink-200 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-pink-200 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="hover:text-pink-200 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-pink-200 transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="hover:text-pink-200 transition-colors">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-pink-400 mt-8 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Mentor-Mentee Matching App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
