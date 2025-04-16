import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsSection from '@/components/NewsSection';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';

const NewsPage = () => {
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  const isFeaturedInView = useInView(featuredRef, { once: false, amount: 0.2 });
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section with parallax */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black z-0"></div>
          
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
              Latest News
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
              Stay updated with the latest announcements, events, and stories from OnScreen '25.
            </motion.p>
          </motion.div>
        </section>
        
        {/* Featured news article */}
        <section 
          className="py-16 px-6 relative bg-gradient-to-b from-[#0a0a0a] to-black"
          ref={featuredRef}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden h-[300px] md:h-auto">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center transition-transform duration-1000 hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-festival-red px-3 py-1 text-xs uppercase tracking-wide font-medium">
                  Featured
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-white/60 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>February 15, 2025</span>
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Tag className="w-4 h-4 mr-2" />
                    <span>Announcements</span>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  International Jury Panel Announced for OnScreen '25
                </h2>
                
                <p className="text-white/80 leading-relaxed mb-6">
                  We are excited to announce our distinguished international jury panel for this year's 
                  festival. Comprising award-winning filmmakers, critics, and industry veterans, this 
                  diverse group will evaluate submissions across all categories.
                </p>
                
                <motion.a 
                  href="#" 
                  className="inline-flex items-center text-festival-red hover:text-white transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Read the full article</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* News section with grid of news articles */}
        <section className="pt-8 pb-16">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-8 text-center">
              Recent Updates
            </h2>
          </div>
          <NewsSection />
        </section>
        
        {/* Newsletter subscription */}
        <section className="py-16 px-6 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-display font-medium mb-4">
                Stay Updated
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter to receive the latest festival news, announcements, 
                and exclusive content directly to your inbox.
              </p>
              
              <div className="flex flex-col md:flex-row max-w-md mx-auto gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-black/50 border border-white/10 text-white px-4 py-3 flex-grow focus:outline-none focus:border-festival-red transition-colors"
                />
                <button className="bg-festival-red hover:bg-festival-red/90 text-white px-6 py-3 font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default NewsPage;