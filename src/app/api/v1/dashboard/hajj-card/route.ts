import cardLogo from "/public/card/cardLogo.png";
import {
    MdKeyboardDoubleArrowUp,
    MdKeyboardDoubleArrowDown,
    MdOutlineAccountBalanceWallet,
  } from "react-icons/md";
  import { GoChecklist } from "react-icons/go";
import { NextResponse } from "next/server";
  
  // Ensure you're passing the icon component directly, not a string.
  const hajjCardData = [
    {
      title: "Hajj Success",
      value: 1252,
      gradientFrom: "#61A686",
      gradientTo: "#84BBA1",
      icon: MdOutlineAccountBalanceWallet,  // Pass icon component, not string
      iconColor: "white",
      footerText: "This Month",
      footerIcon: MdKeyboardDoubleArrowUp,  // Pass icon component, not string
      footerIconColor: "#0BA32B",
      footerValue: "80%",
      footerPercentageColor: "#0BA32B",
      imageSrc: cardLogo,
      imageAlt: "card-logo",
      imageWidth: 150,
      imageHeight: 150,
    },
    {
      title: "Inbox",
      value: 1252,
      gradientFrom: "#7072E9",
      gradientTo: "#797AB2",
      icon: GoChecklist,  // Pass icon component, not string
      iconColor: "white",
      footerText: "This Month",
      footerIcon: MdKeyboardDoubleArrowDown,  // Pass icon component, not string
      footerIconColor: "#FF0000",
      footerValue: "3%",
      footerPercentageColor: "#FF0000",
      imageSrc: cardLogo,
      imageAlt: "card-logo",
      imageWidth: 150,
      imageHeight: 150,
    },
  ];
  
  export async function GET() {
    return NextResponse.json(hajjCardData);
  }
  


//   {
//     title: "Profit",
//     value: 1252,
//     gradientFrom: "#FF5041",
//     gradientTo: "#F06F64",
//     icon: MdOutlineAccountBalanceWallet,
//     iconColor: "white",
//     footerText: "This Month",
//     footerIcon: MdKeyboardDoubleArrowDown,
//     footerIconColor: "#FF0000",
//     footerValue: "3%",
//     footerPercentageColor: "#FF0000",
//     imageSrc: cardLogo,
//     imageAlt: "card-logo",
//     imageWidth: 150,
//     imageHeight: 150,
//   },
//   {
//     title: "Hold",
//     value: 1252,
//     gradientFrom: "#5A5958",
//     gradientTo: "#262625",
//     icon: MdOutlineAccountBalanceWallet,
//     iconColor: "white",
//     footerText: "This Month",
//     footerIcon: MdKeyboardDoubleArrowUp,
//     footerIconColor: "#2da8b6",
//     footerValue: "8%",
//     footerPercentageColor: "#2da8b6",
//     imageSrc: cardLogo,
//     imageAlt: "card-logo",
//     imageWidth: 150,
//     imageHeight: 150,
//   },