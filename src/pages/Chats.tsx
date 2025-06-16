import Layout from '@/components/Layout';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, EllipsisVertical, Search } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Chats = () => {
  const navigate = useNavigate();

  const chats = [
    {
      image: '/assets/img/book_001.png',
      title: 'Atomic Habits Coach',
      message: 'Hey, how can I help you today?',
      updatedAt: '10:03 PM',
    },
    {
      image: '/assets/img/book_001.png',
      title: 'Deep Work Coach',
      message: 'Let’s focus on your deep work today asdf saff fsdfds d sdfsdf!',
      updatedAt: 'Yesterday',
    },
    {
      image: '/assets/img/book_001.png',
      title: 'The Power of Habit Coach',
      message: 'Ready to build some new habits?',
      updatedAt: 'Yesterday',
    },
    {
      image: '/assets/img/book_001.png',
      title: 'Grit Coach',
      message: 'Let’s talk about perseverance!',
      updatedAt: '05/01/2025',
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full text-center text-xl font-bold">My Chats</h1>
        <EllipsisVertical className="bg-white rounded-full w-10 h-10 p-2.5 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer" />
      </div>
      {/* Searchbar with icon */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search chats..."
            className="w-full h-11 p-4 pl-10 rounded-full bg-white"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-4 mb-8">
        <Button variant="default" size="lg" className="rounded-full font-bold">Recent</Button>
        <Button variant="outline" size="lg" className="rounded-full font-bold">Archived</Button>
      </div>
      {/* Chats List */}
      <div className="flex flex-col gap-8">
        {chats.map((chat, index) => (
          <div key={index} className="flex justify-between items-center gap-4 cursor-pointer" onClick={() => navigate(`/chats/${index + 1}`)}>
            <img src={chat.image} alt={chat.title} className="w-16 h-16 rounded-full" />
            <div className="flex-1">
              <h2 className="mb-1 font-bold">{chat.title}</h2>
              <p className="w-[210px] text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{chat.message}</p>
            </div>
            <div className="w-[80px] text-right text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{chat.updatedAt}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
