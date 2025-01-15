import { NextResponse } from "next/server";

// Sample data
const visaData = [
  {
    name: "Sep",
    Income: 2500,
    Expense: 4300,
    amt: 24000,
  },
  {
    name: "Nov",
    Income: 3000,
    Expense: 2500,
    amt: 22210,
  },
  {
    name: "Dec",
    Income: 2800,
    Expense: 3200,
    amt: 22950,
  },
  {
    name: "Jan",
    Income: 3500,
    Expense: 3800,
    amt: 20000,
  },
  {
    name: "Feb",
    Income: 2400,
    Expense: 2800,
    amt: 215281,
  },
  {
    name: "March",
    Income: 2900,
    Expense: 3400,
    amt: 2500,
  },
  {
    name: "visa",
    Income: 3490,
    Expense: 4300,
    amt: 21050,
  },
];

// API route handler
export async function GET() {
  return NextResponse.json(visaData);
}
