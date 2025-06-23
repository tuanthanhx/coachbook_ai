import { useNavigate } from "react-router-dom";
import Layout from '@/components/layouts/LayoutDefault';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"


const Password = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/settings')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Change Password</h1>
      </div>
      <div className="mb-5 py-6 px-4 bg-white rounded-lg shadow-md">
        <h3 className="mb-2 font-bold">Current Password</h3>
        <Input className="h-11 rounded-full px-4" type="password" placeholder="Enter current password" />
        <h3 className="mt-6 mb-2 font-bold">New Password</h3>
        <Input className="h-11 rounded-full px-4" type="password" placeholder="Enter new password" />
        <h3 className="mt-6 mb-2 font-bold">Confirm New Password</h3>
        <Input className="h-11 rounded-full px-4" type="password" placeholder="Confirm new password" />
        <Button className="button-primary w-full mt-8">Update Password</Button>
      </div>
    </Layout>
  );
};

export default Password;
