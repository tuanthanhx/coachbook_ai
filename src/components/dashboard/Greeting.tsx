import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react";

const Greeting: React.FC<{ user: { avatar: string; name: string; } }> = ({ user }) => {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <Avatar className="mr-4 w-16 h-16">
          <AvatarImage src={user?.avatar || '/assets/img/avatar.jpg'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div>Hello</div>
          <div className="font-bold text-xl">{user?.name || 'Welcome back!'}</div>
        </div>
      </div>
      <Bell className="h-10 w-10 p-2 bg-white rounded-full text-gray-700 cursor-pointer" />
    </div>
  );
};

export default Greeting;
