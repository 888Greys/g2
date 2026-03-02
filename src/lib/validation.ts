export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isStrongPassword(value: string): boolean {
  return value.trim().length >= 8;
}

export function displayNameFromEmail(email: string): string {
  const localPart = email.trim().split("@")[0] ?? "gamer";
  if (localPart.length === 0) {
    return "Gamer";
  }

  const normalized = localPart.replace(/[._-]+/g, " ");
  return normalized
    .split(" ")
    .filter(Boolean)
    .map(chunk => chunk[0]!.toUpperCase() + chunk.slice(1))
    .join(" ");
}
