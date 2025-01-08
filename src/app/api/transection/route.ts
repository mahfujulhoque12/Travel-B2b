import { NextResponse } from "next/server";

// Static data for flight bookings
const transection = [
  {
    id: 1,
    transectionId: "2021",
    trxDate: "2024-12-22",
    bookingID: "B123",
    ticketNumber: "T567",
    amount: "500",
    status: "booked",
    pnr: "PNR456",
  },
  {
    id: 2,
    transectionId: "2023",
    trxDate: "2024-12-06",
    bookingID: "B124",
    ticketNumber: "T568",
    amount: "300",
    status: "hold",
    pnr: "PNR457",
  },
  {
    id: 3,
    transectionId: "2024",
    trxDate: "2024-12-11",
    bookingID: "B125",
    ticketNumber: "T569",
    amount: "450",
    status: "booked",
    pnr: "PNR458",
  },
  {
    id: 4,
    transectionId: "20245",
    trxDate: "2024-12-16",
    bookingID: "B126",
    ticketNumber: "T570",
    amount: "700",
    status: "cancelled",
    pnr: "PNR459",
  },
  {
    id: 5,
    transectionId: "20223",
    trxDate: "2024-12-21",
    bookingID: "B127",
    ticketNumber: "T571",
    amount: "600",
    status: "booked",
    pnr: "PNR460",
  },
  ...Array.from({ length: 90 }, (_, i) => ({
    id: i + 6,
    transectionId: `202${(i % 30) + 1}`,
    trxDate: `2024-11-${(i % 30) + 2}`,
    bookingID: `B12${i + 8}`,
    ticketNumber: `T57${i + 2}`,
    amount: `${(i + 1) * 50}`,
    status: i % 3 === 0 ? "booked" : i % 3 === 1 ? "hold" : "cancelled",
    pnr: `PNR46${i + 1}`,
  })),
];

// GET handler to fetch flight bookings with pagination
export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = transection.slice(startIndex, endIndex);

  const totalPages = Math.ceil(transection.length / limit);

  return NextResponse.json({
    page,
    limit,
    totalPages,
    totalItems: transection.length,
    data: paginatedData,
  });
}
