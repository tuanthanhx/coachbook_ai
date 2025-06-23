import React from 'react';
import { Toaster } from "@/components/ui/sonner";

const LayoutSimple: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        {children}
      </div>
      <Toaster richColors closeButton position="top-center" />
    </>
  );
};

export default LayoutSimple;
