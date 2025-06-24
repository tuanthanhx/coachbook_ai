import React from 'react';
import { BookOpen, MessageCircle } from 'lucide-react';

const Statistics: React.FC<{ statistics: { chatsCount: number; coachesCount: number } }> = ({ statistics }) => {
  return (
    <div className="flex gap-4 my-5">
      <div className="flex flex-col items-center w-1/2 bg-white p-4 rounded-lg shadow-md">
        <MessageCircle size={32} className="mb-2 text-blue-500" />
        <div className="text-3xl font-bold text-gray-700">{statistics?.chatsCount ?? 0}</div>
        <div>Conversations</div>
      </div>
      <div className="flex flex-col items-center w-1/2 bg-white p-4 rounded-lg shadow-md">
        <BookOpen size={32} className="mb-2 text-green-500" />
        <div className="text-3xl font-bold text-gray-700">{statistics?.coachesCount ?? 0}</div>
        <div>Coaches</div>
      </div>
    </div>
  );
};

export default Statistics;
