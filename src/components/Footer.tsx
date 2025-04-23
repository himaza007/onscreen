import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  
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
      className="bg-black border-t border-white/10 relative overflow-hidden"
    >
      {/* Background texture/pattern */}
      <div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      
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
                { icon: <Facebook size={18} />, url: "#", label: "Facebook" },
                { icon: <Twitter size={18} />, url: "#", label: "Twitter" },
                { icon: <Instagram size={18} />, url: "#", label: "Instagram" },
                { icon: <Youtube size={18} />, url: "#", label: "YouTube" }
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
                { name: 'News', path: '/news' },
                { name: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm flex items-center"
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
                  IIT City Office,<br/>
                  435 Galle Road,<br/>
                  Colombo 03, Sri Lanka
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-festival-red mr-3 flex-shrink-0" />
                <a 
                  href="mailto:info@onscreen25.com" 
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
    </footer>
  );
};

export default Footer;