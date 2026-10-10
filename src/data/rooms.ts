import type { Room } from "@/types/booking";

export const rooms: Room[] = [
  {
    id: "coastline-suite", name: "Coastline Suite", type: "Deluxe",
    description: "A light-filled retreat with uninterrupted sea views and a private balcony.",
    pricePerNight: 185, capacity: 2, rating: 4.98, reviewCount: 128,
    amenities: ["Wi-Fi", "Air conditioning", "Breakfast", "Ocean view", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    ], badge: "Guest favorite",
  },
  {
    id: "garden-house", name: "Garden House", type: "Standard",
    description: "Quiet, considered comfort tucked beside the hotel's lush courtyard.",
    pricePerNight: 120, capacity: 2, rating: 4.91, reviewCount: 86,
    amenities: ["Wi-Fi", "Air conditioning", "Breakfast", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "azure-penthouse", name: "Azure Penthouse", type: "Penthouse",
    description: "A generous top-floor hideaway made for slow mornings above the water.",
    pricePerNight: 340, capacity: 4, rating: 4.99, reviewCount: 54,
    amenities: ["Wi-Fi", "Air conditioning", "Pool", "Breakfast", "Ocean view", "Spa", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ], badge: "Rare find",
  },
  {
    id: "terrace-villa", name: "Terrace Villa", type: "VIP Suite",
    description: "An intimate private villa with its own terrace, plunge pool, and spa access.",
    pricePerNight: 275, capacity: 3, rating: 4.96, reviewCount: 72,
    amenities: ["Wi-Fi", "Air conditioning", "Pool", "Breakfast", "Spa", "Gym", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "harbor-loft", name: "Harbor Loft", type: "Deluxe",
    description: "An airy corner room where natural textures meet a view of the harbor.",
    pricePerNight: 210, capacity: 3, rating: 4.87, reviewCount: 43,
    amenities: ["Wi-Fi", "Air conditioning", "Breakfast", "Ocean view", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    id: "palm-residence", name: "Palm Residence", type: "VIP Suite",
    description: "A spacious suite with a separate living room and a sheltered garden patio.",
    pricePerNight: 295, capacity: 5, rating: 4.94, reviewCount: 61,
    amenities: ["Wi-Fi", "Air conditioning", "Pool", "Breakfast", "Spa", "Gym", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    ],
  },
];