export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Women" | "Men" | "Accessories";
  image: string;
  hoverImage: string;
  description: string;
  colors: string[];
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Oversized Linen Blazer",
    price: 8999,
    category: "Women",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    hoverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
    description: "A relaxed-shoulder blazer cut from 100% organic European linen. Unlined, breathable, and designed to soften with every wear.",
    colors: ["#1A1A1A", "#F5F0EA", "#9E8F82"],
  },
  {
    id: "p2",
    name: "Ribbed Cotton Tee",
    price: 2499,
    category: "Women",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600",
    hoverImage: "https://images.unsplash.com/photo-1496217590455-aa63a8550c23?w=600",
    description: "A second-skin ribbed tee in long-staple Pima cotton. The wardrobe foundation we wear weekly.",
    colors: ["#F5F0EA", "#1A1A1A", "#C1440E"],
  },
  {
    id: "p3",
    name: "Wide-Leg Trousers",
    price: 5499,
    category: "Women",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600",
    hoverImage: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600",
    description: "High-rise, sharply pleated, with a fluid drape. A modern interpretation of the editorial trouser.",
    colors: ["#1A1A1A", "#9E8F82"],
  },
  {
    id: "p4",
    name: "Merino Wool Coat",
    price: 8999,
    category: "Women",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
    hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
    description: "A double-faced Italian merino coat tailored in a longline silhouette. Heirloom construction.",
    colors: ["#1A1A1A", "#9E8F82", "#C1440E"],
  },
  {
    id: "p5",
    name: "Silk Slip Dress",
    price: 7499,
    category: "Women",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600",
    hoverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600",
    description: "Bias-cut from peace silk with adjustable straps. Effortless from breakfast to dinner.",
    colors: ["#F5F0EA", "#1A1A1A"],
  },
  {
    id: "p6",
    name: "Cargo Utility Pants",
    price: 4999,
    category: "Men",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    description: "Heavyweight ripstop cotton, generous through the leg, with hand-finished bartacks.",
    colors: ["#9E8F82", "#1A1A1A"],
  },
  {
    id: "p7",
    name: "Chunky Knit Sweater",
    price: 6499,
    category: "Men",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    description: "Hand-loomed in undyed alpaca and lambswool. Heavy in hand, light on the shoulders.",
    colors: ["#F5F0EA", "#9E8F82", "#1A1A1A"],
  },
  {
    id: "p8",
    name: "Leather Tote Bag",
    price: 8499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    description: "Vegetable-tanned full-grain leather, hand-stitched in our Mumbai atelier. Patinas with age.",
    colors: ["#1A1A1A", "#9E8F82", "#C1440E"],
  },
];

export const SIZES = ["XS", "S", "M", "L", "XL"];

export const formatPrice = (n: number) =>
  "₹" + n.toLocaleString("en-IN");
