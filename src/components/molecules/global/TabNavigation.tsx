import { cn } from "@/lib/utils";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange(index);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={cn(
        "flex border-b-2 border-[#D3E4FB80] sticky top-0 z-[10] bg-white dark:bg-darkPrimaryBg dark:text-white dark:border-gray-900",
        isBackground && "gap-1"
      )}
    >
      <div className="flex items-center w-full">
        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          className="md:hidden px-2"
          aria-label="Scroll left"
        >
          <IoChevronBack />

        </button>

        {/* Tabs container */}
        <div
          ref={scrollContainerRef}
          className="flex w-full overflow-x-auto no-scrollbar space-x-1 sm:space-x-4  sm:px-4"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={cn(
                "relative px-4 py-1 sm:py-3.5 text-sm sm:text-base font-normal text-center rounded-md flex gap-2 items-center dark:text-white whitespace-nowrap",
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
                  className={`w-[70px] sm:w-[103px] h-[2.5px] absolute left-1/2 bottom-[-2px] transform -translate-x-1/2 ${
                    activeTab === index ? "bg-[#1571E7]" : "bg-transparent"
                  }`}
                ></span>
              )}
            </button>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          className="md:hidden px-2"
          aria-label="Scroll right"
        >
          <IoChevronForward />

        </button>
      </div>
    </nav>
  );
};

export default TabNavigation;
