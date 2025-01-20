import { NextResponse } from "next/server";

export async function GET() {
  const flightTerminals = [
    {
      id: "DAC",
      city: "Dhaka",
      airport: "Hazrat Shahjalal International Airport",
      iataCode: "DAC",
    },
    {
      id: "JFK",
      city: "New York",
      airport: "John F. Kennedy International Airport",
      iataCode: "JFK",
    },
    { id: "LHR", city: "London", airport: "Heathrow Airport", iataCode: "LHR" },
    {
      id: "DXB",
      city: "Dubai",
      airport: "Dubai International Airport",
      iataCode: "DXB",
    },
    {
      id: "NRT",
      city: "Tokyo",
      airport: "Narita International Airport",
      iataCode: "NRT",
    },
    {
      id: "SYD",
      city: "Sydney",
      airport: "Sydney Kingsford Smith Airport",
      iataCode: "SYD",
    },
    {
      id: "CDG",
      city: "Paris",
      airport: "Charles de Gaulle Airport",
      iataCode: "CDG",
    },
  ];

  // Return sorted data for better UX
  const sortedTerminals = flightTerminals.sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  return NextResponse.json({ terminals: sortedTerminals });
}
