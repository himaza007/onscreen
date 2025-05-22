import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Building2, Users, Award, Globe, Heart, Camera } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  type: string;
  logo: string;
  website: string;
  description: string;
  featured?: boolean;
  fallbackIcon?: React.ReactNode;
}

interface PartnersSectionProps {
  showAllPartners?: boolean; // If true, show all partners (for Partners page)
  maxPartners?: number; // Maximum number of partners to show
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ 
  showAllPartners = false, 
  maxPartners = 4 
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  
  const allPartners: Partner[] = [
    {
      id: 1,
      name: "IIT",
      type: "Higher Education Partner",
      logo: "/partners/iit-logo.png",
      website: "https://www.iit.ac.lk/",
      description: "Informatics Institute of Technology, a leading higher education institute in Sri Lanka.",
      featured: true,
      fallbackIcon: <Building2 className="w-12 h-12 text-blue-400" />
    },
    {
      id: 2,
      name: "Sudarshi",
      type: "Cultural Partner",
      logo: "/partners/sudarshi-logo.png",
      website: "#",
      description: "Institute of Sinhala Culture promoting Sri Lankan heritage and artistic traditions.",
      featured: true,
      fallbackIcon: <Heart className="w-12 h-12 text-orange-400" />
    },
    {
      id: 3,
      name: "Ceylon Film Master",
      type: "Silver Sponsor",
      logo: "/partners/cfm-logo.png",
      website: "#",
      description: "Leading film school shaping Sri Lanka's next storytellers.",
      featured: true,
      fallbackIcon: <Camera className="w-12 h-12 text-purple-400" />
    },
    {
      id: 4,
      name: "Everfest",
      type: "Media Partner",
      logo: "/partners/everfest-logo.png",
      website: "https://everfest.co/",
      description: "A premier media platform dedicated to festival culture worldwide.",
      featured: true,
      fallbackIcon: <Globe className="w-12 h-12 text-green-400" />
    },
    {
      id: 5,
      name: "Mirror Arts",
      type: "Digital Media Partner",
      logo: "/partners/mirrorarts-logo.png",
      website: "https://mirrorarts.lk/",
      description: "Digital media company specializing in creative content and visual storytelling.",
      featured: false,
      fallbackIcon: <Award className="w-12 h-12 text-pink-400" />
    },
    {
      id: 6,
      name: "Cine City Maradana Theatre",
      type: "Cinema Partner",
      logo: "/partners/cinecity-logo.png",
      website: "#",
      description: "Premier venue championing local film talent and screenings.",
      featured: false,
      fallbackIcon: <Users className="w-12 h-12 text-indigo-400" />
    }
  ];
  
  // Filter partners based on props
  const partners = showAllPartners 
    ? allPartners 
    : allPartners.filter(partner => partner.featured).slice(0, maxPartners);
  
  const handleImageError = (partnerId: number) => {
    setImageErrors(prev => new Set(prev).add(partnerId));
  };
  
  const handleImageLoad = (partnerId: number) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(partnerId);
      return newSet;
    });
  };
  
  const containerVariants = {
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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-black"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none"></div>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[40%] bg-gradient-radial from-festival-red/5 via-transparent to-transparent opacity-30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[30%] bg-gradient-radial from-festival-red/10 via-transparent to-transparent opacity-20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-3">Collaborations</span>
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight">
            Our Partners
          </h2>
          <motion.div 
            className="w-16 h-1 bg-festival-red mx-auto mt-6 mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {showAllPartners 
              ? "OnScreen '25 is proudly supported by these esteemed partners who share our vision for empowering creative storytelling and filmmaking talent."
              : "Meet our key partners who are making OnScreen '25 possible through their invaluable support and collaboration."
            }
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid grid-cols-1 gap-8 ${
            showAllPartners 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'md:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {partners.map((partner) => (
            <motion.div 
              key={partner.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="group relative overflow-hidden bg-gradient-to-br from-black/80 via-black/50 to-black/80 backdrop-blur-sm border border-white/10 hover:border-festival-red/30 p-8 flex flex-col items-center text-center rounded-lg shadow-xl hover:shadow-2xl hover:shadow-festival-red/10"
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-festival-red/5 via-transparent to-festival-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Partner logo with error handling */}
              <div className="mb-6 h-24 w-full flex items-center justify-center relative z-10">
                {imageErrors.has(partner.id) ? (
                  <div className="flex flex-col items-center">
                    {partner.fallbackIcon}
                    <span className="text-xs text-white/40 mt-2">{partner.name}</span>
                  </div>
                ) : (
                  <motion.img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-full w-auto object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 max-w-full"
                    onError={() => handleImageError(partner.id)}
                    onLoad={() => handleImageLoad(partner.id)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  />
                )}
              </div>
              
              {/* Partner type badge */}
              <motion.div 
                className="mb-4 px-3 py-1 bg-festival-red/10 border border-festival-red/30 rounded-full relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs text-festival-red font-medium">{partner.type}</span>
              </motion.div>
              
              {/* Partner name */}
              <h3 className="text-lg font-medium text-white mb-3 group-hover:text-festival-red transition-colors duration-300 relative z-10">
                {partner.name}
              </h3>
              
              {/* Partner description */}
              <p className="text-white/70 text-sm mb-6 flex-grow group-hover:text-white/90 transition-colors duration-300 leading-relaxed relative z-10">
                {partner.description}
              </p>
              
              {/* Visit website link */}
              {partner.website !== "#" && partner.website !== "N/A" ? (
                <motion.a 
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center text-white/60 hover:text-festival-red transition-all duration-300 group-hover:text-festival-red relative z-10 px-4 py-2 rounded-full border border-white/20 hover:border-festival-red/50 hover:bg-festival-red/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">Visit Website</span>
                  <ExternalLink className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.a>
              ) : (
                <div className="mt-auto inline-flex items-center text-white/40 relative z-10 px-4 py-2 rounded-full border border-white/10">
                  <span className="text-sm">Coming Soon</span>
                </div>
              )}
              
              {/* Animated border effect on hover */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-festival-red to-orange-500 group-hover:w-full transition-all duration-500"></div>
              <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-festival-red to-orange-500 group-hover:h-full transition-all duration-500 delay-100"></div>
              <div className="absolute bottom-0 right-0 w-0 h-1 bg-gradient-to-l from-festival-red to-orange-500 group-hover:w-full transition-all duration-500 delay-200"></div>
              <div className="absolute bottom-0 left-0 w-1 h-0 bg-gradient-to-t from-festival-red to-orange-500 group-hover:h-full transition-all duration-500 delay-300"></div>
              
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Show "View All Partners" button only when not showing all partners */}
        {!showAllPartners && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <motion.a 
              href="/partners" 
              className="inline-flex items-center text-festival-red hover:text-white border border-festival-red hover:border-white hover:bg-festival-red/10 px-8 py-4 rounded-full transition-all duration-300 group font-medium"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Partners</span>
              <motion.svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-3"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              >
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </motion.a>
          </motion.div>
        )}
      </div>
      
      {/* Decorative bottom element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-festival-red/50 to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-festival-red/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;