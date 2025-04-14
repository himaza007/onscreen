import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const About = () => {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, amount: 0.2 });
  const { scrollY } = useScroll();

  // Parallax effect for title
  const titleY = useTransform(scrollY, [0, 300], [0, 100]);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Hero section with parallax effect */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Optional: Background image with parallax effect */}
          <div className="absolute inset-0 bg-[url('/about-bg.jpg')] bg-cover bg-center opacity-30 z-0"></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black z-0"></div>
          
          <motion.div 
            className="container relative z-10 px-6 text-center"
            style={{ y: titleY }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              About OnScreen <span className="text-festival-red">'25</span>
            </motion.h1>
            
            <motion.div 
              className="w-20 h-1 bg-festival-red mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>
        </section>
        
        {/* Content section */}
        <section className="py-24 px-6 relative">
          {/* Film strip decoration */}
          <div className="absolute top-0 left-0 right-0 h-8 flex overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-full w-12 border-r border-white/5"></div>
            ))}
          </div>
          
          <div 
            ref={contentRef} 
            className="container mx-auto max-w-3xl"
          >
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
              animate={isInView ? "visible" : "hidden"}
              className="prose prose-invert max-w-none"
            >
              <motion.p 
                className="text-xl text-white/90 leading-relaxed mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                The OnScreen Film Festival is Sri Lanka's premier platform for showcasing exceptional short films from around the world. 
                Established with the vision of providing emerging filmmakers a prestigious platform to exhibit their talent, the festival 
                has grown to become a significant event in the global independent film circuit.
              </motion.p>
              
              <motion.p 
                className="text-xl text-white/90 leading-relaxed mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Our mission is to recognize and celebrate innovative storytelling, technical excellence, and creative vision in short films. 
                We aim to connect filmmakers with audiences, industry professionals, and like-minded creators while promoting the art and 
                craft of filmmaking.
              </motion.p>
              
              <motion.p 
                className="text-xl text-white/90 leading-relaxed"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                The 2025 edition will feature an expanded program including competitive sections, special screenings, masterclasses, 
                workshops, and networking events designed to enrich the cultural landscape and foster a thriving film community.
              </motion.p>
              
              {/* Decorative quote */}
              <motion.div 
                className="my-16 border-l-2 border-festival-red pl-6 py-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <p className="text-2xl font-light italic text-white/80">
                  "Cinema is a matter of what's in the frame and what's out."
                </p>
                <p className="text-white/60 mt-2">— Martin Scorsese</p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Film strip decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-8 flex overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-full w-12 border-r border-white/5"></div>
            ))}
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;