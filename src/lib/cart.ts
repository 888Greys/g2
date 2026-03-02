export type CartItem = {
  gameId: string;
  quantity: number;
};

export function sanitizeCartItems(raw: unknown, validGameIds: Set<string>): CartItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter((item): item is CartItem => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const gameId = "gameId" in item ? item.gameId : undefined;
    const quantity = "quantity" in item ? item.quantity : undefined;

    return (
      typeof gameId === "string" &&
      validGameIds.has(gameId) &&
      typeof quantity === "number" &&
      Number.isInteger(quantity) &&
      quantity > 0
    );
  });
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function calculateSubtotal(items: CartItem[], priceLookup: Map<string, number>): number {
  return items.reduce((total, item) => {
    const price = priceLookup.get(item.gameId) ?? 0;
    return total + price * item.quantity;
  }, 0);
}
