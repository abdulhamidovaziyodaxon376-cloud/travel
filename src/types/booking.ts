export type RoomType = "Standard" | "Deluxe" | "Penthouse" | "VIP Suite";

export type Amenity =
  | "Wi-Fi"
  | "Air conditioning"
  | "Pool"
  | "Breakfast"
  | "Ocean view"
  | "Spa"
  | "Gym"
  | "Balcony";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  pricePerNight: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  amenities: Amenity[];
  images: string[];
  badge?: string;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  amenities: Amenity[];
  capacity: number;
  roomType: RoomType | "Any room";
}

export interface BookingDetails {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentMethod: "Card" | "Click" | "Payme";
}