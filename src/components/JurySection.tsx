import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface JuryMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

const JurySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedMember, setSelectedMember] = useState<JuryMember | null>(null);
  
  const juryMembers: JuryMember[] = [
    {
      id: 1,
      name: 'Robert Carter',
      role: 'Film Director',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Award-winning director with over 15 years of experience in the film industry.'
    },
    {
      id: 2,
      name: 'Emma Thompson',
      role: 'Producer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Accomplished producer known for discovering emerging talent and unique stories.'
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Cinematographer',
      image: 'https://randomuser.me/api/portraits/men/68.jpg',
      bio: 'Renowned cinematographer with a distinctive visual style and creative approach.'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      role: 'Film Critic',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Respected film critic and author with a focus on international cinema.'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
  
  const handleMemberClick = (member: JuryMember) => {
    setSelectedMember(member);
  };
  
  const handleClose = () => {
    setSelectedMember(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-black py-24 px-6 relative overflow-hidden"
    >
      {/* Background texture and film grain effect */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-3">Meet The Experts</span>
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight">
            Jury & Mentors
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12"
        >
          {juryMembers.map((member, index) => (
            <motion.div 
              key={member.id} 
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              <div className="relative mb-5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-festival-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                
                <Avatar className="w-36 h-36 md:w-48 md:h-48 border-2 border-white/10 group-hover:border-festival-red transition-colors duration-500 overflow-hidden">
                  <AvatarImage 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <AvatarFallback className="bg-gray-900 text-white text-2xl">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <motion.div 
                  className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  View Profile
                </motion.div>
              </div>
              
              <h3 className="text-white font-medium text-lg mb-1 group-hover:text-festival-red transition-colors duration-300">
                {member.name}
              </h3>
              
              <p className="text-white/60 text-sm font-light">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Member profile modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div 
              className="bg-[#121212] border border-white/10 p-8 md:p-12 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row gap-8">
                <Avatar className="w-32 h-32 md:w-48 md:h-48 border-2 border-festival-red">
                  <AvatarImage 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-gray-900 text-white text-3xl">
                    {selectedMember.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-white text-2xl font-medium mb-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-festival-red font-medium mb-4">
                    {selectedMember.role}
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {selectedMember.bio || 'Distinguished professional in the film industry with a passion for discovering and nurturing new talent.'}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-white font-medium mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Storytelling', 'Visual Aesthetics', 'Character Development', 'Narrative Structure'].map((skill, i) => (
                        <span key={i} className="bg-white/10 px-3 py-1 text-sm text-white/70">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-festival-red to-transparent"></div>
    </section>
  );
};

export default JurySection;