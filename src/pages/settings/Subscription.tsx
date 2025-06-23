import { useNavigate } from "react-router-dom";
import Layout from '@/components/layouts/LayoutDefault';
import { ChevronLeft, Crown } from 'lucide-react';
import { Button } from "@/components/ui/button"


const Subscription = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-8 p-4 relative">
        <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate('/settings')} />
        <h1 className="px-8 w-full text-center text-xl font-bold">Upgrade to Pro</h1>
      </div>

      {/* Cover */}
      <div className="rounded-lg shadow-md py-8 px-5 mb-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b]">
        <div className="flex flex-col items-center text-center">
          <Crown className="w-12 h-12 mb-2 text-white" />
          <h2 className="mb-2 text-white text-2xl font-bold">Unlock Your Full Potential</h2>
          <p className="text-white">Get unlimited access to all coaching features and transform your habits faster</p>
        </div>
      </div>

      <div className="mb-5 p-2 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between gap-2">
          <Button className="w-1/2 h-11 font-bold">Monthly</Button>
          <Button variant="ghost" className="w-1/2 h-11 font-bold">Yearly</Button>
        </div>
      </div>

      <div className="mb-5 py-6 px-5 bg-white rounded-lg shadow-md flex flex-col gap-4">
        <div className="text-center"><span className="font-bold text-2xl">$9.99</span>/month</div>
        <Button className="button-primary w-full">Start Free Trial</Button>
        <div className="text-gray-400 text-center text-sm">7-day free trial, cancel anytime</div>
      </div>
      <div className="py-6 px-5 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">What you get with Pro</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Unlimited AI Coaches</li>
          <li>Unlimited conversations</li>
          <li>Daily personalized insights</li>
          <li>Voice mode</li>
          <li>Progress tracking</li>
          <li>Bookmarked insights</li>
          <li>Export conversations</li>
          <li>Priority support</li>
        </ul>
        <div className="mt-4 text-gray-500 text-sm">
          <p>By upgrading, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
