import { Link, useNavigate, useParams } from "react-router-dom";
import { Star, ShieldCheck, Truck, Clock, CheckCircle2, BadgePercent } from "lucide-react";
import { games } from "../data/games";
import { GameCard } from "../components/GameCard";
import NotFound from "./NotFound";
import { useCart } from "../context/CartContext";

const detailsById: Record<string, {
  description: string;
  highlights: string[];
  genres: string[];
  publisher: string;
  developer: string;
  releaseDate: string;
  edition: string;
  region: string;
  delivery: string;
  screenshots: string[];
}> = {
  "1": {
    description:
      "Explore a new chapter of the Lands Between with fresh bosses, weapons, and storylines crafted for veteran Tarnished.",
    highlights: [
      "New open zones with legacy dungeons",
      "Expanded weapon classes and ashes of war",
      "Additional NPC questlines",
      "Optimized for Steam Deck",
    ],
    genres: ["Action RPG", "Open World", "Soulslike"],
    publisher: "Bandai Namco",
    developer: "FromSoftware",
    releaseDate: "June 21, 2024",
    edition: "Shadow of the Erdtree",
    region: "Global",
    delivery: "Instant key delivery",
    screenshots: [
      "https://picsum.photos/seed/eldenring-1/900/600",
      "https://picsum.photos/seed/eldenring-2/900/600",
      "https://picsum.photos/seed/eldenring-3/900/600",
    ],
  },
  "2": {
    description:
      "Deploy with your squad in a relentless co-op shooter that demands coordination, precision, and tactical gear.",
    highlights: [
      "4-player co-op missions",
      "Live service warfronts",
      "Customizable loadouts",
      "Anti-tank, support, and recon roles",
    ],
    genres: ["Shooter", "Co-op", "Live Service"],
    publisher: "PlayStation Publishing",
    developer: "Arrowhead",
    releaseDate: "February 8, 2024",
    edition: "Standard",
    region: "Global",
    delivery: "Instant key delivery",
    screenshots: [
      "https://picsum.photos/seed/helldivers-1/900/600",
      "https://picsum.photos/seed/helldivers-2/900/600",
      "https://picsum.photos/seed/helldivers-3/900/600",
    ],
  },
};

const fallbackDetails = {
  description:
    "Secure a digital key with instant delivery, verified sellers, and full buyer protection. Redeem your code in minutes.",
  highlights: [
    "Instant digital delivery",
    "Verified seller network",
    "Secure payment methods",
    "24/7 customer support",
  ],
  genres: ["Action", "Adventure"],
  publisher: "Marketplace Partners",
  developer: "Global Studios",
  releaseDate: "2024",
  edition: "Standard",
  region: "Global",
  delivery: "Instant key delivery",
  screenshots: [
    "https://picsum.photos/seed/product-1/900/600",
    "https://picsum.photos/seed/product-2/900/600",
    "https://picsum.photos/seed/product-3/900/600",
  ],
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { productId } = useParams();
  const product = games.find(game => game.id === productId);

  if (!product) {
    return <NotFound />;
  }

  const details = detailsById[product.id] ?? fallbackDetails;
  const similarGames = games.filter(game => game.id !== product.id).slice(0, 5);

  const offers = [
    {
      seller: product.seller,
      rating: product.rating,
      price: product.currentPrice,
      stock: "In stock",
      delivery: "Instant",
    },
    {
      seller: "KeyVault",
      rating: 4.8,
      price: product.currentPrice + 2.5,
      stock: "In stock",
      delivery: "Instant",
    },
    {
      seller: "DigitalNest",
      rating: 4.7,
      price: product.currentPrice + 3.75,
      stock: "Limited",
      delivery: "Instant",
    },
  ];

  return (
    <div className="bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-blue-600">Catalog</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">{product.title}</span>
          </nav>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-10">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                    {product.platform}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                    {details.edition}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {product.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1 text-orange-500 font-semibold">
                    <Star size={16} fill="currentColor" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <span>{details.genres.join(" • ")}</span>
                  <span>•</span>
                  <span>Release {details.releaseDate}</span>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
                    <img
                      src={details.screenshots[0] ?? product.coverUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {details.screenshots.slice(1).map((shot, index) => (
                      <div key={shot} className="overflow-hidden rounded-xl border border-gray-100 bg-gray-100">
                        <img
                          src={shot}
                          alt={`${product.title} screenshot ${index + 2}`}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">About this product</h2>
                  <p className="text-gray-600 mt-3 leading-relaxed">{details.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Highlights</h3>
                  <ul className="mt-3 grid gap-2 text-sm text-gray-600">
                    {details.highlights.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Publisher</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{details.publisher}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Developer</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{details.developer}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Region</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{details.region}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Delivery</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{details.delivery}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Seller offers</h2>
                    <p className="text-sm text-gray-600 mt-2">Compare verified sellers with instant delivery.</p>
                  </div>
                  <BadgePercent className="text-orange-500" />
                </div>

                <div className="mt-6 space-y-4">
                  {offers.map(offer => (
                    <div key={offer.seller} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-gray-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                          {offer.seller.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{offer.seller}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1 text-orange-500 font-semibold">
                              <Star size={12} fill="currentColor" /> {offer.rating.toFixed(1)}
                            </span>
                            <span>•</span>
                            <span>{offer.stock}</span>
                            <span>•</span>
                            <span>{offer.delivery}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gray-900">${offer.price.toFixed(2)}</span>
                        <button type="button" onClick={() => addItem(product.id)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Add to cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sticky top-24">
                <p className="text-xs uppercase tracking-wide text-gray-500">Best offer</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-3xl font-black text-gray-900">${product.currentPrice.toFixed(2)}</span>
                  {product.discount > 0 ? (
                    <span className="text-sm text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                  ) : null}
                </div>
                {product.discount > 0 ? (
                  <p className="text-sm text-green-600 mt-1">Save {product.discount}% today</p>
                ) : null}

                <div className="mt-6 space-y-3">
                  <button type="button" onClick={() => { addItem(product.id); navigate("/checkout"); }} className="w-full inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600">Buy now</button>
                  <button type="button" onClick={() => addItem(product.id)} className="w-full inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600">Add to cart</button>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    <span>Buyer protection and verified sellers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck size={16} className="text-blue-500 mt-0.5" />
                    <span>Instant delivery via digital key</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-orange-500 mt-0.5" />
                    <span>24/7 support if you need assistance</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar picks</h2>
            <Link to="/catalog" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {similarGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



