// booking endpoint URLs
export const bookingEndPointUrls: string[] = [
  `${process.env.NEXT_PUBLIC_API_URL}/api/flight-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/hotel-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/package-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/visa`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/car-booking`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/hajj-umrah`,
];

// refund endpoint URLs
export const refundEndPointUrls = [
  `${process.env.NEXT_PUBLIC_API_URL}/api/refund-flight`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/refund-hotel`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/refund-package`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/refund-car`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/hajj-umrah`,
];

// transaction endpoint URLs
export const transactionEndPointUrls = `${process.env.NEXT_PUBLIC_API_URL}/api/transection`;

// topup endpoint URLs
export const topupEndPointUrls = `${process.env.NEXT_PUBLIC_API_URL}/api/topup`;

// report endpoint URLs
export const reportEndPointUrls = [
  `${process.env.NEXT_PUBLIC_API_URL}/api/report-flight`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/report-hotel`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/report-package`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/report-car`,
  `${process.env.NEXT_PUBLIC_API_URL}/api/report-hajj`,
];
