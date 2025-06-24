import React from 'react';
import CoachItem from '@/components/dashboard/CoachItem';

const CurrentCoaches: React.FC = () => {
  const coaches = [
    {
      _id: 'aaaaaaaa-aaaa-aaaa-aaaaaaaaaaaa',
      imageUrl: '/assets/img/book_001.png',
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Build better habits, break bad ones, and make small changes that lead to remarkable results.',
      tags: ['Productivity', 'Self-Improvement', 'Mindfulness'],
      progress: 75,
    },
    {
      _id: 'aaaaaaaa-aaaa-aaaa-aaaaaaaaaaaa',
      imageUrl: '/assets/img/book_001.png',
      title: 'Deep Work',
      author: 'Cal Newport',
      description: 'Rules for focused success in a distracted world.',
      tags: ['Focus', 'Productivity', 'Work'],
      progress: 50,
    },
    {
      _id: 'aaaaaaaa-aaaa-aaaa-aaaaaaaaaaaa',
      imageUrl: '/assets/img/book_001.png',
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      description: 'Why we do what we do in life and business.',
      tags: ['Habits', 'Behavior', 'Psychology'],
      progress: 30,
    },
    {
      _id: 'aaaaaaaa-aaaa-aaaa-aaaaaaaaaaaa',
      imageUrl: '/assets/img/book_001.png',
      title: 'Grit',
      author: 'Angela Duckworth',
      description: 'The power of passion and perseverance.',
      tags: ['Perseverance', 'Success', 'Motivation'],
      progress: 90,
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Current Coaches</h2>
      <div className="flex flex-col gap-5">
        {coaches.map((coach, index) => (
          <CoachItem
            key={index}
            id={coach._id}
            imageUrl={coach.imageUrl}
            title={coach.title}
            author={coach.author}
            description={coach.description}
            tags={coach.tags}
            progress={coach.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrentCoaches;
