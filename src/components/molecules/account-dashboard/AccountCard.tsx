
import React from "react";
import cardLogo from "/public/card/cardLogo.png";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import DashboardCard from "@/components/molecules/global/DashboardCard";

const AccountCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      <DashboardCard
        title="Total Balance"
        value={1252}
        gradientFrom="#0B5BA8"
        gradientTo="#299BD8"
        icon={MdOutlineAccountBalanceWallet}
        iconColor="white"
        footerText="This Month"
        footerIcon={MdKeyboardDoubleArrowUp}
        footerIconColor="#22E14B"
        footerValue="80%"
        footerPercentageColor="#22E14B"
        imageSrc={cardLogo}
        imageAlt="card-logo"
        imageWidth={150}
        imageHeight={150}
      />
      <DashboardCard
        title="Total Expense"
        value={1252}
        gradientFrom="#02AAB0"
        gradientTo="#00CDAC"
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
        title="This Month Income"
        value={1252}
        gradientFrom="#FF6FD8"
        gradientTo="#3813C2"
        icon={MdOutlineAccountBalanceWallet}
        iconColor="white"
        footerText="This Month"
        footerIcon={MdKeyboardDoubleArrowDown}
        footerIconColor="#22E14B"
        footerValue="3%"
        footerPercentageColor="#22E14B"
        imageSrc={cardLogo}
        imageAlt="card-logo"
        imageWidth={150}
        imageHeight={150}
      />
      <DashboardCard
        title="This Month Expense"
        value={1252}
        gradientFrom="#FF6800"
        gradientTo="#F3C061"
        icon={MdOutlineAccountBalanceWallet}
        iconColor="white"
        footerText="This Month"
        footerIcon={MdKeyboardDoubleArrowUp}
        footerIconColor="#FF0000"
        footerValue="8%"
        footerPercentageColor="#FF0000"
        imageSrc={cardLogo}
        imageAlt="card-logo"
        imageWidth={150}
        imageHeight={150}
      />
    </div>
  );
};

export default AccountCard;
