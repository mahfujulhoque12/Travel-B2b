
import React from "react";
import cardLogo from "/public/card/cardLogo.png";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import DashboardCard from "@/components/molecules/global/DashboardCard";

const AccountCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      <DashboardCard
        title="Booking"
        value={1252}
        gradientFrom="#61A686"
        gradientTo="#84BBA1"
        icon={MdOutlineAccountBalanceWallet}
        iconColor="white"
        footerText="This Month"
        footerIcon={MdKeyboardDoubleArrowUp}
        footerIconColor="#0BA32B"
        footerValue="80%"
        footerPercentageColor="#0BA32B"
        imageSrc={cardLogo}
        imageAlt="card-logo"
        imageWidth={150}
        imageHeight={150}
      />
      <DashboardCard
        title="Order"
        value={1252}
        gradientFrom="#7072E9"
        gradientTo="#797AB2"
        icon={GoChecklist}
        iconColor="white"
        footerText="This Month"
        footerIcon={MdKeyboardDoubleArrowDown}
        footerIconColor="#FF0000"
        footerValue="3%"
        footerPercentageColor="#FF0000"
        imageSrc={cardLogo}
        imageAlt="card-logo"
        imageWidth={150}
        imageHeight={150}
      />
      <DashboardCard
        title="Revenue"
        value={1252}
        gradientFrom="#FF5041"
        gradientTo="#F06F64"
        icon={MdOutlineAccountBalanceWallet}
        iconColor="white"
        footerText="This Month"
        footerIcon={MdKeyboardDoubleArrowDown}
        footerIconColor="#FF0000"
        footerValue="3%"
        footerPercentageColor="#FF0000"
        imageSrc={cardLogo}
        imageAlt="card-logo"
        imageWidth={150}
        imageHeight={150}
      />
      <DashboardCard
        title="Loss"
        value={1252}
        gradientFrom="#5A5958"
        gradientTo="#262625"
        icon={MdOutlineAccountBalanceWallet}
        iconColor="white"
        footerText="This Month"
        footerIcon={MdKeyboardDoubleArrowUp}
        footerIconColor="#2da8b6"
        footerValue="8%"
        footerPercentageColor="#2da8b6"
        imageSrc={cardLogo}
        imageAlt="card-logo"
        imageWidth={150}
        imageHeight={150}
      />
    </div>
  );
};

export default AccountCard;
