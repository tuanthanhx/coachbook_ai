import Layout from '@/components/layouts/LayoutDefault';
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronLeft, ChevronRight, Globe, Moon, Lock, Shield, CreditCard, CircleHelp, Info, Star, Share2, LogOut } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Settings = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Settings</h1>
      </div>
      <Link className="bg-white rounded-lg shadow-md p-5 mb-5 flex gap-4 relative cursor-pointer" to="/settings/profile">
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
      </Link>
      <h2 className="mb-4 font-bold text-lg">App Settings</h2>
      <div className="mb-5 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-start gap-4 px-4 py-4 border-b border-gray-200">
          <Moon />
          <span className="flex-1 text-gray-700">Dark mode</span>
          <Switch />
        </div>
        <div className="flex items-center justify-start gap-4 px-4 py-4 border-b border-gray-200">
          <Globe />
          <span className="flex-1 text-gray-700">Language</span>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link className="flex items-center justify-start gap-4 px-4 py-4" to="/settings/notification">
          <Bell />
          <span className="flex-1 text-gray-700">Notification</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </Link>
      </div>
      <h2 className="mb-4 font-bold text-lg">Account & Security</h2>
      <div className="mb-5 bg-white rounded-lg shadow-md">
        <Link className="flex items-center justify-start gap-4 px-4 py-4 border-b border-gray-200" to="/settings/password">
          <Lock />
          <span className="flex-1 text-gray-700">Change Password</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </Link>
        <div className="flex items-center justify-start gap-4 px-4 py-4 border-b border-gray-200">
          <Shield />
          <span className="flex-1 text-gray-700">Privacy Settings</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </div>
        <Link className="flex items-center justify-start gap-4 px-4 py-4" to="/settings/subscription">
          <CreditCard />
          <span className="flex-1 text-gray-700">Manage Subscription</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </Link>
      </div>
      <h2 className="mb-4 font-bold text-lg">Support & More</h2>
      <div className="mb-5 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-start gap-4 px-4 py-4 border-b border-gray-200">
          <CircleHelp />
          <span className="flex-1 text-gray-700">Help Center</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </div>
        <div className="flex items-center justify-start gap-4 px-4 py-4 border-b border-gray-200">
          <Info />
          <span className="flex-1 text-gray-700">Contact Support</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </div>
        <div className="flex items-center justify-start gap-4 px-4 py-4 border-b border-gray-200">
          <Star />
          <span className="flex-1 text-gray-700">Rate App</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </div>
        <div className="flex items-center justify-start gap-4 px-4 py-4">
          <Share2 />
          <span className="flex-1 text-gray-700">Share with Friends</span>
          <ChevronRight className="text-gray-500 -mr-2" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div
          className="flex items-center justify-start gap-4 px-4 py-4 cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="text-red-500" />
          <span className="flex-1 text-red-500">Sign Out</span>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
