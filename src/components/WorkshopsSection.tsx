
import React from 'react';
import { Button } from '@/components/ui/button';

interface Workshop {
  id: number;
  title: string;
  instructor: string;
  date: string;
  image: string;
}

const WorkshopsSection = () => {
  const workshops: Workshop[] = [
    {
      id: 1,
      title: 'Cinematic Storytelling',
      instructor: 'Sarah Jackson',
      date: 'July 16, 2025',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 2,
      title: 'Visual Effects Mastery',
      instructor: 'Michael Chen',
      date: 'July 17, 2025',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 3,
      title: 'Sound Design Workshop',
      instructor: 'David Kumar',
      date: 'July 18, 2025',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 4,
      title: 'Documentary Filmmaking',
      instructor: 'Lisa Wang',
      date: 'July 19, 2025',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=500'
    }
  ];

  return (
    <section className="bg-festival-darker section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Featured Workshops</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((workshop) => (
            <div 
              key={workshop.id} 
              className="bg-festival-card rounded-lg overflow-hidden border border-white/10 hover-scale"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={workshop.image} 
                  alt={workshop.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-bold mb-2">{workshop.title}</h3>
                <p className="text-white/70 mb-1">
                  <span className="font-medium">Instructor:</span> {workshop.instructor}
                </p>
                <p className="text-white/70 mb-4">
                  <span className="font-medium">Date:</span> {workshop.date}
                </p>
                <Button 
                  className="w-full bg-festival-red hover:bg-red-700 text-white"
                >
                  Register Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopsSection;
