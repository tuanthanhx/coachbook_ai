import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layouts/LayoutDefault';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import { updatePassword } from '@/lib/apiService';
import { toast } from 'sonner';
import { useState } from 'react';


const Password = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);
      toast.success('Password updated successfully!');
    } catch (error) {
      toast.error(error as string || 'Failed to update password.');
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/settings')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Change Password</h1>
      </div>
      <div className="mb-5 py-6 px-4 bg-white rounded-lg shadow-md">
        <h3 className="mb-2 font-bold">Current Password</h3>
        <Input
          className="h-11 rounded-full px-4"
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <h3 className="mt-6 mb-2 font-bold">New Password</h3>
        <Input
          className="h-11 rounded-full px-4"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <h3 className="mt-6 mb-2 font-bold">Confirm New Password</h3>
        <Input
          className="h-11 rounded-full px-4"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button className="button-primary w-full mt-8" onClick={handleUpdatePassword}>Update Password</Button>
      </div>
    </Layout>
  );
};

export default Password;
