import { describe, expect, it } from "bun:test";
import { displayNameFromEmail, isStrongPassword, isValidEmail } from "./validation";

describe("validation utilities", () => {
  it("validates email format", () => {
    expect(isValidEmail("person@example.com")).toBe(true);
    expect(isValidEmail("bad-email")).toBe(false);
  });

  it("validates minimum password strength", () => {
    expect(isStrongPassword("12345678")).toBe(true);
    expect(isStrongPassword("short")).toBe(false);
  });

  it("derives display name from email local part", () => {
    expect(displayNameFromEmail("alex.johnson@example.com")).toBe("Alex Johnson");
  });
});
