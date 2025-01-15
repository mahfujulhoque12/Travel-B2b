"use client";
import { useRef, useState } from "react";
import FlightBookingData from "@/components/organisms/Booking/FlightBookingData";
import HotelBookingData from "@/components/organisms/Booking/HotelBookingData";
import PackageBookingData from "@/components/organisms/Booking/PackageBookingData";
import CarBookingData from "@/components/organisms/Booking/CarBookingData";
import TabNavigation from "@/components/molecules/global/TabNavigation";
import Loader from "@/components/molecules/global/Loader";
import { usePaginatedFetchData } from "@/hooks/useFetchData";
import { LuPlaneTakeoff, LuDownload, LuHotel } from "react-icons/lu";
import { IoPrintOutline } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";
import HajjUmrahData from "./HajjUmrahData";
import { GiPalmTree } from "react-icons/gi";
import { TiWorldOutline } from "react-icons/ti";
import VisaData from "./VisaData";
import { FaCar } from "react-icons/fa";
import { PiMosqueThin } from "react-icons/pi";
import Print from "@/components/molecules/global/Print";
import Export from "@/components/molecules/global/Export";

import { columns as hotelColumns } from "./HotelBookingData";
import { columns as carColumns } from "./CarBookingData";
import { columns as hajjColumns } from "./HajjUmrahData";
import { columns as flightColumns } from "./FlightBookingData";
import { columns as packageColumns } from "./PackageBookingData";
import { columns as visaColumns } from "./VisaData";

type Column = { key: string; label: string };
export type DataRecord = Record<string, unknown>;

const columnMap: Record<number, Column[]> = {
  0: flightColumns,
  1: hotelColumns,
  2: packageColumns,
  3: visaColumns,
  4: carColumns,
  5: hajjColumns,
};

const tabs = [
  { label: "Flight", icon: <LuPlaneTakeoff size={20} /> },
  { label: "Hotel", icon: <LuHotel size={20} /> },
  { label: "Package", icon: <GiPalmTree size={20} /> },
  { label: "Visa", icon: <TiWorldOutline size={20} /> },
  { label: "Car", icon: <FaCar size={20} /> },
  { label: "Hajj & Umrah", icon: <PiMosqueThin size={20} /> },
];

const apiUrls: string[] = [
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/flight-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/hotel-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/package-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/visa`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/car-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/hajj-umrah`,
];

const BookingTableWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPages, setCurrentPages] = useState<number[]>(
    Array(tabs.length).fill(1)
  );
  const [printData, setPrintData] = useState<DataRecord[]>([]);
  const [showPrint, setShowPrint] = useState(false);
  const exportRef = useRef<{ handleExport: () => void } | null>(null);
  const limit = 12;

  const { data, isLoading, error, totalPages } = usePaginatedFetchData(
    apiUrls,
    activeTab,
    currentPages[activeTab],
    limit
  );

  const handlePageChange = (tabIndex: number, page: number) => {
    setCurrentPages((prev) => {
      const updatedPages = [...prev];
      updatedPages[tabIndex] = page;
      return updatedPages;
    });
  };

  const handlePrint = () => {
    const activeData = data[apiUrls[activeTab]] || [];
    setPrintData(activeData as DataRecord[]);
    setShowPrint(true);
  };

  const handleExport = () => {
    if (exportRef.current) {
      exportRef.current.handleExport();
    }
  };

  const buttons = [
    {
      label: "Filter",
      onClick: () => console.log("Filter clicked"),
      icon: <RiFilter2Line size={20} />,
      className: "bg-[#FCAA22] hover:bg-[#ffb53d]",
    },
    {
      label: "Export",
      onClick: handleExport,
      icon: <LuDownload size={20} />,
      className: "bg-[#20B038] hover:bg-[#257a33]",
    },
    {
      label: "Print",
      onClick: handlePrint,
      icon: <IoPrintOutline size={20} />,
      className: "bg-[#1768D0] hover:bg-[#2e77d7]",
    },
  ];

  const renderTabContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    switch (activeTab) {
      case 0:
        return (
          <FlightBookingData
            data={data[apiUrls[0]] || []}
            currentPage={currentPages[0]}
            totalPages={totalPages}
            onPageChange={(page: number) => handlePageChange(0, page)}
            actionButton={buttons}
          />
        );
      case 1:
        return (
          <HotelBookingData
            data={data[apiUrls[1]] || []}
            currentPage={currentPages[1]}
            totalPages={totalPages}
            onPageChange={(page: number) => handlePageChange(1, page)}
            actionButton={buttons}
          />
        );
      case 2:
        return (
          <PackageBookingData
            data={data[apiUrls[2]] || []}
            currentPage={currentPages[2]}
            totalPages={totalPages}
            onPageChange={(page: number) => handlePageChange(2, page)}
            actionButton={buttons}
          />
        );
      case 3:
        return (
          <VisaData
            data={data[apiUrls[3]] || []}
            currentPage={currentPages[3]}
            totalPages={totalPages}
            onPageChange={(page: number) => handlePageChange(3, page)}
            actionButton={buttons}
          />
        );
      case 4:
        return (
          <CarBookingData
            data={data[apiUrls[4]] || []}
            currentPage={currentPages[4]}
            totalPages={totalPages}
            onPageChange={(page: number) => handlePageChange(4, page)}
            actionButton={buttons}
          />
        );
      case 5:
        return (
          <HajjUmrahData
            data={data[apiUrls[5]] || []}
            currentPage={currentPages[5]}
            totalPages={totalPages}
            onPageChange={(page: number) => handlePageChange(5, page)}
            actionButton={buttons}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-5 rounded-md dark:bg-darkPrimaryBg">
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
      <div>{renderTabContent()}</div>

      <Export
        ref={exportRef}
        columns={columnMap[activeTab]}
        data={data[apiUrls[activeTab]] || []}
        onExportComplete={() => console.log("Export completed!")}
      />
      {showPrint && (
        <Print
          title={"Booking Table Data"}
          data={printData}
          columns={columnMap[activeTab]}
          onClose={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default BookingTableWrapper;
