import Layout from '@/components/Layout';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Tracker = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Atomic Habits</h1>
      </div>
      {/* Cover */}
      <div className="rounded-lg shadow-md py-8 px-5 mb-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
        <div className="flex justify-between mb-4">
          <div className="w-1/3 flex flex-col justify-center items-center text-center text-white">
            <span className="font-bold text-2xl">4</span>
            <span>Day Streak</span>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center text-center text-white">
            <span className="font-bold text-2xl">25%</span>
            <span>Completed</span>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center text-center text-white">
            <span className="font-bold text-2xl">2/8</span>
            <span>Tasks</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-black h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>
      </div>
      {/* List of Tasks */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <h2 className="flex items-center font-bold mb-2">
          <CircleCheckBig className="w-7 h-7 mr-2 text-blue-500" />
          <span className="flex-1">Identify Your Habit Triggers</span>
        </h2>
        <p className="text-gray-600">Analyze your daily routine to discover the cues that lead to your current habits</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <h2 className="flex items-center font-bold mb-2">
          <CircleCheckBig className="w-7 h-7 mr-2 text-blue-500" />
          <span className="flex-1">Design Your Environment for Success</span>
        </h2>
        <p className="text-gray-600">Restructure your workspace and living areas to support your new productivity habits</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <h2 className="font-bold mb-2">Apply the 2-Minute Rule</h2>
        <p className="text-gray-600">Start with tiny versions of your habits to build consistency before intensity</p>
        <div className="flex flex-col gap-4 mt-4">
          <Button className="w-full button" onClick={() => navigate('/chats/1')}>
            Ask Coach
          </Button>
          <Button className="w-full button-primary">
            Mark as Complete
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <h2 className="font-bold mb-2">Create Your Habit Tracking System</h2>
        <p className="text-gray-600">Set up a simple but effective method to monitor your progress and stay motivated</p>
        <div className="flex flex-col gap-4 mt-4">
          <Button className="w-full button" onClick={() => navigate('/chats/1')}>
            Ask Coach
          </Button>
          <Button className="w-full button-primary">
            Mark as Complete
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Tracker;
