import React from 'react'

const RecentTableLoader = () => {
  return (
    <div className="mt-5 animate-pulse">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
        <div className="w-24 h-8 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-5">
    <div className="flex gap-3 bg-gray-100 rounded-md p-2">
      <div className="w-full h-[450px] bg-gray-300 rounded-md"></div>
      <div className="w-full h-[450px] bg-gray-300 rounded-md"></div>
      <div className="w-full h-[450px] bg-gray-300 rounded-md"></div>
      <div className="w-full h-[450px] bg-gray-300 rounded-md"></div>
      <div className="w-full h-[450px] bg-gray-300 rounded-md"></div>
      <div className="w-full h-[450px] bg-gray-300 rounded-md"></div>
      <div className="w-full h-[450px] bg-gray-300 rounded-md"></div>
    </div>
  </div>
    </div>
  </div>
  )
}

export default RecentTableLoader