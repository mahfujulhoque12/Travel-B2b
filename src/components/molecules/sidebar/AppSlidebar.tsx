"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarHeader from "./SidebarHeader";
import { IoSettingsOutline } from "react-icons/io5";

import {
  BookingIcon,
  CustomerIcon,
  DashboardIcon,
  ReportIcon,
  SearchIcons,
  TopupIcon,
  TransactionIcon,
  EmployeeIcon,
  CompanyIcon,
  LogoutIcon,
  RefundIcon,
} from "@/components/atoms/Icons";
import { MdOutlineSupportAgent } from "react-icons/md";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType<{ fill?: string; width?: number; height?: number; className?: string }>;
};


const items: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Search", href: "/search", icon: SearchIcons },
  { label: "Booking", href: "/", icon: BookingIcon },
  { label: "Refund", href: "/refund", icon: RefundIcon  },
  { label: "Transactions", href: "/transection", icon: TransactionIcon },
  { label: "Topup Request", href: "/topup", icon: TopupIcon },
  { label: "Customer", href: "/customer", icon: CustomerIcon },
  { label: "Reports", href: "/report", icon: ReportIcon },
  { label: "Setting", href: "#", icon: IoSettingsOutline  },
  { label: "Employees", href: "#", icon: EmployeeIcon },
  { label: "Company Profile", href: "#", icon: CompanyIcon },
  { label: "Support", href: "#", icon: MdOutlineSupportAgent  },
];

const AppSlidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleAppSlidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={clsx(
        "flex  rounded-md flex-col bg-white text-[#243045] transition-all duration-300",
        isOpen ? "w-56" : "w-20"
      )}
    >
      {/* Header */}
      <SidebarHeader isOpen={isOpen} toggleAppSlidebar={toggleAppSlidebar} />

      {/* Navigation Items */}
     <nav className="flex-grow space-y-2 px-3 max-h-[77vh] sidebar-container">
  {items.map((item, index) => {
    const Icon = item.icon; // Access the icon component
    const isActive = pathname === item.href; // Check if the link is active
    return (
      <Link
        key={index}
        href={item.href}
        className={clsx(
          "group relative  flex items-center gap-3 p-3 text-xs font-normal rounded-md transition-all duration-300 hover:text-white hover:bg-[#1768D0]",
          isActive && "bg-[#1768D0] text-white",
          !isOpen && "justify-center"
        )}
      >
        <div className="transition-colors duration-300 ">
          <Icon  fill={isActive ? "white" : "black"} className="h-5 w-5 fill-gray-900  group-hover:fill-white transition-colors duration-200" />
        </div>
        {isOpen && <>{item.label}</>}
      </Link>
    );
  })}
</nav>

      <div className="mt-2 px-4 py-1  border-t-2 border-gray-100">
        <Link
          href="#"
          className={clsx(
            "group  relative flex items-center gap-3 p-3 text-xs font-normal rounded-md transition-all duration-300 hover:text-white hover:bg-[#1768D0]",
            pathname === "#" && "bg-[#1768D0] text-white",
            !isOpen && "justify-center"
          )}
        >
          <LogoutIcon/> {isOpen && "Logout"}
        </Link>
      </div>
    </div>
  );
};

export default AppSlidebar;
