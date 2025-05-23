import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Video, Users, Award, Lightbulb, BookOpen, Info, ArrowRight, AlertCircle } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface Workshop {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time?: string;
  location?: string;
  image: string;
  description?: string;
  type: 'workshop' | 'webinar' | 'awareness' | 'masterclass' | 'panel';
  color?: string;
  registrationLink?: string;
}

const WorkshopsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  
  const workshops: Workshop[] = [
    {
      id: 1,
      title: 'The Art of Cinematography & Lighting',
      instructor: 'M.D Mahindapala & Vishwa Balasooriya',
      date: 'May 09th',
      time: '5:30 PM - 8:30 PM',
      location: '5th Floor, IIT Building GP Square, Bambalapitiya',
      image: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Master professional lighting techniques and camera work to tell compelling visual stories. Hands-on experience with industry-standard equipment.',
      type: 'workshop',
      color: 'from-festival-red to-orange-500'
    },
    {
      id: 2,
      title: 'Directing & Screenwriting Masterclass',
      instructor: 'Tharindu Lokuarachchi & Ilango Ram',
      date: 'May 15th',
      time: '4:30 PM - 8:30 PM',
      location: '5th Floor, IIT Building GP Square, Bambalapitiya',
      image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Learn the fundamentals of compelling storytelling, character development, and effective directing techniques from industry professionals.',
      type: 'workshop',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 3,
      title: 'Introduction to Production Design',
      instructor: 'To Be Announced',
      date: 'May 17th',
      time: '4:30 PM - 8:30 PM',
      location: '5th Floor, IIT Building GP Square, Bambalapitiya',
      image: 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Discover the latest techniques in digital visual effects, compositing, and animation. Create movie magic with industry-standard software tools.',
      type: 'workshop',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 4,
      title: 'Introductory Webinar',
      instructor: 'Lakshman Mendis, Wasantha Dugganarala, Abhishek Palraj',
      date: 'May 06th',
      time: '7:00 PM Onwards',
      location: 'Google Meet',
      image: 'https://images.pexels.com/photos/6953935/pexels-photo-6953935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Join leading filmmakers in this interactive webinar exploring emerging trends, technologies, and career opportunities in modern digital filmmaking.',
      type: 'webinar',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 5,
      title: 'Festival Awareness & Submission Briefing',
      instructor: 'Onscreen Committee',
      date: 'May 23rd',
      time: '6:00 PM - 7:00 PM',
      location: 'Google Meet',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: "Learn how to maximize your film's impact and reach through strategic festival submissions. Explore ethical considerations and social responsibility in filmmaking.",
      type: 'awareness',
      color: 'from-amber-500 to-yellow-600'
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

  // Function to get the appropriate icon based on workshop type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'webinar':
        return <Video className="w-4 h-4 mr-2 text-emerald-400" />;
      case 'awareness':
        return <Lightbulb className="w-4 h-4 mr-2 text-amber-400" />;
      case 'masterclass':
        return <BookOpen className="w-4 h-4 mr-2 text-indigo-400" />;
      case 'panel':
        return <Users className="w-4 h-4 mr-2 text-purple-400" />;
      default:
        return <Award className="w-4 h-4 mr-2 text-festival-red" />;
    }
  };

  // Function to format workshop type label
  const formatTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Function to toggle workshop details
  const toggleWorkshopDetails = (id: number) => {
    setSelectedWorkshop(selectedWorkshop === id ? null : id);
  };

  // Function to handle registration click for workshops without a direct link
  const handleRegistrationClick = () => {
    setShowRegistrationDialog(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0a0a0a] py-24 px-6 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-festival-red/5 filter blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-purple-500/5 filter blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-3">Expand Your Skills</span>
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight">
            Featured Learning Experiences
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-festival-red mx-auto mt-6 mb-8"
          />
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Join our expert-led sessions designed to equip you with skills and knowledge
            that will elevate your filmmaking journey.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 overflow-hidden h-full flex flex-col rounded-sm">
                <div className="relative h-64 overflow-hidden">
                  {/* Background image with parallax effect */}
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${workshop.image})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Workshop type badge */}
                  <div className={`absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-xs px-3 py-1 rounded-full border border-white/10 flex items-center z-10`}>
                    {getTypeIcon(workshop.type)}
                    <span className="text-white/90">{formatTypeLabel(workshop.type)}</span>
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 opacity-70"></div>
                  
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
                
                <div className="p-6 flex flex-col flex-grow">
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
                  
                  {/* Toggle details button */}
                  <button 
                    onClick={() => toggleWorkshopDetails(workshop.id)}
                    className="flex items-center gap-2 text-festival-red hover:text-white transition-colors mb-4 text-sm"
                  >
                    <Info className="w-4 h-4" />
                    <span>{selectedWorkshop === workshop.id ? 'Hide details' : 'Show details'}</span>
                  </button>
                  
                  {/* Workshop description */}
                  <AnimatePresence>
                    {selectedWorkshop === workshop.id && workshop.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/70 mb-6 text-sm font-light leading-relaxed">
                          {workshop.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Registration interest button */}
                  <div className="mt-auto pt-4">
                    {workshop.registrationLink ? (
                      <a
                        href={workshop.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full border border-white/20 text-white hover:bg-festival-red hover:border-festival-red hover:text-white transition-all duration-300 group flex items-center justify-center gap-2 px-4 py-2 rounded-sm text-sm"
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <button
                        onClick={handleRegistrationClick}
                        className="w-full border border-white/20 text-white hover:bg-festival-red hover:border-festival-red hover:text-white transition-all duration-300 group flex items-center justify-center gap-2 px-4 py-2 rounded-sm text-sm"
                      >
                        <span>Register Interest</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Registration Dialog */}
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-festival-red" />
              Registration Information
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Stay Tuned till our next workshop Series
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-white/80 mb-4">
              We're done for the year - stay tuned for updates!
            </p>
            <div className="bg-festival-red/10 border border-festival-red/20 p-4 rounded-sm">
              <p className="text-sm text-white/90 flex items-start gap-2">
                <Info className="w-4 h-4 text-festival-red flex-shrink-0 mt-0.5" />
                <span>Follow us on social media for announcements when registrations open.</span>
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setShowRegistrationDialog(false)}
              className="bg-festival-red hover:bg-festival-red/90 text-white border-none w-full"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-festival-red to-transparent"></div>
    </section>
  );
};

export default WorkshopsSection;