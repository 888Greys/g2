import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { games } from "../data/games";
import {
  calculateItemCount,
  calculateSubtotal,
  sanitizeCartItems,
  type CartItem,
} from "../lib/cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (gameId: string, quantity?: number) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  removeItem: (gameId: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "gamekey-market-cart-v1";
const validGameIds = new Set(games.map(game => game.id));
const priceLookup = new Map(games.map(game => [game.id, game.currentPrice]));

function readStoredItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    return sanitizeCartItems(parsed, validGameIds);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredItems);

  const addItem = (gameId: string, quantity = 1) => {
    if (quantity <= 0 || !validGameIds.has(gameId)) {
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.gameId === gameId);
      if (existing) {
        return prev.map(item =>
          item.gameId === gameId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { gameId, quantity }];
    });
  };

  const updateQuantity = (gameId: string, quantity: number) => {
    if (!validGameIds.has(gameId)) {
      return;
    }

    setItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.gameId !== gameId);
      }

      return prev.map(item => (item.gameId === gameId ? { ...item, quantity } : item));
    });
  };

  const removeItem = (gameId: string) => {
    setItems(prev => prev.filter(item => item.gameId !== gameId));
  };

  const clear = () => setItems([]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const itemCount = useMemo(
    () => calculateItemCount(items),
    [items]
  );

  const subtotal = useMemo(() => {
    return calculateSubtotal(items, priceLookup);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      itemCount,
      subtotal,
    }),
    [items, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
