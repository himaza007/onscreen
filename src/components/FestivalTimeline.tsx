import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Info, Film, Video, User } from 'lucide-react';

// Enhanced TimelineEvent with more interactive elements and visual cues
const TimelineEvent = ({ date, title, description, index, isInView, icon }: {
  date: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
  icon: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Alternate the position of events for visual interest (even/odd)
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={cn(
        "relative flex-1 px-4",
        isEven ? "md:mt-16" : "md:mb-16"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.7, 
        delay: 0.2 + (index * 0.15),
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      {/* Connector Line */}
      <div className="absolute top-6 inset-x-0 h-[1px] bg-white/20" />
      
      {/* Date Dot */}
      <div className="relative flex justify-center">
        <motion.div 
          className={cn(
            "w-14 h-14 rounded-full bg-black border-2 flex items-center justify-center z-10 transition-all duration-300",
            isHovered ? "border-festival-red shadow-lg shadow-festival-red/30" : "border-festival-red/70"
          )}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + (index * 0.15) }}
        >
          <motion.div 
            className="text-festival-red"
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: isHovered ? [0, 5, -5, 0] : 0
            }}
            transition={{ 
              scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
              rotate: { duration: 0.3, repeat: isHovered ? 0 : 0 }
            }}
          >
            {icon}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Content */}
      <motion.div 
        className={cn(
          "mt-6 text-center px-3 transition-all duration-300 relative",
          isHovered ? "scale-105" : "scale-100",
          isHovered ? "bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg" : ""
        )}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 + (index * 0.15) }}
      >
        {/* Date Tab */}
        <motion.div 
          className={cn(
            "inline-block bg-festival-red/90 px-3 py-1 rounded-full mb-3",
            isHovered ? "bg-festival-red" : "bg-festival-red/80"
          )}
          animate={isHovered ? { y: [-2, 0, -2] } : { y: 0 }}
          transition={{ y: { duration: 1.5, repeat: Infinity } }}
        >
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-white" />
            <p className="text-white font-medium text-xs tracking-wide">{date}</p>
          </div>
        </motion.div>
        
        <h3 className={cn(
          "text-white font-medium text-lg mb-2 transition-all duration-300",
          isHovered ? "text-festival-red" : "text-white"
        )}>
          {title}
        </h3>
        
        <p className="text-white/70 text-sm font-light leading-relaxed">
          {description}
        </p>
        
        {isHovered && (
          <motion.div 
            className="mt-3 pt-3 border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <button className="text-xs text-festival-red hover:text-white transition-colors flex items-center gap-1 mx-auto">
              <Info className="w-3 h-3" />
              <span>Learn more</span>
            </button>
          </motion.div>
        )}
        
        {/* Vertical Connector Line for alternating pattern */}
        <motion.div 
          className={cn(
            "absolute h-16 w-[1px] left-1/2 -translate-x-1/2 bg-white/10 hidden md:block",
            isEven ? "top-full" : "bottom-full"
          )}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + (index * 0.15) }}
        />
      </motion.div>
    </motion.div>
  );
};

const FestivalTimeline = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Enhanced timeline data with icons
  const timelineEvents = [
    {
      date: 'March 15, 2025',
      title: 'Cinematography Workshop',
      description: 'Master the art of visual storytelling through expert-led sessions on lighting, framing, and camera movement.',
      icon: <Video className="w-5 h-5" />
    },
    {
      date: 'April 10, 2025',
      title: 'Screenplay & Directing',
      description: 'Learn the fundamentals of crafting compelling narratives and bringing your vision to life on screen.',
      icon: <User className="w-5 h-5" />
    },
    {
      date: 'April 25, 2025',
      title: 'CGI & SFX Masterclass',
      description: 'Explore cutting-edge techniques in visual effects and animation with industry professionals.',
      icon: <Film className="w-5 h-5" />
    },
    {
      date: 'May 17, 2025',
      title: 'Final Submission Date',
      description: 'Deadline for all film submissions. Late entries will not be considered for official selection.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      date: 'May 19, 2025',
      title: 'Festival Opening Night',
      description: 'Join us for the grand opening ceremony featuring special guests and premiere screenings.',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0c0c0c] py-28 px-6 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('/film-grain.png')] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      
      {/* Animated film reels decoration */}
      <motion.div 
        className="absolute -left-24 -top-24 w-48 h-48 border-4 border-white/5 rounded-full opacity-30 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute -right-24 -bottom-24 w-64 h-64 border-4 border-white/5 rounded-full opacity-30 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-3">Important Dates</span>
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight">
            Festival Timeline
          </h2>
          <motion.div 
            className="w-16 h-1 bg-festival-red mx-auto mt-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-white/70 max-w-2xl mx-auto mt-6">
            Mark your calendar for these key events leading up to and during the OnScreen '25 festival.
            All workshops and screenings will take place at our main venue in Colombo.
          </p>
        </motion.div>
        
        {/* Timeline container with enhanced visual elements */}
        <div className="relative">
          {/* Main timeline track */}
          <motion.div 
            className="absolute left-0 right-0 top-6 h-[3px] bg-gradient-to-r from-transparent via-festival-red/50 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Timeline progress indicator */}
          <motion.div 
            className="absolute left-0 top-[22px] w-3 h-3 rounded-full bg-festival-red z-20 shadow-lg shadow-festival-red/30"
            initial={{ left: "0%" }}
            animate={isInView ? { left: "95%" } : { left: "0%" }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
          />
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative">
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={index}
                date={event.date}
                title={event.title}
                description={event.description}
                index={index}
                isInView={isInView}
                icon={event.icon}
              />
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <button className="bg-festival-red hover:bg-festival-red/90 text-white px-8 py-3 border border-festival-red hover:border-white transition-all duration-300 group">
            <span className="flex items-center gap-2">
              <span>View Complete Schedule</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
      
      {/* Enhanced decorative film strip */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-festival-red/40 to-transparent"></div>
    </section>
  );
};

export default FestivalTimeline;