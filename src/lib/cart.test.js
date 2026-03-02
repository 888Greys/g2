import { describe, expect, it } from "bun:test";
import { calculateItemCount, calculateSubtotal, sanitizeCartItems } from "./cart";

describe("cart utilities", () => {
  it("filters invalid cart records", () => {
    const validIds = new Set(["1", "2"]);
    const raw = [
      { gameId: "1", quantity: 2 },
      { gameId: "9", quantity: 1 },
      { gameId: "2", quantity: 0 },
      { gameId: "2", quantity: 3.2 },
      { gameId: "2", quantity: 1 },
    ];

    expect(sanitizeCartItems(raw, validIds)).toEqual([
      { gameId: "1", quantity: 2 },
      { gameId: "2", quantity: 1 },
    ]);
  });

  it("calculates item count and subtotal", () => {
    const items = [
      { gameId: "1", quantity: 2 },
      { gameId: "2", quantity: 1 },
    ];
    const prices = new Map([
      ["1", 10],
      ["2", 7.5],
    ]);

    expect(calculateItemCount(items)).toBe(3);
    expect(calculateSubtotal(items, prices)).toBe(27.5);
  });
});
