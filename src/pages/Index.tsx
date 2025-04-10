
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FestivalHighlights from '@/components/FestivalHighlights';
import FestivalTimeline from '@/components/FestivalTimeline';
import WorkshopsSection from '@/components/WorkshopsSection';
import JurySection from '@/components/JurySection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import SubmitFilmModal from '@/components/SubmitFilmModal';

const Index = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-festival-dark text-white">
      <Navbar />
      <HeroSection onSubmitClick={openSubmitModal} />
      <FestivalHighlights />
      <FestivalTimeline />
      <WorkshopsSection />
      <JurySection />
      <NewsSection />
      <Footer />
      <SubmitFilmModal isOpen={isSubmitModalOpen} onClose={closeSubmitModal} />
    </div>
  );
};

export default Index;
