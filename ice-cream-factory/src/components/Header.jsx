import React, { useState } from 'react';
import { Menu, X, ShoppingCart, IceCream } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <IceCream className="h-8 w-8 text-pink-400" />
            <span className="text-3xl italic font-semibold text-gray-800">
              Scooper's Dreams
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-400">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-pink-400">
              Menu
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-400">
              About
            </Link>
            <Link to="/tour" className="text-gray-700 hover:text-pink-400">
              Tours
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-pink-400">
              Contact
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-800" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/tour" onClick={() => setIsMenuOpen(false)}>Tours</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Cart ({cartItems.length})
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
