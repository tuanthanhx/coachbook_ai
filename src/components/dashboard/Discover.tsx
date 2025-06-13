import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Discover: React.FC = () => {
  return (
    <Card className="gap-2 py-8 bg-gradient-to-br from-[#bc2ca7] via-[#d32881] to-[#9625b7] rounded-lg shadow-md text-white">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center font-bold text-xl">
          <Sparkles className="text-yellow-200" size={28} />
          Discover New Coaches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Explore our extensive library of AI mentors and find the perfect coach for your journey.</p>
      </CardContent>
      <CardFooter className="mt-2">
        <Button className="w-full rounded-full bg-white text-base text-black font-bold hover:bg-gray-200 transition-colors duration-200">
          Browse Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Discover;
