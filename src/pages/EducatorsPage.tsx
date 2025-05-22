import React, { useRef, useState, useCallback, useEffect, useMemo, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GraduationCap, Users, Award, ChevronDown, Star, TrendingUp, Camera, Play, Film, Video, Book, Lightbulb, Clock, Target, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Lazy load EducatorsSection for better performance
const EducatorsSection = lazy(() => import('@/components/EducatorsSection'));

// Types for better type safety
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  workshop: string;
  specialization: string;
  achievement: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  borderColor: string;
}

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
  bgGradient: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// Custom hooks for better functionality
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px', ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
};

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-full bg-festival-red/20 flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-festival-red animate-pulse" />
      </div>
      <p className="text-white/70">Loading educators...</p>
    </motion.div>
  </div>
);

// Error Boundary component
const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md"
    >
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
      <p className="text-white/70 mb-6">{error.message}</p>
      <Button onClick={resetError} className="bg-festival-red hover:bg-festival-red/90">
        Try again
      </Button>
    </motion.div>
  </div>
);

const EducatorsPage = () => {
  // Refs for intersection observers
  const headerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  
  // Custom intersection observers with performance optimization
  const isHeaderInView = useIntersectionObserver(headerRef, { threshold: 0.2 });
  const isStatsInView = useIntersectionObserver(statsRef, { threshold: 0.3 });
  const isTestimonialsInView = useIntersectionObserver(testimonialsRef, { threshold: 0.3 });
  const isBenefitsInView = useIntersectionObserver(benefitsRef, { threshold: 0.3 });
  
  // State management with better typing
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number>(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Custom hooks
  const isOnline = useOnlineStatus();
  const shouldReduceMotion = useReducedMotion();
  const { toast } = useToast();
  
  // Scroll animations with reduced motion support
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], shouldReduceMotion ? [0, 0] : [0, 100]);
  const parallaxY1 = useTransform(scrollY, [0, 500], shouldReduceMotion ? [0, 0] : [0, -50]);
  const parallaxY2 = useTransform(scrollY, [0, 500], shouldReduceMotion ? [0, 0] : [0, -30]);
  const parallaxY3 = useTransform(scrollY, [0, 500], shouldReduceMotion ? [0, 0] : [0, -70]);

  // Enhanced initialization with error handling
  useEffect(() => {
    const initializePage = async () => {
      try {
        setIsLoading(true);
        
        // Simulate component initialization (could be API calls)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if components are available
        if (typeof window === 'undefined') {
          throw new Error('Window is not available');
        }
        
        setIsVisible(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        toast({
          title: "Initialization Error",
          description: "Failed to load page components. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [toast]);

  // Memoized data with comprehensive error handling
  const faqs = useMemo<FAQ[]>(() => {
    try {
      return [
        {
          id: 1,
          question: "What makes OnScreen '25 educators unique?",
          answer: "Our educators are carefully selected industry professionals with proven track records in their respective fields. Each brings real-world experience from both local and international productions, ensuring participants receive cutting-edge knowledge and practical insights that can't be found in traditional educational settings."
        },
        {
          id: 2,
          question: "How do workshops benefit emerging filmmakers?",
          answer: "Workshops are structured as intensive learning experiences combining theory, practical demonstrations, and hands-on exercises. Participants work directly with industry-standard equipment while receiving personalized feedback from seasoned professionals, creating an immersive learning environment that accelerates skill development."
        },
        {
          id: 3,
          question: "What specializations are covered in the workshops?",
          answer: "We cover a comprehensive range of film disciplines including cinematography, directing, screenwriting, editing, sound design, and production management. Each specialization is taught by experts who have mastered their craft through years of professional practice and continue to work actively in the industry."
        },
        {
          id: 4,
          question: "How can I get the most out of these learning experiences?",
          answer: "Come prepared with questions, bring your creative projects for feedback, actively participate in hands-on exercises, and network with fellow participants. Our educators encourage collaborative learning and are available for one-on-one guidance during sessions. Take notes, practice techniques learned, and don't hesitate to ask for clarification."
        }
      ];
    } catch (err) {
      console.error('Error loading FAQ data:', err);
      return [];
    }
  }, []);

  const testimonials = useMemo<Testimonial[]>(() => {
    try {
      return [
        {
          id: 1,
          name: "Sanjana Perera",
          role: "Film Student",
          content: "The cinematography workshop completely transformed my understanding of visual storytelling. M.D. Mahindapala's approach to lighting and composition opened up entirely new creative possibilities for my work. The hands-on experience with professional equipment was invaluable.",
          rating: 5,
          workshop: "Cinematography Masterclass",
          specialization: "cinematography",
          achievement: "Now working as DOP assistant on local productions"
        },
        {
          id: 2,
          name: "Rohan Silva",
          role: "Independent Filmmaker", 
          content: "Tharindu's directing workshop was a masterclass in narrative structure and character development. The practical exercises and real-world examples gave me confidence to tackle complex storytelling challenges. My short film won Best Direction at the Colombo Film Festival.",
          rating: 5,
          workshop: "Directing Workshop",
          specialization: "directing",
          achievement: "Award-winning short film director"
        },
        {
          id: 3,
          name: "Kavitha Rathnayake",
          role: "Content Creator",
          content: "The screenwriting session with Wasantha was incredibly insightful. Learning about story structure, dialogue, and character arcs from someone with such extensive industry experience was invaluable for my creative development. I've since written three feature-length scripts.",
          rating: 5,
          workshop: "Screenwriting Fundamentals",
          specialization: "screenwriting",
          achievement: "Published screenwriter with 3 feature scripts"
        }
      ];
    } catch (err) {
      console.error('Error loading testimonials data:', err);
      return [];
    }
  }, []);

  const benefits = useMemo<Benefit[]>(() => {
    try {
      return [
        {
          icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
          title: "Hands-On Learning",
          description: "Work with professional-grade equipment and learn industry-standard techniques through practical exercises and real-world projects guided by experienced professionals.",
          gradient: "from-festival-red/20 via-festival-red/10 to-festival-red/5",
          borderColor: "border-festival-red/20"
        },
        {
          icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
          title: "Expert Mentorship",
          description: "Receive personalized guidance from award-winning professionals with decades of industry experience who are actively working in their respective fields.",
          gradient: "from-festival-red/18 via-festival-red/9 to-festival-red/4",
          borderColor: "border-festival-red/18"
        },
        {
          icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
          title: "Career Development",
          description: "Build your portfolio with professional projects and gain the skills, knowledge, and industry connections needed to advance in the competitive film industry.",
          gradient: "from-festival-red/16 via-festival-red/8 to-festival-red/3",
          borderColor: "border-festival-red/16"
        },
        {
          icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
          title: "Industry Recognition",
          description: "Earn certificates from recognized professionals and gain credentials that enhance your industry credibility while building lasting relationships with mentors.",
          gradient: "from-festival-red/14 via-festival-red/7 to-festival-red/2",
          borderColor: "border-festival-red/14"
        }
      ];
    } catch (err) {
      console.error('Error loading benefits data:', err);
      return [];
    }
  }, []);

  const stats = useMemo<Stat[]>(() => {
    try {
      return [
        {
          icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
          value: "7+",
          label: "Expert Educators",
          description: "Industry professionals with decades of combined experience",
          color: "text-festival-red",
          bgGradient: "from-festival-red/20 to-festival-red/5"
        },
        {
          icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
          value: "150+",
          label: "Years Combined Experience",
          description: "Collective expertise across all film disciplines and techniques",
          color: "text-festival-red",
          bgGradient: "from-festival-red/18 to-festival-red/4"
        },
        {
          icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
          value: "200+",
          label: "Students Mentored",
          description: "Successful graduates now working professionally in the industry",
          color: "text-festival-red",
          bgGradient: "from-festival-red/16 to-festival-red/3"
        }
      ];
    } catch (err) {
      console.error('Error loading stats data:', err);
      return [];
    }
  }, []);

  // Enhanced functions with better error handling
  const getSpecializationIcon = useCallback((specialization: string) => {
    try {
      const iconMap: Record<string, React.ReactNode> = {
        'cinematography': <Camera className="w-4 h-4 sm:w-5 sm:h-5" />,
        'directing': <Film className="w-4 h-4 sm:w-5 sm:h-5" />,
        'screenwriting': <Book className="w-4 h-4 sm:w-5 sm:h-5" />,
        'acting': <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />,
        'editing': <Video className="w-4 h-4 sm:w-5 sm:h-5" />
      };
      return iconMap[specialization] || <Film className="w-4 h-4 sm:w-5 sm:h-5" />;
    } catch (err) {
      console.error('Error getting specialization icon:', err);
      return <Film className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  }, []);

  const scrollToEducators = useCallback(() => {
    try {
      const educatorsSection = document.querySelector('#educators-section');
      if (educatorsSection) {
        const isMobile = window.innerWidth < 768;
        const yOffset = isMobile ? -60 : -80; // Account for navbar height
        const y = educatorsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      } else {
        toast({
          title: "Navigation Error",
          description: "Unable to scroll to educators section. Please try refreshing the page.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Error scrolling to educators:', err);
      toast({
        title: "Navigation Error",
        description: "An error occurred while scrolling. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const toggleFaq = useCallback((faqId: number) => {
    try {
      setExpandedFaq(prev => {
        const newState = prev === faqId ? null : faqId;
        
        // Announce to screen readers
        const faqElement = document.querySelector(`[data-faq-id="${faqId}"]`);
        if (faqElement) {
          const isExpanded = newState === faqId;
          faqElement.setAttribute('aria-expanded', isExpanded.toString());
        }
        
        return newState;
      });
    } catch (err) {
      console.error('Error toggling FAQ:', err);
      toast({
        title: "Error",
        description: "Failed to toggle FAQ. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const selectTestimonial = useCallback((index: number) => {
    try {
      if (index >= 0 && index < testimonials.length) {
        setSelectedTestimonial(index);
        
        // Announce change to screen readers
        const announcement = `Viewing testimonial ${index + 1} of ${testimonials.length} from ${testimonials[index].name}`;
        const srElement = document.getElementById('testimonial-announcement');
        if (srElement) {
          srElement.textContent = announcement;
        }
      }
    } catch (err) {
      console.error('Error selecting testimonial:', err);
    }
  }, [testimonials]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    try {
      if (event.key === 'Escape' && expandedFaq !== null) {
        setExpandedFaq(null);
      }
      
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        const newIndex = (selectedTestimonial + direction + testimonials.length) % testimonials.length;
        selectTestimonial(newIndex);
      }
    } catch (err) {
      console.error('Error handling keyboard navigation:', err);
    }
  }, [expandedFaq, selectedTestimonial, testimonials.length, selectTestimonial]);

  // Error boundary
  if (error) {
    return <ErrorFallback error={error} resetError={() => setError(null)} />;
  }

  // Loading state
  if (isLoading || !isVisible) {
    return <LoadingSpinner />;
  }
  
  return (
    <PageTransition>
      <div 
        className="min-h-screen bg-black text-white relative overflow-hidden"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Accessibility announcements */}
        <div id="testimonial-announcement" className="sr-only" aria-live="polite" />
        
        {/* Enhanced background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        {/* Online status indicator */}
        {!isOnline && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center text-sm z-50"
          >
            <WifiOff className="w-4 h-4 inline mr-2" />
            You're offline. Some features may not work properly.
          </motion.div>
        )}
        
        {/* Theme-oriented floating background elements with reduced motion support */}
        {!shouldReduceMotion && (
          <>
            <motion.div 
              className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-festival-red/5 blur-3xl -top-32 -right-32 sm:-top-48 sm:-right-48 pointer-events-none"
              style={{ y: parallaxY1 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-festival-red/3 blur-3xl top-1/2 -left-24 sm:-left-32 pointer-events-none"
              style={{ y: parallaxY2 }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-festival-red/4 blur-2xl bottom-1/4 right-1/4 pointer-events-none"
              style={{ y: parallaxY3 }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}
        
        <Navbar />
        
        {/* Enhanced header section with better responsive design */}
        <section 
          ref={headerRef}
          className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden"
        >
          {/* Enhanced background with better mobile performance */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&q=80&w=800')] sm:bg-[url('https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?auto=format&fit=crop&q=80&w=800')] sm:bg-[url('https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-15 z-0"></div>
          
          {/* Theme-oriented overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black z-0"></div>
          
          <motion.div 
            className="container relative z-10 px-4 sm:px-6 text-center"
            style={{ y: headerY }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-festival-red/15 via-festival-red/10 to-festival-red/15 border border-festival-red/30 rounded-full text-festival-red text-xs sm:text-sm font-medium backdrop-blur-sm">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Expert Film Educators</span>
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 sm:mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              Meet Our{' '}
              <span className="text-festival-red bg-gradient-to-r from-festival-red to-festival-red/80 bg-clip-text">
                Educators
              </span>
            </motion.h1>
            
            <motion.div 
              className="w-16 sm:w-24 h-1 bg-gradient-to-r from-festival-red to-festival-red/60 mx-auto mb-6 sm:mb-8"
              initial={{ width: 0 }}
              animate={isHeaderInView ? { width: "4rem" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Learn from industry professionals who bring years of experience and expertise
              to OnScreen '25's workshops, masterclasses, and mentorship sessions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <Button 
                className="bg-gradient-to-r from-festival-red to-festival-red/80 hover:from-festival-red/90 hover:to-festival-red/70 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium shadow-lg shadow-festival-red/25"
                onClick={scrollToEducators}
                aria-label="Scroll to educators section"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Explore Our Educators
              </Button>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Enhanced stats section with better responsive grid */}
        <section 
          ref={statsRef}
          className="py-16 sm:py-24 px-4 sm:px-6 relative bg-gradient-to-b from-[#050505] to-[#0a0a0a]"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium mb-4 sm:mb-6">
                Our Educator <span className="text-festival-red">Network</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg px-4">
                A distinguished group of industry professionals committed to nurturing the next generation of filmmakers
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              initial="hidden"
              animate={isStatsInView ? "visible" : "hidden"}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
                  }}
                  className="bg-gradient-to-br from-black/60 to-black/30 border border-white/10 p-6 sm:p-8 text-center hover:border-festival-red/30 transition-all duration-500 group rounded-lg backdrop-blur-sm relative overflow-hidden"
                  onHoverStart={() => setHoveredStat(index)}
                  onHoverEnd={() => setHoveredStat(null)}
                  whileHover={{ y: shouldReduceMotion ? 0 : -10, scale: shouldReduceMotion ? 1 : 1.05 }}
                >
                  {/* Theme-oriented background glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-festival-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <motion.div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:from-festival-red/30 group-hover:to-festival-red/10 transition-all duration-500 ${stat.color}`}
                    whileHover={{ rotate: shouldReduceMotion ? 0 : 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 group-hover:text-festival-red transition-colors duration-300"
                    animate={hoveredStat === index && !shouldReduceMotion ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {stat.value}
                  </motion.h3>
                  
                  <p className="text-white/80 font-medium mb-2 text-sm sm:text-base">{stat.label}</p>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{stat.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Enhanced benefits section with responsive grid */}
        <section
          ref={benefitsRef}
          className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#070707]"
        >
          <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
          
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight mb-4 sm:mb-6">
                Why Learn From <span className="text-festival-red">Our Educators</span>?
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-festival-red mx-auto mb-4 sm:mb-6"></div>
              <p className="text-white/70 max-w-3xl mx-auto text-base sm:text-lg px-4">
                Experience transformative learning that combines industry expertise with hands-on practice
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${benefit.gradient} backdrop-blur-sm border ${benefit.borderColor} p-6 sm:p-8 rounded-xl hover:border-festival-red/40 transition-all duration-500 group relative overflow-hidden`}
                  onHoverStart={() => setHoveredBenefit(index)}
                  onHoverEnd={() => setHoveredBenefit(null)}
                  whileHover={{ y: shouldReduceMotion ? 0 : -5, scale: shouldReduceMotion ? 1 : 1.02 }}
                >
                  <motion.div
                    className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6"
                    whileHover={{ x: shouldReduceMotion ? 0 : 5 }}
                  >
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-festival-red/15 border border-festival-red/25 flex items-center justify-center text-festival-red mb-4 sm:mb-0 sm:mr-4 group-hover:bg-festival-red/25 group-hover:border-festival-red/40 transition-all duration-300"
                      whileHover={{ 
                        rotate: shouldReduceMotion ? 0 : 15, 
                        scale: shouldReduceMotion ? 1 : 1.1 
                      }}
                      animate={hoveredBenefit === index && !shouldReduceMotion ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold group-hover:text-festival-red transition-colors">
                      {benefit.title}
                    </h3>
                  </motion.div>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Lazy-loaded educators section with error boundary */}
        <div id="educators-section">
          <Suspense fallback={
            <div className="py-24 flex justify-center">
              <LoadingSpinner />
            </div>
          }>
            <EducatorsSection featuredOnly={false} />
          </Suspense>
        </div>
        
        {/* Enhanced testimonials section with better mobile experience */}
        <section 
          ref={testimonialsRef}
          className="py-16 sm:py-24 px-4 sm:px-6 bg-[#050505] relative"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium mb-4 sm:mb-6">
                What <span className="text-festival-red">Participants</span> Say
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg px-4">
                Hear from past workshop participants about their transformative learning experiences
              </p>
            </motion.div>
            
            {/* Featured testimonial with responsive design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isTestimonialsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="mb-12 sm:mb-16"
            >
              <div className="bg-gradient-to-br from-black/60 to-black/30 border border-white/10 p-6 sm:p-8 md:p-12 rounded-xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-festival-red/5 rounded-full blur-2xl"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-center relative z-10">
                  <div className="lg:col-span-3">
                    <div className="flex items-center mb-4 sm:mb-6">
                      {[...Array(testimonials[selectedTestimonial]?.rating || 5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="text-festival-red text-xl sm:text-2xl mr-1"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          ★
                        </motion.div>
                      ))}
                    </div>
                    
                    <blockquote className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-4 sm:mb-6 italic">
                      "{testimonials[selectedTestimonial]?.content}"
                    </blockquote>
                    
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-festival-red/20 to-festival-red/5 border border-festival-red/20 flex items-center justify-center">
                        {getSpecializationIcon(testimonials[selectedTestimonial]?.specialization || '')}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-base sm:text-lg">
                          {testimonials[selectedTestimonial]?.name}
                        </h4>
                        <p className="text-white/60 text-sm sm:text-base">
                          {testimonials[selectedTestimonial]?.role}
                        </p>
                        <p className="text-festival-red text-xs sm:text-sm">
                          {testimonials[selectedTestimonial]?.workshop}
                        </p>
                      </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-festival-red/10 border border-festival-red/20 rounded-full text-festival-red text-xs">
                      <Target className="w-3 h-3" />
                      <span>{testimonials[selectedTestimonial]?.achievement}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-festival-red/20 to-festival-red/5 border border-festival-red/20 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 sm:w-12 sm:h-12 text-festival-red" />
                    </div>
                    <p className="text-white/60 text-xs sm:text-sm">Workshop Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial selector with better mobile touch targets */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectTestimonial(index)}
                  className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    selectedTestimonial === index 
                      ? 'bg-festival-red scale-125 shadow-lg shadow-festival-red/30' 
                      : 'bg-white/30 hover:bg-festival-red/50'
                  }`}
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.2 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Additional testimonials grid with responsive design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-black/50 border border-white/10 p-4 sm:p-6 rounded-lg hover:border-festival-red/30 transition-all duration-300 cursor-pointer ${
                    selectedTestimonial === index ? 'border-festival-red/50 bg-festival-red/5' : ''
                  }`}
                  onClick={() => selectTestimonial(index)}
                  whileHover={{ y: shouldReduceMotion ? 0 : -5, scale: shouldReduceMotion ? 1 : 1.02 }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-festival-red text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-white/80 mb-3 sm:mb-4 text-sm italic">
                    "{testimonial.content.slice(0, 100)}..."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-festival-red/20 to-festival-red/5 border border-festival-red/20 flex items-center justify-center">
                      {getSpecializationIcon(testimonial.specialization)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                      <p className="text-white/60 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Enhanced FAQ Section with accessibility improvements */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-t from-black to-[#050505]">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium mb-4 sm:mb-6">
                Frequently Asked <span className="text-festival-red">Questions</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
                Get answers to common questions about our educator program and learning experiences
              </p>
            </motion.div>
            
            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: faqs.indexOf(faq) * 0.1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="bg-gradient-to-br from-black/60 to-black/30 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm"
                >
                  <motion.button
                    data-faq-id={faq.id}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors group"
                    whileHover={{ x: shouldReduceMotion ? 0 : 5 }}
                    aria-expanded={expandedFaq === faq.id}
                    aria-controls={`faq-content-${faq.id}`}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-festival-red transition-colors pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-festival-red transition-colors" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        id={`faq-content-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-white/10"
                      >
                        <motion.div 
                          className="p-4 sm:p-6 pt-3 sm:pt-4"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default EducatorsPage;