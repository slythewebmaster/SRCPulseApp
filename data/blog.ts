export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "art-of-turkish-mezze",
    title: "The Art of Turkish Mezze: Small Plates, Big Flavour",
    excerpt:
      "Why the mezze table is the heart of Turkish dining — and how our kitchen builds a spread worth lingering over.",
    content: [
      "In Turkey, a meal rarely begins with a single dish — it begins with a table. Mezze, the tradition of small shared plates, is less a course than a ritual: a slow unfolding of flavour meant to be enjoyed unhurried, in good company.",
      "At Bosphorus, our mezze board changes with the season, but a few anchors stay constant — silky hummus finished with aged olive oil, cool cacık bright with mint and garlic, and ezme salatası for those who like a little heat.",
      "The secret isn't complexity, it's restraint. Each plate is built around two or three ingredients, treated with enough care that they don't need anything else. Pull up a chair, order a few plates for the table, and let the meal find its own pace.",
    ],
    author: "Chef Emre Doğan",
    date: "2026-06-02",
    readTime: "4 min read",
    category: "Kitchen Notes",
    image: "https://loremflickr.com/1200/700/mezze,table",
  },
  {
    slug: "charcoal-and-patience-kebabs",
    title: "Charcoal and Patience: What Makes a Great Kebab",
    excerpt:
      "Our grill team on marination times, the right cut of lamb, and why the fire matters as much as the meat.",
    content: [
      "A great kebab is decided long before it touches the grill. Our Adana mix rests overnight, hand-minced with the fat left in — machine-ground meat loses the texture that makes Adana worth ordering.",
      "The charcoal matters too. We run our grill hot and close, so the outside chars in under a minute while the inside stays juicy. Too far from the coals and you steam the meat instead of grilling it.",
      "Come watch the grill station if you're curious — we keep it open to the dining room on purpose. Good kebab shouldn't be a mystery.",
    ],
    author: "Chef Emre Doğan",
    date: "2026-05-18",
    readTime: "5 min read",
    category: "Kitchen Notes",
    image: "https://loremflickr.com/1200/700/charcoal,grill",
  },
  {
    slug: "turkish-coffee-ritual",
    title: "Reading the Grounds: The Ritual of Turkish Coffee",
    excerpt:
      "Slow-brewed in a copper cezve and served with a glass of water — Turkish coffee is a pause built into the meal.",
    content: [
      "Turkish coffee is brewed, not filtered — finely ground beans simmered slowly in a cezve until a foam rises to the top. Rushed heat ruins it, so we brew each cup to order, low and unhurried.",
      "It's traditionally served with a small glass of water to cleanse the palate first, and a piece of Turkish delight on the side. In many households, the grounds left in the cup are read for fortune once the coffee is finished — a playful end to the evening.",
      "Order a cup after your meal and take your time with it. It's meant to be the last, slow note of the night, not a quick finish.",
    ],
    author: "Zeynep Aksoy, Front of House",
    date: "2026-04-27",
    readTime: "3 min read",
    category: "Culture",
    image: "https://loremflickr.com/1200/700/turkish,coffee",
  },
  {
    slug: "sourcing-accra-labone",
    title: "Why We Cook Turkish in Accra — and What Stays Local",
    excerpt:
      "Bringing Istanbul's flavours to Labone means knowing which ingredients to import and which to source from Ghana's own coast and markets.",
    content: [
      "Opening a Turkish kitchen in Accra means constant translation — not of language, but of ingredients. Some things we import: Antep pistachio for baklava, kaşar cheese, sumac, and Aleppo pepper travel with us because there's no substitute.",
      "But plenty of what lands on the mezze table is local. Our tomatoes, cucumbers, herbs, and much of our seafood come from markets right here around Accra — the sea bass on our grill is landed on Ghana's coast, not flown in.",
      "The result is a menu that's faithful to Istanbul but honestly shaped by where we are — a Bosphorus table with Labone roots.",
    ],
    author: "Chef Emre Doğan",
    date: "2026-03-14",
    readTime: "4 min read",
    category: "Our Story",
    image: "https://loremflickr.com/1200/700/market,produce",
  },
  {
    slug: "hosting-your-next-gathering",
    title: "Hosting at Bosphorus: A Guide to Booking the Terrace",
    excerpt:
      "From intimate dinners to full family gatherings, here's how our space and set menus work for private bookings.",
    content: [
      "Our terrace seats up to 24 guests and looks out over Ndabaningi Sithole Rd — a quieter corner of Labone, away from the main road noise but close enough to reach easily from Cantonments.",
      "For groups, we recommend our Family Feast set menu or a custom mezze-and-grill spread built around your guest count. Give us 48 hours' notice for parties over 10 so the grill team can plan ahead.",
      "Reach out through the Contact page or call us directly — we'll help you build a menu that fits the occasion, from a birthday dinner to a small work celebration.",
    ],
    author: "Zeynep Aksoy, Front of House",
    date: "2026-02-08",
    readTime: "3 min read",
    category: "Events",
    image: "https://loremflickr.com/1200/700/restaurant,terrace",
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
