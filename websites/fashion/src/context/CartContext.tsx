import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  count: number;
  subtotal: number;
  wishlist: string[];
  toggleWish: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addItem = useCallback((product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === id && i.size === size)));
  }, []);

  const updateQty = useCallback((id: string, size: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === id && i.size === size ? { ...i, quantity: Math.max(0, qty) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, setOpen, addItem, removeItem, updateQty, count, subtotal, wishlist, toggleWish }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
