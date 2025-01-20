"use client";
import React, { useState } from "react";
import TripTypeSelector from "@/components/molecules/search/TripTypeSelector";
import { LuPlaneTakeoff, LuHotel } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import { PiMosqueThin } from "react-icons/pi";
import { GiPalmTree } from "react-icons/gi";
import { TiWorldOutline } from "react-icons/ti";
import FlightSearchForOneWayForm from "@/components/molecules/search/FlightSearchForOneWayForm";

import FlightSearchForRoundTripForm from "@/components/molecules/search/FlightSearchForRoundTripForm";
import FlightSearchForMultipleCityForm from "@/components/molecules/search/FlightSearchForMultipleCityForm";

import HotelBookingSearchForm from "@/components/molecules/search/HotelBookingSearchForm";

import HolidaySearchForm from "@/components/molecules/search/HolidaySearchForm";
import CarSearchForm from "@/components/molecules/search/CarSearchForm";
import TabNavigation from "@/components/molecules/global/TabNavigation";

const tabs = [
  { label: "Flight", icon: <LuPlaneTakeoff size={20} /> },
  { label: "Hotel", icon: <LuHotel size={20} /> },
  { label: "Package", icon: <GiPalmTree size={20} /> },
  { label: "Visa", icon: <TiWorldOutline size={20} /> },
  { label: "Car", icon: <FaCar size={20} /> },
  { label: "Hajj & Umrah", icon: <PiMosqueThin size={20} /> },
];

const BookingSystem = ({
  terminals,
}: {
  terminals: { city: string; airport: string; iataCode: string }[];
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTripForFlight, setSelectedTripForFlight] =
    useState("round-trip");
  const [selectedTripForHotel, setSelectedTripForHotel] =
    useState("upto-four-rooms");
  const [selectedTripHolidays, setSelectedTripHolidays] =
    useState("hill-mountains");
  const [selectedTripCars, setSelectedTripCars] = useState("round-trip");

  const tripOptionsForFlight = [
    { label: "One Way", value: "one-way" },
    { label: "Round Trip", value: "round-trip" },
    { label: "Multi City", value: "multi-city" },
  ];

  const tripOptionsForHotel = [
    { label: "Upto 4 Rooms", value: "upto-four-rooms" },
    { label: "Group Deals", value: "group-deals" },
  ];

  const tripOptionsForHolidays = [
    { label: "Easy Visa Destination", value: "easy-visa-destination" },
    { label: "Populer Destination", value: "populer-destination" },
    { label: "Honeymoon", value: "honeymoon" },
    { label: "Hill & Mountains", value: "hill-mountains" },
    { label: "Beach", value: "beach" },
  ];

  const tripOptionsForCars = [
    { label: "One Way", value: "one-way" },
    { label: "Round Trip", value: "round-trip" },
    { label: "Airport Transfer", value: "airport-transfer" },
    { label: "Hourly Rentals", value: "hourly-rentals" },
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <TripTypeSelector
              tripOptions={tripOptionsForFlight}
              selectedTrip={selectedTripForFlight}
              handleSelection={setSelectedTripForFlight}
            />
            {selectedTripForFlight === "one-way" && (
              <FlightSearchForOneWayForm terminals={terminals} />
            )}
            {selectedTripForFlight === "round-trip" && (
              <FlightSearchForRoundTripForm terminals={terminals} />
            )}
            {selectedTripForFlight === "multi-city" && (
              <FlightSearchForMultipleCityForm terminals={terminals} />
            )}
          </>
        );
      case 1:
        return (
          <>
            <TripTypeSelector
              tripOptions={tripOptionsForHotel}
              selectedTrip={selectedTripForHotel}
              handleSelection={setSelectedTripForHotel}
            />
            {selectedTripForHotel === "upto-four-rooms" && (
              <HotelBookingSearchForm terminals={terminals} />
            )}
          </>
        );
      case 2:
        return (
          <>
            <TripTypeSelector
              tripOptions={tripOptionsForHolidays}
              selectedTrip={selectedTripHolidays}
              handleSelection={setSelectedTripHolidays}
            />
            {selectedTripHolidays === "hill-mountains" && (
              <HolidaySearchForm terminals={terminals} />
            )}
          </>
        );
      case 3:
        return <div>Visa Booking Section</div>;
      case 4:
        return (
          <>
            <TripTypeSelector
              tripOptions={tripOptionsForCars}
              selectedTrip={selectedTripCars}
              handleSelection={setSelectedTripCars}
            />
            {selectedTripCars === "round-trip" && (
              <CarSearchForm terminals={terminals} />
            )}
          </>
        );
      case 5:
        return <div>Hajj & Umrah Booking Section</div>;
      default:
        return null;
    }
  };

  return (
    <div className="px-5 py-2 space-y-5">
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
      <div className="shadow-md space-y-5 p-5">{renderActiveSection()}</div>
    </div>
  );
};

export default BookingSystem;
