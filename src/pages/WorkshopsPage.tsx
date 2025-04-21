import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorkshopsSection from '@/components/WorkshopsSection';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CalendarCheck, Users, Clock } from 'lucide-react';

const WorkshopsPage = () => {
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.2 });
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section with parallax */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background image with parallax effect */}
          <div className="absolute inset-0 bg-[url('/workshops-bg.jpg')] bg-cover bg-center opacity-30 z-0"></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black z-0"></div>
          
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
              Workshop Series
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
              Expand your filmmaking knowledge and skills with our curated selection of 
              workshops and masterclasses led by industry professionals.
            </motion.p>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5V35M20 35L35 20M20 35L5 20" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </section>
        
        {/* Stats section */}
        <section 
          ref={statsRef}
          className="py-16 px-6 relative bg-gradient-to-b from-black to-[#080808]"
        >
          <div className="container mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate={isStatsInView ? "visible" : "hidden"}
            >
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4">
                  <CalendarCheck className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl font-bold mb-2">3</h3>
                <p className="text-white/60 uppercase tracking-wide text-sm">Workshops</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4">
                  <Users className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl font-bold mb-2">6</h3>
                <p className="text-white/60 uppercase tracking-wide text-sm">Expert Instructors</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4">
                  <Clock className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl font-bold mb-2">8+</h3>
                <p className="text-white/60 uppercase tracking-wide text-sm">Hours of Learning</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Main workshops grid */}
        <WorkshopsSection />
        
        {/* Additional information */}
        <section className="py-16 px-6 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
                Workshop Registration Information
              </h2>
              <div className="space-y-6 text-white/80">
                <p>
                  Workshops have limited capacity and require pre-registration.
                </p>
                <div className="grid md:grid-cols-2 gap-8 pt-4">
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-festival-red">Registration Process</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Stay on alert by following our socials</li>
                      <li>Follow the link</li>
                      <li>Submit the form</li>
                      <li>Receive confirmation and attend</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-festival-red">What to Bring</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Notebook and writing instruments</li>
                      <li>Laptop (Optional)</li>
                      <li>Any specific equipment mentioned in workshop details</li>
                      <li>Your questions and creative energy!</li>
                    </ul>
                  </div>
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

export default WorkshopsPage;