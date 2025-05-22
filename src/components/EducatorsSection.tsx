import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence, useSpring } from 'framer-motion';
import { Camera, Video, Book, Film, Lightbulb, ExternalLink, Linkedin, Twitter, Instagram, ChevronDown, User, Award, MapPin, Calendar, Star, Search, Filter, X } from 'lucide-react';

interface Educator {
  id: number;
  name: string;
  role: string;
  specialization: 'cinematography' | 'directing' | 'screenwriting' | 'visual-effects' | 'production' | 'acting';
  image: string;
  bio: string;
  highlights: string[];
  featured?: boolean;
  experience?: string;
  location?: string;
  achievements?: number;
  fallbackIcon?: React.ReactNode;
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  }
}

interface EducatorsSectionProps {
  compact?: boolean;
  featuredOnly?: boolean;
}

// Animation variants for consistent motion
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  card: {
    hidden: { 
      opacity: 0, 
      y: 32, 
      scale: 0.96,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  slideIn: {
    hidden: { opacity: 0, x: -16 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  expand: {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  },

  button: {
    hover: { 
      scale: 1.02, 
      y: -1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },

  socialIcon: {
    hover: { 
      scale: 1.15, 
      rotate: 3,
      transition: { duration: 0.2, type: "spring", stiffness: 300 }
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  }
};

const EducatorsSection: React.FC<EducatorsSectionProps> = ({ 
  compact = false,
  featuredOnly = false 
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
  const [expandedEducator, setExpandedEducator] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const educators: Educator[] = [
    {
      id: 1,
      name: "M.D. Mahindapala",
      role: "Cinematographer & Director",
      specialization: "cinematography",
      image: "/educators/mahindapala.png",
      bio: "M.D. Mahindapala is a multi-award-winning cinematographer and the current President of the Sri Lankan Society of Cinematographers. He has worked on numerous acclaimed productions both locally and internationally, bringing visual storytelling to life through his masterful command of light, composition, and movement.",
      highlights: [
        "Presidential, Sarasavi, Sumathi & Unda Award Winner",
        "Visiting Lecturer – University of Colombo, Moratuwa, SLFI",
        "Projects in India, Germany, Japan, Mexico & France",
        "President of Sri Lankan Society of Cinematographers"
      ],
      experience: "25+ Years",
      location: "Colombo, Sri Lanka",
      featured: true,
      fallbackIcon: <Camera className="w-16 h-16 text-festival-red" />
    },
    {
      id: 2,
      name: "Lakshman Mendis",
      role: "Actor & Film Mentor",
      specialization: "acting",
      image: "/educators/lakshman.png",
      bio: "Lakshman Mendis is a veteran award-winning actor, widely respected for his versatile performances across theatre, film, and television in Sri Lanka. His mentorship has shaped numerous acting careers in the industry.",
      highlights: [
        "Over 40 years in the film industry",
        "Multiple national acting accolades",
        "Guest speaker on performance and character depth",
        "Acting coach for leading Sri Lankan productions"
      ],
      experience: "40+ Years",
      location: "Colombo, Sri Lanka",
      featured: true,
      fallbackIcon: <Lightbulb className="w-16 h-16 text-festival-red" />
    },
    {
      id: 3,
      name: "Vishwa Balasooriya",
      role: "Director of Photography",
      specialization: "cinematography",
      image: "/educators/vishwa.png",
      bio: "Vishwa Balasooriya is a renowned DOP and filmmaker whose work has been awarded at prestigious festivals for visual excellence and impactful storytelling. His expertise spans from intimate character studies to large-scale productions.",
      highlights: [
        "Best Cinematography – Sarasaviya, Bayelsa, DIFF",
        "Best Cinematography – Lake Champlain, New York",
        "2024 Cinematography – ASU, 61st Asia Pacific FF (China)",
        "Technical excellence award recipient"
      ],
      experience: "20+ Years",
      location: "Colombo, Sri Lanka",
      featured: true,
      fallbackIcon: <Video className="w-16 h-16 text-festival-red" />
    },
    {
      id: 4,
      name: "Ilango Ram",
      role: "Film Director & Cinematographer",
      specialization: "screenwriting",
      image: "/educators/ilango.png",
      bio: "Ilango Ram is a commercial and film director, celebrated for his 2023 film 'Nelum Kuluna' (Tentigo), which earned him international accolades for cinematic storytelling. His work bridges commercial appeal with artistic integrity.",
      highlights: [
        "Special Jury Award – Black Nights FF, Estonia 2023",
        "Lecturer – University of Kelaniya & SLTTI",
        "Jury – Colombo Intl. & CinemaShorts Singapore",
        "Commercial director for major brands"
      ],
      experience: "18+ Years",
      location: "Kelaniya, Sri Lanka",
      featured: true,
      fallbackIcon: <Film className="w-16 h-16 text-festival-red" />
    },
    {
      id: 5,
      name: "Tharindu Lokuarachchi",
      role: "Film Director & Screenwriter",
      specialization: "directing",
      image: "/educators/tharindu.png",
      bio: "Tharindu Lokuarachchi is an award-winning Sri Lankan film director and lecturer known for his global festival wins and commitment to narrative excellence in short films. His approach to storytelling combines traditional cinematic techniques with contemporary themes.",
      highlights: [
        "Best Foreign Language Short – Shanghai Film Fest 2018",
        "Best Short Film – Jaffna & Youth Intl. Fests 2020",
        "Golden Award – Hiru Golden Film Awards 2016",
        "Jury member at multiple international festivals"
      ],
      experience: "15+ Years",
      location: "Colombo, Sri Lanka",
      featured: true,
      fallbackIcon: <Film className="w-16 h-16 text-festival-red" />
    },
    {
      id: 6,
      name: "Wasantha Dugganarala",
      role: "Director & Lyricist",
      specialization: "screenwriting",
      image: "/educators/wasantha.png",
      bio: "Wasantha Dugganarala is a prominent media personality and screenwriter, celebrated for his lyrical contributions and creative direction across Sri Lankan entertainment. His expertise in narrative structure and character development is unparalleled.",
      highlights: [
        "Popular lyricist for cinema and TV",
        "Creative director for national media campaigns",
        "Speaker on screenwriting and storytelling arts",
        "Mentor to emerging screenwriters"
      ],
      experience: "22+ Years",
      location: "Colombo, Sri Lanka",
      featured: true,
      fallbackIcon: <Book className="w-16 h-16 text-festival-red" />
    },
    {
      id: 7,
      name: "Abishek Palraj",
      role: "Filmmaker & Editor",
      specialization: "directing",
      image: "/educators/abhishek.png",
      bio: "Abishek Palraj is a filmmaker and editor whose work bridges cinematic and digital platforms, with a focus on emotionally resonant storytelling and technical finesse. He specializes in post-production workflow and narrative structure.",
      highlights: [
        "Editor of award-winning indie short films",
        "Workshop facilitator in editing and cinematography",
        "Experience in regional and web-based productions",
        "Post-production consultant for emerging filmmakers"
      ],
      experience: "12+ Years",
      location: "Colombo, Sri Lanka",
      featured: true,
      fallbackIcon: <Video className="w-16 h-16 text-festival-red" />
    }
  ];
  
  // Enhanced filtering with search functionality
  const filteredEducators = useMemo(() => {
    let filtered = educators;
    
    if (compact) {
      filtered = educators.filter(educator => educator.featured).slice(0, 3);
    } else if (featuredOnly) {
      filtered = educators.filter(educator => educator.featured);
    } else if (activeCategory) {
      filtered = educators.filter(educator => educator.specialization === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(educator => 
        educator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        educator.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        educator.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [compact, featuredOnly, activeCategory, searchTerm]);
  
  // Function to get the appropriate icon for specialization
  const getSpecializationIcon = useCallback((specialization: string) => {
    const iconMap = {
      'cinematography': <Camera className="w-4 h-4" />,
      'directing': <Film className="w-4 h-4" />,
      'screenwriting': <Book className="w-4 h-4" />,
      'visual-effects': <Video className="w-4 h-4" />,
      'production': <Film className="w-4 h-4" />,
      'acting': <Lightbulb className="w-4 h-4" />
    };
    return iconMap[specialization] || <Film className="w-4 h-4" />;
  }, []);
  
  // Function to handle image error
  const handleImageError = useCallback((educatorId: number) => {
    setImageErrors(prev => ({ ...prev, [educatorId]: true }));
  }, []);
  
  // Function to toggle educator details
  const toggleEducatorDetails = useCallback((id: number) => {
    setExpandedEducator(prev => prev === id ? null : id);
  }, []);
  
  // Function to set active category filter
  const handleCategoryChange = useCallback((category: string | null) => {
    setActiveCategory(prev => prev === category ? null : category);
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setActiveCategory(null);
    setSearchTerm('');
  }, []);
  
  // Category labels for filter buttons
  const categories = [
    { value: 'cinematography', label: 'Cinematography', icon: <Camera className="w-4 h-4" />, count: educators.filter(e => e.specialization === 'cinematography').length },
    { value: 'directing', label: 'Directing', icon: <Film className="w-4 h-4" />, count: educators.filter(e => e.specialization === 'directing').length },
    { value: 'screenwriting', label: 'Screenwriting', icon: <Book className="w-4 h-4" />, count: educators.filter(e => e.specialization === 'screenwriting').length },
    { value: 'visual-effects', label: 'Visual Effects', icon: <Video className="w-4 h-4" />, count: educators.filter(e => e.specialization === 'visual-effects').length },
    { value: 'production', label: 'Production', icon: <Film className="w-4 h-4" />, count: educators.filter(e => e.specialization === 'production').length },
    { value: 'acting', label: 'Acting', icon: <Lightbulb className="w-4 h-4" />, count: educators.filter(e => e.specialization === 'acting').length }
  ].filter(cat => cat.count > 0);

  // Reusable components
  const StatBadge = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
    <motion.div 
      className="flex items-center gap-1.5 text-xs text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.6)" }}
      transition={{ duration: 0.2 }}
    >
      {icon}
      <span className="font-medium">{value}</span>
      {label && <span>{label}</span>}
    </motion.div>
  );

  const SocialLink = ({ href, icon, label, hoverColor }: { href: string, icon: React.ReactNode, label: string, hoverColor: string }) => (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 group`}
      title={label}
      variants={animations.socialIcon}
      whileHover="hover"
      whileTap="tap"
    >
      <div className={`transition-colors ${hoverColor}`}>
        {icon}
      </div>
    </motion.a>
  );

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0a0a0a] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none"></div>
      
      <motion.div 
        className="absolute w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-festival-red/5 blur-3xl -top-32 sm:-top-48 -right-32 sm:-right-48 pointer-events-none"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={animations.fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div 
            className="inline-block mb-4 sm:mb-6"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-festival-red uppercase tracking-widest text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-3 border border-festival-red/30 rounded-full bg-gradient-to-r from-festival-red/10 to-festival-red/5 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                Learn From The Best
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-medium tracking-tight mb-4 sm:mb-6 leading-tight">
            Our Workshop <span className="text-festival-red">Educators</span>
          </h2>
          
          <motion.p
            variants={animations.fadeInUp}
            className="text-white/80 leading-relaxed max-w-3xl mx-auto text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 px-4"
          >
            Meet the industry professionals who will be sharing their expertise and insights
            throughout our workshops, masterclasses, and mentorship sessions.
          </motion.p>
          
          {/* Search and Filter Section */}
          {!compact && (
            <div className="space-y-4 sm:space-y-6">
              {/* Search Bar */}
              <motion.div
                variants={animations.fadeInUp}
                className="max-w-md mx-auto relative"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search educators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-black/50 border border-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-festival-red/50 focus:bg-black/70 transition-all duration-300 text-sm sm:text-base"
                  />
                  {searchTerm && (
                    <motion.button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
              
              {/* Filter Toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/10 rounded-full text-white/70 hover:text-white hover:border-festival-red/30 hover:bg-black/50 transition-all duration-300 text-sm"
                variants={animations.button}
                whileHover="hover"
                whileTap="tap"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
              
              {/* Category Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-4 px-4">
                      {categories.map((category, index) => (
                        <motion.button
                          key={category.value}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all duration-300 border
                            ${activeCategory === category.value
                              ? 'bg-festival-red text-white border-festival-red shadow-lg shadow-festival-red/25'
                              : 'border-white/10 text-white/70 hover:text-white hover:border-festival-red/30 hover:bg-festival-red/5 bg-black/20'
                            }`}
                          onClick={() => handleCategoryChange(category.value)}
                          variants={animations.button}
                          whileHover="hover"
                          whileTap="tap"
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.03 }}
                        >
                          {category.icon}
                          <span className="hidden sm:inline">{category.label}</span>
                          <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                          <span className="text-xs opacity-70">({category.count})</span>
                        </motion.button>
                      ))}
                      
                      {(activeCategory || searchTerm) && (
                        <motion.button
                          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-black/20 hover:bg-black/40 transition-all duration-300"
                          onClick={clearFilters}
                          variants={animations.button}
                          whileHover="hover"
                          whileTap="tap"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          Clear All
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
        
        {/* Results Count */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 sm:mb-8 text-center"
          >
            <p className="text-white/60 text-sm">
              Showing {filteredEducators.length} educator{filteredEducators.length !== 1 ? 's' : ''}
              {activeCategory && ` in ${categories.find(c => c.value === activeCategory)?.label}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </motion.div>
        )}
        
        {/* Educators Grid */}
        <motion.div 
          variants={animations.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid gap-4 sm:gap-6 lg:gap-8 ${
            compact 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredEducators.map((educator) => (
            <motion.div
              key={educator.id}
              variants={animations.card}
              className={`bg-gradient-to-br from-black/70 to-black/50 border border-white/10 rounded-xl overflow-hidden group transition-all duration-500 backdrop-blur-sm relative hover:shadow-2xl hover:shadow-black/50
                ${expandedEducator === educator.id 
                  ? 'border-festival-red/40 shadow-2xl shadow-festival-red/20 scale-[1.01]' 
                  : 'hover:border-white/30'
                }`}
              onHoverStart={() => setHoveredCard(educator.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Image Section */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {!imageErrors[educator.id] ? (
                  <motion.img
                    src={educator.image}
                    alt={educator.name}
                    className="w-full h-full object-cover object-center transition-all duration-700"
                    style={{
                      scale: hoveredCard === educator.id ? 1.08 : 1,
                      objectPosition: 'center 25%'
                    }}
                    onError={() => handleImageError(educator.id)}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-festival-red/20 via-festival-red/10 to-festival-red/5 flex items-center justify-center">
                    {educator.fallbackIcon}
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-90"></div>
                
                {/* Badges */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 space-y-2">
                  {educator.featured && (
                    <motion.div 
                      className="bg-festival-red backdrop-blur-sm text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-white font-medium flex items-center gap-1 shadow-lg"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                      <span className="hidden sm:inline">Featured</span>
                    </motion.div>
                  )}
                </div>
                
                {/* Specialty Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center bg-black/70 backdrop-blur-sm text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20">
                  {getSpecializationIcon(educator.specialization)}
                  <span className="ml-1.5 sm:ml-2 text-white/90 capitalize text-xs hidden sm:inline">
                    {educator.specialization.replace('-', ' ')}
                  </span>
                </div>
                
                {/* Name and Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
                  <motion.h3 
                    className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-festival-red transition-colors duration-300"
                    style={{
                      y: hoveredCard === educator.id ? -4 : 0
                    }}
                  >
                    {educator.name}
                  </motion.h3>
                  <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">{educator.role}</p>
                  
                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs mb-2 sm:mb-3">
                    {educator.experience && (
                      <StatBadge 
                        icon={<Calendar className="w-3 h-3" />}
                        value={educator.experience}
                        label=""
                      />
                    )}
                    {educator.achievements && (
                      <StatBadge 
                        icon={<Award className="w-3 h-3" />}
                        value={educator.achievements}
                        label="awards"
                      />
                    )}
                  </div>
                  
                  {educator.location && (
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <MapPin className="w-3 h-3" />
                      <span>{educator.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Details Section */}
              <div className="p-4 sm:p-6">
                <motion.button 
                  onClick={() => toggleEducatorDetails(educator.id)}
                  className="w-full flex items-center justify-between text-sm text-white/70 hover:text-white transition-all duration-300 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-white/5 group/btn"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium text-xs sm:text-sm">
                      {expandedEducator === educator.id ? 'Hide Details' : 'View Bio & Highlights'}
                    </span>
                  </span>
                  <motion.div
                    animate={{ rotate: expandedEducator === educator.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="group-hover/btn:text-festival-red transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence mode="wait">
                  {expandedEducator === educator.id && (
                    <motion.div
                      variants={animations.expand}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="pt-4 sm:pt-6 border-t border-white/10 space-y-4 sm:space-y-6">
                        <motion.div
                          variants={animations.slideIn}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.1 }}
                        >
                          <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
                            {educator.bio}
                          </p>
                        </motion.div>
                        
                        {educator.highlights.length > 0 && (
                          <motion.div
                            variants={animations.slideIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-festival-red" />
                              <h4 className="text-white font-semibold text-sm sm:text-base">Career Highlights</h4>
                            </div>
                            <ul className="space-y-2 sm:space-y-3">
                              {educator.highlights.map((highlight, index) => (
                                <motion.li 
                                  key={index} 
                                  className="text-white/70 flex items-start gap-2 sm:gap-3 text-xs sm:text-sm"
                                  initial={{ opacity: 0, x: -16 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + (index * 0.04), duration: 0.4 }}
                                >
                                  <span className="text-festival-red mt-1 text-xs">●</span>
                                  <span className="leading-relaxed">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                        
                        {/* Social Links */}
                        {educator.social && Object.keys(educator.social).length > 0 && (
                          <motion.div 
                            className="flex flex-wrap items-center gap-3 pt-3 sm:pt-4 border-t border-white/10"
                            variants={animations.slideIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                          >
                            <span className="text-white/60 text-xs sm:text-sm font-medium">Connect:</span>
                            {educator.social.linkedin && (
                              <SocialLink 
                                href={educator.social.linkedin}
                                icon={<Linkedin className="w-4 h-4" />}
                                label="LinkedIn"
                                hoverColor="group-hover:text-blue-400"
                              />
                            )}
                            {educator.social.twitter && (
                              <SocialLink 
                                href={educator.social.twitter}
                                icon={<Twitter className="w-4 h-4" />}
                                label="Twitter"
                                hoverColor="group-hover:text-blue-400"
                              />
                            )}
                            {educator.social.instagram && (
                              <SocialLink 
                                href={educator.social.instagram}
                                icon={<Instagram className="w-4 h-4" />}
                                label="Instagram"
                                hoverColor="group-hover:text-pink-400"
                              />
                            )}
                            {educator.social.website && (
                              <SocialLink 
                                href={educator.social.website}
                                icon={<ExternalLink className="w-4 h-4" />}
                                label="Website"
                                hoverColor="group-hover:text-green-400"
                              />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* No Results Message */}
        {filteredEducators.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white/30" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-white mb-2">No educators found</h3>
            <p className="text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              onClick={clearFilters}
              className="px-4 sm:px-6 py-2 bg-festival-red/20 border border-festival-red/30 rounded-full text-festival-red hover:bg-festival-red/30 transition-colors text-sm"
              variants={animations.button}
              whileHover="hover"
              whileTap="tap"
            >
              Clear all filters
            </motion.button>
          </motion.div>
        )}
        
        {/* CTA for Compact Mode */}
        {compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <motion.a 
              href="/educators" 
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-festival-red to-festival-red/80 hover:from-festival-red/90 hover:to-festival-red/70 text-white transition-all duration-300 rounded-full shadow-lg shadow-festival-red/25 font-medium text-sm sm:text-base"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Meet All Educators</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          </motion.div>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-festival-red to-transparent"></div>
      <motion.div 
        className="absolute bottom-0 left-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-festival-red/10 blur-2xl transform -translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};

export default EducatorsSection;