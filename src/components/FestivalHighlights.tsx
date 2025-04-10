
import React from 'react';
import { Film, Users, Award } from 'lucide-react';

const FestivalHighlights = () => {
  const highlights = [
    {
      title: 'Film Submissions',
      description: 'Open to filmmakers worldwide. Submit your short film and showcase your talent on an international platform.',
      icon: <Film className="h-10 w-10 text-festival-red" />
    },
    {
      title: 'Workshops & Masterclasses',
      description: 'Learn from industry experts through our unique workshops and masterclasses focused on various aspects of filmmaking.',
      icon: <Award className="h-10 w-10 text-festival-gold" />
    },
    {
      title: 'Networking Events',
      description: 'Connect with fellow filmmakers, industry professionals, and film enthusiasts from around the globe.',
      icon: <Users className="h-10 w-10 text-white" />
    }
  ];

  return (
    <section className="bg-festival-darker section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Festival Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="bg-festival-card p-6 rounded-lg border border-white/10 hover-scale"
            >
              <div className="mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{highlight.title}</h3>
              <p className="text-white/70">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalHighlights;
