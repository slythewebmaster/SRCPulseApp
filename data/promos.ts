export type Promo = {
  id: string;
  title: string;
  description: string;
  detail: string;
  badge: string;
  image: string;
  validity: string;
  code?: string;
};

export const promos: Promo[] = [
  {
    id: "sunset-set-menu",
    title: "Bosphorus Sunset Set Menu",
    description: "Three courses inspired by the strait at golden hour — mezze, a chargrilled main, and baklava.",
    detail:
      "Begin with a trio of chef's mezze, move to your choice of Adana kebab or grilled sea bass, and finish with warm Antep baklava and Turkish coffee. Ideal for date nights.",
    badge: "GH₵149 per person",
    image: "https://loremflickr.com/1000/600/turkish,dinner",
    validity: "Every evening, 5–8 PM",
    code: "SUNSET",
  },
  {
    id: "business-lunch",
    title: "Weekday Business Lunch",
    description: "A quick, refined two-course lunch for the Labone/Cantonments crowd — in and out within the hour.",
    detail:
      "Choose a soup or salad, a main from our weekday selection, and a Turkish tea, all served promptly for the lunch rush.",
    badge: "GH₵85 per person",
    image: "https://loremflickr.com/1000/600/business,lunch",
    validity: "Mon–Fri, 12–3 PM",
    code: "MIDDAY",
  },
  {
    id: "family-feast",
    title: "Family Feast Sunday",
    description: "Bosphorus Mixed Grill for the table, shared mezze, and dessert on us for parties of 4+.",
    detail:
      "Gather the family for our signature mixed grill platter, a full mezze spread, and complimentary künefe to close — a Sunday tradition on the terrace.",
    badge: "15% off for 4+ guests",
    image: "https://loremflickr.com/1000/600/family,feast",
    validity: "Sundays, all day",
    code: "FAMILY15",
  },
  {
    id: "loyalty-baklava",
    title: "Baklava Loyalty Reward",
    description: "Order five times through the app and your sixth dessert is on the house.",
    detail:
      "Every online order earns a stamp. Collect five and redeem a free Antep baklava or künefe on your next visit or delivery order.",
    badge: "Free dessert on your 6th order",
    image: "https://loremflickr.com/1000/600/baklava,pistachio",
    validity: "Ongoing — online orders only",
  },
];

export function getPromoById(id: string) {
  return promos.find((promo) => promo.id === id);
}
