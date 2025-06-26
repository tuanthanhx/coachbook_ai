import React, { useEffect, useState } from 'react';
import CoachItem from '@/components/dashboard/CoachItem';
import apiService from '@/lib/apiService';
import { Loader } from 'lucide-react';

interface Coach {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  progress: number;
}

const CurrentCoaches: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await apiService.get('/books/following');
        setCoaches(response.data);
      } catch (error) {
        console.error('Failed to fetch coaches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Current Coaches</h2>
      {loading ? (
        <div className="flex justify-center items-center p-5">
          <Loader className="animate-spin h-8 w-8" />
        </div>
      ) : coaches.length === 0 ? (
        <p className="p-5 bg-white rounded-lg shadow-md text-gray-600">
          You are not following any coaches yet.<br />Start exploring and follow some to see them here!
        </p>
      ) : (
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
              isSubscribed={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentCoaches;
