
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FestivalTimeline from '@/components/FestivalTimeline';

const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-festival-dark text-white">
      <Navbar />
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Festival Timeline</h1>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-12">
            Mark your calendars for these important dates in the OnScreen '25 festival journey. From submissions to the grand finale, here's when everything happens.
          </p>
        </div>
      </div>
      <FestivalTimeline />
      <Footer />
    </div>
  );
};

export default TimelinePage;
