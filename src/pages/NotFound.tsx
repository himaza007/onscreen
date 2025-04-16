import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background texture overlay */}
      <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
      
      {/* Film strip decoration */}
      <div className="absolute top-0 left-0 right-0 h-10 flex overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-full w-10 border-r border-white/5"></div>
        ))}
      </div>
      
      <div className="text-center px-6 z-10 max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-festival-red/10 mb-8">
            <span className="text-5xl font-bold text-festival-red">404</span>
          </div>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl font-display font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Scene Not Found
        </motion.h1>
        
        <motion.p 
          className="text-lg text-white/70 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          The scene you're looking for appears to be missing from our film reel. 
          Let's take you back to a scene we know exists.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-festival-red hover:bg-festival-red/90 text-white font-medium transition-colors duration-300 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
      
      {/* Film strip decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-10 flex overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-full w-10 border-r border-white/5"></div>
        ))}
      </div>
      
      {/* Film reel decoration */}
      <div className="absolute -right-24 -bottom-24 w-48 h-48 border-8 border-white/5 rounded-full"></div>
      <div className="absolute -left-24 -top-24 w-48 h-48 border-8 border-white/5 rounded-full"></div>
    </div>
  );
};

export default NotFound;