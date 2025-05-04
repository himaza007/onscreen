import React, { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorkshopsSection from '@/components/WorkshopsSection';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CalendarCheck, Users, Clock, Lightbulb, Video, Award, ChevronDown, MousePointer, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const WorkshopsPage = () => {
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const benefitsRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.2 });
  const isCTAInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const isBenefitsInView = useInView(benefitsRef, { once: false, amount: 0.3 });
  
  const [email, setEmail] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);
  
  const handleSubscribe = () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email to subscribe",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Subscription Successful!",
      description: "You'll now receive updates about our workshops and events",
      variant: "default",
    });
    
    setEmail('');
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const benefitCards = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience in filmmaking",
      icon: <Users className="w-10 h-10 text-festival-red" />,
      delay: 0.1
    },
    {
      title: "Hands-on Learning",
      description: "Practical exercises ensure you gain valuable skills you can immediately apply",
      icon: <MousePointer className="w-10 h-10 text-festival-red" />,
      delay: 0.2
    },
    {
      title: "Networking",
      description: "Connect with fellow filmmakers and build relationships for future collaborations",
      icon: <Award className="w-10 h-10 text-festival-red" />,
      delay: 0.3
    }
  ];
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section with parallax */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
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
              Learning Experiences
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
              Expand your filmmaking knowledge through immersive workshops, 
              engaging webinars, and transformative awareness sessions led by 
              industry experts.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8"
            >
              <Button 
                className="bg-festival-red hover:bg-festival-red/90 text-white px-8 py-6 text-lg"
                onClick={() => {
                  const workshopSection = document.getElementById('workshop-section');
                  if (workshopSection) {
                    const yOffset = -100; 
                    const y = workshopSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                  }
                }}
              >
                Explore Sessions
              </Button>
            </motion.div>
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
          className="py-16 px-6 relative bg-gradient-to-b from-[#050505] to-[#080808] border-t border-white/5"
        >
          <div className="container mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate={isStatsInView ? "visible" : "hidden"}
            >
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-festival-red/30 hover:bg-black/50 transition-all duration-300 cursor-pointer group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4 group-hover:bg-festival-red/20 transition-colors duration-300">
                  <CalendarCheck className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-festival-red transition-colors">5</h3>
                <p className="text-white/60 uppercase tracking-wide text-xs font-medium">Learning Experiences</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-festival-red/30 hover:bg-black/50 transition-all duration-300 cursor-pointer group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4 group-hover:bg-festival-red/20 transition-colors duration-300">
                  <Award className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-festival-red transition-colors">3</h3>
                <p className="text-white/60 uppercase tracking-wide text-xs font-medium">Hands-on Workshops</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-festival-red/30 hover:bg-black/50 transition-all duration-300 cursor-pointer group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4 group-hover:bg-festival-red/20 transition-colors duration-300">
                  <Video className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-festival-red transition-colors">1</h3>
                <p className="text-white/60 uppercase tracking-wide text-xs font-medium">Interactive Webinar</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-festival-red/30 hover:bg-black/50 transition-all duration-300 cursor-pointer group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4 group-hover:bg-festival-red/20 transition-colors duration-300">
                  <Lightbulb className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-festival-red transition-colors">1</h3>
                <p className="text-white/60 uppercase tracking-wide text-xs font-medium">Awareness Session</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-festival-red/30 hover:bg-black/50 transition-all duration-300 cursor-pointer group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-red/10 mb-4 group-hover:bg-festival-red/20 transition-colors duration-300">
                  <Clock className="w-8 h-8 text-festival-red" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-festival-red transition-colors">12+</h3>
                <p className="text-white/60 uppercase tracking-wide text-xs font-medium">Hours of Learning</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Benefits section */}
        <section
          ref={benefitsRef}
          className="py-16 px-6 relative overflow-hidden bg-[#0a0a0a]"
        >
          <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
          
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">
                Why Attend Our Sessions?
              </h2>
              <div className="w-16 h-1 bg-festival-red mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefitCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: card.delay }}
                  className="bg-black/30 border border-white/10 p-8 flex flex-col items-center text-center hover:border-festival-red/30 transition-all duration-300 group"
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-festival-red/10 flex items-center justify-center mb-6 group-hover:bg-festival-red/20 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-festival-red transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/70">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Main workshops grid */}
        <section id="workshop-section">
          <WorkshopsSection />
        </section>
        
        
        {/* Collapsible FAQ section */}
        <section className="py-16 px-6 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-medium">
                  Workshop Registration
                </h2>
                
                <button 
                  onClick={toggleExpand}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <span className="text-sm">{isExpanded ? 'Collapse' : 'Expand'}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6 text-white/80">
                      <p>
                        All sessions have limited capacity and require pre-registration. Select the experiences 
                        that align with your creative goals and secure your spot early.
                      </p>
                      <div className="grid md:grid-cols-2 gap-8 pt-4">
                        <div>
                          <h3 className="text-xl font-medium mb-3 text-festival-red">Registration Process</h3>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Stay on alert by following our socials</li>
                            <li>Follow the link when registration opens</li>
                            <li>Submit the form with your details</li>
                            <li>Receive confirmation and attend</li>
                          </ol>
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-3 text-festival-red">What to Bring</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Notebook and writing instruments</li>
                            <li>Laptop for digital workshops</li>
                            <li>Any specific equipment mentioned in session details</li>
                            <li>Your questions and creative energy!</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-6 mt-6 border-t border-white/10">
                        <h3 className="text-xl font-medium mb-3 text-festival-red">Important Dates</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-festival-red flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-medium">Registration Opens</p>
                              <p className="text-white/60 text-sm">May 07, 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-festival-red flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-medium">Workshop Series Begins</p>
                              <p className="text-white/60 text-sm">2nd week of May, 2025</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/80"
                >
                  <p>All sessions have limited capacity and require pre-registration. Click expand to learn more about the registration process and what to bring.</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default WorkshopsPage;