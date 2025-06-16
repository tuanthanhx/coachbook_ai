import Layout from '@/components/Layout';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackerItem from '@/components/tracker/TrackerItem';

const Tracker = () => {
  const navigate = useNavigate();

  const coaches = [
    {
      image: '/assets/img/book_001.png',
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Build better habits, break bad ones, and make small changes that lead to remarkable results.',
      tags: ['Productivity', 'Self-Improvement', 'Mindfulness'],
      progress: 50,
    },
    {
      image: '/assets/img/book_001.png',
      title: 'Deep Work',
      author: 'Cal Newport',
      description: 'Rules for focused success in a distracted world.',
      tags: ['Focus', 'Productivity', 'Work'],
      progress: 50,
    },
    {
      image: '/assets/img/book_001.png',
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      description: 'Why we do what we do in life and business.',
      tags: ['Habits', 'Behavior', 'Psychology'],
      progress: 50,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Action Tracker</h1>
      </div>
      {/* Cover */}
      <div className="rounded-lg shadow-md py-8 px-5 mb-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
        <div className="flex flex-col items-center">
          <Target className="w-11 h-11 mb-2 text-white" />
          <h2 className="mb-1 text-white text-3xl font-bold">2/8</h2>
          <p className="text-white">Tasks Completed</p>
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-4 mb-5">
        <Button variant="default" size="lg" className="rounded-full font-bold">All (3)</Button>
        <Button variant="outline" size="lg" className="rounded-full font-bold">Active (2)</Button>
        <Button variant="outline" size="lg" className="rounded-full font-bold">Done (1)</Button>
      </div>
      {/* Coaches List */}
      <div className="flex flex-col gap-5">
        {coaches.map((coach, index) => (
          <TrackerItem
            key={index}
            image={coach.image}
            title={coach.title}
            author={coach.author}
            description={coach.description}
            tags={coach.tags}
            progress={coach.progress}
          />
        ))}
      </div>

    </Layout>
  );
};

export default Tracker;
