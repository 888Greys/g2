import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { games } from "../data/games";

type CartItem = {
  gameId: string;
  quantity: number;
};

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

const priceLookup = new Map(games.map(game => [game.id, game.currentPrice]));

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (gameId: string, quantity = 1) => {
    if (quantity <= 0) {
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

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const price = priceLookup.get(item.gameId) ?? 0;
      return total + price * item.quantity;
    }, 0);
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
