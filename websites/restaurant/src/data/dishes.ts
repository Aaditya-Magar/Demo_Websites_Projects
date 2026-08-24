import gulabJamunImg from "@/assets/dish-gulab-jamun.jpg";
import kulfiImg from "@/assets/dish-kulfi.jpg";
import masalaChaiImg from "@/assets/dish-masala-chai.jpg";
import mangoLassiImg from "@/assets/dish-mango-lassi.jpg";
import dalMakhaniImg from "@/assets/dish-dal-makhani.jpg";
import vegBiryaniImg from "@/assets/dish-veg-biryani.jpg";
import chickenTikkaImg from "@/assets/dish-chicken-tikka.jpg";
import chickenBiryaniImg from "@/assets/dish-chicken-biryani.jpg";
import rasmalaiImg from "@/assets/dish-rasmalai.jpg";
import sweetLassiImg from "@/assets/dish-sweet-lassi.jpg";
import palakPaneerImg from "@/assets/dish-palak-paneer.jpg";
import seekhKebabImg from "@/assets/dish-seekh-kebab.jpg";

export type Dish = {
  id: string;
  name: string;
  category: "Starters" | "Main Course" | "Biryani" | "Desserts" | "Beverages";
  price: number;
  veg: boolean;
  image: string;
  short: string;
  description: string;
  ingredients: string[];
  signature?: boolean;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const dishes: Dish[] = [
  // ===== STARTERS =====
  { id: "paneer-tikka", name: "Paneer Tikka", category: "Starters", price: 329, veg: true, signature: true,
    image: img("photo-1567188040759-fb8a883dc6d8"),
    short: "Charred paneer cubes marinated in spiced yogurt.",
    description: "Cubes of fresh paneer marinated in hung curd, ginger-garlic and royal spices, skewered with peppers and onions, then char-grilled in our clay tandoor.",
    ingredients: ["Paneer", "Hung curd", "Bell peppers", "Onions", "Tandoori masala", "Lemon"] },
  { id: "chicken-tikka", name: "Chicken Tikka", category: "Starters", price: 379, veg: false,
    image: chickenTikkaImg,
    short: "Char-grilled boneless chicken in royal spices.",
    description: "Boneless chicken marinated overnight in yogurt, ginger, garlic and aromatic spices, skewered and cooked in the tandoor till smoky and tender.",
    ingredients: ["Chicken breast", "Yogurt", "Ginger-garlic", "Tandoori masala", "Lemon", "Mint"] },
  { id: "seekh-kebab", name: "Seekh Kebab", category: "Starters", price: 399, veg: false,
    image: seekhKebabImg,
    short: "Spiced minced lamb skewers from the tandoor.",
    description: "Hand-minced lamb seasoned with green chilli, coriander and royal spices, moulded onto skewers and char-grilled till juicy and smoky.",
    ingredients: ["Lamb mince", "Onion", "Green chilli", "Coriander", "Garam masala"] },
  { id: "tandoori-platter", name: "Tandoori Platter", category: "Starters", price: 699, veg: false, signature: true,
    image: img("photo-1599487488170-d11ec9c172f0"),
    short: "Royal selection from the tandoor.",
    description: "An assortment of tandoori chicken, seekh kebab, malai tikka and reshmi kebab, served sizzling with mint chutney and onion salad.",
    ingredients: ["Chicken", "Lamb mince", "Yogurt marinade", "Royal spices", "Mint chutney"] },
  { id: "samosa", name: "Royal Samosa", category: "Starters", price: 149, veg: true,
    image: img("photo-1601050690597-df0568f70950"),
    short: "Crispy pastry filled with spiced potato.",
    description: "Hand-folded golden pastries stuffed with cumin-spiced potatoes and peas, served with tamarind and mint chutneys.",
    ingredients: ["Potato", "Peas", "Cumin", "Pastry", "Chutneys"] },

  // ===== MAIN COURSE =====
  { id: "butter-chicken", name: "Butter Chicken", category: "Main Course", price: 449, veg: false, signature: true,
    image: img("photo-1603894584373-5ac82b2ae398"),
    short: "Tender chicken in a velvety tomato-butter gravy.",
    description: "Our signature Butter Chicken is slow-simmered in a luxurious tomato gravy enriched with cream, butter and a delicate blend of royal spices. Marinated overnight and finished in the tandoor for that smoky aroma.",
    ingredients: ["Chicken thigh", "Tomato", "Cream", "Butter", "Kasuri methi", "Garam masala", "Ginger", "Garlic"] },
  { id: "dal-makhani", name: "Dal Makhani", category: "Main Course", price: 329, veg: true,
    image: dalMakhaniImg,
    short: "Slow-cooked black lentils in a creamy gravy.",
    description: "Whole urad dal simmered overnight on low heat with tomato, butter and cream — a Punjabi heirloom recipe.",
    ingredients: ["Black lentils", "Rajma", "Butter", "Cream", "Tomato", "Ginger"] },
  { id: "rogan-josh", name: "Rogan Josh", category: "Main Course", price: 479, veg: false,
    image: img("photo-1545247181-516773cae754"),
    short: "Kashmiri lamb curry with deep red gravy.",
    description: "Tender lamb braised in a Kashmiri chili gravy perfumed with fennel and dry ginger.",
    ingredients: ["Lamb", "Kashmiri chili", "Yogurt", "Fennel", "Dry ginger"] },
  { id: "palak-paneer", name: "Palak Paneer", category: "Main Course", price: 349, veg: true,
    image: palakPaneerImg,
    short: "Soft paneer in a silky spinach gravy.",
    description: "Fresh spinach blanched and pureed with garlic and green chilli, finished with cream and cubes of soft paneer.",
    ingredients: ["Spinach", "Paneer", "Garlic", "Green chilli", "Cream", "Cumin"] },

  // ===== BIRYANI =====
  { id: "hyderabadi-biryani", name: "Hyderabadi Biryani", category: "Biryani", price: 499, veg: false, signature: true,
    image: img("photo-1563379091339-03b21ab4a4f8"),
    short: "Aromatic long-grain rice layered with marinated lamb.",
    description: "Long-grain basmati and tender lamb dum-cooked in a sealed pot with saffron, fried onions, mint and a secret blend of 21 spices.",
    ingredients: ["Basmati rice", "Lamb", "Saffron", "Mint", "Fried onions", "Yogurt", "Whole spices"] },
  { id: "chicken-biryani", name: "Chicken Dum Biryani", category: "Biryani", price: 449, veg: false,
    image: chickenBiryaniImg,
    short: "Saffron basmati layered with marinated chicken.",
    description: "Tender chicken marinated in yogurt and spices, layered with fragrant basmati and slow-cooked on dum till every grain is perfumed.",
    ingredients: ["Basmati rice", "Chicken", "Yogurt", "Saffron", "Fried onions", "Mint"] },
  { id: "veg-biryani", name: "Vegetable Biryani", category: "Biryani", price: 379, veg: true,
    image: vegBiryaniImg,
    short: "Fragrant basmati with garden vegetables.",
    description: "Saffron-scented basmati layered with seasonal vegetables, fried onions and herbs, sealed in dum.",
    ingredients: ["Basmati", "Mixed vegetables", "Saffron", "Mint", "Cashews"] },

  // ===== DESSERTS =====
  { id: "gulab-jamun", name: "Gulab Jamun", category: "Desserts", price: 179, veg: true,
    image: gulabJamunImg,
    short: "Warm milk dumplings in cardamom syrup.",
    description: "Soft khoya dumplings fried to a deep amber and soaked in rose-cardamom syrup.",
    ingredients: ["Khoya", "Sugar", "Cardamom", "Rose water"] },
  { id: "kulfi", name: "Pistachio Kulfi", category: "Desserts", price: 199, veg: true,
    image: kulfiImg,
    short: "Traditional Indian frozen dessert.",
    description: "Slow-reduced milk kulfi flavoured with saffron and crowned with slivered pistachios.",
    ingredients: ["Milk", "Pistachios", "Saffron", "Sugar"] },
  { id: "rasmalai", name: "Rasmalai", category: "Desserts", price: 219, veg: true,
    image: rasmalaiImg,
    short: "Soft cheese discs in saffron milk.",
    description: "Pillowy paneer discs soaked in thickened cardamom-saffron milk, finished with crushed pistachios and rose petals.",
    ingredients: ["Paneer", "Milk", "Saffron", "Cardamom", "Pistachios"] },

  // ===== BEVERAGES =====
  { id: "masala-chai", name: "Masala Chai", category: "Beverages", price: 99, veg: true,
    image: masalaChaiImg,
    short: "Spiced Indian tea with milk.",
    description: "Strong Assam tea brewed with cardamom, ginger, cloves and creamy milk.",
    ingredients: ["Assam tea", "Milk", "Cardamom", "Ginger", "Cloves"] },
  { id: "mango-lassi", name: "Mango Lassi", category: "Beverages", price: 149, veg: true,
    image: mangoLassiImg,
    short: "Creamy yogurt drink with Alphonso mango.",
    description: "Thick, chilled yogurt blended with sweet Alphonso mango pulp and a hint of cardamom.",
    ingredients: ["Yogurt", "Alphonso mango", "Cardamom", "Sugar"] },
  { id: "sweet-lassi", name: "Sweet Lassi", category: "Beverages", price: 129, veg: true,
    image: sweetLassiImg,
    short: "Frothy yogurt drink in a clay kulhad.",
    description: "Hand-churned yogurt sweetened with sugar and a touch of rose, served frothy in a traditional clay cup.",
    ingredients: ["Yogurt", "Sugar", "Rose water", "Cardamom"] },
];

export const categories = ["Starters", "Main Course", "Biryani", "Desserts", "Beverages"] as const;

export const galleryImages = [
  "photo-1517248135467-4c7edcad34c4",
  "photo-1555396273-367ea4eb4db5",
  "photo-1567188040759-fb8a883dc6d8",
  "photo-1565557623262-b51c2513a641",
  "photo-1631452180519-c014fe946bc7",
  "photo-1542528180-a1208c5169a5",
  "photo-1514933651103-005eec06c04b",
  "photo-1552566626-52f8b828add9",
  "photo-1414235077428-338989a2e8c0",
  "photo-1503764654157-72d979d9af2f",
  "photo-1600891964092-4316c288032e",
  "photo-1585937421612-70a008356fbe",
].map((id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`);

export const testimonials = [
  { name: "Priya Sharma", role: "Food Blogger", text: "The Hyderabadi Biryani transported me straight to Charminar. Royal Spice House is the real deal." },
  { name: "Rahul Mehta", role: "Regular Guest", text: "Every visit feels like a celebration. The tandoor platter is unmatched in the city." },
  { name: "Aisha Kapoor", role: "Chef", text: "A masterclass in classical Indian flavours. Ambience is fit for royalty." },
  { name: "James O'Connor", role: "Traveller", text: "Best Indian meal I've had outside India. Service was warm and attentive." },
];
