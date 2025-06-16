import React from 'react';
import { useNavigate } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from '../ui/button';
import { BookOpen, MoveLeft, MoveRight } from 'lucide-react';

const DailyInsights: React.FC = () => {
  const navigate = useNavigate();
  const [api, setApi] = React.useState<CarouselApi>();
  return (
    <div className="mt-5 py-8 px-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b] rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center mb-5">
        <div className="text-lg font-bold">Daily Insights</div>
        {/* icon book */}
        <BookOpen />
      </div>
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="w-full">
              <h3 className="text-lg font-bold">Building Better Habits</h3>
              <div className="mb-5 text-sm text-gray-200">James Clear • Atomic Habits</div>
              <p>The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become. Every action you take is a vote for the type of person you wish to become.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="w-full">
              <h3 className="text-lg font-bold">The Power of Mindset</h3>
              <div className="mb-5 text-sm text-gray-200">Carol Dweck • Mindset</div>
              <p>In a growth mindset, challenges are exciting rather than threatening. So rather than thinking, oh, I'm going to reveal my weaknesses, you say, wow, here's a chance to grow.</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="w-full">
              <h3 className="text-lg font-bold">Deep Work Focus</h3>
              <div className="mb-5 text-sm text-gray-200">Cal Newport • Deep Work</div>
              <p>Human beings, it seems, are at their best when immersed deeply in something challenging. To produce at your peak level you need to work for extended periods with full concentration on a single task free from distraction.</p>
            </div>
          </CarouselItem>
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
