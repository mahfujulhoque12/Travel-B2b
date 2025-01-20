"use client";
import React, { useState } from "react";
import Image from "next/image";
import flightLogo from "@/assets/images/flights-logo/flights-logo.png";
import airlinesMoving from "@/assets/images/flights-logo/airlines-moving.png";
import airlinesMoving2 from "@/assets/images/flights-logo/airlines-moving-2.png";
import CardTitle from "@/components/atoms/CardTitle";
import CardDescription from "@/components/atoms/CardDescription";
import Span from "@/components/atoms/Span";
import Badge from "@/components/atoms/Badge";
import { BookingCheckIcon, MultipleAirplaneIcon } from "@/components/atoms";
import { Button } from "@/components/atoms/Button";
import { ChevronDown, ChevronRightIcon } from "lucide-react";
import locationStart from "@/assets/images/flights-logo/location-start.png";
import locationEnd from "@/assets/images/flights-logo/location-end.png";
import airlinesMoving3 from "@/assets/images/flights-logo/airplane-moving-3.png";
import Paragraph from "@/components/atoms/Paragraph";
import NavigationTab from "./NavigationTab";
import { Flight } from "@/types/api";

interface NavigationItem {
  label: string;
  duration?: string;
  isActive: boolean;
}

const initialNavigationItems: NavigationItem[] = [
  { label: "DAC - TR", duration: "12 hr 30 min", isActive: true },
  { label: "TR - DAC", duration: "11 hr 45 min", isActive: false },
];

const initialNavigationItemsTwo: NavigationItem[] = [
  { label: "Baggage", isActive: true },
  { label: "Policy", isActive: false },
];

interface AirlinesCardProps {
  flights: Flight[];
}

const FlightsCard: React.FC<AirlinesCardProps> = ({ flights }) => {
  const [viewInfoStates, setViewInfoStates] = useState<{
    [key: number]: boolean;
  }>({});

  // State for tabs, indexed by flight ID
  const [tabStates, setTabStates] = useState<{
    [key: number]: { activeTab: string; activeTabTwo: string };
  }>(
    flights.reduce((acc, flight) => {
      acc[flight.id] = { activeTab: "DAC - TR", activeTabTwo: "Baggage" };
      return acc;
    }, {} as { [key: number]: { activeTab: string; activeTabTwo: string } })
  );

  const viewInformation = (id: number) => {
    setViewInfoStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle tab click for specific flight ID
  const handleTabClick = (id: number, label: string) => {
    setTabStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], activeTab: label },
    }));
  };

  const handleTabClickTwo = (id: number, label: string) => {
    setTabStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], activeTabTwo: label },
    }));
  };

  const renderActiveSection = (id: number) => {
    const activeTab = tabStates[id]?.activeTab || "DAC - TR";
    switch (activeTab) {
      case "DAC - TR":
        return (
          <div className="flex flex-col space-y-10">
            <div className="flex items-center">
              <div className="basis-1/6 pl-1">
                <Image src={locationStart} alt="location-start" />
              </div>
              <div className="px-2 flex items-center py-3 bg-[#F5F7FA] basis-5/6 justify-between rounded-tl-md rounded-bl-md">
                <Span className="text-sm font-semibold text-[#243045]">
                  Departure from Dhaka{" "}
                </Span>
                <Span className="text-sm font-semibold text-dark-blue">
                  Terminal 3 Hazrat Shahjalal International Airport
                </Span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="basis-1/12">
                  <Image src={flightLogo} alt="flight-logo" />
                </div>

                <div className="flex items-center basis-11/12">
                  <div className="basis-full text-center">
                    <CardTitle className="text-xl font-bold text-dark-blue">
                      DAC - DXB
                    </CardTitle>
                    <Span className="text-blue-gray text-sm font-normal">
                      02 hr 30 min
                    </Span>
                  </div>

                  <div className="basis-full text-center">
                    <CardTitle className="text-xl font-bold text-dark-blue">
                      09:15 Pm
                    </CardTitle>
                    <Span className="text-dark-blue text-sm font-normal">
                      1 Oct Tuesday
                    </Span>
                  </div>

                  <div className="flex items-center flex-col gap-1 basis-full text-center">
                    <CardTitle className="text-sm font-normal text-blue-gray">
                      07h 40m
                    </CardTitle>
                    <Image src={airlinesMoving} alt="airlines-moving" />
                    <Span className={`text-sm font-semibold text-aqua-breeze `}>
                      1 Stop Via Dubai
                    </Span>
                  </div>

                  <div className="basis-full text-center">
                    <CardTitle className="text-xl font-bold text-dark-blue">
                      09:15 Pm
                    </CardTitle>
                    <Span className="text-dark-blue text-sm font-normal">
                      1 Oct Tuesday
                    </Span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="basis-1/12">
                  <Image src={airlinesMoving3} alt="airlines-moving-3" />
                </div>

                <div className="basis-11/12 flex justify-center">
                  <div className="flex flex-col basis-full text-center">
                    <Span className="text-sm font-semibold">
                      Emirates Airlines
                    </Span>
                    <Span className="text-blue-gray text-sm font-normal">
                      Airbus 36n
                    </Span>
                  </div>

                  <div className="flex flex-col basis-full text-center">
                    <Span className="text-sm font-semibold">
                      Flight No: AI238
                    </Span>
                    <Span className="text-blue-gray text-sm font-normal">
                      Class: Economy - Y(U)
                    </Span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="basis-1/6 text-center pl-1">
                  <Image src={locationStart} alt="location-start" />
                </div>
                <div className="px-2 flex items-center py-3 bg-[#F5F7FA] basis-5/6 justify-between rounded-tl-md rounded-bl-md">
                  <Span className="text-sm font-semibold text-[#243045]">
                    Layover at Dubai 7 hr 40 min
                  </Span>
                  <Span className="text-sm font-semibold text-dark-blue">
                    Terminal 3: Dubai International Airport
                  </Span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="basis-1/12">
                  <Image src={flightLogo} alt="flight-logo" />
                </div>

                <div className="flex items-center basis-11/12">
                  <div className="basis-full text-center">
                    <CardTitle className="text-xl font-bold text-dark-blue">
                      DAC - DXB
                    </CardTitle>
                    <Span className="text-blue-gray text-sm font-normal">
                      02 hr 30 min
                    </Span>
                  </div>

                  <div className="basis-full text-center">
                    <CardTitle className="text-xl font-bold text-dark-blue">
                      09:15 Pm
                    </CardTitle>
                    <Span className="text-dark-blue text-sm font-normal">
                      1 Oct Tuesday
                    </Span>
                  </div>

                  <div className="flex items-center flex-col gap-1 basis-full text-center">
                    <CardTitle className="text-sm font-normal text-blue-gray">
                      07h 40m
                    </CardTitle>
                    <Image src={airlinesMoving} alt="airlines-moving" />
                    <Span className={`text-sm font-semibold text-aqua-breeze `}>
                      1 Stop Via Dubai
                    </Span>
                  </div>

                  <div className="basis-full text-center">
                    <CardTitle className="text-xl font-bold text-dark-blue">
                      09:15 Pm
                    </CardTitle>
                    <Span className="text-dark-blue text-sm font-normal">
                      1 Oct Tuesday
                    </Span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="basis-1/12">
                  <Image src={airlinesMoving3} alt="airlines-moving-3" />
                </div>

                <div className="basis-11/12 flex justify-center">
                  <div className="flex flex-col basis-full text-center">
                    <Span className="text-sm font-semibold">
                      Emirates Airlines
                    </Span>
                    <Span className="text-blue-gray text-sm font-normal">
                      Airbus 36n
                    </Span>
                  </div>

                  <div className="flex flex-col basis-full text-center">
                    <Span className="text-sm font-semibold">
                      Flight No: AI238
                    </Span>
                    <Span className="text-blue-gray text-sm font-normal">
                      Class: Economy - Y(U)
                    </Span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="basis-1/6 text-center pl-1">
                  <Image src={locationEnd} alt="location-end" />
                </div>
                <div className="px-2 flex items-center py-3 bg-[#F5F7FA] basis-5/6 justify-between rounded-tl-md rounded-bl-md">
                  <Span className="text-sm font-semibold text-[#243045]">
                    Layover at Dubai 7 hr 40 min
                  </Span>
                  <Span className="text-sm font-semibold text-dark-blue">
                    Terminal 3: Dubai International Airport
                  </Span>
                </div>
              </div>
            </div>
          </div>
        );
      case "TR - DAC":
        return <></>;
      default:
        return null;
    }
  };

  const renderActiveSectionTwo = (id: number) => {
    const activeTabTwo = tabStates[id]?.activeTabTwo || "Baggage";
    switch (activeTabTwo) {
      case "Baggage":
        return (
          <div className="space-y-3">
            <Paragraph className="text-sm font-normal text-dark-blue">
              Refunds and Date Changes are done as per the following policies.
            </Paragraph>
            <Paragraph className="text-sm font-normal text-dark-blue">
              Refund is calculated by deducting Airline’s fee and ST fee from
              the paid amount.
            </Paragraph>
            <Paragraph>
              Date Change fee is calculated by adding Airline’s fee, fare
              difference and ST fee.
            </Paragraph>
            <Paragraph className="font-semibold text-[16px]">
              *Fees are shown for all traveler
            </Paragraph>
            <Paragraph className="text-sm font-normal text-dark-blue">
              *ST Convenience fee is non-refundable. We cannot guarantee the
              accuracy of airline refund/date change fees as they are subject to
              change without prior notice.
            </Paragraph>
          </div>
        );
      case "Policy":
        return (
          <div className="space-y-3">
            <Paragraph className="text-sm font-normal text-dark-blue">
              Date Change fee is calculated by adding Airline’s fee, fare
              difference and ST fee.
            </Paragraph>
            <Paragraph className="text-sm font-normal text-dark-blue">
              Refund is calculated by deducting Airline’s fee and ST fee from
              the paid amount.
            </Paragraph>
            <Paragraph>
              Refunds and Date Changes are done as per the following policies.
            </Paragraph>
            <Paragraph className="font-semibold text-[16px]">
              *Fees are shown for all traveler
            </Paragraph>
            <Paragraph className="text-sm font-normal text-dark-blue">
              *ST Convenience fee is non-refundable. We cannot guarantee the
              accuracy of airline refund/date change fees as they are subject to
              change without prior notice.
            </Paragraph>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 overflow-hidden">
      {flights.length === 0 && (
        <div className="max-w-2xl mx-auto h-[500px] flex items-center justify-center text-center">
          <div className="space-y-3">
            <CardTitle>
              We didn&apos;t find any suitable option for your Search!
            </CardTitle>
            <Paragraph>
              We’ve searched more than 100 airlines that we sell, and couldn’t
              find any flights on these dates. Please try changing your search
              details.
            </Paragraph>
            <Button className="bg-blue-gradient px-4 py-2.5 rounded-full">
              <Span className="text-white font-semibold text-sm">
                Reset Filters
              </Span>
            </Button>
          </div>
        </div>
      )}
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="space-y-4 shadow-light-shadow rounded-md px-5 py-3.5"
        >
          <div className="flex gap-1">
            <div className="flex w-full flex-col space-y-6 px-2">
              {flight.airlines.map((airline, index) => (
                <div key={index} className="flex items-center w-full">
                  <div className="flex gap-3 w-full">
                    <div className="flex items-center">
                      <Image src={flightLogo} alt="flight-logo" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <CardTitle className="text-sm font-bold text-dark-blue">
                        {airline.name}
                      </CardTitle>
                      <CardDescription className="text-sm font-normal text-blue-gray">
                        {airline.flightNumber}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center flex-col gap-1 w-full">
                    <CardTitle className="text-lg font-bold text-dark-blue">
                      {airline.departureTime}
                    </CardTitle>
                    <CardDescription className="text-sm font-normal text-blue-gray">
                      {airline.origin}
                    </CardDescription>
                  </div>

                  <div className="flex items-center flex-col gap-1 w-full">
                    <CardTitle className="text-sm font-normal text-blue-gray">
                      {airline.duration}
                    </CardTitle>
                    <Image
                      src={index === 0 ? airlinesMoving : airlinesMoving2}
                      alt="airlines-moving"
                    />
                    <Span
                      className={`${
                        index === 0 ? "text-aqua-breeze" : "text-royal-plum"
                      } text-sm font-semibold`}
                    >
                      {airline.stops}
                    </Span>
                  </div>

                  <div className="flex items-center flex-col gap-1 w-full">
                    <CardTitle className="text-lg font-bold text-dark-blue">
                      {airline.arrivalTime}
                    </CardTitle>
                    <CardDescription className="text-sm font-normal text-blue-gray">
                      {airline.destination}
                    </CardDescription>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-light-grayish-blue py-2 pl-9 pr-3 rounded-md text-right  flex items-center">
              <div className="space-y-3">
                <Badge className="flex bg-spring-awakening p-1">
                  <BookingCheckIcon />
                  <Span className="text-[10px] font-semibold text-white">
                    {flight.badge}
                  </Span>
                </Badge>
                <div>
                  <CardTitle className="text-lg font-bold text-midnight-teal">
                    ${flight.price.toFixed(2)}
                  </CardTitle>
                  <Span className="text-xs line-through text-blue-gray">
                    ${flight.originalPrice.toFixed(2)}
                  </Span>
                </div>
                <div>
                  <Button className="flex gap-1 items-center bg-blue-gradient text-white px-3 py-1.5 rounded-full">
                    <Span className="text-xs">Select</Span>
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-light-grayish-blue flex justify-between px-5 py-3 rounded-md">
            <div>
              <Badge className="flex gap-1 bg-[#EEFFC8] px-2 py-1.5 rounded-md">
                <MultipleAirplaneIcon />
                <Span className="text-[10px] font-semibold text-black">
                  {flight.flightType}
                </Span>
              </Badge>
            </div>
            <div>
              <Button
                className="gradient-text text-xs font-semibold"
                onClick={() => viewInformation(flight.id)}
              >
                View Details
                <ChevronDown
                  className={`w-4 h-4 text-blue-500 transition-transform ${
                    viewInfoStates[flight.id] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Button>
            </div>
          </div>

          {viewInfoStates[flight.id] && (
            <div className="flex py-3.5 gap-4">
              <div className="basis-full sm:basis-9/12 space-y-6">
                <NavigationTab
                  items={initialNavigationItems.map((item, index) => ({
                    ...item,
                    isActive: tabStates[flight.id]?.activeTab
                      ? item.label === tabStates[flight.id]?.activeTab
                      : index === 0,
                  }))}
                  onTabClick={(label) => handleTabClick(flight.id, label)}
                />
                {renderActiveSection(flight.id)}
              </div>
              <div className="basis-full sm:basis-3/12 bg-light-grayish-blue">
                <div className="px-5 mt-3.5 space-y-4">
                  <NavigationTab
                    items={initialNavigationItemsTwo.map((item, index) => ({
                      ...item,
                      isActive: tabStates[flight.id]?.activeTabTwo
                        ? item.label === tabStates[flight.id]?.activeTabTwo
                        : index === 0, // Default to the first tab if no active tab is set
                    }))}
                    onTabClick={(label) => handleTabClickTwo(flight.id, label)}
                  />
                  {renderActiveSectionTwo(flight.id)}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlightsCard;
