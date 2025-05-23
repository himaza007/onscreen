import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Film, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSubmitClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSubmitClick }) => {
  const [loading, setLoading] = useState(true);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  
  const backgroundUrl = 'url(https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80)';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced navigation function with loading state
  const handleSubmitFilmClick = () => {
    // Add a subtle loading effect before navigation
    window.location.href = '/submit';
  };

  // Modern button component with advanced animations
  const ModernSubmitButton = () => {
    return (
      <motion.div
        className="relative group"
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        
        {/* Main button */}
        <motion.button
          onClick={handleSubmitFilmClick}
          className="relative bg-gradient-to-r from-festival-red to-red-600 hover:from-red-600 hover:to-festival-red text-white font-semibold py-4 px-8 sm:py-5 sm:px-12 rounded-2xl border border-festival-red/50 hover:border-white/30 transition-all duration-300 overflow-hidden group shadow-2xl"
          whileHover={{ 
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
            y: -2
          }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isButtonHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {/* Film strip animation */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
          />
          
          {/* Button content */}
          <div className="relative flex items-center justify-center gap-3 text-sm sm:text-base uppercase tracking-[0.1em]">
            {/* Film icon */}
            <motion.div
              animate={{
                rotate: isButtonHovered ? [0, 10, -10, 0] : 0,
                scale: isButtonHovered ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Film className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            
            {/* Button text */}
            <motion.span
              className="font-bold"
              animate={{
                scale: isButtonHovered ? [1, 1.05, 1] : 1
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              Submit Your Film
            </motion.span>
            
            {/* Arrow icon */}
            <motion.div
              animate={{
                x: isButtonHovered ? [0, 5, 0] : 0,
                rotate: isButtonHovered ? [0, 15, 0] : 0
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </div>
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute top-2 right-2"
            animate={{
              scale: isButtonHovered ? [0, 1, 0] : 0,
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4 text-white/60" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-2 left-2"
            animate={{
              scale: isButtonHovered ? [0, 1, 0] : 0,
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          >
            <Sparkles className="w-3 h-3 text-white/40" />
          </motion.div>
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/20 group-hover:border-white/50 transition-colors duration-300"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/20 group-hover:border-white/50 transition-colors duration-300"></div>
        </motion.button>
        
        {/* Floating particles effect */}
        {isButtonHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ marginTop: '-0px' }}
    >
      {/* Background with parallax effect */}
      <motion.div 
        ref={backgroundRef}
        style={{ 
          scale,
          backgroundImage: backgroundUrl,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 0.7 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Clean gradient overlay - no red effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"></div>
      
      {/* Content */}
      <motion.div 
        ref={contentRef}
        className="container relative z-20 px-4 mx-auto text-center"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Date badge */}
            <motion.span 
              className="inline-block uppercase tracking-[0.3em] text-white/80 text-sm mb-6 px-4 py-2 border border-white/20 rounded-full backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(220, 38, 38, 0.5)",
                backgroundColor: "rgba(220, 38, 38, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              May 03-29, 2025 - Colombo
            </motion.span>
            
            {/* Main title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 tracking-tight leading-tight">
              OnScreen <span className="text-festival-red">'25</span>
            </h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Sri Lanka's Premier Short Film Festival
            </motion.p>
          </motion.div>
          
          {/* Enhanced button section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <ModernSubmitButton />
            
            {/* Additional context text */}
            <motion.p 
              className="text-white/60 text-sm max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Join filmmakers from around the world. Submit your short film and be part of something extraordinary.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center group cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-white/60 group-hover:text-white/80 transition-colors text-xs uppercase tracking-widest mb-3 font-medium">
            Discover More
          </span>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M7 13L12 18L17 13" 
                stroke="white" 
                strokeOpacity="0.6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                animate={{
                  strokeOpacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.path 
                d="M7 6L12 11L17 6" 
                stroke="white" 
                strokeOpacity="0.3" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                animate={{
                  strokeOpacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;