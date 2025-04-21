import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  Trophy,
  Medal,
  Award,
  Handshake,
  Mail, 
  Phone,
  ArrowRight,
  Check,
  ExternalLink
} from 'lucide-react';

interface SponsorTier {
  id: number;
  title: string;
  perks: string[];
  featured?: boolean;
  price?: string;
  icon: React.ReactNode;
  color: string;
}

const SponsorsSection = () => {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isCTAInView = useInView(ctaRef, { once: false, amount: 0.6 });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  
  const sponsorTiers: SponsorTier[] = [
    {
      id: 1,
      title: 'Title Sponsor',
      price: 'Premier',
      featured: true,
      icon: <Crown className="h-6 w-6" />,
      color: 'from-festival-red to-orange-500',
      perks: [
        'Exclusive "Powered by" Title Branding',
        'Prime Logo Placement',
        'Dedicated Promotional Posts & Brand Spotlights',
        'Sponsor Acknowledgment Throughout Event',
        'On-Stage Speaking Opportunity',
        'Complimentary VIP Passes (5 Passes)',
        'Branded Promotional Materials'
      ]
    },
    {
      id: 2,
      title: 'Gold Sponsor',
      price: 'Premium',
      icon: <Trophy className="h-6 w-6" />,
      color: 'from-yellow-500 to-amber-600',
      perks: [
        'Premium Logo Placement',
        'Dedicated Social Media Post',
        'Verbal Recognition During Major Event Segments',
        'Complimentary VIP Passes (3 Passes)',
        'On-Site Branding'
      ]
    },
    {
      id: 3,
      title: 'Silver Sponsor',
      price: 'Standard',
      icon: <Medal className="h-6 w-6" />,
      color: 'from-gray-400 to-gray-600',
      perks: [
        'Logo Placement',
        'Social Media Mention',
        'Complimentary VIP Passes (2 Passes)',
        'Recognition in the Events Closing Ceremony'
      ]
    },
    {
      id: 4,
      title: 'Bronze Sponsor',
      price: 'Basic',
      icon: <Award className="h-6 w-6" />,
      color: 'from-blue-500 to-indigo-600',
      perks: [
        'Logo Placement on Selected Event Materials',
        'Social Media Acknowledgment',
        'Complimentary VIP Pass (1 Pass )'
      ]
    },
    {
      id: 5,
      title: 'Partnerships',
      price: 'Custom',
      icon: <Handshake className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-600',
      perks: [
        'Exclusive Branding',
        'Logo on Event Content',
        'Mentions in the Opening and Closing of the events',
        'Partnership Announcement Posts',
        'Thank you Post on Social Media',
        'Inclusion in Official Event Hashtags',
        'Collaboration Posts in Major Event Announcements'
      ]
    },
  ];
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="sponsors"
      className="bg-black py-24 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated particles */}
        <motion.div 
          className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-festival-red/50 blur-sm"
          animate={{ 
            y: [0, 100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-40 right-1/4 w-3 h-3 rounded-full bg-white/30 blur-sm"
          animate={{ 
            y: [0, 70, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-1/3 w-1 h-1 rounded-full bg-festival-red/70 blur-sm"
          animate={{ 
            y: [0, -50, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-4">
            <motion.div 
              className="text-festival-red uppercase tracking-widest text-sm font-semibold px-4 py-1 border border-festival-red/30 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              Partner With Us
            </motion.div>
          </div>
          
          <h2 className="text-white text-4xl md:text-6xl font-display font-medium tracking-tight mb-6">
            Join OnScreen <span className="text-festival-red">'25</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 leading-relaxed max-w-3xl mx-auto text-lg md:text-xl"
          >
            OnScreen '25 is Sri Lanka's premier short film festival — a youth-powered cinematic initiative backed by the Rotaract Club of IIT. We invite forward-thinking brands and cultural institutions to support our mission of empowering creative storytelling.
          </motion.p>
        </motion.div>
        
        {/* Sponsorship Tiers */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24"
        >
          {/* Tier 1: Title Sponsor - Premium Placement */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 bg-black border border-festival-red rounded-xl overflow-hidden relative"
            onMouseEnter={() => setExpandedCard(1)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-festival-red/20 to-orange-500/5 opacity-30"></div>
            <div className="relative z-10 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-festival-red to-orange-500 flex items-center justify-center shadow-lg">
                    <Crown className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-festival-red/20 text-festival-red text-xs font-semibold mb-1">Premier</span>
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white">Title Sponsor</h3>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="bg-festival-red text-white text-sm font-bold px-4 py-2 rounded-md shadow-md">
                    Featured
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {sponsorTiers[0].perks.map((perk, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="flex items-start"
                  >
                    <span className="text-festival-red mr-2 mt-1 flex-shrink-0">
                      <Check size={16} />
                    </span>
                    <span className="text-white/90 text-base">{perk}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={() => setShowContactModal(true)}
                  className="bg-festival-red hover:bg-festival-red/90 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition-all hover:translate-x-1"
                >
                  <span>Contact Us</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Gold Sponsor */}
          <motion.div 
            variants={itemVariants}
            className="bg-black border border-white/20 rounded-xl overflow-hidden relative hover:border-yellow-500/70 transition-colors duration-300"
            onMouseEnter={() => setExpandedCard(2)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-500/20 to-amber-500/5 opacity-0 transition-opacity duration-300 ${expandedCard === 2 ? 'opacity-40' : ''}`}></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-semibold mb-1">Premium</span>
                  <h3 className="text-xl font-display font-medium text-white">Gold Sponsor</h3>
                </div>
              </div>
              
              <div className="space-y-3">
                {sponsorTiers[1].perks.map((perk, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="flex items-start"
                  >
                    <span className="text-yellow-500 mr-2 mt-1 flex-shrink-0">
                      <Check size={16} />
                    </span>
                    <span className="text-white/90">{perk}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowContactModal(true)}
                  className="bg-transparent border border-yellow-500/70 hover:bg-yellow-500/10 text-yellow-500 py-2 px-4 rounded-md flex items-center space-x-2 transition-all hover:translate-x-1"
                  variant="outline"
                >
                  <span>Inquire</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Silver Sponsor */}
          <motion.div 
            variants={itemVariants}
            className="bg-black border border-white/20 rounded-xl overflow-hidden relative hover:border-gray-400/70 transition-colors duration-300"
            onMouseEnter={() => setExpandedCard(3)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-400/20 to-gray-600/5 opacity-0 transition-opacity duration-300 ${expandedCard === 3 ? 'opacity-40' : ''}`}></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg">
                  <Medal className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-gray-500/20 text-gray-300 text-xs font-semibold mb-1">Standard</span>
                  <h3 className="text-xl font-display font-medium text-white">Silver Sponsor</h3>
                </div>
              </div>
              
              <div className="space-y-3">
                {sponsorTiers[2].perks.map((perk, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="flex items-start"
                  >
                    <span className="text-gray-400 mr-2 mt-1 flex-shrink-0">
                      <Check size={16} />
                    </span>
                    <span className="text-white/90">{perk}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowContactModal(true)}
                  className="bg-transparent border border-gray-400/70 hover:bg-gray-500/10 text-gray-300 py-2 px-4 rounded-md flex items-center space-x-2 transition-all hover:translate-x-1"
                  variant="outline"
                >
                  <span>Inquire</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Bronze Sponsor */}
          <motion.div 
            variants={itemVariants}
            className="bg-black border border-white/20 rounded-xl overflow-hidden relative hover:border-blue-500/70 transition-colors duration-300"
            onMouseEnter={() => setExpandedCard(4)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-indigo-600/5 opacity-0 transition-opacity duration-300 ${expandedCard === 4 ? 'opacity-40' : ''}`}></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold mb-1">Basic</span>
                  <h3 className="text-xl font-display font-medium text-white">Bronze Sponsor</h3>
                </div>
              </div>
              
              <div className="space-y-3">
                {sponsorTiers[3].perks.map((perk, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="flex items-start"
                  >
                    <span className="text-blue-400 mr-2 mt-1 flex-shrink-0">
                      <Check size={16} />
                    </span>
                    <span className="text-white/90">{perk}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowContactModal(true)}
                  className="bg-transparent border border-blue-500/70 hover:bg-blue-500/10 text-blue-400 py-2 px-4 rounded-md flex items-center space-x-2 transition-all hover:translate-x-1"
                  variant="outline"
                >
                  <span>Inquire</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Partnerships */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 bg-black border border-white/20 rounded-xl overflow-hidden relative hover:border-green-500/70 transition-colors duration-300"
            onMouseEnter={() => setExpandedCard(5)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/20 to-emerald-600/5 opacity-0 transition-opacity duration-300 ${expandedCard === 5 ? 'opacity-40' : ''}`}></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Handshake className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold mb-1">Custom</span>
                  <h3 className="text-xl font-display font-medium text-white">Partnerships</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {sponsorTiers[4].perks.map((perk, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="flex items-start"
                  >
                    <span className="text-green-500 mr-2 mt-1 flex-shrink-0">
                      <Check size={16} />
                    </span>
                    <span className="text-white/90">{perk}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowContactModal(true)}
                  className="bg-transparent border border-green-500/70 hover:bg-green-500/10 text-green-400 py-2 px-4 rounded-md flex items-center space-x-2 transition-all hover:translate-x-1"
                  variant="outline"
                >
                  <span>Inquire</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          className="flex flex-col items-center relative mx-auto max-w-4xl rounded-2xl border border-festival-red/20 backdrop-blur-sm p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute -z-10 inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-festival-red/20 via-black/60 to-black blur-xl"></div>
          </div>
          
          <h3 className="text-2xl md:text-4xl font-display font-medium mb-6 text-white text-center">
            Ready to Make an Impact?
          </h3>
          
          <p className="text-white/80 mb-8 text-center text-lg max-w-2xl">
            Join us in empowering Sri Lanka's creative talent through OnScreen '25. Contact us today to discuss how your brand can become part of this transformative movement.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              className="bg-festival-red hover:bg-festival-red/90 text-white py-6 px-8 rounded-md flex items-center gap-2 group transition-all duration-300 shadow-lg shadow-festival-red/20"
              onClick={() => setShowContactModal(true)}
            >
              <span>Contact Us</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <a 
              href="mailto:onscreenfilmfest@gmail.com"
              className="text-white/80 hover:text-white flex items-center transition-colors"
            >
              <Mail size={18} className="mr-2" />
              onscreenfilmfest@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div 
              className="bg-gradient-to-br from-black to-gray-900 border border-white/10 p-8 max-w-md w-full rounded-xl"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-medium text-white font-display">Contact Us</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-white/60 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <p className="text-white/80 mb-8">
                Reach out to discuss sponsorship opportunities for OnScreen '25 Film Festival. Our team is ready to create a custom package tailored to your brand goals.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="tel:+94774838430" 
                  className="flex items-center p-5 border border-white/10 rounded-lg hover:bg-white/5 transition-all group hover:border-festival-red/30 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-festival-red to-orange-500 flex items-center justify-center shadow-lg mr-4">
                    <Phone size={20} className="text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Phone</div>
                    <div className="text-white text-lg font-medium">+94 77 483 8430</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:onscreenfilmfest@gmail.com" 
                  className="flex items-center p-5 border border-white/10 rounded-lg hover:bg-white/5 transition-all group hover:border-festival-red/30 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-festival-red to-orange-500 flex items-center justify-center shadow-lg mr-4">
                    <Mail size={20} className="text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Email</div>
                    <div className="text-white text-lg font-medium break-all">onscreenfilmfest@gmail.com</div>
                  </div>
                </a>
                
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col space-y-2">
                  <p className="text-white/60 text-sm">We'll get back to you within 24 hours</p>
                  <Button 
                    className="w-full bg-festival-red hover:bg-festival-red/90 text-white py-3 rounded-md transition-colors"
                    onClick={() => setShowContactModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-festival-red to-transparent"></div>
    </section>
  );
};

export default SponsorsSection;