
import React from 'react';
import { cn } from '@/lib/utils';

const TimelineEvent = ({ date, title, description, isFirst, isLast }: {
  date: string;
  title: string;
  description: string;
  isFirst: boolean;
  isLast: boolean;
}) => {
  return (
    <div className="relative flex-1">
      {/* Connector Line */}
      <div className="absolute top-5 inset-x-0 h-0.5 bg-white/20" />
      
      {/* Date Dot */}
      <div className="relative flex justify-center">
        <div className="w-10 h-10 rounded-full bg-festival-red flex items-center justify-center z-10">
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
      </div>
      
      {/* Content */}
      <div className="mt-4 text-center px-2">
        <p className="text-festival-red font-semibold text-sm">{date}</p>
        <h3 className="text-white font-bold mt-1">{title}</h3>
        <p className="text-white/70 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

const FestivalTimeline = () => {
  const timelineEvents = [
    {
      date: 'March 1, 2025',
      title: 'Early Bird Submissions',
      description: 'Submit your film at a reduced early bird fee.',
    },
    {
      date: 'May 15, 2025',
      title: 'Regular Deadline',
      description: 'Last day for regular submission fees.',
    },
    {
      date: 'June 1, 2025',
      title: 'Selection Announcement',
      description: 'Official selection announcement.',
    },
    {
      date: 'July 15, 2025',
      title: 'Festival Opening',
      description: 'Grand opening ceremony.',
    }
  ];

  return (
    <section className="bg-festival-dark section-padding">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Festival Timeline</h2>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
              isFirst={index === 0}
              isLast={index === timelineEvents.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalTimeline;
