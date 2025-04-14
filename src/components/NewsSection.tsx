import React, { useRef } from 'react';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
  slug: string;
}

const NewsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: 'Early Bird Submissions Now Open',
      date: 'January 20, 2025',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500',
      excerpt: 'Submit your short film early for reduced entry fees and increased consideration time.',
      slug: 'early-bird-submissions'
    },
    {
      id: 2,
      title: 'New Workshop Series Announced',
      date: 'January 25, 2025',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=500',
      excerpt: 'Join industry professionals for our exclusive masterclass series on filmmaking.',
      slug: 'workshop-series-announced'
    },
    {
      id: 3,
      title: 'International Jury Panel Revealed',
      date: 'January 30, 2025',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=500',
      excerpt: 'Distinguished filmmakers and critics from around the world join this year\'s jury.',
      slug: 'jury-panel-revealed'
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
      className="bg-black py-24 px-6 relative overflow-hidden"
    >
      {/* Subtle film texture background */}
      <div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-festival-red uppercase tracking-widest text-sm font-light inline-block mb-3">Festival Updates</span>
          <h2 className="text-white text-4xl md:text-5xl font-display font-medium tracking-tight">
            Latest News
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {newsArticles.map((article) => (
            <motion.div 
              key={article.id} 
              variants={itemVariants}
              className="group relative"
            >
              <Link to={`/news/${article.slug}`} className="block h-full">
                <div className="bg-[#121212] border border-white/10 overflow-hidden h-full flex flex-col transform-gpu transition-transform duration-700 hover:translate-y-[-8px]">
                  {/* Image container with hover effect */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${article.image})` }}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    
                    {/* Date badge */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-sm z-10 flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-2 text-festival-red" />
                      <span className="text-white/90 text-xs">{article.date}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Article title */}
                    <h3 className="text-white text-xl font-medium mb-3 group-hover:text-festival-red transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    {/* Article excerpt */}
                    {article.excerpt && (
                      <p className="text-white/70 text-sm mb-6 font-light leading-relaxed flex-grow">
                        {article.excerpt}
                      </p>
                    )}
                    
                    {/* Read more link */}
                    <div className="mt-auto">
                      <div className="flex items-center text-festival-red group-hover:text-white transition-colors duration-300 text-sm font-medium">
                        <span>Read More</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatType: "reverse", 
                            ease: "easeInOut" 
                          }}
                        >
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-festival-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all news button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link 
            to="/news" 
            className="inline-flex items-center justify-center bg-transparent border border-white/20 text-white hover:border-festival-red hover:text-festival-red transition-all duration-300 px-8 py-4 uppercase tracking-wide text-sm group"
          >
            <span>View All News</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;