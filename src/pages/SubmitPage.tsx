
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubmitFilmModal from '@/components/SubmitFilmModal';
import { Button } from '@/components/ui/button';

const SubmitPage = () => {
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
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Submit Your Film</h1>
          
          <div className="max-w-3xl mx-auto bg-festival-card p-8 rounded-lg border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Submission Guidelines</h2>
            
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-festival-red">Eligibility</h3>
                <p className="text-white/80">Short films completed after January 1, 2024, with a runtime of 30 minutes or less are eligible for submission.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-festival-red">Categories</h3>
                <p className="text-white/80">Fiction, Documentary, Animation, Experimental, Student Films</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-festival-red">Deadlines & Fees</h3>
                <ul className="list-disc pl-5 text-white/80">
                  <li>Early Bird (March 1, 2025): $20</li>
                  <li>Regular (May 15, 2025): $30</li>
                  <li>Late (June 1, 2025): $40</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-festival-red">Technical Requirements</h3>
                <p className="text-white/80">Films must be submitted in MP4, MOV, or AVI format with English subtitles if not in English.</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={openSubmitModal}
                size="lg" 
                className="bg-festival-red hover:bg-red-700 text-white font-medium px-8 py-6"
              >
                Submit Your Film Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <SubmitFilmModal isOpen={isSubmitModalOpen} onClose={closeSubmitModal} />
    </div>
  );
};

export default SubmitPage;
