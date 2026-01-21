import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl  italic font-semibold mb-4">Scooper's Dreams</h3>
            <p className="text-gray-400">
              Handcrafted artisanal ice cream made fresh daily in our family-owned factory.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-ice-cream-pink" />
                <span>123 Kamal Kunj, Vasant Vihar, New Delhi</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-ice-cream-pink" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-ice-cream-pink" />
                <span>hello@scoopdreams.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Hours</h4>
            <div className="space-y-2 text-gray-400">
              <div>Mon-Thu: 11AM - 10PM</div>
              <div>Fri-Sat: 11AM - 11PM</div>
              <div>Sun: 12PM - 9PM</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          © 2026 Scooper's Dreams. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;