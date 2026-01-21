// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, IceCream } from 'lucide-react';
import iceCream from '../assets/iceCreamBg.jpg'

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${iceCream})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
                
          
          {/* Tagline */}
          {/* <p className="text-xl md:text-2xl text-pink-200 mb-8">
            Artisanal Ice Cream Factory
          </p> */}

          {/* Main Description */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white/20">
            <p className="text-lg md:text-xl text-white mb-8">
              Handcrafted ice cream made fresh daily with locally sourced ingredients. 
              Experience unique flavors you won't find anywhere else.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-sm text-pink-200">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-pink-200">Flavors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm text-pink-200">Rating</div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="bg-pink-400 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors flex items-center justify-center"
              >
                View Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/tour"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Factory Tours
              </Link>
            </div>
          </div>

          {/* Quick Links
          <div className="flex justify-center space-x-6">
            <Link to="/about" className="text-pink-200 hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-pink-200 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/menu" className="text-pink-200 hover:text-white transition-colors">
              Order Online
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;