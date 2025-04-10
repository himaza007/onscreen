
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorkshopsSection from '@/components/WorkshopsSection';

const WorkshopsPage = () => {
  return (
    <div className="min-h-screen bg-festival-dark text-white">
      <Navbar />
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Workshops & Masterclasses</h1>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-12">
            Expand your filmmaking knowledge and skills with our curated selection of workshops and masterclasses led by industry professionals.
          </p>
        </div>
      </div>
      <WorkshopsSection />
      <Footer />
    </div>
  );
};

export default WorkshopsPage;
