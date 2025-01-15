import { NextResponse } from "next/server";

const grothData = [
    { name: "January", value: 15, color: "#367992" },
    { name: "February", value: 8, color: "#FEC168" },
    { name: "March", value: 11, color: "#F4AD7F" },
    { name: "April", value: 10, color: "#D18885" },
    { name: "May", value: 12, color: "#9C7E8C" },
    { name: "June", value: 20, color: "#767FA1" },
    { name: "July", value: 12, color: "#5EA6B2" },
  ];
  

  export async function GET (){
    return NextResponse.json(grothData)
  }
