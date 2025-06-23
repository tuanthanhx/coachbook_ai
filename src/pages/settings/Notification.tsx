import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '@/components/layouts/LayoutDefault';
import { Bell, ChevronLeft } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Notification = () => {
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleToggle = () => {
    setPushNotifications(!pushNotifications);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/settings')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Notification Settings</h1>
      </div>
      <div className="mb-5 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-start gap-4 px-4 py-4">
          <Bell />
          <span className="flex-1 text-gray-700">Push Notifications</span>
          <Switch checked={pushNotifications} onCheckedChange={handleToggle} />
        </div>
        {pushNotifications && (
          <div className="p-4 pt-0 flex justify-between items-center">
            <div className="text-gray-700">Daily Reminder Time</div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="08:00 AM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="08:00 AM">08:00 AM</SelectItem>
                <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                <SelectItem value="06:00 PM">06:00 PM</SelectItem>
                <SelectItem value="07:00 PM">07:00 PM</SelectItem>
                <SelectItem value="08:00 PM">08:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notification;
