export type OrderStatus = "Processing" | "Delivered" | "Issue reported";

export type OrderLine = {
  gameId: string;
  title: string;
  platform: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  createdAtIso: string;
  status: OrderStatus;
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
  deliveryEmail: string;
  items: OrderLine[];
};

export function createOrderId(now: Date): string {
  const y = now.getFullYear().toString().slice(-2);
  const m = `${now.getMonth() + 1}`.padStart(2, "0");
  const d = `${now.getDate()}`.padStart(2, "0");
  const stamp = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`.padStart(6, "0");
  const suffix = `${Math.floor(Math.random() * 900) + 100}`;
  return `ORD-${y}${m}${d}-${stamp}${suffix}`;
}

export function formatOrderDate(dateIso: string): string {
  const date = new Date(dateIso);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}
