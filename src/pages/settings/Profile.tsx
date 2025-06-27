import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '@/components/layouts/LayoutDefault';
import { ChevronLeft, ChevronDownIcon, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { updateProfile } from '@/lib/apiService';
import { toast } from "sonner";


const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [fullname, setFullname] = useState('');
  const [country, setCountry] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || '');
      setCountry(user.country || '');
      setDate(user.dob ? new Date(user.dob) : undefined);
    }
  }, [user]);

  const handleAvatarChange = (file: File | null) => {
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewAvatar(null);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('country', country);
      formData.append('dob', date ? date.toISOString() : '');
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft
          className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer"
          onClick={() => navigate('/settings')}
        />
        <h1 className="px-8 w-full text-center text-xl font-bold">Edit Profile</h1>
      </div>
      <div className="mb-5 flex items-center justify-center relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={previewAvatar || user?.avatar || '/assets/img/avatar.jpg'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label
          htmlFor="avatar-upload"
          className="flex justify-center items-center absolute top-1/2 left-1/2 ml-16 -translate-y-1/2 bg-gray-800 text-white text-sm w-8 h-8 rounded-full cursor-pointer"
        >
          <Pencil className="w-5 h-5" />
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleAvatarChange(e.target.files?.[0] || null)}
        />
      </div>
      <div className="mb-5 py-6 px-4 bg-white rounded-lg shadow-md">
        <h3 className="mb-2 font-bold">Full Name</h3>
        <Input
          className="h-11 rounded-full px-4"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <h3 className="mt-6 mb-2 font-bold">Email</h3>
        <Input
          className="h-11 rounded-full px-4"
          value={user?.email || ''}
          disabled
        />
        <h3 className="mt-6 mb-2 font-bold">Country/Nationality</h3>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-full !h-11 rounded-full px-4">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="in">India</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
            <SelectItem value="cn">China</SelectItem>
            <SelectItem value="br">Brazil</SelectItem>
            <SelectItem value="za">South Africa</SelectItem>
            <SelectItem value="ru">Russia</SelectItem>
            <SelectItem value="es">Spain</SelectItem>
            <SelectItem value="it">Italy</SelectItem>
            <SelectItem value="mx">Mexico</SelectItem>
          </SelectContent>
        </Select>
        <h3 className="mt-6 mb-2 font-bold">Date of Birth</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-full h-11 rounded-full !px-4 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        <Button className="button-primary w-full mt-8" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </Layout>
  );
};

export default Profile;
