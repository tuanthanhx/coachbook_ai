import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import CoachItem from '@/components/dashboard/CoachItem';

const Coaches = () => {
  const navigate = useNavigate();

  const coaches = [
    {
      image: '/assets/img/book_001.png',
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Build better habits, break bad ones, and make small changes that lead to remarkable results.',
      tags: ['Productivity', 'Self-Improvement', 'Mindfulness'],
      progress: 75,
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
      progress: 30,
    },
    {
      image: '/assets/img/book_001.png',
      title: 'Grit',
      author: 'Angela Duckworth',
      description: 'The power of passion and perseverance.',
      tags: ['Perseverance', 'Success', 'Motivation'],
      progress: 90,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Browse Coaches</h1>
      </div>
      {/* Search and Filter Bar */}
      <div className="p-4 bg-white rounded-lg shadow-md mb-4">
        <input
          type="text"
          placeholder="Search coaches..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2 flex justify-between gap-4">
          <select className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="fitness">Fitness</option>
            <option value="nutrition">Nutrition</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="career">Career</option>
            <option value="life">Life Coaching</option>
          </select>
          <select className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sort by</option>
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Coaches List */}
      <div className="flex flex-col gap-5">
        {coaches.map((coach, index) => (
          <CoachItem
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

export default Coaches;
