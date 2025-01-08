import { NextResponse } from "next/server";

// Static data for flight bookings
const flightBookings = [
  {
    id: 1,
    address: "dhaka",
    lastName: "badon",
    email: "badon@gmail.com",
    firstName: "John Doe flight",
    dateOfBirth: "2024-12-25",
    phoneNumber: "NYC-LAX",
    ticketNumber: "T567",
    totalPrice: "500",
    status: "booked",
    actionPrimaryLabel: "PNR456",
  },
  {
    id: 2,
    address: "dhaka",
    lastName: "badon",
    email: "B124",
    firstName: "Jane Doe",
    dateOfBirth: "2024-12-10",
    phoneNumber: "LAX-SFO",
    ticketNumber: "T568",
    totalPrice: "300",
    status: "hold",
    actionPrimaryLabel: "PNR457",
  },
  {
    id: 3,
    address: "dhaka",
    lastName: "badon",
    email: "B125",
    firstName: "Alice Smith",
    dateOfBirth: "2024-12-20",
    phoneNumber: "SFO-NYC",
    ticketNumber: "T569",
    totalPrice: "450",
    status: "booked",
    actionPrimaryLabel: "PNR458",
  },
  {
    id: 4,
    address: "dhaka",
    lastName: "badon",
    email: "B126",
    firstName: "Bob Johnson",
    dateOfBirth: "2024-12-23",
    phoneNumber: "NYC-ATL",
    ticketNumber: "T570",
    totalPrice: "700",
    status: "cancelled",
    actionPrimaryLabel: "PNR459",
  },
  {
    id: 5,
    address: "dhaka",
    lastName: "badon",
    email: "B127",
    firstName: "Carol Lee",
    dateOfBirth: "2024-12-28",
    phoneNumber: "ATL-LAX",
    ticketNumber: "T571",
    totalPrice: "600",
    status: "booked",
    actionPrimaryLabel: "PNR460",
  },
  ...Array.from({ length: 90 }, (_, i) => ({
    id: i + 6,
    address: `Dhaka-${i + 6}`,
    lastName: `Passenger ${i + 6}`,
    email: `B12${i + 8}`,
    firstName: `Passenger ${i + 6}`,
    dateOfBirth: `2024-12-${(i % 30) + 5}`,
    phoneNumber: `Route-${i + 6}`,
    ticketNumber: `T57${i + 2}`,
    totalPrice: `${(i + 1) * 50}`,
    status: i % 3 === 0 ? "booked" : i % 3 === 1 ? "hold" : "cancelled",
    actionPrimaryLabel: `PNR46${i + 1}`,
  })),
];

// GET handler to fetch flight bookings with pagination
export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = flightBookings.slice(startIndex, endIndex);

  const totalPages = Math.ceil(flightBookings.length / limit);

  return NextResponse.json({
    page,
    limit,
    totalPages,
    totalItems: flightBookings.length,
    data: paginatedData,
  });
}
