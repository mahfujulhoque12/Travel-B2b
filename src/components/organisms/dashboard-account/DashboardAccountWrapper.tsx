"use client";
import { useState } from "react";

import TabNavigation from "@/components/molecules/global/TabNavigation";

import { LuPlaneTakeoff, LuHotel } from "react-icons/lu";

import { GiPalmTree } from "react-icons/gi";
import { TiWorldOutline } from "react-icons/ti";

import { FaCar } from "react-icons/fa";
import { PiMosqueThin } from "react-icons/pi";
import DashboardAccountFlight from "./DashboardAccountFlight";

const tabs = [
  { label: "Flight", icon: <LuPlaneTakeoff size={20} /> },
  { label: "Hotel", icon: <LuHotel size={20} /> },
  { label: "Package", icon: <GiPalmTree size={20} /> },
  { label: "Visa", icon: <TiWorldOutline size={20} /> },
  { label: "Car", icon: <FaCar size={20} /> },
  { label: "Hajj & Umrah", icon: <PiMosqueThin size={20} /> },
];

const DashboardAccountWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <DashboardAccountFlight />;

      case 1:
        return <div>two</div>;

      case 2:
        return <div>three</div>;

      case 3:
        return <div>four</div>;

      case 4:
        return <div>five</div>;

      case 5:
        return <div>six</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-5 rounded-md mt-5 bg-white">
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default DashboardAccountWrapper;
