import React, { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartnersSection from '@/components/PartnersSection';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, Lightbulb, Heart, ArrowRight, Mail, Phone, MapPin, ExternalLink, Building2, Users, Award, Globe, Camera, Star } from 'lucide-react';

// Extended partner interface for detailed page
interface PartnerDetails {
  id: number;
  name: string;
  type: string;
  logo: string;
  website: string;
  description: string;
  extendedDescription: string;
  achievements: string[];
  partnershipBenefits: string[];
  established?: string;
  location?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  featured?: boolean;
  fallbackIcon?: React.ReactNode;
}

const PartnersPage = () => {
  const headerRef = useRef(null);
  const benefitsRef = useRef(null);
  const partnersDetailRef = useRef(null);
  const ctaRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  const isBenefitsInView = useInView(benefitsRef, { once: false, amount: 0.2 });
  const isPartnersDetailInView = useInView(partnersDetailRef, { once: false, amount: 0.2 });
  const isCTAInView = useInView(ctaRef, { once: false, amount: 0.3 });
  
  const [selectedPartner, setSelectedPartner] = useState<PartnerDetails | null>(null);
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);
  
  // Detailed partner information
  const partnersDetails: PartnerDetails[] = [
    {
      id: 1,
      name: "IIT",
      type: "Higher Education Partner",
      logo: "/partners/iit-logo.png",
      website: "https://www.iit.ac.lk/",
      description: "Informatics Institute of Technology, a leading higher education institute in Sri Lanka.",
      extendedDescription: "Informatics Institute of Technology (IIT) has been at the forefront of technology education in Sri Lanka for over three decades. As our Higher Education Partner, IIT provides invaluable academic resources, venue facilities, and technical expertise to OnScreen '25. Their commitment to fostering innovation and creativity aligns perfectly with our festival's mission.",
      achievements: [
        "30+ years of excellence in technology education",
        "Graduated 15,000+ professionals",
        "Leading private technology institute in Sri Lanka",
        "Strong industry partnerships and placement records"
      ],
      partnershipBenefits: [
        "Venue facilities for workshops and screenings",
        "Technical infrastructure and equipment support",
        "Academic expertise in digital media technologies",
        "Student volunteer program coordination"
      ],
      established: "1990",
      location: "Colombo, Sri Lanka",
      contact: {
        email: "info@iit.ac.lk",
        phone: "+94 11 2360212"
      },
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
      extendedDescription: "Sudarshi - Institute of Sinhala Culture is dedicated to preserving and promoting the rich cultural heritage of Sri Lanka. Through their partnership with OnScreen '25, they bring cultural authenticity and traditional artistic knowledge to our festival, ensuring that modern filmmaking techniques are grounded in Sri Lankan cultural values.",
      achievements: [
        "Preserved and promoted Sri Lankan cultural heritage",
        "Conducted cultural workshops and programs",
        "Supported traditional artists and performers",
        "Cultural documentation and research initiatives"
      ],
      partnershipBenefits: [
        "Cultural consultation and guidance",
        "Traditional performance opportunities",
        "Heritage storytelling expertise",
        "Community outreach and engagement"
      ],
      location: "Sri Lanka",
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
      extendedDescription: "Ceylon Film Master is a premier film education institution that has been nurturing filmmaking talent in Sri Lanka. Their silver sponsorship of OnScreen '25 demonstrates their commitment to supporting emerging filmmakers and advancing the local film industry through quality education and mentorship programs.",
      achievements: [
        "Trained hundreds of filmmaking professionals",
        "Industry-standard curriculum and facilities",
        "Graduate success in local and international productions",
        "Strong network of industry professionals"
      ],
      partnershipBenefits: [
        "Educational expertise and curriculum guidance",
        "Access to film equipment and facilities",
        "Mentor and instructor network",
        "Student filmmaker opportunities"
      ],
      location: "Sri Lanka",
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
      extendedDescription: "Everfest is an international media platform that connects festival enthusiasts with unique cultural experiences worldwide. As our Media Partner, Everfest extends the reach of OnScreen '25 to a global audience, showcasing Sri Lankan cinema and culture to international festival-goers and media professionals.",
      achievements: [
        "Global festival media platform",
        "Connects millions of festival enthusiasts",
        "Comprehensive festival coverage and promotion",
        "International media network and partnerships"
      ],
      partnershipBenefits: [
        "Global media coverage and promotion",
        "International audience reach",
        "Festival industry networking opportunities",
        "Cross-promotion with other festivals"
      ],
      established: "2010",
      location: "International",
      contact: {
        email: "partners@everfest.co"
      },
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
      extendedDescription: "Mirror Arts is a cutting-edge digital media company that brings contemporary visual storytelling expertise to OnScreen '25. Their partnership provides essential digital media services, content creation, and social media strategy that helps showcase the festival's journey and participant experiences to a wider audience.",
      achievements: [
        "Award-winning digital content creation",
        "Successful brand partnerships and campaigns",
        "Innovative visual storytelling techniques",
        "Strong social media presence and engagement"
      ],
      partnershipBenefits: [
        "Professional digital content creation",
        "Social media strategy and management",
        "Brand visual identity development",
        "Festival documentation and storytelling"
      ],
      location: "Colombo, Sri Lanka",
      contact: {
        email: "hello@mirrorarts.lk"
      },
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
      extendedDescription: "Cine City Maradana Theatre is a historic cinema venue that has been showcasing films for decades. As our Cinema Partner, they provide screening facilities and technical expertise for film presentations, ensuring that OnScreen '25 participants experience their work in a professional cinema environment.",
      achievements: [
        "Decades of cinema exhibition experience",
        "State-of-the-art screening facilities",
        "Support for local film screenings",
        "Community engagement through cinema"
      ],
      partnershipBenefits: [
        "Professional screening facilities",
        "Cinema technical expertise",
        "Audience engagement opportunities",
        "Film presentation and projection support"
      ],
      location: "Maradana, Colombo",
      featured: false,
      fallbackIcon: <Users className="w-12 h-12 text-indigo-400" />
    }
  ];
  
  const openPartnerModal = (partner: PartnerDetails) => {
    setSelectedPartner(partner);
    document.body.style.overflow = 'hidden';
  };
  
  const closePartnerModal = () => {
    setSelectedPartner(null);
    document.body.style.overflow = '';
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section with parallax */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 z-0"></div>
          
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
              Our Partners
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
              OnScreen '25 is made possible through the support and collaboration of our esteemed partners.
              Together, we're shaping the future of filmmaking in Sri Lanka.
            </motion.p>
          </motion.div>
        </section>
        
        {/* Main partners section */}
        <PartnersSection showAllPartners={true} />
        
        {/* Detailed partners information */}
        <section 
          ref={partnersDetailRef}
          className="py-24 px-6 bg-[#070707] relative"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none"></div>
          
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isPartnersDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-white text-3xl md:text-4xl font-display font-medium tracking-tight mb-6">
                Partner <span className="text-festival-red">Spotlights</span>
              </h2>
              <div className="w-16 h-1 bg-festival-red mx-auto mb-8"></div>
              <p className="text-white/70 max-w-2xl mx-auto">
                Learn more about our valued partners and the unique contributions they bring to OnScreen '25.
                Click on any partner to discover their story and partnership details.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnersDetails.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isPartnersDetailInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="bg-black/50 border border-white/10 p-6 cursor-pointer hover:border-festival-red/30 transition-all duration-300 group"
                  onClick={() => openPartnerModal(partner)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center mr-4">
                      {partner.fallbackIcon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium group-hover:text-festival-red transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-white/60 text-sm">{partner.type}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {partner.description}
                  </p>
                  
                  <div className="flex items-center text-festival-red text-sm group-hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  {partner.featured && (
                    <div className="absolute top-4 right-4">
                      <Star className="w-4 h-4 text-festival-red fill-current" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Partnership benefits section */}
        <section 
          ref={benefitsRef}
          className="py-24 px-6 bg-[#0a0a0a] relative"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none"></div>
          
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-white text-3xl md:text-4xl font-display font-medium tracking-tight mb-6">
                Why Partner With <span className="text-festival-red">OnScreen '25</span>
              </h2>
              <div className="w-16 h-1 bg-festival-red mx-auto"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="bg-black/30 border border-white/10 p-8 flex flex-col items-center text-center hover:border-festival-red/30 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-full bg-festival-red/10 flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7 text-festival-red" />
                </div>
                <h3 className="text-xl font-medium mb-3">Brand Visibility</h3>
                <p className="text-white/70">
                  Gain exclusive exposure to a diverse audience of filmmakers, industry professionals, and film enthusiasts.
                  Your brand will be featured across our digital platforms, physical spaces, and promotional materials.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-black/30 border border-white/10 p-8 flex flex-col items-center text-center hover:border-festival-red/30 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-full bg-festival-red/10 flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-festival-red" />
                </div>
                <h3 className="text-xl font-medium mb-3">Industry Impact</h3>
                <p className="text-white/70">
                  Play a crucial role in developing Sri Lanka's film industry by supporting emerging talent and innovative
                  storytelling. Your partnership directly contributes to creative growth and cultural development.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="bg-black/30 border border-white/10 p-8 flex flex-col items-center text-center hover:border-festival-red/30 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-full bg-festival-red/10 flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-festival-red" />
                </div>
                <h3 className="text-xl font-medium mb-3">Community Connection</h3>
                <p className="text-white/70">
                  Connect with a passionate community of creative professionals and enthusiasts. Build meaningful relationships
                  with filmmakers, production houses, and media professionals in Sri Lanka and beyond.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Call to action section */}
        <section 
          ref={ctaRef}
          className="py-24 px-6 relative bg-gradient-to-t from-black to-transparent"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7 }}
              className="bg-black/50 backdrop-blur-sm border border-festival-red/20 p-8 md:p-12 text-center rounded-lg"
            >
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                Become a Partner
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join our community of forward-thinking organizations in supporting OnScreen '25.
                We offer various partnership packages tailored to your organization's goals and vision.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 bg-festival-red hover:bg-festival-red/90 text-white px-8 py-4 rounded-full transition-all duration-300 group font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start a Conversation</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>
        </section>
        
        {/* Partner Detail Modal */}
        <AnimatePresence>
          {selectedPartner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={closePartnerModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-[#0a0a0a] border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={closePartnerModal}
                  className="absolute top-4 right-4 text-white/60 hover:text-white z-10 bg-black/50 rounded-full p-2"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="p-8">
                  {/* Partner Header */}
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 flex items-center justify-center mr-6">
                      {selectedPartner.fallbackIcon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-display font-medium text-white mb-2">
                        {selectedPartner.name}
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-festival-red/20 border border-festival-red/30 rounded-full text-xs text-festival-red font-medium">
                          {selectedPartner.type}
                        </span>
                        {selectedPartner.featured && (
                          <div className="flex items-center text-festival-red text-sm">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span>Featured Partner</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Partner Details Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-4">About {selectedPartner.name}</h3>
                      <p className="text-white/80 leading-relaxed mb-6">
                        {selectedPartner.extendedDescription}
                      </p>
                      
                      {/* Contact Information */}
                      {(selectedPartner.contact || selectedPartner.location || selectedPartner.established) && (
                        <div className="space-y-3 mb-6">
                          <h4 className="text-white font-medium">Contact Information</h4>
                          {selectedPartner.location && (
                            <div className="flex items-center text-white/70">
                              <MapPin className="w-4 h-4 mr-2 text-festival-red" />
                              <span>{selectedPartner.location}</span>
                            </div>
                          )}
                          {selectedPartner.contact?.email && (
                            <div className="flex items-center text-white/70">
                              <Mail className="w-4 h-4 mr-2 text-festival-red" />
                              <a href={`mailto:${selectedPartner.contact.email}`} className="hover:text-white transition-colors">
                                {selectedPartner.contact.email}
                              </a>
                            </div>
                          )}
                          {selectedPartner.contact?.phone && (
                            <div className="flex items-center text-white/70">
                              <Phone className="w-4 h-4 mr-2 text-festival-red" />
                              <a href={`tel:${selectedPartner.contact.phone}`} className="hover:text-white transition-colors">
                                {selectedPartner.contact.phone}
                              </a>
                            </div>
                          )}
                          {selectedPartner.established && (
                            <div className="flex items-center text-white/70">
                              <Building2 className="w-4 h-4 mr-2 text-festival-red" />
                              <span>Established {selectedPartner.established}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Website Link */}
                      {selectedPartner.website !== "#" && (
                        <a
                          href={selectedPartner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-festival-red hover:text-white border border-festival-red hover:border-white hover:bg-festival-red/10 px-4 py-2 rounded-full transition-all duration-300"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      )}
                    </div>
                    
                    <div>
                      {/* Achievements */}
                      <h3 className="text-xl font-medium text-white mb-4">Key Achievements</h3>
                      <ul className="space-y-2 mb-8">
                        {selectedPartner.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start text-white/80">
                            <Star className="w-4 h-4 text-festival-red mr-2 mt-1 flex-shrink-0 fill-current" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Partnership Benefits */}
                      <h3 className="text-xl font-medium text-white mb-4">Partnership Contributions</h3>
                      <ul className="space-y-2">
                        {selectedPartner.partnershipBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-white/80">
                            <div className="w-2 h-2 bg-festival-red rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default PartnersPage;