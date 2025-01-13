import { NextResponse } from "next/server";

// Sample data
const flightData = [
  {
    name: "Oct",
    Income: 3490,
    Expense: 43000,
    amt: 150,
  },
  {
    name: "Nov",
    Income: 30000,
    Expense: 25000,
    amt: 2210,
  },
  {
    name: "Dec",
    Income: 2800,
    Expense: 3200,
    amt: 2290,
  },
  {
    name: "Jan",
    Income: 35000,
    Expense: 3800,
    amt: 2000,
  },
  {
    name: "Feb",
    Income: 2400,
    Expense: 28000,
    amt: 2181,
  },
  {
    name: "March",
    Income: 29000,
    Expense: 3400,
    amt: 2500,
  },
  {
    name: "Hajj",
    Income: 3490,
    Expense: 43000,
    amt: 2100,
  },
];

// API route handler
export async function GET() {
  return NextResponse.json(flightData);
}
