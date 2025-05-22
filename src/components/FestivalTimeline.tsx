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
    description: '📍 Virtual (Google Meet)\n🕖 7:00 PM – 8:30 PM\nJoin us for an online kick-off: we’ll walk you through the festival journey, introduce all workshops & speakers, and answer your questions live.', 
    icon: <Video className="w-5 h-5" />,
    dateObj: new Date('2025-05-06')
  },
  { 
    date: 'May 08, 2025', 
    title: 'The Art of Cinematography & Lighting', 
    description: '📍 IIT Spencer Auditorium\n🕙 10:00 AM – 2:00 PM\nHands-on workshop on camera techniques, lighting setups, mood creation & framing taught by industry pros.', 
    icon: <Camera className="w-5 h-5" />,
    dateObj: new Date('2025-05-08')
  },
  { 
    date: 'May 10, 2025', 
    title: 'Festival Awareness Session', 
    description: '📍 IIT Spencer Auditorium\n🕑 1:00 PM – 3:00 PM\nEverything you need to know about submission formats, judging criteria, festival rules & best practices to maximise your impact.', 
    icon: <Info className="w-5 h-5" />,
    dateObj: new Date('2025-05-10')
  },
  { 
    date: 'May 15, 2025', 
    title: 'Directing & Screenwriting Masterclass', 
    description: '📍 GP Square Building, 5th Floor\n🕠 4:30 PM – 7:30 PM\nFrom script development to directing actors: learn narrative structure, character arcs & on-set leadership.', 
    icon: <BookOpen className="w-5 h-5" />,
    dateObj: new Date('2025-05-15')
  },
  { 
    date: 'May 19, 2025', 
    title: 'Synopsis Submission Deadline', 
    description: '⏳ 11:59 PM\nSubmit your 150–250 word logline & synopsis via the Google Form for initial feedback and selection to proceed.', 
    icon: <Clock className="w-5 h-5" />,
    dateObj: new Date('2025-05-19')
  },
  { 
    date: 'May 23, 2025', 
    title: 'Film Submissions Open', 
    description: '📍 Online Portal\n🔗 Open at 12:00 AM\nUpload your final short film (≤20 min) and director’s statement. Please follow the naming convention precisely.', 
    icon: <Upload className="w-5 h-5" />,
    dateObj: new Date('2025-05-23')
  },
  { 
    date: 'May 26, 2025', 
    title: 'Film Submissions Close', 
    description: '⏳ 11:59 PM\nLast chance to submit your completed short film and all supporting materials. Late entries will not be accepted.', 
    icon: <Clock className="w-5 h-5" />,
    dateObj: new Date('2025-05-26')
  },
  { 
    date: 'May 28, 2025', 
    title: "OnScreen ’25 Premiere Day", 
    description: '📍 Cinecity Maradana Theatre\n🕒 3:45 PM onwards\nWatch the shortlisted films on the big screen, then cast your vote for the People’s Choice Award.', 
    icon: <Video className="w-5 h-5" />,
    dateObj: new Date('2025-05-28')
  },
  { 
    date: 'May 29, 2025', 
    title: "OnScreen ’25 Festival & Awards", 
    description: '📍 IIT, GP Square, Colombo 04\n🕓 4:30 PM onwards\nJoin us for the finale: award announcements (Best Film, Director, etc.), networking & special guest address by Hon. Sunil Kumara Gamage.', 
    icon: <Video className="w-5 h-5" />,
    dateObj: new Date('2025-05-29')
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
      className="bg-[#0c0c0c] py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden"
    >
      {/* Background and decorative elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('/film-grain.png')] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      
      {/* Animated film reel decorations - hidden on small screens */}
      <motion.div 
        className="absolute -left-32 -top-32 w-64 h-64 border-4 border-white/5 rounded-full opacity-20 pointer-events-none hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute -right-32 -bottom-32 w-80 h-80 border-4 border-white/5 rounded-full opacity-20 pointer-events-none hidden md:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-festival-red uppercase tracking-widest text-xs sm:text-sm font-light inline-block mb-2 sm:mb-4">
            Festival Journey
          </span>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight">
            Timeline of Events
          </h2>
          <motion.div 
            className="w-12 sm:w-16 md:w-20 h-1 bg-festival-red mx-auto mt-4 sm:mt-6 md:mt-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-white/70 max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg px-4">
            Your roadmap through OnScreen '25 — from workshops to screenings.
            Follow our timeline to stay on track with key festival dates.
          </p>
        </motion.div>
        
        {/* Interactive Timeline */}
        <div className="relative">
          {/* Step navigation controls */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-5xl mx-auto flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
            <button
              onClick={goToPrevEvent}
              disabled={activeEvent === 0}
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300",
                activeEvent > 0 
                  ? "bg-white/10 text-white hover:bg-white/20" 
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
              aria-label="Previous event"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <div className="text-white font-medium text-base sm:text-lg">
              <span className="text-festival-red">{activeEvent + 1}</span>
              <span className="mx-2 sm:mx-3 text-white/40">/</span>
              <span>{timelineEvents.length}</span>
            </div>
            
            <button
              onClick={goToNextEvent}
              disabled={activeEvent === timelineEvents.length - 1}
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300",
                activeEvent < timelineEvents.length - 1 
                  ? "bg-white/10 text-white hover:bg-white/20" 
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
              aria-label="Next event"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        
          {/* Event details card with animated transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`event-card-${activeEvent}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16"
            >
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
                {/* Icon */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-festival-red/20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-festival-red"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
                        {timelineEvents[activeEvent].icon}
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow text-center md:text-left">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-3 sm:mb-4 md:mb-5"
                  >
                    {timelineEvents[activeEvent].title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/70 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
                  >
                    {timelineEvents[activeEvent].description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center text-white/50 text-sm sm:text-base justify-center md:justify-start"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3" />
                    {timelineEvents[activeEvent].date}
                  </motion.div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-6 sm:mt-10 md:mt-14 pt-6 sm:pt-8 border-t border-white/10">
                <button
                  onClick={goToPrevEvent}
                  className={cn(
                    "px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-xs sm:text-sm md:text-base rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3",
                    activeEvent > 0
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  )}
                  disabled={activeEvent === 0}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">Previous</span>
                </button>
                
                <div className="text-white/60 text-xs sm:text-sm md:text-base hidden md:block">
                  Click on any step below to navigate
                </div>
                
                <button
                  onClick={goToNextEvent}
                  className={cn(
                    "px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-xs sm:text-sm md:text-base rounded-full transition-all duration-300 flex items-center gap-2 sm:gap-3",
                    activeEvent < timelineEvents.length - 1
                      ? "bg-festival-red text-white hover:bg-festival-red/90"
                      : "bg-festival-red/30 text-white/50 cursor-not-allowed"
                  )}
                  disabled={activeEvent === timelineEvents.length - 1}
                >
                  <span className="hidden xs:inline">Next</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Month progress indicator - only on larger screens */}
          <div className="hidden sm:block w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-5xl mx-auto mb-6">
            <div className="flex justify-between items-center text-xs text-white/60 mb-2">
              <span>May 1</span>
              <span>May 31</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-festival-red"
                initial={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          
          {/* Timeline steps bar - Improved Mobile-Friendly Style */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-5xl mx-auto relative mb-8 sm:mb-16 md:mb-24">
            {/* Progress bar background */}
            <div className="absolute top-1/2 left-0 right-0 h-1 sm:h-1.5 bg-white/10 -translate-y-1/2"></div>
            
            {/* Active progress bar */}
            <div 
              className="absolute top-1/2 left-0 h-1 sm:h-1.5 bg-festival-red -translate-y-1/2 transition-all duration-300 ease-in-out"
              style={{ 
                width: `${(activeEvent / (timelineEvents.length - 1)) * 100}%`,
              }}
            ></div>
            
            {/* Step labels for mobile - only shows 3 labels */}
            <div className="sm:hidden flex justify-between mb-4 text-xs">
              <span className="text-white/60">May 06</span>
              <span className="text-white/60">May 19</span>
              <span className="text-white/60">May 31</span>
            </div>
            
            {/* Step labels for small screens - only shows current and adjacent steps */}
            <div className="hidden sm:flex md:hidden justify-center mb-4 text-xs space-x-4">
              {activeEvent > 0 && (
                <span className="text-white/60">{timelineEvents[activeEvent - 1].date.split(", ")[0]}</span>
              )}
              <span className="text-festival-red font-medium">{timelineEvents[activeEvent].date.split(", ")[0]}</span>
              {activeEvent < timelineEvents.length - 1 && (
                <span className="text-white/60">{timelineEvents[activeEvent + 1].date.split(", ")[0]}</span>
              )}
            </div>
            
            {/* Steps container */}
            <div className="relative h-12 sm:h-16 md:h-20 lg:h-24 overflow-hidden">
              {/* Inner steps wrapper */}
              <div className="absolute w-full h-full flex items-center justify-between px-1 sm:px-2 md:px-3">
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
                        "hidden md:block text-xs lg:text-sm whitespace-nowrap transition-all absolute -top-8 lg:-top-10",
                        isActive ? "text-festival-red font-medium" : "text-white/60"
                      )}>
                        {event.date.split(", ")[0]}
                      </div>
                      
                      {/* Step indicator dot */}
                      <button 
                        className={cn(
                          "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 transform",
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
                          <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                        ) : isActive ? (
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full" />
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
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-8 sm:mb-12 md:mb-16 text-center">Complete Festival Schedule</h3>
            
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute top-0 bottom-0 left-20 sm:left-24 md:left-28 lg:left-40 w-0.5 bg-white/10 ml-2.5"></div>
              
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
                      "flex mb-8 sm:mb-10 md:mb-12 lg:mb-14 group cursor-pointer",
                      isActive && "pointer-events-none"
                    )}
                    onClick={() => setActiveEvent(index)}
                  >
                    {/* Date column */}
                    <div className="w-20 sm:w-24 md:w-28 lg:w-40 flex-shrink-0 text-right pr-4 sm:pr-6 md:pr-8 lg:pr-10 py-1">
                      <span className={cn(
                        "text-xs sm:text-sm md:text-base transition-colors duration-300",
                        isActive ? "text-festival-red font-medium" : "text-white/60 group-hover:text-white/80"
                      )}>
                        {event.date.split(", ")[0]}
                      </span>
                    </div>
                    
                    {/* Indicator */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className={cn(
                        "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full transition-all duration-300 border-2",
                        isActive 
                          ? "bg-festival-red border-white scale-125" 
                          : status === 'past'
                            ? "bg-white/20 border-white/40 group-hover:bg-white/30"
                            : "bg-black/80 border-white/20 group-hover:border-white/40"
                      )}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="pl-4 sm:pl-6 md:pl-8 lg:pl-10 py-1">
                      <h4 className={cn(
                        "font-medium transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl",
                        isActive ? "text-festival-red" : "text-white group-hover:text-festival-red/80"
                      )}>
                        {event.title}
                      </h4>
                      <p className={cn(
                        "text-xs sm:text-sm md:text-base lg:text-lg transition-colors duration-300 mt-1 sm:mt-2 md:mt-3 max-w-xl line-clamp-2 sm:line-clamp-none",
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
      <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-transparent via-festival-red/40 to-transparent"></div>
    </section>
  );
};

export default FestivalTimeline;