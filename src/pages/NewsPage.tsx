
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsSection from '@/components/NewsSection';

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-festival-dark text-white">
      <Navbar />
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Latest News</h1>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-12">
            Stay updated with the latest announcements, events, and stories from OnScreen '25.
          </p>
        </div>
      </div>
      <NewsSection />
      <Footer />
    </div>
  );
};

export default NewsPage;
