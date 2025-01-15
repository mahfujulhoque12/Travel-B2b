import React from "react";
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
import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType<{
    fill?: string;
    width?: number;
    height?: number;
    className?: string;
  }>;
};

const items: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Search", href: "/search", icon: SearchIcons },
  { label: "Booking", href: "/", icon: BookingIcon },
  { label: "Refund", href: "/refund", icon: RefundIcon },
  { label: "Transactions", href: "/transection", icon: TransactionIcon },
  { label: "Topup", href: "/topup", icon: TopupIcon },
  { label: "Customer", href: "/customer", icon: CustomerIcon },
  { label: "Reports", href: "/report", icon: ReportIcon },
  { label: "Setting", href: "#", icon: IoSettingsOutline },
  { label: "Employees", href: "#", icon: EmployeeIcon },
  { label: "Company", href: "#", icon: CompanyIcon },
  { label: "Support", href: "#", icon: MdOutlineSupportAgent },
];

interface SidebarProps {
  toggleAppSlidebar: () => void;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleAppSlidebar,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "rounded-md fixed top-5 left-5 z-[999] px-2 bg-white text-[#243045] transition-all duration-300 dark:bg-darkPrimaryBg ",
        isOpen ? "w-56" : "w-20"
      )}
      style={{ height: "calc(100vh - 40px)" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Sidebar Wrapper */}
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <SidebarHeader isOpen={isOpen} toggleAppSlidebar={toggleAppSlidebar} />

        {/* Navigation Items */}
        <nav className="flex-grow overflow-y-auto space-y-2 nav-no-scrollbar dark:text-white">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 p-3 text-sm font-normal rounded-md transition-all duration-200 dark:text-white",
                  "hover:text-white hover:bg-[#1768D0]",
                  isActive
                    ? "bg-[#1768D0] text-white dark:text-white"
                    : "text-gray-700 dark:text-white",
                  !isOpen && "justify-center"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center transition-colors duration-200",
                    isActive
                      ? "text-white dark:text-white"
                      : "text-gray-900 group-hover:text-white dark:text-white dark:group-hover:text-white"
                  )}
                >
                  <Icon
                    fill="currentColor" // Icon dynamically inherits color
                    className="h-5 w-5 transition-colors duration-200"
                  />
                </div>

                {isOpen && (
                  <span
                    className={cn(
                      "transition-opacity duration-200 dark:text-white",
                      isActive
                        ? "text-white"
                        : "text-gray-700 group-hover:text-white dark:text-white"
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="flex-shrink-0 border-t-2 py-3 border-gray-100 dark:border-gray-900">
        <Link
  href="#"
  className={cn(
    "group flex items-start gap-3 p-3 text-xs font-normal rounded-md transition-all duration-300 hover:text-white hover:bg-[#1768D0]",
    pathname === "#" && "bg-[#1768D0] text-white",
    !isOpen && "justify-center",
    "text-gray-700 dark:text-white" // Adjusting text color in dark mode
  )}
>
  <LogoutIcon className="text-gray-700 dark:text-white" /> {/* Added text color control */}
  {isOpen && "Logout"}
</Link>


        </div>
      </div>
    </div>
  );
};

export default Sidebar;
