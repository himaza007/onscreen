import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FestivalHighlights from '@/components/FestivalHighlights';
import FestivalTimeline from '@/components/FestivalTimeline';
import WorkshopsSection from '@/components/WorkshopsSection';
import SponsorsSection from '@/components/SponsorSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/ui/pagetransition';
import { motion } from 'framer-motion';

// Import our new components
import PartnersSection from '@/components/PartnersSection';
import EducatorsSection from '@/components/EducatorsSection';

const Index = () => {
  const [loading, setLoading] = useState(true);

  // Page loading animation effect
  useEffect(() => {
    // Simulate loading for a brief moment to show animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
        
        {/* SEO Meta Tags */}
        <Helmet>
          <title>OnScreen '25 | Home</title>
          <meta name="description" content="Experience OnScreen '25 – A celebration of creativity, workshops, and cinematic excellence!" />
          <meta name="keywords" content="Film Festival, Workshops, Creativity, OnScreen 2025, Submit Films" />
          <meta name="author" content="OnScreen Festival Team" />
          
          {/* Open Graph */}
          <meta property="og:title" content="OnScreen '25 | Home" />
          <meta property="og:description" content="Join OnScreen '25 for an unforgettable festival of workshops, films, and creativity!" />
          <meta property="og:image" content="https://onscreenfestival.org/og-home-image.jpg" />
          <meta property="og:url" content="https://onscreenfestival.org/" />
          <meta property="og:type" content="website" />
          
          {/* Canonical Link */}
          <link rel="canonical" href="https://onscreenfestival.org/" />
        </Helmet>

        <Navbar />
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <FestivalHighlights />
          <FestivalTimeline />
          <WorkshopsSection />
          
          {/* Add the new Educators section */}
          <EducatorsSection compact={true} />
          
          <SponsorsSection />
          
          {/* Add the new Partners section */}
          <PartnersSection />
          
          <Footer />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Index;