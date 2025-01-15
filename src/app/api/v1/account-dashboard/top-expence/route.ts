import { NextResponse } from "next/server";

const topClinets = [
    { id: 1, invoiceId: "JLK152824", date: "21 may, 13:23", amount: "$584.22",  },
    { id: 2, invoiceId: "JLK152824", date: "21 may, 13:23", amount: "$450.88",  },
    { id: 3, invoiceId: "JLK152824", date: "21 may, 13:23", amount: "$375.32",  },
    { id: 4, invoiceId: "JLK152824", date: "21 may, 13:23", amount: "$610.25",  },
    { id: 5, invoiceId: "JLK152824", date: "21 may, 13:23", amount: "$490.21",  },
    { id: 6, invoiceId: "JLK152824", date: "21 may, 13:23", amount: "$520.25",  },
    { id: 7, invoiceId:"JLK152824", date: "21 may, 13:23", amount: "$490.21",  },
    { id: 8, invoiceId:"JLK152824", date: "21 may, 13:23", amount: "$520.12",  },
  ];

  export async function GET(){
    return NextResponse.json(topClinets)
  }