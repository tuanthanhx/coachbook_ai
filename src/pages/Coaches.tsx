import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import CoachItem from '@/components/dashboard/CoachItem';
import { useState, useEffect } from 'react';
import apiService from '@/lib/apiService';
import { Skeleton } from '@/components/ui/skeleton';

type Coach = {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  progress: number;
  isSubscribed?: boolean;
};

const Coaches = () => {
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const response = await apiService.get<Coach[]>('/books');
        setCoaches(response.data);
        setFilteredCoaches(response.data);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  useEffect(() => {
    const filterCoaches = () => {
      let filtered = coaches;

      if (searchTerm) {
        filtered = filtered.filter((coach) =>
          coach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coach.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedTag) {
        filtered = filtered.filter((coach) => coach.tags.includes(selectedTag));
      }

      setFilteredCoaches(filtered);
    };

    filterCoaches();
  }, [searchTerm, selectedTag, coaches]);

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft
          className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="px-8 w-full text-center text-xl font-bold">Browse Coaches</h1>
      </div>

      {/* Search and Filter Bar */}
      <div className="p-4 bg-white rounded-lg shadow-md mb-4">
        <input
          type="text"
          placeholder="Search coaches..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-2 flex justify-between gap-4">
          <select
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All Tags</option>
            <option value="habits">Habits</option>
            <option value="self-improvement">Self Improvement</option>
            <option value="productivity">Productivity</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="spirituality">Spirituality</option>
            <option value="self-awareness">Self Awareness</option>
            <option value="leadership">Leadership</option>
            <option value="effectiveness">Effectiveness</option>
            <option value="personal growth">Personal Growth</option>
          </select>
          <select className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sort by</option>
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>

      {/* Coaches List */}
      {loading ? (
        <div className="flex flex-col gap-5">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col gap-5 p-5 shadow-xl rounded-lg bg-white">
              <div className="flex">
                <Skeleton className="w-16 h-24 mr-4 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-[1.5em] mb-1" />
                  <Skeleton className="h-[1em] mb-4" />
                  <Skeleton className="h-[1em] mb-1" />
                  <Skeleton className="h-[1em] mb-1" />
                  <Skeleton className="h-[1em] mb-1" />
                  <Skeleton className="h-[1em] mb-4" />
                  <Skeleton className="h-[1.5em]" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[2.6em] mb-0.5" />
                <Skeleton className="h-[2.6em]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredCoaches.map((coach, index) => (
            <CoachItem
              key={index}
              id={coach._id}
              imageUrl={coach.imageUrl}
              title={coach.title}
              author={coach.author}
              description={coach.description}
              tags={coach.tags}
              progress={coach.progress || 0}
              isSubscribed={coach.isSubscribed || false}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Coaches;
