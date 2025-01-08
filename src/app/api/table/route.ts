import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    {
      id: 1,
      issueDate: '2024-01-01',
      bookingDate: '2024-01-02',
      bookingID: 'B123',
      passangerName: 'John Doe',
      flightDate: '2024-01-03',
      route: 'NYC-LAX',
      ticketNumber: 'T567',
      totalPrice: '$500',
      status:"Booked",
      actionPrimaryLabel: 'PNR456',
    },
    {
      id: 2,
      issueDate: '2024-02-01',
      bookingDate: '2024-02-02',
      bookingID: 'B456',
      passangerName: 'Jane Smith',
      flightDate: '2024-02-03',
      route: 'LAX-SFO',
      ticketNumber: 'T890',
      totalPrice: '$300',
      status:"Hold",
      actionPrimaryLabel: 'PNR456',
    },
    {
      id: 3,
      issueDate: '2024-02-01',
      bookingDate: '2024-02-02',
      bookingID: 'B456',
      passangerName: 'Jane Smith',
      flightDate: '2024-02-03',
      route: 'LAX-SFO',
      ticketNumber: 'T890',
      totalPrice: '$800',
      status:"Cancelled",
      actionPrimaryLabel: 'PNR452',
    },
  ];

  return NextResponse.json(data);
}
