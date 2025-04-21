import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FestivalHighlights from '@/components/FestivalHighlights';
import FestivalTimeline from '@/components/FestivalTimeline';
import WorkshopsSection from '@/components/WorkshopsSection';
import SponsorsSection from '@/components/SponsorSection'; // Changed from JurySection
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import SubmitFilmModal from '@/components/SubmitFilmModal';
import PageTransition from '@/components/ui/pagetransition';
import { motion } from 'framer-motion';

const Index = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Page loading animation effect
  useEffect(() => {
    // Simulate loading for a brief moment to show animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };
  
  // Page loading overlay 
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl font-display"
        >
          <div className="relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-[2px] bg-festival-red absolute bottom-0 left-0"
            />
            OnScreen <span className="text-festival-red">'25</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        <HeroSection onSubmitClick={openSubmitModal} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <FestivalHighlights />
          <FestivalTimeline />
          <WorkshopsSection />
          <SponsorsSection /> {/* Changed from JurySection */}
          <NewsSection />
          <Footer />
        </motion.div>
        
        <SubmitFilmModal isOpen={isSubmitModalOpen} onClose={closeSubmitModal} />
      </div>
    </PageTransition>
  );
};

export default Index;