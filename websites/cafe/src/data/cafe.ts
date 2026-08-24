export type MenuItem = {
  id: string;
  name: string;
  category: "Coffee" | "Beverages" | "Desserts" | "Snacks";
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  featured?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: "cappuccino",
    name: "Classic Cappuccino",
    category: "Coffee",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=1200&q=80",
    description: "A rich espresso topped with thick velvety foam and a delicate dusting of cocoa.",
    ingredients: ["Single shot espresso", "Steamed milk", "Microfoam", "Cocoa powder"],
    featured: true,
  },
  {
    id: "latte",
    name: "Vanilla Latte",
    category: "Coffee",
    price: 5.0,
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=1200&q=80",
    description: "Smooth espresso with steamed milk and a hint of Madagascar vanilla.",
    ingredients: ["Double espresso", "Steamed milk", "Vanilla syrup"],
    featured: true,
  },
  {
    id: "cold-brew",
    name: "Iced Cold Brew",
    category: "Coffee",
    price: 4.75,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1200&q=80",
    description: "Slow-steeped for 18 hours, this cold brew is bold, smooth, and refreshingly clean.",
    ingredients: ["Cold brew concentrate", "Filtered water", "Ice"],
    featured: true,
  },
  {
    id: "espresso",
    name: "Double Espresso",
    category: "Coffee",
    price: 3.25,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=1200&q=80",
    description: "Two shots of our signature blend. Bold, balanced, with notes of dark chocolate.",
    ingredients: ["House espresso blend"],
    featured: true,
  },
  {
    id: "mocha",
    name: "Mocha Delight",
    category: "Coffee",
    price: 5.25,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=1200&q=80",
    description: "Espresso meets Belgian dark chocolate, topped with whipped cream.",
    ingredients: ["Espresso", "Dark chocolate", "Steamed milk", "Whipped cream"],
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "Beverages",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=1200&q=80",
    description: "Ceremonial-grade matcha whisked with creamy oat milk.",
    ingredients: ["Ceremonial matcha", "Oat milk", "Honey"],
  },
  {
    id: "chai",
    name: "Spiced Chai",
    category: "Beverages",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&q=80",
    description: "House-spiced chai simmered with cardamom, cinnamon, and ginger.",
    ingredients: ["Black tea", "Cardamom", "Cinnamon", "Ginger", "Milk"],
  },
  {
    id: "hot-chocolate",
    name: "Belgian Hot Chocolate",
    category: "Beverages",
    price: 4.75,
    image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=1200&q=80",
    description: "Decadent melted Belgian chocolate with steamed milk and marshmallows.",
    ingredients: ["Belgian chocolate", "Whole milk", "Marshmallows"],
  },
  {
    id: "tiramisu",
    name: "Classic Tiramisu",
    category: "Desserts",
    price: 6.5,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=1200&q=80",
    description: "Layers of espresso-soaked ladyfingers and mascarpone cream.",
    ingredients: ["Mascarpone", "Ladyfingers", "Espresso", "Cocoa"],
  },
  {
    id: "cheesecake",
    name: "New York Cheesecake",
    category: "Desserts",
    price: 6.0,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1200&q=80",
    description: "Creamy, rich, baked to perfection with a buttery graham crust.",
    ingredients: ["Cream cheese", "Graham crust", "Vanilla", "Berry compote"],
  },
  {
    id: "croissant",
    name: "Almond Croissant",
    category: "Snacks",
    price: 4.25,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80",
    description: "Buttery, flaky French croissant filled with almond cream.",
    ingredients: ["Butter pastry", "Almond cream", "Sliced almonds"],
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "Snacks",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1200&q=80",
    description: "Sourdough toast with smashed avocado, chili flakes and lemon.",
    ingredients: ["Sourdough", "Avocado", "Chili", "Lemon", "Sea salt"],
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80",
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=900&q=80",
  "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=900&q=80",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=80",
];

export const testimonials = [
  {
    name: "Sophia Martinez",
    role: "Regular since 2019",
    text: "Brew Haven feels like home. The cappuccino is the best I've had outside of Italy, and the staff remember my order every time.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "James Chen",
    role: "Coffee enthusiast",
    text: "Their cold brew is liquid gold. I've tried every café in the city — nothing compares to the depth of flavor here.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Aisha Patel",
    role: "Remote worker",
    text: "The ambiance is perfect for working. Cozy nooks, free WiFi, and pastries that make every meeting better.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 50, suffix: "+", label: "Coffee Variants" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 4.9, suffix: "★", label: "Average Rating" },
];

export const timeline = [
  { year: "2014", title: "The Dream Begins", text: "Founder Marco opens a tiny 4-seat espresso bar on Mulberry Street." },
  { year: "2016", title: "First Roastery", text: "We start sourcing and roasting our own single-origin beans." },
  { year: "2019", title: "Brew Haven Reborn", text: "Move into our flagship space — the cozy haven you know today." },
  { year: "2022", title: "Award Winning", text: "Voted Best Independent Café in the city three years running." },
  { year: "2026", title: "A Community", text: "5,000+ regulars, 50+ drinks, one shared love for great coffee." },
];
