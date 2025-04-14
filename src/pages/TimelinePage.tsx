import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FestivalTimeline from '@/components/FestivalTimeline';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView } from 'framer-motion';

const TimelinePage = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-festival-red/30 to-transparent"></div>
          
          <div ref={headerRef} className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Festival Timeline
              </motion.h1>
              
              <motion.div 
                className="w-20 h-1 bg-festival-red mx-auto mb-8"
                initial={{ width: 0 }}
                animate={isHeaderInView ? { width: "5rem" } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              
              <motion.p 
                className="text-lg md:text-xl text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Mark your calendars for these important dates in the OnScreen '25 festival journey. 
                From submissions to the grand finale, here's when everything happens.
              </motion.p>
            </motion.div>
          </div>
          
          {/* Background decorative element */}
          <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-festival-red/20 to-transparent"></div>
        </section>
        
        {/* Timeline illustration - decorative */}
        <div className="relative w-full h-24 overflow-hidden hidden md:block">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <motion.svg 
              width="100%" 
              height="2" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <line 
                x1="0" 
                y1="1" 
                x2="100%" 
                y2="1" 
                stroke="url(#redGradient)" 
                strokeWidth="2"
                strokeDasharray="5,5" 
              />
              <defs>
                <linearGradient id="redGradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="rgba(220, 38, 38, 0)" />
                  <stop offset="50%" stopColor="rgba(220, 38, 38, 0.5)" />
                  <stop offset="100%" stopColor="rgba(220, 38, 38, 0)" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
        </div>
        
        {/* Main content */}
        <FestivalTimeline />
        
        {/* Additional information section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
                How to Participate
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-3 text-festival-red">For Filmmakers</h3>
                  <p className="text-white/80 leading-relaxed">
                    Submit your film during the submission period. Make sure to review
                    our guidelines and prepare your film according to the technical specifications.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-festival-red">For Attendees</h3>
                  <p className="text-white/80 leading-relaxed">
                    Festival passes will be available for purchase one month before the event.
                    Early bird discounts apply for the first two weeks of ticket sales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TimelinePage;