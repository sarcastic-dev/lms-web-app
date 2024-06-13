// RootLayout.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import React, { ReactNode, useState } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='flex'>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} className='fixed top-0 left-0 h-screen overflow-y-auto bg-gray-200' />
      <section className={`transition-all duration-500 ${sidebarOpen ? "ml-60" : "ml-24"} w-full h-screen overflow-y-auto`}>
        <div className='2xl:p-4 xl:px-10 xl:py-5 2xl:py-3 '>
          {children}
        </div>
      </section>
    </div>
  );
};

export default RootLayout;
