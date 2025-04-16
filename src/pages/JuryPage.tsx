import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JurySection from '@/components/JurySection';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const JuryPage = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section with parallax */}
        <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black z-0"></div>
          
          {/* Decorative film strip overlay */}
          <div className="absolute inset-0 bg-[url('/film-strip.png')] bg-repeat opacity-5 z-0"></div>
          
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
              Jury & Mentors
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
              Meet our distinguished panel of film industry professionals who will evaluate 
              submissions and mentor participants during the festival.
            </motion.p>
          </motion.div>
        </section>
        
        {/* Jury section with grid of jury members */}
        <JurySection />
        
        {/* Additional quote section */}
        <section className="py-16 px-6 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto max-w-4xl">
            <motion.div 
              className="border-l-4 border-festival-red pl-8 py-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <p className="text-2xl md:text-3xl font-light italic text-white/90 leading-relaxed">
                "Our jury members bring diverse perspectives and decades of industry experience
                to evaluate and celebrate the best emerging talent in cinema."
              </p>
              <p className="text-white/60 mt-4 font-medium">— Festival Director</p>
            </motion.div>
          </div>
        </section>
        
        {/* Jury selection process section */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-8 text-center">
              Selection Process
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <h3 className="text-xl font-medium mb-4 text-festival-red">Judging Criteria</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Technical excellence and production quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Originality and creativity in storytelling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Acting and character development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Cinematography and visual composition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Sound design and music</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <h3 className="text-xl font-medium mb-4 text-festival-red">Awards Categories</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Best Short Film</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Best Director</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Best Screenplay</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Best Cinematography</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Audience Choice Award</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default JuryPage;