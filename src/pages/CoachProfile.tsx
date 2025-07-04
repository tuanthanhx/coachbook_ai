import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ChevronLeft, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getBookById } from '@/lib/apiService';
import { Skeleton } from '@/components/ui/skeleton';

interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  coachingStyle?: string;
  corePrinciples?: string[];
}

const CoachProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const bookData = await getBookById(id);
          setBook(bookData);
        }
      } catch (error) {
        console.error('Failed to fetch book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const showSubscribedMessage = new URLSearchParams(location.search).get('subscribed') === 'true';

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Coach Profile</h1>
      </div>
      {/* Subscribed Message */}
      {showSubscribedMessage && (
        <div className="bg-blue-500 text-white shadow-md py-8 px-4 rounded-lg mb-5">
          <PartyPopper className="w-8 h-8 mx-auto mb-4" />
          <p className="text-center">You are now following this coach!</p>
        </div>
      )}
      {/* Content */}
      {loading ? (
        <>
          <Skeleton className="w-full h-[20em] mb-5 rounded-lg" />
          <Skeleton className="w-full h-[2em] mb-1" />
          <Skeleton className="w-full h-[1em] mb-1" />
          <Skeleton className="w-full h-[1em] mb-1" />
          <Skeleton className="w-full h-[1em] mb-5" />
          <Skeleton className="w-full h-[2em] mb-1" />
          <Skeleton className="w-full h-[1em] mb-1" />
          <Skeleton className="w-full h-[1em] mb-1" />
          <Skeleton className="w-full h-[1em] mb-1" />
        </>
      ) : (
        <>
          {/* Cover */}
          {book && (
            <div className="rounded-lg shadow-md py-10 px-5 mb-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
              <div className="flex flex-col items-center">
                <img className="w-30 h-45 rounded-lg mb-4 shadow-lg" src={book.imageUrl || '/assets/img/book_001.png'} alt="Coach" />
                <h2 className="mb-2 text-white text-xl font-bold text-center">{book.title}</h2>
                <p className="text-white text-sm">by {book.author}</p>
              </div>
            </div>
          )}
          {/* Style */}
          {book && (
            <div className="bg-white rounded-lg shadow-md p-5 mb-5">
              <h2 className="font-bold text-lg mb-2">Coaching Style</h2>
              <p>{book.coachingStyle}</p>
            </div>
          )}
          {/* Principles */}
          {book && (
            <div className="bg-white rounded-lg shadow-md p-5">
              <h2 className="font-bold text-lg mb-2">Core Principles</h2>
              <ul className="list-disc pl-5">
                {book.corePrinciples?.map((principle, index) => (
                  <li key={index}>{principle}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {/* Progress */}
      {/* <div className="bg-white rounded-lg shadow-md p-5 mb-5">
        <h2 className="font-bold text-lg mb-2">Your Progress</h2>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Exploration Progress</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="w-1/2 flex flex-col justify-center items-center text-gray-600">
              <span className="text-blue-500 font-bold text-2xl">6/12</span>
              <span>Insights Completed</span>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center text-gray-600">
              <span className="text-green-500 font-bold text-2xl">4/8</span>
              <span>Tasks Completed</span>
            </div>
          </div>
        </div>
      </div> */}
      {/* Buttons */}
      { showSubscribedMessage && (
        <div className="flex flex-col gap-4 mt-5">
          <Button className="w-full button-primary" onClick={() => navigate(`/chats/${book?._id}`)}>
            Start Chatting
          </Button>
          <Button className="w-full button" onClick={() => navigate(`/tracker/${book?._id}/tasks`)}>
            View Tasks
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default CoachProfile;
