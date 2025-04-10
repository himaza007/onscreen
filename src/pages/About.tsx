
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-festival-dark text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">About OnScreen '25</h1>
          <div className="max-w-3xl mx-auto prose prose-invert">
            <p className="text-lg text-white/80">
              The OnScreen Film Festival is Sri Lanka's premier platform for showcasing exceptional short films from around the world. 
              Established with the vision of providing emerging filmmakers a prestigious platform to exhibit their talent, the festival 
              has grown to become a significant event in the global independent film circuit.
            </p>
            <p className="text-lg text-white/80">
              Our mission is to recognize and celebrate innovative storytelling, technical excellence, and creative vision in short films. 
              We aim to connect filmmakers with audiences, industry professionals, and like-minded creators while promoting the art and 
              craft of filmmaking.
            </p>
            <p className="text-lg text-white/80">
              The 2025 edition will feature an expanded program including competitive sections, special screenings, masterclasses, 
              workshops, and networking events designed to enrich the cultural landscape and foster a thriving film community.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
