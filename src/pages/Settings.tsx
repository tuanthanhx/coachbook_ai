import Layout from '@/components/Layout';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const CoachProfile = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Settings</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-5 mb-5 flex gap-4 relative cursor-pointer">
        <div className="flex-shrink-0">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/assets/img/avatar.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold">John Smith</h2>
          <p className="text-gray-500">johnsm@gmail.com</p>
        </div>
        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>
    </Layout>
  );
};

export default CoachProfile;
