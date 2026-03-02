import { describe, expect, it } from "bun:test";
import { createOrderId, formatOrderDate } from "./orders";

describe("order utilities", () => {
  it("generates a prefixed order id", () => {
    const id = createOrderId(new Date("2026-03-02T10:20:30.000Z"));
    expect(id.startsWith("ORD-2603")).toBe(true);
  });

  it("formats order date for display", () => {
    expect(formatOrderDate("2026-03-02T10:20:30.000Z")).toBe("Mar 02, 2026");
  });
});
