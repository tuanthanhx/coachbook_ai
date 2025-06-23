import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, History, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const TodayInsights = () => {
  const navigate = useNavigate();

  const complete = () => {
    console.log('Insight marked as complete');
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Today's Insights</h1>
        <History className="bg-white rounded-full w-10 h-10 p-2 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer" />
      </div>
      {/* Insight Viewer */}
      <div className="rounded-lg shadow-md p-5 mb-5 bg-white">
        <h2 className="text-xl font-bold">Atomic Habits</h2>
        <p className="mb-4 text-gray-600">James Clear • Atomic Habits</p>
        <p>
          The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become. Every action you take is a vote for the type of person you wish to become. When you write, you are a writer. When you study, you are a student. When you exercise, you are an athlete.
        </p>
        <div className="bg-blue-100 p-5 rounded-lg mt-4">
          <h3 className="mb-2 font-bold">Reflect on this insight</h3>
          <p className="mb-4">Think about the identity you want to build today. What's one small action you can take that aligns with who you want to become?</p>
          <Textarea className="min-h-24 bg-white" placeholder="Write your thoughts here..." />
        </div>
      </div>
      {/* Style */}
      <div className="rounded-lg shadow-md p-5 mb-5 bg-white">
        <h2 className="font-bold text-lg mb-2">How was this insight?</h2>
        {/* Show 2 buttons: Helpful / Not helpful with thumb up / down icon */}
        <div className="flex justify-between gap-3">
          <Button variant="outline" className="flex-1 h-10 font-bold">
            <span className="flex items-center justify-center gap-2">
              <ThumbsUp />
              Helpful
            </span>
          </Button>
          <Button variant="outline" className="flex-1 h-10 font-bold">
            <span className="flex items-center justify-center gap-2">
              <ThumbsDown />
              Not Helpful
            </span>
          </Button>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <Button className="w-full button-primary" onClick={() => complete()}>
          Mark as Complete
        </Button>
      </div>
    </Layout>
  );
};

export default TodayInsights;
