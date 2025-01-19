export interface BookingDataType {
  id: number;
  issueDate: string;
  bookingDate: string;
  bookingID: string;
  passengerName: string;
  flightDate: string;
  route: string;
  ticketNumber: string;
  totalPrice: string;
  status: string;
  actionPrimaryLabel: string;
}

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

export interface HajjUmrahPackage {
  id: number;
  packageType: "Hajj" | "Umrah";
  packageCategory: "Economy" | "Luxury" | "Budget" | "Standard";
  title: string;
  location: string;
  description: string;
  rating: number;
  totalReviews: number;
  reviewAvatars: string[];
  peopleReviewed: number;
  price: number;
  discountPrice: number;
  flightIncluded: boolean;
  hotelDistance: number;
  hotelStars: number;
  image: string;
}

export interface Hotel {
  id: number;
  name: string;
  coverImage: string;
  thumbnails: string[];
  starRating: number;
  location: string;
  description: string;
  totalReviews: number;
  userAvatars: string[];
  availability: boolean;
  originalPrice: number;
  discountPrice: number;
  bookNowAction: string;
  facilities: string[];
  roomViews: string[];
  locationRange: string;
  mealOptions: string[];
  houseRules: string[];
}

export interface PackageType {
  id: number;
  name: string;
  coverImage: string;
  thumbnails: string[];
  starRating: number;
  location: string;
  description: string;
  totalReviews: number;
  userAvatars: string[];
  availability: boolean;
  originalPrice: number;
  discountPrice: number;
  bookNowAction: string;
  facilities: string[];
  roomViews: string[];
  locationRange: string;
  mealOptions: string[];
  houseRules: string[];
}

export interface Car {
  id: number;
  name: string;
  coverImage: string;
  thumbnails: string[];
  starRating: number;
  type: string;
  fuelType: string;
  location: string;
  description: string;
  totalReviews: number;
  userAvatars: string[];
  availability: boolean;
  originalPricePerDay: number;
  discountPricePerDay: number;
  bookNowAction: string;
  features: string[];
  seatingCapacity: number;
  pax: number;
  rangePerCharge: string;
  transmission: string;
  houseRules: string[];
}
export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  timeToRead: string;
  imageUrl: string;
  createdAt: string;
}

interface Address {
  line1: string;
  line2: string;
  state: string;
  city: string;
  country: string;
  zip: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  emails: string[];
  phoneNumbers: string[];
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isChangingPassword: boolean;
  addresses: Address[];
}
