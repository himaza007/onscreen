
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface HeroSectionProps {
  onSubmitClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSubmitClick }) => {
  const backgroundUrl = 'url(https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80)';
  
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center py-32"
      style={{ 
        backgroundImage: backgroundUrl,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-festival-darker via-festival-darker/70 to-transparent z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 cinematic-text-shadow animate-fade-in">
            OnScreen <span className="text-festival-red">'25</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 cinematic-text-shadow animate-fade-in">
            Sri Lanka's Premier Short Film Festival
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 cinematic-text-shadow animate-fade-in">
            July 15-21, 2025 - Colombo
          </p>
          <Button 
            onClick={onSubmitClick}
            size="lg" 
            className="bg-festival-red hover:bg-red-700 text-white font-medium px-8 py-6 rounded-md animate-fade-in"
          >
            Submit Your Film
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
