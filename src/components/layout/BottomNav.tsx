import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House, Lightbulb, MessageCircle, Target, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[10000]">
      <ul className="max-w-[430px] mx-auto flex justify-around bg-[#f4f5fc] shadow-lg rounded-t-xl text-white p-4">
        <li>
          <Link to="/" className={`flex flex-col justify-center items-center text-sm font-bold ${path === '/' ? 'text-blue-500' : 'text-gray-700'}`}>
            <House className="mb-1" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/chats" className={`flex flex-col justify-center items-center text-sm font-bold ${path.startsWith('/chats') ? 'text-blue-500' : 'text-gray-700'}`}>
            <MessageCircle className="mb-1" />
            Chats
          </Link>
        </li>
        <li>
          <Link to="/insights" className={`flex flex-col justify-center items-center text-sm font-bold ${path.startsWith('/insights') ? 'text-blue-500' : 'text-gray-700'}`}>
            <Lightbulb className="mb-1" />
            Insights
          </Link>
        </li>
        <li>
          <Link to="/tracker" className={`flex flex-col justify-center items-center text-sm font-bold ${path.startsWith('/tracker') ? 'text-blue-500' : 'text-gray-700'}`}>
            <Target className="mb-1" />
            Tracker
          </Link>
        </li>
        <li>
          <Link to="/settings" className={`flex flex-col justify-center items-center text-sm font-bold ${path.startsWith('/settings') ? 'text-blue-500' : 'text-gray-700'}`}>
            <User className="mb-1" />
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
