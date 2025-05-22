import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, MessageSquare } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  
  // State for sticky effect
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Sticky footer logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const nearBottom = window.innerHeight + currentScrollY >= document.body.offsetHeight - 200;
      
      // Show footer when scrolling near the bottom of the page or scrolling up from near bottom
      if (nearBottom || (showFooter && !scrollingDown)) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Initial check for page position
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, showFooter]);
  
  const currentYear = new Date().getFullYear();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const socialLinkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <footer 
      ref={footerRef}
      className={`bg-black border-t border-white/10 relative overflow-hidden bottom-0 left-0 right-0 w-full transition-transform duration-500 ${
        showFooter ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        zIndex: 40,
        // Add height based on footer content to provide proper spacing at bottom of page
        height: 'auto', 
        willChange: 'transform'
      }}
    >
      {/* Background texture/pattern */}
      <div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      {/* Indicator bar */}
      <div className="h-1 w-full bg-festival-red absolute top-0 left-0 right-0 transform -translate-y-full"></div>
      
      <motion.div 
        className="container mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Festival Info */}
          <motion.div 
            className="md:col-span-4 lg:col-span-5"
            variants={itemVariants}
          >
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-white text-2xl font-display font-bold tracking-wider">
                OnScreen <span className="text-festival-red">'25</span>
              </h3>
            </Link>
            <p className="text-white/70 mb-6 font-light leading-relaxed max-w-md">
              Sri Lanka's Premier Short Film Festival celebrating excellence in filmmaking and showcasing emerging talent from around the globe.
            </p>
            
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={18} />, url: "https://web.facebook.com/profile.php?id=61575084556077&rdid=OdSP7ETjqLxznLM6&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F16P1dNbhNP%2F%3F_rdc%3D1%26_rdr#", label: "Facebook" },
                { icon: <Instagram size={18} />, url: "https://www.instagram.com/onscreen_25?igsh=MTJsbW5mMGl5dTFmYQ%3D%3D", label: "Instagram" },
                { icon: <Youtube size={18} />, url: "https://www.youtube.com/@iitrotaract", label: "YouTube" },
                { icon: <MessageSquare size={18} />, url: "https://whatsapp.com/channel/0029VbAfgtrJkK7EA0s5ep2Z" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300 border border-transparent hover:border-white/20"
                  variants={socialLinkVariants}
                  whileHover="hover"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links & Contact Info */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3"
            variants={itemVariants}
          >
            <h4 className="text-white uppercase tracking-wider text-sm font-medium mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About', path: '/about' },
                { name: 'Timeline', path: '/timeline' },
                { name: 'Workshops', path: '/workshops' },
                { name: 'Submit Your Film', path: '/submit' },
                { name: 'Sponsor', path: '/sponsors' },
                { name: 'Partners', path: '/partners' },
                { name: 'Educators', path: '/educators' },
                { name: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="border-b border-transparent group-hover:border-white pb-1">{item.name}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-2 ml-1">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="md:col-span-4 lg:col-span-4"
            variants={itemVariants}
          >
            <h4 className="text-white uppercase tracking-wider text-sm font-medium mb-5">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-festival-red mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                    10 Trelawney Place,<br />
                    Colombo 00400<br />
                    Sri Lanka
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-festival-red mr-3 flex-shrink-0" />
                <a 
                  href="mailto:onscreenfilmfest@gmail.com" 
                  className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                >
                  onscreenfilmfest@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-festival-red mr-3 flex-shrink-0" />
                <a 
                  href="tel:+94123456789" 
                  className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                >
                  +94 774 838 430
                </a>
              </li>
            </ul>
            
          </motion.div>
        </div>
        
        {/* Copyright & Legal */}
        <motion.div 
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          variants={itemVariants}
        >
          <p className="text-white/60 text-sm">
            © {currentYear} OnScreen Film Festival. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-xs">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-xs">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-xs">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Footer toggle button */}
      <button 
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-festival-red text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 shadow-lg"
        onClick={() => setShowFooter(!showFooter)}
        aria-label={showFooter ? "Hide footer" : "Show footer"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            transform: showFooter ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </footer>
  );
};

// This component adds the necessary padding to the bottom of your layout
// to accommodate the sticky footer
const FooterSpacer = () => {
  // Adjust the height to match your footer's approximate height
  return <div style={{ height: '600px' }} />;
};

export { Footer, FooterSpacer };
export default Footer;