import React from 'react';
import { useLocation } from 'react-router-dom';
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
      {shouldShowBottomNav && <BottomNav />}
    </>
  );
};

export default Layout;
