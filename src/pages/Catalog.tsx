import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { GameCard } from "../components/GameCard";
import { games } from "../data/games";

const categories = [
  { label: "All", value: "all" },
  { label: "Games", value: "games" },
  { label: "Software", value: "software" },
  { label: "Gift Cards", value: "gift-cards" },
  { label: "Gaming Gear", value: "gear" },
  { label: "Subscriptions", value: "subscriptions" },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Trending", value: "trending" },
  { label: "Bestsellers", value: "bestsellers" },
  { label: "Best Deals", value: "deals" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating-desc" },
  { label: "New Releases", value: "new" },
];

function parseId(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "featured";
  const query = searchParams.get("q") ?? "";
  const platformParam = searchParams.get("platform") ?? "";
  const selectedPlatforms = platformParam
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

  const platforms = useMemo(() => {
    return Array.from(new Set(games.map(game => game.platform))).sort();
  }, []);

  const updateParams = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = games.filter(game => {
      const gameCategory = game.category ?? "games";
      if (category !== "all" && gameCategory !== category) {
        return false;
      }

      if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(game.platform)) {
        return false;
      }

      if (normalizedQuery.length > 0) {
        const haystack = `${game.title} ${game.platform} ${game.seller}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });

    const sorted = filtered.slice().sort((a, b) => {
      switch (sort) {
        case "trending":
          return Number(Boolean(b.isTrending)) - Number(Boolean(a.isTrending)) || b.rating - a.rating;
        case "bestsellers":
          return Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)) || b.rating - a.rating;
        case "deals":
          return b.discount - a.discount || a.currentPrice - b.currentPrice;
        case "price-asc":
          return a.currentPrice - b.currentPrice;
        case "price-desc":
          return b.currentPrice - a.currentPrice;
        case "rating-desc":
          return b.rating - a.rating;
        case "new":
          return parseId(b.id) - parseId(a.id);
        default:
          return 0;
      }
    });

    return sorted;
  }, [category, query, selectedPlatforms, sort]);

  const hasFilters = category !== "all" || query.trim().length > 0 || selectedPlatforms.length > 0 || sort !== "featured";

  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-600">Marketplace</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
                Browse the catalog
              </h1>
              <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl">
                Shop the latest keys, software, and gift cards. Filter by platform, compare prices, and grab the best deal.
              </p>
            </div>
            <div className="w-full lg:max-w-md">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={event => updateParams({ q: event.target.value || null })}
                  placeholder="Search titles, sellers, platforms..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-11 pr-12 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {query.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => updateParams({ q: null })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 hover:text-gray-700"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map(item => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateParams({ category: item.value === "all" ? null : item.value })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    category === item.value
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                <SlidersHorizontal size={16} />
                <span>Refine by platform and pricing below.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600">Sort by</span>
                <select
                  value={sort}
                  onChange={event =>
                    updateParams({ sort: event.target.value === "featured" ? null : event.target.value })
                  }
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="rounded-2xl border border-gray-200 bg-white p-6 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {hasFilters ? (
                  <button
                    type="button"
                    onClick={() => setSearchParams(new URLSearchParams())}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Clear all
                  </button>
                ) : null}
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3">Platform</p>
                  <div className="space-y-2">
                    {platforms.map(platform => {
                      const checked = selectedPlatforms.includes(platform);
                      return (
                        <label key={platform} className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              const nextPlatforms = checked
                                ? selectedPlatforms.filter(item => item !== platform)
                                : [...selectedPlatforms, platform];
                              updateParams({ platform: nextPlatforms.length ? nextPlatforms.join(",") : null });
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{platform}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                  Price range, stock status, and delivery filters will be available when we connect the backend.
                </div>
              </div>
            </aside>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredGames.length}</span> results
                </p>
                {category !== "all" ? (
                  <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-flex items-center gap-2">
                    Category: {categories.find(item => item.value === category)?.label}
                  </p>
                ) : null}
              </div>

              {filteredGames.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                  <h3 className="text-2xl font-bold text-gray-900">No matches yet</h3>
                  <p className="text-gray-600 mt-3">
                    Try clearing filters or exploring the full catalog while we expand inventory for this category.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSearchParams(new URLSearchParams())}
                      className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600"
                    >
                      Clear filters
                    </button>
                    <Link
                      to="/"
                      className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Back to home
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                  {filteredGames.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}

              <div className="mt-10 rounded-2xl bg-gradient-to-r from-gray-900 to-blue-900 text-white p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold">Need help finding the right key?</h3>
                  <p className="text-blue-100 mt-2 max-w-xl">
                    Our support team can guide you to the best edition, region, and delivery method for your needs.
                  </p>
                </div>
                <Link
                  to="/support"
                  className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Visit Support Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
