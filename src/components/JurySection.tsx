
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface JuryMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const JurySection = () => {
  const juryMembers: JuryMember[] = [
    {
      id: 1,
      name: 'Robert Carter',
      role: 'Film Director',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Emma Thompson',
      role: 'Producer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Cinematographer',
      image: 'https://randomuser.me/api/portraits/men/68.jpg'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      role: 'Film Critic',
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  ];

  return (
    <section className="bg-festival-dark section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Jury & Mentors</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {juryMembers.map((member) => (
            <div key={member.id} className="text-center hover-scale">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-4 border-2 border-festival-red">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-white font-bold text-lg">{member.name}</h3>
              <p className="text-white/70">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JurySection;
