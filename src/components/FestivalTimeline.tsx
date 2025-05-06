import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Info, Film, Video, Upload, BookOpen, Camera, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

/**
 * Interface for timeline events
 */
interface TimelineEvent {
  date: string;        // Human-readable date string (e.g., "May 06, 2025")
  title: string;       // Event title
  description: string; // Event description
  icon: React.ReactNode; // Event icon component
  dateObj: Date;       // JavaScript Date object for calculations
}

/**
 * Status type for timeline events (current, past, or future)
 */
type EventStatus = 'current' | 'past' | 'future';

/**
 * Main Festival Timeline Component
 */
const FestivalTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });
  
  // Default to May 5, 2025 for demo purposes - in production, use new Date()
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2025-05-05"));
  
  // Process the timeline events data with parsed dates
  const timelineEvents: TimelineEvent[] = [
    { 
      date: 'May 06, 2025', 
      title: 'Introductory Webinar', 
      description: 'A virtual session offering a glimpse into the workshops and facilitators.', 
      icon: <Video className="w-5 h-5" />,
      dateObj: new Date("2025-05-06")
    },
    { 
      date: 'May 08, 2025', 
      title: 'The Art of Cinematography & Lighting', 
      description: 'Mastering visual storytelling through light, mood & camera work.', 
      icon: <Camera className="w-5 h-5" />,
      dateObj: new Date("2025-05-08")
    },
    { 
      date: 'May 10, 2025', 
      title: 'Awareness Session', 
      description: 'Submission formats, judging criteria & festival insights.', 
      icon: <Info className="w-5 h-5" />,
      dateObj: new Date("2025-05-10")
    },
    { 
      date: 'May 15, 2025', 
      title: 'Directing & Screenwriting Masterclass', 
      description: 'From script to screen: shaping vision, voice & impact.', 
      icon: <BookOpen className="w-5 h-5" />,
      dateObj: new Date("2025-05-15")
    },
    { 
      date: 'May 17, 2025', 
      title: 'Visual Effects in Focus: CGI, Animation & SFX', 
      description: 'Crafting immersive worlds using modern VFX techniques.', 
      icon: <Film className="w-5 h-5" />,
      dateObj: new Date("2025-05-17")
    },
    { 
      date: 'May 19, 2025', 
      title: 'Synopsis / Project Proposal Deadline', 
      description: 'Submit your film concept for initial review and feedback.', 
      icon: <Clock className="w-5 h-5" />,
      dateObj: new Date("2025-05-19")
    },
    { 
      date: 'May 26, 2025', 
      title: 'Film Submissions Open', 
      description: 'Begin uploading your short films for the competition.', 
      icon: <Upload className="w-5 h-5" />,
      dateObj: new Date("2025-05-26")
    },
    { 
      date: 'May 28, 2025', 
      title: 'Film Submissions Close', 
      description: 'Deadline for submitting films. No late entries allowed.', 
      icon: <Clock className="w-5 h-5" />,
      dateObj: new Date("2025-05-28")
    },
    { 
      date: 'May 31, 2025', 
      title: 'Festival Day & Screenings', 
      description: 'Live screenings, jury evaluations & awards ceremony.', 
      icon: <Video className="w-5 h-5" />,
      dateObj: new Date("2025-05-31")
    }
  ];
  
  // Festival date range
  const startDate = new Date("2025-05-01"); // Beginning of May
  const endDate = new Date("2025-06-01");   // End of May
  
  // Calculate progress through the month (0 to 100%)
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = currentDate.getTime() - startDate.getTime();
  const progress = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));
  
  // Update visible range when active event changes
  useEffect(() => {
    // Ensure the active event is visible in the range
    if (activeEvent < visibleRange.start) {
      setVisibleRange({
        start: Math.max(0, activeEvent),
        end: Math.min(timelineEvents.length - 1, Math.max(0, activeEvent) + 3)
      });
    } else if (activeEvent > visibleRange.end) {
      setVisibleRange({
        start: Math.max(0, activeEvent - 3),
        end: Math.min(timelineEvents.length - 1, activeEvent)
      });
    }
  }, [activeEvent, visibleRange, timelineEvents.length]);

  // Simulation to advance time for demo purposes
  // In production, this would be replaced with real-time updates
  useEffect(() => {
    // For demo: Advance time every 5 seconds to show the timeline progression
    const timer = setInterval(() => {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        // Uncomment the next line to simulate time advancing for demo
        // newDate.setDate(prevDate.getDate() + 1);
        return newDate;
      });
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  /**
   * Determine event status based on current date
   */
  const getEventStatus = (eventDate: Date): EventStatus => {
    const isSameDay = eventDate.getDate() === currentDate.getDate() && 
                     eventDate.getMonth() === currentDate.getMonth() && 
                     eventDate.getFullYear() === currentDate.getFullYear();
    
    if (isSameDay) {
      return 'current';
    } else if (eventDate < currentDate) {
      return 'past';
    } else {
      return 'future';
    }
  };

  // Navigate to next event
  const goToNextEvent = () => {
    if (activeEvent < timelineEvents.length - 1) {
      setActiveEvent(activeEvent + 1);
    }
  };

  // Navigate to previous event
  const goToPrevEvent = () => {
    if (activeEvent > 0) {
      setActiveEvent(activeEvent - 1);
    }
  };

  // Shift visible range to the right
  const shiftRangeRight = () => {
    if (visibleRange.end < timelineEvents.length - 1) {
      setVisibleRange(prev => ({
        start: Math.min(prev.start + 1, timelineEvents.length - 4),
        end: Math.min(prev.end + 1, timelineEvents.length - 1)
      }));
    }
  };

  // Shift visible range to the left
  const shiftRangeLeft = () => {
    if (visibleRange.start > 0) {
      setVisibleRange(prev => ({
        start: Math.max(prev.start - 1, 0),
        end: Math.max(prev.end - 1, 3)
      }));
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0c0c0c] py-32 px-8 relative overflow-hidden"
    >
      {/* Background and decorative elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('/film-grain.png')] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      
      {/* Animated film reel decorations */}
      <motion.div 
        className="absolute -left-32 -top-32 w-64 h-64 border-4 border-white/5 rounded-full opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute -right-32 -bottom-32 w-80 h-80 border-4 border-white/5 rounded-full opacity-20 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-4">
            Festival Journey
          </span>
          <h2 className="text-white text-5xl md:text-6xl font-display font-medium tracking-tight">
            Timeline of Events
          </h2>
          <motion.div 
            className="w-20 h-1 bg-festival-red mx-auto mt-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-white/70 max-w-2xl mx-auto mt-8 text-lg">
            Your roadmap through OnScreen '25 — from workshops to screenings.
            Follow our timeline to stay on track with key festival dates.
          </p>
        </motion.div>
        
        {/* Interactive Timeline */}
        <div className="relative">
          {/* Step navigation controls */}
          <div className="w-full max-w-5xl mx-auto flex justify-between items-center mb-8">
            <button
              onClick={goToPrevEvent}
              disabled={activeEvent === 0}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                activeEvent > 0 
                  ? "bg-white/10 text-white hover:bg-white/20" 
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
              aria-label="Previous event"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-white font-medium text-lg">
              <span className="text-festival-red">{activeEvent + 1}</span>
              <span className="mx-3 text-white/40">/</span>
              <span>{timelineEvents.length}</span>
            </div>
            
            <button
              onClick={goToNextEvent}
              disabled={activeEvent === timelineEvents.length - 1}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                activeEvent < timelineEvents.length - 1 
                  ? "bg-white/10 text-white hover:bg-white/20" 
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
              aria-label="Next event"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        
          {/* Event details card with animated transitions - MOVED ABOVE THE STEP INDICATORS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`event-card-${activeEvent}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-12 max-w-4xl mx-auto mb-16"
            >
              <div className="flex flex-col md:flex-row gap-10">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-festival-red/20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-festival-red"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {timelineEvents[activeEvent].icon}
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl font-medium text-white mb-5"
                  >
                    {timelineEvents[activeEvent].title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/70 mb-8 text-xl leading-relaxed"
                  >
                    {timelineEvents[activeEvent].description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center text-white/50 text-base"
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    {timelineEvents[activeEvent].date}
                  </motion.div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-14 pt-8 border-t border-white/10">
                <button
                  onClick={goToPrevEvent}
                  className={cn(
                    "px-8 py-3 text-base rounded-full transition-all duration-300 flex items-center gap-3",
                    activeEvent > 0
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  )}
                  disabled={activeEvent === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <div className="text-white/60 text-base hidden md:block">
                  Click on any step below to navigate
                </div>
                
                <button
                  onClick={goToNextEvent}
                  className={cn(
                    "px-8 py-3 text-base rounded-full transition-all duration-300 flex items-center gap-3",
                    activeEvent < timelineEvents.length - 1
                      ? "bg-festival-red text-white hover:bg-festival-red/90"
                      : "bg-festival-red/30 text-white/50 cursor-not-allowed"
                  )}
                  disabled={activeEvent === timelineEvents.length - 1}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Timeline steps bar - Improved Modern Style */}
          <div className="w-full max-w-5xl mx-auto relative mb-24">
            {/* Progress bar background */}
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-white/10 -translate-y-1/2"></div>
            
            {/* Active progress bar */}
            <div 
              className="absolute top-1/2 left-0 h-1.5 bg-festival-red -translate-y-1/2 transition-all duration-300 ease-in-out"
              style={{ 
                width: `${(activeEvent / (timelineEvents.length - 1)) * 100}%`,
              }}
            ></div>
            
            {/* Step labels for small screens - only shows current and adjacent steps */}
            <div className="md:hidden flex justify-center mb-4 text-sm space-x-4">
              {activeEvent > 0 && (
                <span className="text-white/60">{timelineEvents[activeEvent - 1].date.split(", ")[0]}</span>
              )}
              <span className="text-festival-red font-medium">{timelineEvents[activeEvent].date.split(", ")[0]}</span>
              {activeEvent < timelineEvents.length - 1 && (
                <span className="text-white/60">{timelineEvents[activeEvent + 1].date.split(", ")[0]}</span>
              )}
            </div>
            
            {/* Steps container */}
            <div className="relative h-24 overflow-hidden">
              {/* Inner steps wrapper */}
              <div className="absolute w-full h-full flex items-center justify-between px-3">
                {timelineEvents.map((event, index) => {
                  const status = getEventStatus(event.dateObj);
                  const isActive = activeEvent === index;
                  const isPast = activeEvent > index;
                  
                  return (
                    <div 
                      key={`step-${index}`}
                      className="relative flex flex-col items-center transition-all duration-300"
                      style={{ 
                        flex: 1,
                        opacity: isActive ? 1 : (Math.abs(activeEvent - index) <= 2 ? 0.8 : 0.4)
                      }}
                    >
                      {/* Date label - hidden on small screens */}
                      <div className={cn(
                        "hidden md:block text-sm whitespace-nowrap transition-all absolute -top-10",
                        isActive ? "text-festival-red font-medium" : "text-white/60"
                      )}>
                        {event.date.split(", ")[0]}
                      </div>
                      
                      {/* Step indicator dot */}
                      <button 
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 transform",
                          isActive 
                            ? "bg-festival-red border-white scale-150" 
                            : isPast 
                              ? "bg-festival-red/60 border-white/70 hover:scale-125"
                              : "bg-black/50 border-white/40 hover:border-white/60 hover:scale-125"
                        )}
                        onClick={() => setActiveEvent(index)}
                        aria-label={`Go to event: ${event.title}`}
                      >
                        {isPast ? (
                          <CheckCircle className="w-3 h-3 text-white" />
                        ) : isActive ? (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        ) : null}
                      </button>
                      
                      {/* Event number - only shown on larger screens */}
                      <div className={cn(
                        "hidden md:block text-xs mt-3 transition-all",
                        isActive ? "text-white/90" : "text-white/40"
                      )}>
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* List view of all events */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-12 max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-medium text-white mb-16 text-center">Complete Festival Schedule</h3>
            
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute top-0 bottom-0 left-28 md:left-40 w-0.5 bg-white/10 ml-2.5"></div>
              
              {/* Timeline events */}
              {timelineEvents.map((event, index) => {
                const status = getEventStatus(event.dateObj);
                const isActive = activeEvent === index;
                
                return (
                  <motion.div
                    key={`timeline-item-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                    transition={{ duration: 0.5, delay: 0.05 + (index * 0.05) }}
                    className={cn(
                      "flex mb-14 group cursor-pointer",
                      isActive && "pointer-events-none"
                    )}
                    onClick={() => setActiveEvent(index)}
                  >
                    {/* Date column */}
                    <div className="w-28 md:w-40 flex-shrink-0 text-right pr-10 py-1">
                      <span className={cn(
                        "text-base transition-colors duration-300",
                        isActive ? "text-festival-red font-medium" : "text-white/60 group-hover:text-white/80"
                      )}>
                        {event.date.split(", ")[0]}
                      </span>
                    </div>
                    
                    {/* Indicator */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className={cn(
                        "w-7 h-7 rounded-full transition-all duration-300 border-2",
                        isActive 
                          ? "bg-festival-red border-white scale-125" 
                          : status === 'past'
                            ? "bg-white/20 border-white/40 group-hover:bg-white/30"
                            : "bg-black/80 border-white/20 group-hover:border-white/40"
                      )}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="pl-10 py-1">
                      <h4 className={cn(
                        "font-medium transition-colors duration-300 text-xl",
                        isActive ? "text-festival-red" : "text-white group-hover:text-festival-red/80"
                      )}>
                        {event.title}
                      </h4>
                      <p className={cn(
                        "text-lg transition-colors duration-300 mt-3 max-w-xl",
                        isActive ? "text-white/90" : "text-white/60 group-hover:text-white/80"
                      )}>
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom element */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-festival-red/40 to-transparent"></div>
    </section>
  );
};

export default FestivalTimeline;