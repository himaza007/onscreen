import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Workshop {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time?: string;
  location?: string;
  image: string;
  description?: string;
}

const WorkshopsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const workshops: Workshop[] = [
    {
      id: 1,
      title: 'Cinematic Storytelling',
      instructor: 'Sarah Jackson',
      date: 'July 16, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Main Auditorium',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500',
      description: 'Learn the art of visual storytelling from an award-winning director.'
    },
    {
      id: 2,
      title: 'Visual Effects Mastery',
      instructor: 'Michael Chen',
      date: 'July 17, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Studio B',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=500',
      description: 'Explore the latest techniques in visual effects and post-production.'
    },
    {
      id: 3,
      title: 'Sound Design Workshop',
      instructor: 'David Kumar',
      date: 'July 18, 2025',
      time: '11:00 AM - 3:00 PM',
      location: 'Sound Lab',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=500',
      description: 'Master the art of creating immersive soundscapes for film.'
    },
    {
      id: 4,
      title: 'Documentary Filmmaking',
      instructor: 'Lisa Wang',
      date: 'July 19, 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Workshop Room 2',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=500',
      description: 'Discover techniques for authentic and compelling documentary storytelling.'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0a0a0a] py-24 px-6 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-3">Expand Your Skills</span>
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight">
            Featured Workshops
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {workshops.map((workshop) => (
            <motion.div 
              key={workshop.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden"
            >
              {/* Card with hover effect */}
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 overflow-hidden h-full">
                <div className="relative h-64 overflow-hidden">
                  {/* Background image with parallax effect */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${workshop.image})` }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-black/30 opacity-70"></div>
                  
                  {/* Workshop info positioned at the bottom */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                    <h3 className="text-white text-xl md:text-2xl font-medium mb-2 group-hover:text-festival-red transition-colors duration-300">
                      {workshop.title}
                    </h3>
                    <p className="text-white/80 font-light text-sm">
                      Instructor: <span className="text-white">{workshop.instructor}</span>
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Workshop details */}
                  <div className="flex flex-col space-y-3 mb-4">
                    <div className="flex items-center text-white/70">
                      <Calendar className="w-4 h-4 mr-2 text-festival-red" />
                      <span>{workshop.date}</span>
                    </div>
                    
                    {workshop.time && (
                      <div className="flex items-center text-white/70">
                        <Clock className="w-4 h-4 mr-2 text-festival-red" />
                        <span>{workshop.time}</span>
                      </div>
                    )}
                    
                    {workshop.location && (
                      <div className="flex items-center text-white/70">
                        <MapPin className="w-4 h-4 mr-2 text-festival-red" />
                        <span>{workshop.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Workshop description */}
                  {workshop.description && (
                    <p className="text-white/70 mb-6 text-sm font-light leading-relaxed">
                      {workshop.description}
                    </p>
                  )}
                  
                  {/* Registration button */}
                  <Button 
                    className="w-full bg-transparent border border-festival-red text-white hover:bg-festival-red transition-all duration-300 py-6 rounded-none uppercase tracking-wider text-sm"
                  >
                    Register Now
                  </Button>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Workshops Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button 
            className="bg-transparent border border-white/20 text-white hover:border-festival-red hover:text-festival-red transition-all duration-300 px-8 py-6 rounded-none uppercase tracking-wider text-sm"
          >
            View All Workshops
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-festival-red to-transparent"></div>
    </section>
  );
};

export default WorkshopsSection;