import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  onSubmitClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSubmitClick }) => {
  const [loading, setLoading] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  
  // This would be replaced with your actual background video or image
  const backgroundUrl = 'url(https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80)';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Function to handle the submit film click - navigate to submit page
  const handleSubmitFilmClick = () => {
    // Navigate to submit page using React Router or window.location
    window.location.href = '/submit';
    
    // If using React Router, you would use:
    // navigate('/submit');
    //updated version
    
    // Call the optional callback if provided
    if (onSubmitClick) {
      onSubmitClick();
    }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ marginTop: '-0px' }} // This removes any potential top margin
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
      >
        {/* Optional: Video background for more cinematic feel 
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/your-background-video.mp4" type="video/mp4" />
        </video>
        */}
      </motion.div>
      
      {/* Extended gradient overlay to cover the entire section including the top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10"></div>
      
      {/* Content */}
      <motion.div 
        ref={contentRef}
        className="container relative z-20 px-4 mx-auto text-center"
        style={{ y, opacity }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="uppercase tracking-[0.3em] text-white/80 text-sm mb-4 inline-block">May 03-29, 2025 - Colombo</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
              OnScreen <span className="text-festival-red">'25</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
              Sri Lanka's Premier Short Film Festival
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              onClick={handleSubmitFilmClick}
              size="lg" 
              className="bg-festival-red hover:bg-festival-red/90 text-white tracking-wide px-10 py-6 rounded-none transition-all duration-300 text-sm uppercase border border-festival-red hover:border-white">
              Submit Your Film
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-white/60 text-xs uppercase tracking-widest mb-2">Scroll</span>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L10 9L19 1" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;