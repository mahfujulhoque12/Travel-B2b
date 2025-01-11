import Paragraph from "@/components/atoms/Paragraph";
import Span from "@/components/atoms/Span";
import Image from "next/image";
import React from "react";
import { MdKeyboardDoubleArrowDown, MdOutlineAccountBalanceWallet } from "react-icons/md";
import cardLogo from '/public/card/cardLogo.png';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { GoChecklist } from "react-icons/go";

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 ">
      <div className="bg-gradient-to-t from-[#61A686]  to-[#84BBA1] px-5 pt-5 rounded-md shadow-md">
        {/* card Header */}
        <div className="flex items-center justify-between">
          <Paragraph className="text-sm md:lext-lg lg:text-xl font-semibold text-white">Booking</Paragraph>
          <Span className="bg-[#FFFFFF1A] p-2 rounded-full">
          <MdOutlineAccountBalanceWallet  className="text-[#fff] " size={22}/>
          </Span>
        </div>
        {/* card Header  end*/}

        {/* card Body start */}
        <Paragraph className="font-semibold text-white text-2xl md:text-3xl lg:text-4xl mt-4">1252</Paragraph>
        {/* card Body end */}

        {/* card footer start*/}
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Span className="bg-[#FFFFFF3D] text-[#0BA32B] flex items-center gap-1 py-1.5 px-2 text-sm font-semibold rounded-full"><MdKeyboardDoubleArrowUp /> 8%</Span>
                <Paragraph className="text-white font-medium text-sm lg:text-base">This Month</Paragraph>
            </div>
            <Image src={cardLogo} width={150} height={150} alt="card-loog" className="w-[100px] h-[78px]"/>
        </div>
        {/* card footer end*/}

      </div>
      {/* sec card */}
      <div className="bg-gradient-to-t from-[#7072E9]  to-[#797AB2] px-5 pt-5 rounded-md shadow-md">
        {/* card Header */}
        <div className="flex items-center justify-between">
          <Paragraph className="text-sm md:lext-lg lg:text-xl font-semibold text-white">Order</Paragraph>
          <Span className="bg-[#FFFFFF1A] p-2 rounded-full">
          <GoChecklist   className="text-[#fff] " size={22}/>
          </Span>
        </div>
        {/* card Header  end*/}

        {/* card Body start */}
        <Paragraph className="font-semibold text-white text-2xl md:text-3xl lg:text-4xl mt-4">1252</Paragraph>
        {/* card Body end */}

        {/* card footer start*/}
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Span className="bg-[#FFFFFF3D] text-[#FF0000] flex items-center gap-1 py-1.5 px-2 text-sm font-semibold rounded-full"><MdKeyboardDoubleArrowDown /> 3%</Span>
                <Paragraph className="text-white font-medium text-sm lg:text-base">This Month</Paragraph>
            </div>
            <Image src={cardLogo} width={150} height={150} alt="card-loog" className="w-[100px] h-[78px]"/>
        </div>
        {/* card footer end*/}

      </div>
      {/* third card */}
      <div className="bg-gradient-to-r from-[#FF5041]  to-[#F06F64] px-5 pt-5 rounded-md shadow-md">
        {/* card Header */}
        <div className="flex items-center justify-between">
          <Paragraph className="text-sm md:lext-lg lg:text-xl font-semibold text-white">Revenue</Paragraph>
          <Span className="bg-[#FFFFFF1A] p-2 rounded-full">
          <MdOutlineAccountBalanceWallet  className="text-[#fff] " size={22}/>
          </Span>
        </div>
        {/* card Header  end*/}

        {/* card Body start */}
        <Paragraph className="font-semibold text-white text-2xl md:text-3xl lg:text-4xl mt-4">1252</Paragraph>
        {/* card Body end */}

        {/* card footer start*/}
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Span className="bg-[#FFFFFF3D] text-[#FF0000] flex items-center gap-1 py-1.5 px-2 text-sm font-semibold rounded-full"><MdKeyboardDoubleArrowDown /> 3%</Span>
                <Paragraph className="text-white font-medium text-sm lg:text-base">This Month</Paragraph>
            </div>
            <Image src={cardLogo} width={150} height={150} alt="card-loog" className="w-[100px] h-[78px]"/>
        </div>
        {/* card footer end*/}

      </div>
    </div>
  );
};

export default DashboardCard;
