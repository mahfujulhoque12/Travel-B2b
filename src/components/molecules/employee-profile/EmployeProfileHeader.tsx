import { Button } from '@/components/atoms/Button'
import Paragraph from '@/components/atoms/Paragraph'
import Image from 'next/image'
import React from 'react'
import { MdModeEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import admin from '/public/admin/customer.png';
import Span from '@/components/atoms/Span'

const EmployeProfileHeader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-6">
      <div className="flex gap-3 items-center">
        <Image
          src={admin}
          alt="customer"
          width={300}
          height={300}
          className="w-[72px] h-[72px]"
        />
        <div className="flex flex-col">
          <Paragraph className="text-xs md:text-sm lg:text-base font-normal dark:text-white">
            Alex Stive Jobs
          </Paragraph>
          <Span className="text-sm font-normal dark:text-white">Software Engineer</Span>
          <Button className="border self-start px-4 mt-1 py-1.5 rounded-md text-xs font-normal shadow-sm dark:bg-darkButtonBg dark:text-white">
            Male
          </Button>
        </div>
      </div>
      <div className="flex  gap-4 justify-end items-center">
        {/* Ensuring consistent height */}
        <Button className="bg-[#1768D0] text-white text-sm font-normal rounded-md shadow-sm px-2 py-1.5 hover:bg-[#0070FF] transition-all duration-200 flex items-center gap-1">
        <MdModeEdit />
          Edit
        </Button>
        <Button className="bg-[#D72126] text-white text-sm font-normal rounded-md shadow-sm px-2 py-1.5 hover:bg-[#FF4C51] transition-all duration-200 flex items-center gap-1">
        <RiDeleteBin6Line  />
          Delete Employee
        </Button>
     
      </div>
    </div>
  )
}

export default EmployeProfileHeader