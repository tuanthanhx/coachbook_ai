import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, EllipsisVertical, Search } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react';
import apiService from '@/lib/apiService';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton"
import { formatRelativeTime } from '@/lib/utils';

interface Chat {
  id: string;
  image: string;
  title: string;
  message: string;
  latestChatTime?: string;
}

const Chats = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/books/following');
        const formattedChats: Chat[] = response.data.map((book: any) => ({
          id: book._id,
          image: book.imageUrl || '/assets/img/book_001.png',
          title: book.title,
          message: book.latestChatMessage || `Chat with ${book.title}`,
          latestChatTime: formatRelativeTime(book.latestChatTime),
        }));
        setChats(formattedChats);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/')} />
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-4 mb-8">
        <Button variant="default" size="lg" className="rounded-full font-bold">Recent</Button>
        <Button variant="outline" size="lg" className="rounded-full font-bold">Archived</Button>
      </div>
      {/* Skeleton */}
      {loading ? (
        <div className="flex flex-col gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex justify-between items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-[1.5em] mb-1" />
                <Skeleton className="h-[1em]" />
              </div>
              <Skeleton className="w-[50px] h-[1em]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {filteredChats.map((chat, index) => (
            <div key={index} className="flex justify-between items-center gap-4 cursor-pointer" onClick={() => navigate(`/chats/${chat.id}`)}>
              <Avatar className="w-16 h-16">
                <AvatarImage src={chat.image} alt={chat.title} />
                <AvatarFallback>{chat.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="mb-1 font-bold">{chat.title}</h2>
                <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[220px]" style={{ width: 'calc(100vw - 210px)' }}>{chat.message}</p>
              </div>
              <div className="w-[80px] text-right text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{chat.latestChatTime}</div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Chats;
