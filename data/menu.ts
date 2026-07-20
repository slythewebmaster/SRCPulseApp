export type MenuCategoryId =
  | "mezze"
  | "soups-salads"
  | "grills-kebabs"
  | "seafood"
  | "pide-lahmacun"
  | "desserts"
  | "beverages";

export type MenuItem = {
  id: string;
  categoryId: MenuCategoryId;
  name: string;
  turkishName?: string;
  description: string;
  price: number;
  image: string;
  tags?: Array<"Chef's Pick" | "Vegetarian" | "Vegan" | "Spicy" | "New">;
  spiceLevel?: 0 | 1 | 2 | 3;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  description: string;
};

export const currency = "GH₵";

export const menuCategories: MenuCategory[] = [
  { id: "mezze", label: "Mezze & Starters", description: "Small plates to share, straight from the Bosphorus shoreline" },
  { id: "soups-salads", label: "Soups & Salads", description: "Light, herb-forward dishes to open the appetite" },
  { id: "grills-kebabs", label: "Grills & Kebabs", description: "Charcoal-fired meats, marinated overnight in-house" },
  { id: "seafood", label: "Seafood", description: "Daily catch prepared the İstanbul way" },
  { id: "pide-lahmacun", label: "Pide & Lahmacun", description: "Stone-oven flatbreads, Turkish-style" },
  { id: "desserts", label: "Desserts", description: "Syrup-soaked classics and Turkish coffee pairings" },
  { id: "beverages", label: "Beverages", description: "Turkish coffee, tea, and refreshers" },
];

export const menuItems: MenuItem[] = [
  {
    id: "mezze-hummus",
    categoryId: "mezze",
    name: "Hummus Bosphorus",
    turkishName: "Humus",
    description: "Slow-cooked chickpeas, tahini, roasted pine nuts, aged olive oil.",
    price: 48,
    image: "https://loremflickr.com/800/600/hummus,mezze",
    tags: ["Vegan", "Chef's Pick"],
  },
  {
    id: "mezze-sigara-boregi",
    categoryId: "mezze",
    name: "Sigara Böreği",
    description: "Crisp filo rolls filled with feta and parsley, served with a herb yoghurt dip.",
    price: 52,
    image: "https://loremflickr.com/800/600/borek,pastry",
    tags: ["Vegetarian"],
  },
  {
    id: "mezze-cacik",
    categoryId: "mezze",
    name: "Cacık",
    description: "Chilled yoghurt, grated cucumber, garlic, mint, and a whisper of dill.",
    price: 38,
    image: "https://loremflickr.com/800/600/tzatziki,yogurt",
    tags: ["Vegetarian"],
  },
  {
    id: "mezze-ezme",
    categoryId: "mezze",
    name: "Ezme Salatası",
    description: "Hand-chopped tomato, pepper, and walnut relish with pomegranate molasses and Aleppo pepper.",
    price: 42,
    image: "https://loremflickr.com/800/600/tomato,relish",
    tags: ["Vegan", "Spicy"],
    spiceLevel: 2,
  },
  {
    id: "soup-mercimek",
    categoryId: "soups-salads",
    name: "Mercimek Çorbası",
    description: "Red lentil soup finished with sumac butter and a squeeze of lemon.",
    price: 36,
    image: "https://loremflickr.com/800/600/lentil,soup",
    tags: ["Vegetarian", "Chef's Pick"],
  },
  {
    id: "soup-shepherds-salad",
    categoryId: "soups-salads",
    name: "Çoban Salatası",
    description: "Diced tomato, cucumber, onion, parsley, and white cheese in lemon-olive oil dressing.",
    price: 44,
    image: "https://loremflickr.com/800/600/greek,salad",
    tags: ["Vegetarian"],
  },
  {
    id: "grill-adana",
    categoryId: "grills-kebabs",
    name: "Adana Kebab",
    description: "Hand-minced lamb, hot pepper, and spice blend, charcoal-grilled and served with grilled tomato and bulgur pilaf.",
    price: 145,
    image: "https://loremflickr.com/800/600/kebab,grill",
    tags: ["Chef's Pick", "Spicy"],
    spiceLevel: 2,
  },
  {
    id: "grill-shish",
    categoryId: "grills-kebabs",
    name: "Şiş Kebab",
    description: "Skewered marinated beef tenderloin, chargrilled, served with roasted vegetables.",
    price: 158,
    image: "https://loremflickr.com/800/600/shish,kebab",
  },
  {
    id: "grill-chicken",
    categoryId: "grills-kebabs",
    name: "Tavuk Şiş",
    description: "Yoghurt and paprika-marinated chicken skewers with garlic sauce.",
    price: 128,
    image: "https://loremflickr.com/800/600/chicken,skewer",
  },
  {
    id: "grill-mixed-grill",
    categoryId: "grills-kebabs",
    name: "Bosphorus Mixed Grill",
    description: "Adana, şiş beef, and chicken şiş for two, with rice pilaf, grilled vegetables, and flatbread.",
    price: 285,
    image: "https://loremflickr.com/800/600/mixed,grill",
    tags: ["Chef's Pick"],
  },
  {
    id: "seafood-sea-bass",
    categoryId: "seafood",
    name: "Grilled Sea Bass",
    description: "Whole sea bass, olive oil, lemon, and wild oregano, grilled over charcoal.",
    price: 195,
    image: "https://loremflickr.com/800/600/seabass,grilled",
    tags: ["Chef's Pick"],
  },
  {
    id: "seafood-prawns",
    categoryId: "seafood",
    name: "Karides Güveç",
    description: "Prawns baked in a clay pot with tomato, garlic, and kaşar cheese.",
    price: 168,
    image: "https://loremflickr.com/800/600/prawns,seafood",
  },
  {
    id: "seafood-calamari",
    categoryId: "seafood",
    name: "Kalamar Tava",
    description: "Lightly fried calamari rings with garlic yoghurt and lemon.",
    price: 112,
    image: "https://loremflickr.com/800/600/calamari,fried",
  },
  {
    id: "pide-mixed",
    categoryId: "pide-lahmacun",
    name: "Kıymalı Pide",
    description: "Stone-oven boat-shaped flatbread with minced beef, peppers, and melted cheese.",
    price: 78,
    image: "https://loremflickr.com/800/600/pide,flatbread",
  },
  {
    id: "pide-cheese",
    categoryId: "pide-lahmacun",
    name: "Kaşarlı Pide",
    description: "Molten kaşar cheese pide, blistered in the stone oven.",
    price: 68,
    image: "https://loremflickr.com/800/600/cheese,flatbread",
    tags: ["Vegetarian"],
  },
  {
    id: "lahmacun-classic",
    categoryId: "pide-lahmacun",
    name: "Lahmacun",
    description: "Thin, crisp dough topped with spiced minced lamb, served with parsley, onion, and lemon to roll.",
    price: 58,
    image: "https://loremflickr.com/800/600/lahmacun,flatbread",
    tags: ["Spicy"],
    spiceLevel: 1,
  },
  {
    id: "dessert-baklava",
    categoryId: "desserts",
    name: "Antep Baklava",
    description: "Twelve-layer filo, Antep pistachio, and clarified butter, soaked in light syrup.",
    price: 62,
    image: "https://loremflickr.com/800/600/baklava,dessert",
    tags: ["Chef's Pick"],
  },
  {
    id: "dessert-kunefe",
    categoryId: "desserts",
    name: "Künefe",
    description: "Shredded pastry, melted cheese, warm syrup, and crushed pistachio, served hot.",
    price: 66,
    image: "https://loremflickr.com/800/600/kunefe,dessert",
    tags: ["Chef's Pick", "New"],
  },
  {
    id: "dessert-sutlac",
    categoryId: "desserts",
    name: "Fırın Sütlaç",
    description: "Oven-baked rice pudding with a caramelised top, chilled and lightly spiced.",
    price: 44,
    image: "https://loremflickr.com/800/600/rice,pudding",
    tags: ["Vegetarian"],
  },
  {
    id: "bev-turkish-coffee",
    categoryId: "beverages",
    name: "Turkish Coffee",
    turkishName: "Türk Kahvesi",
    description: "Slow-brewed in copper cezve, served with Turkish delight.",
    price: 32,
    image: "https://loremflickr.com/800/600/turkish,coffee",
    tags: ["Chef's Pick"],
  },
  {
    id: "bev-cay",
    categoryId: "beverages",
    name: "Turkish Tea",
    turkishName: "Çay",
    description: "Double-brewed black tea, served in a tulip glass.",
    price: 18,
    image: "https://loremflickr.com/800/600/turkish,tea",
  },
  {
    id: "bev-ayran",
    categoryId: "beverages",
    name: "Ayran",
    description: "Chilled, lightly salted yoghurt drink.",
    price: 20,
    image: "https://loremflickr.com/800/600/yogurt,drink",
    tags: ["Vegetarian"],
  },
  {
    id: "bev-pomegranate",
    categoryId: "beverages",
    name: "Fresh Pomegranate Juice",
    description: "Cold-pressed pomegranate, no added sugar.",
    price: 34,
    image: "https://loremflickr.com/800/600/pomegranate,juice",
    tags: ["Vegan"],
  },
];

export function getMenuItemsByCategory(categoryId: MenuCategoryId) {
  return menuItems.filter((item) => item.categoryId === categoryId);
}

export function getMenuItemById(id: string) {
  return menuItems.find((item) => item.id === id);
}
