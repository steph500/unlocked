import { nairobiImages } from "./cityImages";
import type { Tip } from "./types";

export const tips: Tip[] = [
  { cityId: "nairobi", section: "etiquette", title: "Greet people politely", note: "A simple greeting goes far before asking questions or prices.", image: nairobiImages.culture },
  { cityId: "nairobi", section: "etiquette", title: "Ask before taking photos", note: "Markets, people, and private spaces deserve consent first.", image: nairobiImages.culture },
  { cityId: "nairobi", section: "etiquette", title: "Keep small cash", note: "It helps with snacks, markets, tips, and small transport moments.", image: nairobiImages.food },
  { cityId: "nairobi", section: "etiquette", title: "Respect local spaces", note: "Move with curiosity, not entitlement. Some places are community first.", image: nairobiImages.culture },
  { cityId: "nairobi", section: "local", title: "Traffic can be heavy", note: "Plan ahead and avoid stacking cross-city plans during peak hours.", image: nairobiImages.transport },
  { cityId: "nairobi", section: "local", title: "Use trusted ride-hailing when unsure", note: "Especially at night, after events, or when you do not know the route.", image: nairobiImages.transport },
  { cityId: "nairobi", section: "local", title: "Keep valuables low-key", note: "Do not make your phone, camera, or cash the loudest thing in the room.", image: nairobiImages.nightlife },
  { cityId: "nairobi", section: "local", title: "Ask locals for current advice", note: "Nairobi changes by day, event, weather, and traffic mood.", image: nairobiImages.hero },
  { cityId: "nairobi", section: "movement", title: "Matatus are culture and transport", note: "Great with a local, confusing if you are brand new and rushing.", image: nairobiImages.transport },
  { cityId: "nairobi", section: "movement", title: "Pin the exact entrance", note: "Large venues and forests often have multiple gates or confusing drop-offs.", image: nairobiImages.transport }
];
