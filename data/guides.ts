import type { Guide } from "./types";

export const guides: Guide[] = [
  {
    id: "amina-culture-walks",
    cityId: "nairobi",
    name: "Amina",
    specialty: "Markets, food stops, and cultural context",
    languages: ["English", "Swahili", "Sheng"],
    rating: 4.9,
    priceEstimate: "From KES 3,500",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    intro: "Best for first-timers who want warm context and zero clipboard-tour energy."
  },
  {
    id: "kevo-street-culture",
    cityId: "nairobi",
    name: "Kevo",
    specialty: "Street culture, matatu routes, music, and murals",
    languages: ["English", "Swahili", "Sheng"],
    rating: 4.8,
    priceEstimate: "From KES 4,000",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    intro: "For people who want the city pulse, not a polished postcard."
  },
  {
    id: "njeri-green-nairobi",
    cityId: "nairobi",
    name: "Njeri",
    specialty: "Karura, coffee, calm neighborhoods, and slow city days",
    languages: ["English", "Swahili"],
    rating: 4.9,
    priceEstimate: "From KES 3,000",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
    intro: "A good match when you want Nairobi soft, green, and unhurried."
  }
];
