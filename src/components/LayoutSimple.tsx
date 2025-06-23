import React from 'react';
const LayoutSimple: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
};

export default LayoutSimple;
