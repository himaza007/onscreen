import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Facebook, Instagram, MessageSquare, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Close mobile menu on location change
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Submit', path: '/submit' },
    { name: 'Sponsor', path: '/sponsors' },
    { name: 'Partners', path: '/partners' },
    { name: 'Educators', path: '/educators' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, url: "https://www.facebook.com/share/16P1dNbhNP/" },
    { icon: <Instagram size={18} />, url: "https://www.instagram.com/onscreen_25?igsh=MTJsbW5mMGl5dTFmYQ==" },
    { icon: <Youtube size={18} />, url: "https://www.youtube.com/@iitrotaract", label: "YouTube" },
    { icon: <MessageSquare size={18} />, url: "https://whatsapp.com/channel/0029VbAfgtrJkK7EA0s5ep2Z" }
  ];

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-black/50 backdrop-blur-md border-b border-white/5 py-3' 
          : 'bg-gradient-to-b from-black/60 to-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-white font-display font-bold tracking-wider relative z-50 flex items-center"
          >
            <span className="text-xl">OnScreen</span>
            <span className="text-festival-red text-xl ml-1">'25</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-1 mr-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-3 py-2 text-sm tracking-wide relative",
                        isActive 
                          ? "text-white font-medium" 
                          : "text-white/70 hover:text-white transition-colors duration-200"
                      )}
                    >
                      {item.name}
                      
                      {isActive && (
                        <motion.div 
                          className="absolute -bottom-1 left-3 right-3 h-[2px] bg-festival-red"
                          layoutId="navIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative z-50 text-white p-1 outline-none"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full px-6 pt-24 pb-8">
              <nav className="mb-auto">
                <ul className="space-y-6">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.li 
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={cn(
                            "block py-2 text-2xl tracking-wide font-light",
                            isActive 
                              ? "text-festival-red" 
                              : "text-white/90 hover:text-festival-red transition-colors duration-200"
                          )}
                          onClick={toggleMenu}
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="pt-6 border-t border-white/10"
              >
                <div className="flex justify-center space-x-8 mt-6">
                  {socialLinks.map((social, i) => (
                    <a 
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;