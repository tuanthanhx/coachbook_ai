import Layout from '@/components/layouts/LayoutDefault';
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getBookById } from '@/lib/apiService';

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
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const bookData = await getBookById(id);
          setBook(bookData);
        }
      } catch (error) {
        console.error('Failed to fetch book:', error);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Coach Profile</h1>
      </div>
      {/* Cover */}
      {book && (
        <div className="rounded-lg shadow-md py-10 px-5 mb-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
          <div className="flex flex-col items-center">
            <img className="w-30 h-45 rounded-lg mb-4 shadow-lg" src={book.imageUrl || '/assets/img/book_001.png'} alt="Coach" />
            <h2 className="mb-2 text-white text-xl font-bold">{book.title}</h2>
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
        <div className="bg-white rounded-lg shadow-md p-5 mb-5">
          <h2 className="font-bold text-lg mb-2">Core Principles</h2>
          <ul className="list-disc pl-5">
            {book.corePrinciples?.map((principle, index) => (
              <li key={index}>{principle}</li>
            ))}
          </ul>
        </div>
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
      <div className="flex flex-col gap-4">
        <Button className="w-full button-primary" onClick={() => navigate(`/chats/${book?._id}`)}>
          Start Coaching
        </Button>
        {/* <Button className="w-full button" onClick={() => navigate('/insights/completed')}>
          View Completed Insights
        </Button> */}
      </div>
    </Layout>
  );
};

export default CoachProfile;
