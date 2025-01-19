"use client";
import TabNavigation from "@/components/molecules/global/TabNavigation";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAccountBalance } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineContactSupport } from "react-icons/md";
import NotificationSettings from "@/components/molecules/setting/NotificationSettings.tsx";
import AddContact from "@/components/molecules/setting/contact/AddContact";

const tabs = [
  { label: "Profile", icon: <FaRegUserCircle size={20} /> },
  { label: "Account", icon: <MdOutlineAccountBalance size={20} /> },
  { label: "Notification", icon: <IoIosNotificationsOutline size={20} /> },
  { label: "Contact", icon: <MdOutlineContactSupport size={20} /> },
];

function SettingWrapper() {
  const [activeTab, setActiveTab] = useState(0);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 0:
        return <h2>user1</h2>;
      case 1:
        return <h2>user2</h2>;
      case 2:
        return <NotificationSettings />;
      case 3:
        return <AddContact />;
      default:
        return null;
    }
  };

  return (
    <div className="px-5 py-2 space-y-6">
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
      <div className="py-2 px-2">{renderActiveSection()}</div>
    </div>
  );
}

export default SettingWrapper;
