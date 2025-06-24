import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from '../ui/button';
import { BookOpen, MoveLeft, MoveRight } from 'lucide-react';
import apiService from '@/lib/apiService';

interface Insight {
  _id: string;
  title: string;
  content: string;
  bookTitle: string;
  bookAuthor: string;
}

const DailyInsights: React.FC = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    apiService.get('/books/daily-insights')
      .then(response => setInsights(response.data))
      .catch(error => console.error('Error fetching daily insights:', error));
  }, []);

  return (
    <div className="mt-5 py-8 px-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b] rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center mb-5">
        <div className="text-lg font-bold">Daily Insights</div>
        {/* icon book */}
        <BookOpen />
      </div>
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {insights.map(insight => (
            <CarouselItem key={insight._id}>
              <div className="w-full">
                <h3 className="text-lg font-bold">{insight.title}</h3>
                <div className="mb-5 text-sm text-gray-200">{insight.bookTitle} • {insight.bookAuthor}</div>
                <p>{insight.content}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-4 items-center mt-4">
          <MoveLeft className="cursor-pointer" onClick={() => { api?.scrollPrev() }} />
          <MoveRight className="cursor-pointer" onClick={() => { api?.scrollNext() }} />
        </div>
      </Carousel>
      <Button className="mt-5 w-full h-11 rounded-full bg-white text-gray-700 font-bold" onClick={() => navigate('/insights')}>View Full Insights</Button>
    </div>
  );
};

export default DailyInsights;
