import { NextResponse } from "next/server";
import user from "/public/currentTravel/travel.png";
const travelers = [
    { id: 1, name: "John Doe", email: "user1@example.com", amount: "$584", image: user.src },
    { id: 2, name: "Jane Smith", email: "user2@example.com", amount: "$450", image: user.src },
    { id: 3, name: "Michael Brown", email: "user3@example.com", amount: "$375", image: user.src },
    { id: 4, name: "Emily White", email: "user4@example.com", amount: "$610", image: user.src },
    { id: 5, name: "Chris Green", email: "user5@example.com", amount: "$490", image: user.src },
    { id: 6, name: "Sarah Blue", email: "user6@example.com", amount: "$520", image: user.src },
    { id: 7, name: "Chris Green", email: "user7@example.com", amount: "$490", image: user.src },
    { id: 8, name: "Sarah Blue", email: "user8@example.com", amount: "$520", image: user.src },
  ];

  export async function GET(){
    return NextResponse.json(travelers)
  }