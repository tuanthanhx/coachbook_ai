import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackerItem from '@/components/tracker/TrackerItem';
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
  totalTasksCount: number;
  completedTasksCount: number;
};

const Tracker = () => {
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'done'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const response = await apiService.get<Coach[]>('/books/following');
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

      setFilteredCoaches(filtered);
    };

    filterCoaches();
  }, [coaches]);

  const handleFilter = (filterType: 'all' | 'active' | 'done') => {
    setActiveFilter(filterType);

    let filtered = coaches;

    if (filterType === 'active') {
      filtered = coaches.filter(coach => coach.progress < 100);
    } else if (filterType === 'done') {
      filtered = coaches.filter(coach => coach.progress === 100);
    }

    setFilteredCoaches(filtered);
  };

  const activeCoachesCount = coaches.filter(coach => coach.progress < 100).length;
  const completedCoachesCount = coaches.filter(coach => coach.progress === 100).length;

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Action Tracker</h1>
      </div>
      {/* Cover */}
      <div className="rounded-lg shadow-md py-8 px-5 mb-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
        <div className="flex flex-col items-center">
          <Target className="w-11 h-11 mb-2 text-white" />
          <h2 className="mb-1 text-white text-3xl font-bold">{completedCoachesCount}/{coaches.length}</h2>
          <p className="text-white">{completedCoachesCount === 1 ? 'Coach Completed' : 'Coaches Completed'}</p>
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-4 mb-5">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          size="lg"
          className="rounded-full font-bold"
          onClick={() => handleFilter('all')}
        >
          All ({coaches.length})
        </Button>
        <Button
          variant={activeFilter === 'active' ? 'default' : 'outline'}
          size="lg"
          className="rounded-full font-bold"
          onClick={() => handleFilter('active')}
        >
          Active ({activeCoachesCount})
        </Button>
        <Button
          variant={activeFilter === 'done' ? 'default' : 'outline'}
          size="lg"
          className="rounded-full font-bold"
          onClick={() => handleFilter('done')}
        >
          Done ({completedCoachesCount})
        </Button>
      </div>
      {/* Coaches List */}
      {loading ? (
        <div className="flex flex-col gap-5">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col gap-5 p-5 shadow-xl rounded-lg bg-white">
              <div className="flex">
                <Skeleton className="w-16 h-24 mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-[2em] mb-2" />
                  <Skeleton className="h-[1em] mb-4" />
                  <Skeleton className="h-[1em] mb-1" />
                  <Skeleton className="h-[1em] mb-1" />
                  <Skeleton className="h-[1em] mb-1" />
                  <Skeleton className="h-[1em]" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[3em] mb-0.5" />
                <Skeleton className="h-[3em]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        filteredCoaches.length === 0 ? (
          <p className="p-5 bg-white rounded-lg shadow-md text-gray-600">No coaches to display</p>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredCoaches.map((coach, index) => (
              <TrackerItem
                key={index}
                id={coach._id}
                image={coach.imageUrl}
                title={coach.title}
                author={coach.author}
                description={coach.description}
                tags={coach.tags}
                progress={coach.progress}
                totalTasksCount={coach.totalTasksCount}
                completedTasksCount={coach.completedTasksCount}
              />
            ))}
          </div>
        )
      )}
    </Layout>
  );
};

export default Tracker;
