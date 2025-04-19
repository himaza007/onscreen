import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 10);
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Submit', path: '/submit' },
    { name: 'Jury', path: '/jury' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -5 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md py-3' 
          : 'bg-transparent py-1'
      )}
      animate={{ 
        y: scrollDirection === 'down' && isScrolled && !isOpen ? -100 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white font-display text-xl font-bold tracking-wider relative z-50">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              OnScreen <span className="text-festival-red">'25</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 relative overflow-hidden group py-2"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Social & Language */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {[
                { icon: <Facebook size={16} />, url: "#" },
                { icon: <Twitter size={16} />, url: "#" },
                { icon: <Instagram size={16} />, url: "#" },
                { icon: <Youtube size={16} />, url: "#" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.url} 
                  className="text-white/70 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="border-l border-white/20 h-5" />
            <div className="flex items-center">
              <motion.button 
                className="text-white/70 hover:text-white flex items-center transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} className="mr-1" />
                <span className="text-sm">EN</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Trigger */}
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden text-white relative z-50"
            aria-label="Toggle Menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 pt-24 pb-8 overflow-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-6">
              <motion.div className="flex flex-col space-y-4" variants={itemVariants}>
                {navItems.map((item, i) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      to={item.path}
                      className="block py-3 text-white text-2xl font-light hover:text-festival-red transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-12 pt-8 border-t border-white/10 flex flex-col space-y-8"
                variants={itemVariants}
              >
                {/* Social Links */}
                <div className="flex justify-center space-x-6">
                  {[
                    { icon: <Facebook size={20} />, url: "#" },
                    { icon: <Twitter size={20} />, url: "#" },
                    { icon: <Instagram size={20} />, url: "#" },
                    { icon: <Youtube size={20} />, url: "#" }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.url} 
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                
                {/* Language */}
                <div className="flex justify-center">
                  <button className="text-white/70 hover:text-white flex items-center transition-colors duration-300">
                    <Globe size={18} className="mr-2" />
                    <span className="text-sm uppercase tracking-wide">English</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;