import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/ui/pagetransition';
import { Button } from '@/components/ui/button';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, Calendar, DollarSign, Film, FileVideo, X, Clock, Award, User, ThumbsUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SubmitPage = () => {
  const [showNotice, setShowNotice] = useState(false);
  const { toast } = useToast();
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.2 });
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);
  const parallaxY1 = useTransform(scrollY, [0, 500], [0, -50]);
  const parallaxY2 = useTransform(scrollY, [0, 500], [0, -30]);
  const parallaxY3 = useTransform(scrollY, [0, 500], [0, -70]);
  const parallaxOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  const openSubmissionNotice = () => {
    setShowNotice(true);
    // Prevent scrolling when notice is open
    document.body.style.overflow = 'hidden';
  };

  const closeSubmissionNotice = () => {
    setShowNotice(false);
    // Allow scrolling again
    document.body.style.overflow = '';
  };

  const notifyMe = (email) => {
    toast({
      title: "You're on the list!",
      description: "We'll notify you when submissions open.",
      variant: "default",
    });
    closeSubmissionNotice();
  };

  // Animated film reel decorations
  const FilmReel = ({ size, position, rotationSpeed, delay = 0 }) => (
    <motion.div 
      className="absolute opacity-20 pointer-events-none border-2 border-dashed border-white/30 rounded-full"
      style={{
        width: size,
        height: size,
        ...position,
      }}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ 
        rotate: 360 * (rotationSpeed > 0 ? 1 : -1),
        opacity: 0.2
      }}
      transition={{ 
        rotate: { 
          duration: 20 / Math.abs(rotationSpeed), 
          repeat: Infinity, 
          ease: "linear",
          delay
        },
        opacity: {
          duration: 1,
          delay: delay + 0.5
        }
      }}
    />
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        {/* Film reel decorations */}
        <FilmReel size="300px" position={{ top: "10%", left: "-150px" }} rotationSpeed={1} />
        <FilmReel size="400px" position={{ bottom: "5%", right: "-200px" }} rotationSpeed={-0.8} delay={0.5} />
        <FilmReel size="200px" position={{ top: "40%", right: "10%" }} rotationSpeed={1.2} delay={0.3} />
        
        <Navbar />
        
        {/* Header section with parallax */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Floating film elements for visual interest */}
          <motion.div 
            className="absolute w-full h-full pointer-events-none"
            style={{ opacity: parallaxOpacity }}
          >
            <motion.div
              className="absolute w-20 h-32 bg-[url('/film-strip.png')] bg-cover opacity-20 rotate-12"
              style={{ x: "30%", y: parallaxY1, top: "20%" }}
            />
            <motion.div
              className="absolute w-32 h-48 bg-[url('/film-strip.png')] bg-cover opacity-10 -rotate-15"
              style={{ x: "65%", y: parallaxY2, top: "50%" }}
            />
            <motion.div
              className="absolute w-24 h-40 bg-[url('/film-strip.png')] bg-cover opacity-15 rotate-45"
              style={{ x: "15%", y: parallaxY3, top: "60%" }}
            />
          </motion.div>
        
          {/* Background image with modern blur effect */}
          <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80')] bg-cover bg-center"
            style={{ 
              scale: useTransform(scrollY, [0, 300], [1.1, 1.2]),
              y: useTransform(scrollY, [0, 300], [0, 30]),
            }}
          />
          
          {/* Modern glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black backdrop-blur-sm z-0"></div>
          
          <motion.div 
            ref={headerRef}
            className="container relative z-10 px-6 text-center"
            style={{ y: headerY }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-6 tracking-tight"
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
              className="text-lg md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto"
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
              className="mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  onClick={openSubmissionNotice}
                  size="lg" 
                  className="bg-festival-red hover:bg-festival-red/90 text-white font-medium px-10 py-6 text-lg rounded-sm border border-festival-red hover:border-white transition-all duration-300 shadow-lg shadow-festival-red/20"
                >
                  <span className="relative z-10">Submit Your Film</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Animated scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <span className="text-white/60 text-xs uppercase tracking-widest mb-2">Details Below</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Guidelines section with interactive elements */}
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-sm shadow-xl"
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
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-sm hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Eligibility</h3>
                    <p className="text-white/80 leading-relaxed">
                    
                      OnScreen '25 is open to all filmmakers globally, with no restrictions on age, nationality, or background. Films must be completed after January 1, 2023, and be 20 minutes or less, including credits. All genres are welcome, and student filmmakers must provide valid enrollment proof.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-sm hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <Film className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Categories</h3>
                    <div className="grid grid-cols-2 gap-2 text-white/80">
                      <div className="flex items-center gap-2">
                        <span>Open Category</span>
                      
                     
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-sm hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Deadlines & Fees</h3>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-center">
                        <span className="text-festival-red mr-2">•</span>
                        <span>Final Submission Deadline: 3rd week of May</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-festival-red mr-2">•</span>
                        <span>No submission fees for 2025</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-festival-red mr-2">•</span>
                        <span>Late entries will not be accepted under any circumstances</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-sm hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-festival-red/10 flex items-center justify-center">
                      <FileVideo className="w-6 h-6 text-festival-red" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">Technical Requirements</h3>
                    <p className="text-white/80 leading-relaxed">
                      Films must be submitted in MP4 or MOV format with a minimum resolution of 1080p. Non-English films must include hardcoded English subtitles. Files must be free of watermarks or unauthorized third-party branding.
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    onClick={openSubmissionNotice}
                    size="lg" 
                    className="bg-white hover:bg-white/90 text-black hover:text-black font-medium px-8 py-6 text-lg rounded-sm transition-colors shadow-lg shadow-white/10"
                  >
                    Submit Your Film Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Benefits section with interactive cards */}
        <section className="py-20 px-6 bg-gradient-to-b from-[#080808] to-[#000]">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-display font-medium mb-12 text-center">
              Why Submit to OnScreen '25
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="group p-8 border border-white/10 bg-black/50 backdrop-blur-sm text-center rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)" }}
                transition={{ duration: 0.4 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div 
                  className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-festival-red/10 group-hover:bg-festival-red/20 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="h-10 w-10 text-festival-red" />
                </motion.div>
                <h3 className="text-xl font-medium mb-3">National Recognition</h3>
                <p className="text-white/70 text-base leading-relaxed">
                  Gain national level exposure and recognition for your work among industry professionals and audiences.
                </p>
              </motion.div>
              
              <motion.div
                className="group p-8 border border-white/10 bg-black/50 backdrop-blur-sm text-center rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div 
                  className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-festival-red/10 group-hover:bg-festival-red/20 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <User className="h-10 w-10 text-festival-red" />
                </motion.div>
                <h3 className="text-xl font-medium mb-3">Networking</h3>
                <p className="text-white/70 text-base leading-relaxed">
                  Connect with filmmakers, distributors, and industry professionals to expand your creative network.
                </p>
              </motion.div>
              
              <motion.div
                className="group p-8 border border-white/10 bg-black/50 backdrop-blur-sm text-center rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div 
                  className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-festival-red/10 group-hover:bg-festival-red/20 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ThumbsUp className="h-10 w-10 text-festival-red" />
                </motion.div>
                <h3 className="text-xl font-medium mb-3">Prizes & Exposure</h3>
                <p className="text-white/70 text-base leading-relaxed">
                  Winners receive awards, festival packages, and invaluable media exposure for their creative work.
                </p>
              </motion.div>
            </div>
            
            <div className="text-center mt-16">
              <motion.p 
                className="text-white/60 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                Join the community of innovative filmmakers showcasing their talent at Sri Lanka's premier short film festival.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Submissions coming soon notice modal */}
        <AnimatePresence>
          {showNotice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0a0a0a] border border-white/10 max-w-md w-full p-8 rounded-sm relative"
              >
                <button 
                  onClick={closeSubmissionNotice}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <X size={24} />
                </button>
                
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ 
                      rotateY: [0, 180, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    className="inline-block mb-4"
                  >
                    <Clock className="w-16 h-16 text-festival-red" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-display font-medium mb-2">Submissions Opening Soon</h3>
                  <p className="text-white/70">
                    We're excited about your interest! Film submissions for OnScreen '25 will open soon.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <Button 
                      onClick={closeSubmissionNotice}
                      className="bg-transparent hover:bg-white/5 border border-white/20 text-white/60 hover:text-white"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default SubmitPage;