import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { games } from "../data/games";
import { type CartItem } from "../lib/cart";
import { type Order, createOrderId } from "../lib/orders";

type CreateOrderInput = {
  items: CartItem[];
  deliveryEmail: string;
  paymentMethod: string;
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
};

type OrdersContextValue = {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
};

const ORDERS_STORAGE_KEY = "gamekey-market-orders-v1";
const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

function readStoredOrders(): Order[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((order): order is Order => {
      if (!order || typeof order !== "object") {
        return false;
      }

      const id = "id" in order ? order.id : undefined;
      const createdAtIso = "createdAtIso" in order ? order.createdAtIso : undefined;
      const total = "total" in order ? order.total : undefined;
      const deliveryEmail = "deliveryEmail" in order ? order.deliveryEmail : undefined;
      const items = "items" in order ? order.items : undefined;

      return (
        typeof id === "string" &&
        typeof createdAtIso === "string" &&
        typeof total === "number" &&
        typeof deliveryEmail === "string" &&
        Array.isArray(items)
      );
    });
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(readStoredOrders);

  const createOrder = (input: CreateOrderInput): Order => {
    const now = new Date();
    const order: Order = {
      id: createOrderId(now),
      createdAtIso: now.toISOString(),
      status: "Processing",
      subtotal: input.subtotal,
      serviceFee: input.serviceFee,
      tax: input.tax,
      total: input.total,
      paymentMethod: input.paymentMethod,
      deliveryEmail: input.deliveryEmail,
      items: input.items
        .map(item => {
          const game = games.find(g => g.id === item.gameId);
          if (!game) {
            return null;
          }
          return {
            gameId: game.id,
            title: game.title,
            platform: game.platform,
            unitPrice: game.currentPrice,
            quantity: item.quantity,
          };
        })
        .filter(item => item !== null),
    };

    setOrders(prev => {
      const nextOrders = [order, ...prev];
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
      return nextOrders;
    });

    return order;
  };

  const value = useMemo(
    () => ({
      orders,
      createOrder,
    }),
    [orders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
}
