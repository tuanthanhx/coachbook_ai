import React from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import BottomNav from '@/components/layouts/BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const excludedPaths = ['/login', '/register'];
  const isExcludedDynamicRoute = location.pathname.startsWith('/chats/');

  const shouldShowBottomNav = !excludedPaths.includes(location.pathname) && !isExcludedDynamicRoute;

  return (
    <>
      <div className="pb-25">
        {children}
      </div>
      <Toaster richColors closeButton position="top-center" />
      {shouldShowBottomNav && <BottomNav />}
    </>
  );
};

export default Layout;
