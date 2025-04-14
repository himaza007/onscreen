import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

const TimelineEvent = ({ date, title, description, index, isInView }: {
  date: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div 
      className="relative flex-1 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.7, 
        delay: 0.2 + (index * 0.15),
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Connector Line */}
      <div className="absolute top-6 inset-x-0 h-[1px] bg-white/20" />
      
      {/* Date Dot */}
      <div className="relative flex justify-center">
        <motion.div 
          className="w-12 h-12 rounded-full bg-black border border-festival-red flex items-center justify-center z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + (index * 0.15) }}
        >
          <motion.div 
            className="w-3 h-3 rounded-full bg-festival-red"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>
      </div>
      
      {/* Content */}
      <motion.div 
        className="mt-6 text-center px-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 + (index * 0.15) }}
      >
        <p className="text-festival-red font-medium text-sm tracking-wide mb-2">{date}</p>
        <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
        <p className="text-white/70 text-sm font-light leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const FestivalTimeline = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const timelineEvents = [
    {
      date: 'March 1, 2025',
      title: 'Early Bird Submissions',
      description: 'Submit your film at a reduced early bird fee.',
    },
    {
      date: 'May 15, 2025',
      title: 'Regular Deadline',
      description: 'Last day for regular submission fees.',
    },
    {
      date: 'June 1, 2025',
      title: 'Selection Announcement',
      description: 'Official selection announcement.',
    },
    {
      date: 'July 15, 2025',
      title: 'Festival Opening',
      description: 'Grand opening ceremony.',
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0c0c0c] py-28 px-6 relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('/film-grain.png')] mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl">
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
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
          {/* Additional line through entire timeline */}
          <motion.div 
            className="hidden md:block absolute left-0 right-0 top-6 h-[1px] bg-gradient-to-r from-transparent via-festival-red to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative film strip */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/50 flex overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-full w-8 border-r border-white/10"></div>
        ))}
      </div>
    </section>
  );
};

export default FestivalTimeline;