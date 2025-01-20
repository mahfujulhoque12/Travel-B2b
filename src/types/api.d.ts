interface Airline {
  name: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  stops: string;
}

interface Layover {
  layoverAirport: string;
}

export interface Flight {
  id: number;
  airlines: Airline[];
  price: number;
  originalPrice: number;
  flightType: string;
  refundable: boolean;
  badge: string;
  layoverDetails: Layover[];
}
