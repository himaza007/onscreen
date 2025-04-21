import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Check, ChevronDown, ChevronUp, Play, Shield, Award, Users } from 'lucide-react';

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
  const [expandedTier, setExpandedTier] = useState<number | null>(null);
  const [activeTier, setActiveTier] = useState<number>(1);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  
  // Auto-rotate through tiers when not manually interacting
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setActiveTier(prev => (prev % 4) + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovering]);
  
  const sponsorTiers: SponsorTier[] = [
    {
      id: 1,
      title: 'Title Sponsor',
      price: 'Contact for details',
      featured: true,
      icon: <Shield className="h-6 w-6" />,
      color: 'from-festival-red to-orange-500',
      perks: [
        'Logo on all festival media & screens',
        'Premium branding at the screening venue',
        'Speaker spotlight + exclusive panel opportunity',
        'VIP passes + dedicated social media campaign',
        'First-look access to emerging filmmakers',
        'Brand mention in all media interviews'
      ]
    },
    {
      id: 2,
      title: 'Gold Sponsor',
      price: 'Contact for details',
      icon: <Award className="h-6 w-6" />,
      color: 'from-yellow-500 to-amber-600',
      perks: [
        'Brand placement on main event banner',
        'Logo in teaser trailers & press releases',
        'Custom shoutout on social media',
        'VIP access to networking events',
        'Logo on digital marketing materials'
      ]
    },
    {
      id: 3,
      title: 'Silver Sponsor',
      price: 'Contact for details',
      icon: <Play className="h-6 w-6" />,
      color: 'from-gray-400 to-gray-600',
      perks: [
        'Branding in workshop materials',
        'Recognition on website and closing credits',
        'Social media recognition',
        'Invitation to the awards ceremony',
        'Logo on festival program'
      ]
    },
    {
      id: 4,
      title: 'Community Partner',
      price: 'Contact for details',
      icon: <Users className="h-6 w-6" />,
      color: 'from-blue-500 to-indigo-600',
      perks: [
        'Logo listed on the official sponsor wall',
        'Certificate of appreciation',
        'Social media mention',
        'Recognition in the festival program',
        'Invitation to special screenings'
      ]
    },
    {
      id: 5,
      title: 'Browns Sponsor',
      price: 'Contact for details',
      icon: <Users className="h-6 w-6" />,
      color: 'from-blue-500 to-indigo-600',
      perks: [
        'Logo listed on the official sponsor wall',
        'Certificate of appreciation',
        'Social media mention',
        'Recognition in the festival program',
        'Invitation to special screenings'
      ]
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const handleTierHover = (id: number) => {
    setExpandedTier(id);
    setActiveTier(id);
    setIsHovering(true);
  };
  
  const handleTierLeave = () => {
    setExpandedTier(null);
    setIsHovering(false);
  };

  const getTierIcon = (id: number) => {
    switch(id) {
      case 1:
        return '🎖️';
      case 2:
        return '🥇';
      case 3:
        return '🥈';
      case 4:
        return '🤝';
      default:
        return '🏆';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="sponsors"
      className="bg-black py-24 px-6 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated particles */}
        <motion.div 
          className="absolute -top-10 left-20 w-2 h-2 rounded-full bg-festival-red/50 blur-sm"
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
          className="absolute top-40 right-40 w-3 h-3 rounded-full bg-white/30 blur-sm"
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
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-2">
            <motion.div 
              className="text-festival-red uppercase tracking-widest text-sm font-light px-4 py-1 border border-festival-red/30 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              Join Our Vision
            </motion.div>
          </div>
          
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">
            Partner With OnScreen <span className="text-festival-red">'25</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 leading-relaxed max-w-3xl mx-auto text-lg"
          >
            OnScreen '25 is Sri Lanka's premier short film festival — a youth-powered cinematic initiative backed by the Rotaract Club of IIT. We invite forward-thinking brands and cultural institutions to support our mission of empowering creative storytelling and elevating the future of independent film.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/70 mt-4 leading-relaxed max-w-3xl mx-auto"
          >
            Your sponsorship will not only provide visibility across national audiences but will place your brand at the heart of a transformative creative movement.
          </motion.p>
        </motion.div>
        
        {/* Sponsorship Tiers */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {sponsorTiers.map((tier) => (
            <motion.div 
              key={tier.id} 
              variants={itemVariants}
              onMouseEnter={() => handleTierHover(tier.id)}
              onMouseLeave={handleTierLeave}
              onClick={() => handleTierHover(tier.id === expandedTier ? null : tier.id)}
              className={`relative bg-black/50 backdrop-blur-sm border transition-all duration-500 overflow-hidden cursor-pointer group ${
                tier.featured 
                  ? 'border-festival-red' 
                  : expandedTier === tier.id || activeTier === tier.id
                    ? 'border-white/40'
                    : 'border-white/10'
              } ${
                (expandedTier === tier.id || (!expandedTier && activeTier === tier.id)) 
                  ? 'transform-gpu scale-105 z-10 shadow-xl shadow-black/50'
                  : 'hover:shadow-lg hover:shadow-black/30'
              }`}
            >
              {/* Glowing border effect on active/hover */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  (expandedTier === tier.id || (!expandedTier && activeTier === tier.id)) 
                    ? 'opacity-100' 
                    : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-20 blur-xl`}></div>
              </div>
              
              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute top-0 right-0 bg-festival-red text-white text-xs py-1 px-3 font-medium">
                  Featured
                </div>
              )}
              
              <div className="p-8 relative">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${tier.color}`}>
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-medium ${
                      tier.featured ? 'text-festival-red' : 'text-white'
                    }`}>
                      {tier.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-0.5">{tier.price}</p>
                  </div>
                </div>
                
                {/* Tier emoji as watermark */}
                <div className="absolute top-2 right-2 text-6xl opacity-5">
                  {getTierIcon(tier.id)}
                </div>
                
                {/* Benefits */}
                <AnimatePresence>
                  <motion.ul
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 min-h-[200px]"
                  >
                    {tier.perks.map((perk, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start text-white/80 ${
                          index >= 3 && expandedTier !== tier.id && activeTier !== tier.id 
                            ? 'hidden md:flex' 
                            : ''
                        }`}
                      >
                        <span className={`mr-2 text-transparent bg-clip-text bg-gradient-to-r ${tier.color} mt-1`}>
                          <Check size={14} />
                        </span>
                        <span>{perk}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
                
                {/* Show more/less indicator */}
                {tier.perks.length > 3 && (
                  <button 
                    className={`mt-4 text-sm text-center w-full text-white/60 hover:text-white flex items-center justify-center transition-colors ${
                      expandedTier === tier.id || activeTier === tier.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTierHover(tier.id === expandedTier ? null : tier.id);
                    }}
                  >
                    {expandedTier === tier.id ? (
                      <>Less <ChevronUp size={14} className="ml-1" /></>
                    ) : (
                      <>More <ChevronDown size={14} className="ml-1" /></>
                    )}
                  </button>
                )}
                
                {/* Bottom highlight bar */}
                <div 
                  className={`h-1 bg-gradient-to-r ${tier.color} absolute bottom-0 left-0 transition-all duration-700 ${
                    expandedTier === tier.id || (!expandedTier && activeTier === tier.id) ? 'w-full' : 'w-0'
                  }`}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          className="flex flex-col items-center mt-20 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}>
          <div className="absolute -z-10 inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-radial from-festival-red/20 to-transparent blur-xl"></div>
          </div>
          
          <div className="text-center max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-display font-medium mb-4 text-white">
              Ready to Make an Impact?
            </h3>
            <p className="text-white/70 mb-8">
              Download our sponsorship proposal to explore the powerful brand opportunities and curated benefit tiers in detail.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 flex items-center gap-2 py-6 px-8 rounded-none group relative overflow-hidden"
                asChild
              >
                <a href="#contact">
                  <span className="absolute inset-0 w-full h-full bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center">
                    Contact Us <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-festival-red to-transparent"></div>
    </section>
  );
};

export default SponsorsSection;