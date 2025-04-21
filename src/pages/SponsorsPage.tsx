import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SponsorsSection from '@/components/SponsorSection';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const SponsorsPage = () => {
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
              Sponsorship
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
              Align your brand with Sri Lanka's premier short film festival and become part of a 
              transformative creative movement.
            </motion.p>
          </motion.div>
        </section>
        
        {/* Sponsors section */}
        <SponsorsSection />
        
        {/* Why Sponsor section */}
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
                "By partnering with OnScreen '25, you're investing in the future of independent 
                cinema and empowering the next generation of Sri Lankan filmmakers."
              </p>
              <p className="text-white/60 mt-4 font-medium">— Festival Director</p>
            </motion.div>
          </div>
        </section>
        
        {/* Sponsorship benefits section */}
        <section className="py-16 px-6 bg-[#050505]">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-8 text-center">
              Why Sponsor OnScreen '25
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <h3 className="text-xl font-medium mb-4 text-festival-red">Brand Exposure</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Reach diverse youth and creative audiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Prominent logo placement across all festival materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Media coverage and social media mentions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Recognition in all promotional campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Showcase at the awards ceremony</span>
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
                <h3 className="text-xl font-medium mb-4 text-festival-red">Community Impact</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Support emerging Sri Lankan filmmakers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Contribute to cultural and artistic development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Foster creative storytelling and expression</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Strengthen the local film industry ecosystem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-festival-red mr-2">•</span>
                    <span>Engage with a passionate youth audience</span>
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

export default SponsorsPage;