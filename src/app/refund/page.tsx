"use client"

import RefundTableWrapper from '@/components/organisms/refund/RefundTableWrapper';
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
        } md:relative md:block bg-white transition-all duration-300 m-4 rounded-md shadow-md`}
      >
        <div className="md:basis-[20%] md:w-auto w-20 ">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-4 md:ml-0">
        <Topbar />
        <RefundTableWrapper/>
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
