
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Submit', path: '/submit' },
    { name: 'Jury', path: '/jury' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      'fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-festival-darker/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-white font-display text-xl font-bold">
            OnScreen '25
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Youtube size={16} />
              </a>
            </div>
            <div className="border-l border-white/20 h-5" />
            <div className="flex items-center space-x-2">
              <button className="text-white/70 hover:text-white flex items-center transition-colors">
                <Globe size={16} className="mr-1" />
                <span className="text-sm">EN</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Trigger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-festival-darker">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-white font-medium hover:bg-white/10 rounded-md"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center px-3">
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <Youtube size={18} />
                </a>
              </div>
              <button className="text-white/70 hover:text-white flex items-center">
                <Globe size={18} className="mr-1" />
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
