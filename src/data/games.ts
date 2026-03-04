export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  platform: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  rating: number;
  seller: string;
  category?: "games" | "software" | "gift-cards" | "gear" | "subscriptions";
  isTrending?: boolean;
  isBestseller?: boolean;
}

export const games: Game[] = [
  {
    id: "1",
    title: "Elden Ring: Shadow of the Erdtree",
    coverUrl: "/images/catalog/rpg-cover.avif",
    platform: "Steam",
    originalPrice: 39.99,
    currentPrice: 34.99,
    discount: 12,
    rating: 4.9,
    seller: "GameKeysStore",
    isTrending: true,
    isBestseller: true,
  },
  {
    id: "2",
    title: "Helldivers 2",
    coverUrl: "/images/catalog/coop-shooter.webp",
    platform: "Steam",
    originalPrice: 39.99,
    currentPrice: 31.50,
    discount: 21,
    rating: 4.8,
    seller: "DigitalPlay",
    isTrending: true,
    isBestseller: true,
  },
  {
    id: "3",
    title: "Dragon's Dogma 2",
    coverUrl: "/images/catalog/fantasy-cover-a.avif",
    platform: "Steam",
    originalPrice: 69.99,
    currentPrice: 45.99,
    discount: 34,
    rating: 4.2,
    seller: "KeyMaster",
    isTrending: true,
  },
  {
    id: "4",
    title: "Cyberpunk 2077: Phantom Liberty",
    coverUrl: "/images/catalog/scifi-arena.webp",
    platform: "GOG.com",
    originalPrice: 29.99,
    currentPrice: 22.49,
    discount: 25,
    rating: 4.7,
    seller: "CDPR_Fan",
    isBestseller: true,
  },
  {
    id: "5",
    title: "Baldur's Gate 3",
    coverUrl: "/images/catalog/fantasy-cover-b.avif",
    platform: "Steam",
    originalPrice: 59.99,
    currentPrice: 53.99,
    discount: 10,
    rating: 5.0,
    seller: "LarianStore",
    isBestseller: true,
  },
  {
    id: "6",
    title: "Horizon Forbidden West Complete Edition",
    coverUrl: "/images/catalog/action-cover.avif",
    platform: "Steam",
    originalPrice: 59.99,
    currentPrice: 41.99,
    discount: 30,
    rating: 4.6,
    seller: "SonyKeys",
    isTrending: true,
  },
  {
    id: "7",
    title: "Ghost of Tsushima DIRECTOR'S CUT",
    coverUrl: "/images/catalog/marathon-art.webp",
    platform: "Steam",
    originalPrice: 59.99,
    currentPrice: 49.99,
    discount: 16,
    rating: 4.9,
    seller: "SamuraiGames",
    isTrending: true,
  },
  {
    id: "8",
    title: "Palworld",
    coverUrl: "/images/catalog/scifi-arena.webp",
    platform: "Steam",
    originalPrice: 29.99,
    currentPrice: 26.99,
    discount: 10,
    rating: 4.5,
    seller: "PocketKeys",
    isBestseller: true,
  },
  {
    id: "9",
    title: "EA SPORTS FC 24",
    coverUrl: "/images/catalog/ea-fc.webp",
    platform: "EA App",
    originalPrice: 69.99,
    currentPrice: 19.99,
    discount: 71,
    rating: 3.8,
    seller: "SportsHub",
    isBestseller: true,
  },
  {
    id: "10",
    title: "Red Dead Redemption 2",
    coverUrl: "/images/catalog/rpg-cover.avif",
    platform: "Rockstar",
    originalPrice: 59.99,
    currentPrice: 15.99,
    discount: 73,
    rating: 4.9,
    seller: "CowboyStore",
    isBestseller: true,
  }
];
