import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubmitFilmModal from '@/components/SubmitFilmModal';
import PageTransition from '@/components/ui/pagetransition';
import { Button } from '@/components/ui/button';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Check, Calendar, DollarSign, Film, FileVideo } from 'lucide-react';

const SubmitPage = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.2 });
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section with parallax */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 z-0"></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-0"></div>
          
          <motion.div 
            ref={headerRef}
            className="container relative z-10 px-6 text-center"
            style={{ y: headerY }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Submit Your Film
            </motion.h1>
            
            <motion.div 
              className="w-20 h-1 bg-festival-red mx-auto mb-6"
              initial={{ width: 0 }}
              animate={isHeaderInView ? { width: "5rem" } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            
            <motion.p 
              className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Showcase your talent on an international platform. Submit your short film 
              to be considered for OnScreen '25.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8"
            >
              <Button 
                onClick={openSubmitModal}
                size="lg" 
                className="bg-festival-red hover:bg-festival-red/90 text-white font-medium px-8 py-6 border border-festival-red hover:border-white transition-all duration-300"
              >
                Submit Your Film Now
              </Button>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Guidelines section */}
        <section 
          ref={contentRef}
          className="py-20 px-6 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-festival-red/30 to-transparent"></div>
          
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate={isContentInView ? "visible" : "hidden"}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12"
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-display font-medium mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Submission Guidelines
              </motion.h2>
              
              <div className="space-y-8 mb-12">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-col md:flex-row md:items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Eligibility</h3>
                    <p className="text-white/80 leading-relaxed">
                      Short films completed after January 1, 2024, with a runtime of 30 minutes or less are eligible for submission.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-col md:flex-row md:items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <Film className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Categories</h3>
                    <p className="text-white/80 leading-relaxed">
                      Fiction, Documentary, Animation, Experimental, Student Films
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-col md:flex-row md:items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Deadlines & Fees</h3>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-center">
                        <span className="text-festival-red mr-2">•</span>
                        <span>Early Bird (March 1, 2025): $20</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-festival-red mr-2">•</span>
                        <span>Regular (May 15, 2025): $30</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-festival-red mr-2">•</span>
                        <span>Late (June 1, 2025): $40</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-col md:flex-row md:items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <FileVideo className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Technical Requirements</h3>
                    <p className="text-white/80 leading-relaxed">
                      Films must be submitted in MP4, MOV, or AVI format with English subtitles if not in English.
                      Maximum file size: 5GB. Resolution: Minimum 1920x1080 (Full HD).
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center"
              >
                <Button 
                  onClick={openSubmitModal}
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-black hover:text-black font-medium px-8 py-6 transition-colors"
                >
                  Submit Your Film Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Benefits section */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-8 text-center">
              Why Submit to OnScreen '25
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="p-6 border border-white/10 bg-black/50 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-festival-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Global Recognition</h3>
                <p className="text-white/70 text-sm">
                  Gain international exposure and recognition for your work.
                </p>
              </motion.div>
              
              <motion.div
                className="p-6 border border-white/10 bg-black/50 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-festival-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Networking</h3>
                <p className="text-white/70 text-sm">
                  Connect with filmmakers, distributors, and industry professionals.
                </p>
              </motion.div>
              
              <motion.div
                className="p-6 border border-white/10 bg-black/50 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-festival-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Cash Prizes</h3>
                <p className="text-white/70 text-sm">
                  Winners in each category receive cash awards and festival packages.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
        <SubmitFilmModal isOpen={isSubmitModalOpen} onClose={closeSubmitModal} />
      </div>
    </PageTransition>
  );
};

export default SubmitPage;