
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
}

const NewsSection = () => {
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: 'Early Bird Submissions Now Open',
      date: 'January 20, 2025',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500',
      slug: 'early-bird-submissions'
    },
    {
      id: 2,
      title: 'New Workshop Series Announced',
      date: 'January 25, 2025',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=500',
      slug: 'workshop-series-announced'
    },
    {
      id: 3,
      title: 'International Jury Panel Revealed',
      date: 'January 30, 2025',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=500',
      slug: 'jury-panel-revealed'
    }
  ];

  return (
    <section className="bg-festival-darker section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Latest News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <div 
              key={article.id} 
              className="bg-festival-card rounded-lg overflow-hidden border border-white/10 hover-scale"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 text-white/60">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{article.date}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{article.title}</h3>
                <Link 
                  to={`/news/${article.slug}`}
                  className="text-festival-red hover:text-red-400 text-sm font-medium inline-flex items-center"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
