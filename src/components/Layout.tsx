import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="pb-25">
      {children}
    </div>
  );
};

export default Layout;
