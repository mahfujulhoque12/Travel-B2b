import { NextResponse } from "next/server";

// Sample data
const carData = [
  {
    name: "Oct",
    Income: 3490,
    Expense: 4300,
    amt: "0k $",
  },
  {
    name: "Nov",
    Income: 3000,
    Expense: 2500,
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
    Income: 3500,
    Expense: 3800,
    amt: 2000,
  },
  {
    name: "Feb",
    Income: 2400,
    Expense: 2800,
    amt: 2181,
  },
  {
    name: "March",
    Income: 2900,
    Expense: 3400,
    amt: 2500,
  },
  {
    name: "car",
    Income: 3490,
    Expense: 4300,
    amt: 2100,
  },
];

// API route handler
export async function GET() {
  return NextResponse.json(carData);
}
