import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import CoachItem from '@/components/dashboard/CoachItem';
import { useState, useEffect } from 'react';
import apiService from '@/lib/apiService';

type Coach = {
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  progress: number;
};

const Coaches = () => {
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await apiService.get<Coach[]>('/books');
        setCoaches(response.data);
        setFilteredCoaches(response.data);
      } catch (error) {
        console.error('Error fetching coaches:', error);
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
            <option value="Fitness">Fitness</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="Career">Career</option>
            <option value="Life Coaching">Life Coaching</option>
          </select>
          <select className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sort by</option>
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>

      {/* Coaches List */}
      <div className="flex flex-col gap-5">
        {filteredCoaches.map((coach, index) => (
          <CoachItem
            key={index}
            imageUrl={coach.imageUrl}
            title={coach.title}
            author={coach.author}
            description={coach.description}
            tags={coach.tags}
            progress={coach.progress || 0}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Coaches;
