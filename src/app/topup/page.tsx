"use client"
import TopupTableWrapper from '@/components/organisms/topup/TopupTableWrapper';
import Sidebar from '@/components/organisms/sidebar/Sidebar';
import Topbar from '@/components/organisms/topbar/Topbar';
import React, { useState } from 'react';

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Section */}
      <div
        className={`${
          isSidebarOpen ? "absolute z-20" : "hidden"
        } md:relative md:block  transition-all duration-300 m-4 rounded-md`}
      >
        <div className="md:basis-[20%] md:w-auto w-20 ">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-4 md:ml-0">
        <Topbar />
        <div className="min-h-[300px] scrollbar-y-auto">

        <TopupTableWrapper/>
        </div>
      </div>

      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="fixed bottom-4 left-4 bg-[#1768D0] text-white p-2 rounded-full md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};

export default Page;
