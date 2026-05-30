import { nairobiImages } from "./cityImages";
import type { Food } from "./types";

export const foods: Food[] = [
  { cityId: "nairobi", name: "Nyama Choma", note: "Grilled meat, best ordered slowly with kachumbari and ugali.", image: nairobiImages.food },
  { cityId: "nairobi", name: "Mandazi", note: "Soft fried dough, good with tea or as a quick street snack.", image: nairobiImages.food },
  { cityId: "nairobi", name: "Mutura", note: "A smoky street sausage with loyal fans. Ask where it is fresh.", image: nairobiImages.food },
  { cityId: "nairobi", name: "Smokie Pasua", note: "A split smokie loaded with kachumbari and sauce, pure Nairobi street energy.", image: nairobiImages.food },
  { cityId: "nairobi", name: "Samosa", note: "Crisp, spiced, and easy to find at cafes, kiosks, and snack counters.", image: nairobiImages.food }
];
