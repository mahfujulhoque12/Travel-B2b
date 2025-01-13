import React from "react";

const TableLoader: React.FC = () => {
  return (
    <div className="mt-5 animate-pulse">
          <div className="space-y-4">
            {/* Skeleton for the card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
              <div className="w-32 h-8 bg-gray-300 rounded"></div>
              <div className="w-32 h-8 bg-gray-300 rounded"></div>
              <div className="w-32 h-8 bg-gray-300 rounded"></div>
              </div>


              <div className="flex items-center gap-2">
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>   
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="mt-5">
              <div className="w-full h-72 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
  );
};

export default TableLoader;
