import React from "react";
import Flights from "@/components/molecules/flight-list/Flights";

function FlightsWrapper({
  terminals,
}: {
  terminals: { city: string; airport: string; iataCode: string }[];
}) {
  return (
    <div className="px-5 py-5">
      <Flights terminals={terminals} />
    </div>
  );
}

export default FlightsWrapper;
