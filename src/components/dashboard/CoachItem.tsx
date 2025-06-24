import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import apiService from '@/lib/apiService';
import { toast } from 'sonner';

interface CoachItemProps {
  id: string,
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  progress: number;
  isSubscribed?: boolean;
}

const CoachItem: React.FC<CoachItemProps> = ({ id, imageUrl, title, author, description, tags = [], progress, isSubscribed = false }) => {
  const navigate = useNavigate();

  const handleStartCoaching = async (id: string) => {
    try {
      await apiService.post(`/books/${id}/follow`);
      navigate('/');
      // navigate(`/chats/${id}`);
    } catch (error) {
      console.error('Failed to start coaching:', error);
      toast.error('Failed to start coaching. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 shadow-xl rounded-lg bg-white">
      <div className="flex">
        <div className="w-16 mr-4">
          <img className="block w-full rounded-lg shadow-md" src={imageUrl} alt={title} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600">by {author}</p>
          <p className="text-gray-600 mt-2">{description}</p>
          <ul className="flex flex-wrap gap-2 mt-2 text-xs">
            {tags.map((tag, index) => (
              <li key={index} className="px-3 py-1 bg-gray-200 rounded-full">{tag}</li>
            ))}
          </ul>
          {/* Progress bar */}
          {isSubscribed && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <div>Progress</div>
                <div>{progress}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {!isSubscribed && (
          <Button className="w-full button-primary" onClick={() => handleStartCoaching(id)}>
            Start Coaching
          </Button>
        )}
        {isSubscribed && (
          <Button className="w-full button-primary" onClick={() => navigate(`/chats/${id}`)}>
            Continue Chatting
          </Button>
        )}
        <Button className="w-full button" onClick={() => navigate(`/coaches/${id}`)}>
          View Coach Profile
        </Button>
      </div>
    </div>
  );
};

export default CoachItem;
