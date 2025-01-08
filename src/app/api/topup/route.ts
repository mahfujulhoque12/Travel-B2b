import { NextResponse } from "next/server";

// Static data for flight bookings
const topup = [
  {
    id: 1,
    paymentDate: "2024-12-22",
    accountNumber: "B123",
    accountName: "John report package",
    paymentType: "Recived",
    accountType: "NYC-LAX",
    ticketNumber: "T567",
    amount: "500",
    status: "booked",
    transactionNumber: "PNR456",
  },
  {
    id: 2,
    paymentDate: "2024-12-06",
    accountNumber: "B124",
    accountName: "Jane Doe",
    paymentType: "Pay",
    accountType: "LAX-SFO",
    ticketNumber: "T568",
    amount: "300",
    status: "hold",
    transactionNumber: "PNR457",
  },
  {
    id: 3,

    paymentDate: "2024-12-11",
    accountNumber: "B125",
    accountName: "Alice Smith",
    paymentType: "Recived",
    accountType: "SFO-NYC",
    ticketNumber: "T569",
    amount: "450",
    status: "booked",
    transactionNumber: "PNR458",
  },
  {
    id: 4,
 
    paymentDate: "2024-12-16",
    accountNumber: "B126",
    accountName: "Bob Johnson",
    paymentType: "Pay",
    accountType: "NYC-ATL",
    ticketNumber: "T570",
    amount: "700",
    status: "cancelled",
    transactionNumber: "PNR459",
  },
  {
    id: 5,

    paymentDate: "2024-12-21",
    accountNumber: "B127",
    accountName: "Carol Lee",
    paymentType: "Recived",
    accountType: "ATL-LAX",
    ticketNumber: "T571",
    amount: "600",
    status: "booked",
    transactionNumber: "PNR460",
  },
  ...Array.from({ length: 90 }, (_, i) => ({
    id: i + 6,
    paymentDate: `2024-11-${(i % 30) + 2}`,
    accountNumber: `B12${i + 8}`,
    accountName: `Passenger ${i + 6}`,
    paymentType: `Recived-${i +  6}`,
    accountType: `Route-${i + 6}`,
    ticketNumber: `T57${i + 2}`,
    amount: `${(i + 1) * 50}`,
    status: i % 3 === 0 ? "booked" : i % 3 === 1 ? "hold" : "cancelled",
    transactionNumber: `PNR46${i + 1}`,
  })),
];

// GET handler to fetch flight bookings with pagination
export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = topup.slice(startIndex, endIndex);

  const totalPages = Math.ceil(topup.length / limit);

  return NextResponse.json({
    page,
    limit,
    totalPages,
    totalItems: topup.length,
    data: paginatedData,
  });
}
