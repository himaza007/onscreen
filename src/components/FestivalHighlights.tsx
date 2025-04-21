import React, { useRef } from 'react';
import { Film, Users, Award } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const FestivalHighlights = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const highlights = [
    {
      title: 'Short Film Festival',
      description: 'Open to filmmakers worldwide. Submit your short film and showcase your talent on an international platform.',
      icon: <Film className="h-12 w-12 text-festival-red" />,
      delay: 0.2
    },
    {
      title: 'Hands on Workshop series',
      description: 'Learn from industry experts through our unique workshops and masterclasses focused on various aspects of filmmaking.',
      icon: <Award className="h-12 w-12 text-[#D4AF37]" />,
      delay: 0.4
    },
    {
      title: 'Mentor Sessions',
      description: 'Gain direct insight and guidance from seasoned filmmakers, producers, and creative experts in exclusive mentor-led sessions. Refine your skills, ask questions, and build lasting connections that shape your journey in film.',
      icon: <Users className="h-12 w-12 text-white" />,
      delay: 0.6
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.2
      }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-black py-24 px-6 relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center mb-16"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-3">What We Offer</span>
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight max-w-2xl mx-auto">
            Festival Highlights
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="bg-[rgba(30,30,30,0.5)] backdrop-blur-sm p-8 md:p-10 rounded-none border border-white/10 relative group"
            >
              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon with glowing effect */}
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="mb-6 relative"
              >
                <div className="absolute inset-0 bg-festival-red/20 rounded-full blur-lg filter -z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                {highlight.icon}
              </motion.div>
              
              <h3 className="text-white text-xl font-medium mb-4 tracking-wide">
                {highlight.title}
              </h3>
              
              <p className="text-white/70 font-light leading-relaxed">
                {highlight.description}
              </p>
              
              {/* Accent corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FestivalHighlights;