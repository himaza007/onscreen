
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JurySection from '@/components/JurySection';

const JuryPage = () => {
  return (
    <div className="min-h-screen bg-festival-dark text-white">
      <Navbar />
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Jury & Mentors</h1>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-12">
            Meet our distinguished panel of film industry professionals who will evaluate submissions and mentor participants during the festival.
          </p>
        </div>
      </div>
      <JurySection />
      <Footer />
    </div>
  );
};

export default JuryPage;
