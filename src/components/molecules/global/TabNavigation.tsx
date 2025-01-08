import { cn } from "@/lib/utils";
import React from "react";

interface Tab {
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  onTabChange: (activeTabIndex: number) => void;
  isBackground?: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  onTabChange,
  isBackground,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <nav
        className={cn(
          "flex relative border-b-2 border-[#D3E4FB80] space-x-5",
          isBackground && "gap-1"
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={cn(
              "relative px-4 py-3.5 text-base font-normal border-[#F4F7FE] text-center rounded-md flex gap-2 items-center",
              isBackground
                ? activeTab === index
                  ? "bg-blue-gradient text-white"
                  : "bg-white text-dark-blue"
                : activeTab === index
                ? "gradient-text text-[#1571E7]"
                : "text-[#7C7C7C]"
            )}
          >
            {tab.icon}
            {tab.label}

            {!isBackground && (
              <span
                className={`w-[103px] h-[2.5px] absolute left-1/2 bottom-[-2px] transform -translate-x-1/2 ${
                  activeTab === index ? "bg-[#1571E7]" : "bg-transparent"
                }`}
              ></span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
