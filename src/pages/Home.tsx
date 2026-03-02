import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { games } from "../data/games";

const featuredCards = [
  {
    id: "1",
    badge: "NEW",
    badgeColor: "bg-green-500",
    title: "Resident Evil Requiem",
    subtitle: "Steam · Global · Key",
    img: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    badge: "BESTSELLER",
    badgeColor: "bg-orange-500",
    title: "PlayStation Network",
    subtitle: "PSN · Global · Key",
    img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    badge: "PREORDER",
    badgeColor: "bg-blue-500",
    title: "Marathon",
    subtitle: "Steam · Global · Key",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    badge: "BESTSELLER",
    badgeColor: "bg-orange-500",
    title: "Action Warrior Saga",
    subtitle: "Steam · Global · Key",
    img: "https://images.unsplash.com/photo-1552824734-03f445832b00?auto=format&fit=crop&q=80&w=800",
  },
];

const giftCards = [
  { name: "Steam Gift Cards",   range: "$1 – $500",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",       bg: "#171a21" },
  { name: "PSN Gift Cards",     range: "$1 – $500",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/2560px-PlayStation_logo.svg.png",     bg: "#003087" },
  { name: "Razer Gold",         range: "$1 – $1000",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Razer_logo.svg/1200px-Razer_logo.svg.png",                    bg: "#1a1a1a" },
  { name: "Xbox Gift Cards",    range: "$1 – $250",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Xbox_logo_%282019%29.svg/1200px-Xbox_logo_%282019%29.svg.png", bg: "#107c10" },
  { name: "iTunes Gift Cards",  range: "$2 – $1000",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",       bg: "#f5f5f7" },
  { name: "Amazon Gift Cards",  range: "$1 – $950",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",                  bg: "#ff9900" },
  { name: "PayPal Gift Cards",  range: "$10 – $250",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png",                            bg: "#003087" },
  { name: "Apple Gift Cards",   range: "$2 – $1000",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",       bg: "#e3e3e3" },
  { name: "Google Play",        range: "$5 – $200",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png", bg: "#f4f4f4" },
  { name: "Nintendo eShop",     range: "$10 – $100",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1200px-Nintendo.svg.png",                        bg: "#e4000f" },
];

const categories = [
  {
    name: "Steam",
    href: "/catalog?platform=Steam",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 18.25c-3.452 0-6.25-2.798-6.25-6.25 0-3.452 2.798-6.25 6.25-6.25s6.25 2.798 6.25 6.25c0 3.452-2.798 6.25-6.25 6.25z"/>
      </svg>
    ),
  },
  {
    name: "Xbox",
    href: "/catalog?platform=Xbox",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-3-13l3 3 3-3v6H9V9z"/>
      </svg>
    ),
  },
  {
    name: "PlayStation",
    href: "/catalog?platform=PlayStation",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5v-9l4.5 4.5-4.5 4.5z"/>
      </svg>
    ),
  },
  {
    name: "eSIM",
    href: "/catalog?category=subscriptions",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M18 2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
  },
  {
    name: "AI Tools",
    href: "/catalog?category=software",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
      </svg>
    ),
  },
  {
    name: "Mobile Top-Ups",
    href: "/catalog?category=gift-cards",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M17 1H7C5.9 1 5 1.9 5 3v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v13z"/>
      </svg>
    ),
  },
  {
    name: "CS2 Skins",
    href: "/catalog?category=gear",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  },
  {
    name: "Subscriptions",
    href: "/catalog?category=subscriptions",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#6c7a8e]">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm-1 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L4.24 7.74C3.46 8.97 3 10.43 3 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
      </svg>
    ),
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="bg-black min-h-screen">

      {/* ── SECTION 1: Dark hero cards (home.html style) ── */}
      <div className="bg-black px-4 pt-5 pb-6">
        {/* Mobile search bar */}
        <form onSubmit={handleSearch} className="flex h-12 rounded overflow-hidden mb-5 md:hidden">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="flex-1 px-4 text-base outline-none bg-white text-gray-900"
          />
          <button type="submit" className="bg-blue-600 w-14 flex items-center justify-center hover:bg-blue-700 transition-colors">
            <Search size={20} className="text-white" />
          </button>
        </form>

        {/* Stacked game cards */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {featuredCards.map(card => (
            <Link
              key={card.id}
              to={`/catalog`}
              className="relative block w-full h-[220px] rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:-translate-y-1"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-5">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded mb-2 w-fit uppercase tracking-wide text-white ${card.badgeColor}`}>
                  {card.badge}
                </span>
                <div className="text-xl font-black text-white uppercase tracking-wide leading-tight">{card.title}</div>
                <div className="text-sm text-gray-400 mt-1">{card.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: Gift cards (home2.html style) ── */}
      <div className="bg-[#f7f8fa] px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[22px] font-bold text-gray-900 mb-5 pl-1">Pick a card!</h2>
          <div className="grid grid-cols-2 gap-4">
            {giftCards.map(card => (
              <Link
                key={card.name}
                to="/catalog?category=gift-cards"
                className="bg-white rounded-2xl p-5 text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-between min-h-[200px]"
              >
                <div
                  className="w-full h-[90px] rounded-xl overflow-hidden flex items-center justify-center mb-4"
                  style={{ background: card.bg }}
                >
                  <img src={card.img} alt={card.name} className="w-full h-full object-contain p-3" />
                </div>
                <div className="text-[13px] font-bold text-gray-800 uppercase tracking-wide leading-tight">{card.name}</div>
                <div className="text-[13px] text-gray-400 font-medium mt-1">{card.range}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Category grid (home3.html style) ── */}
      <div className="bg-white px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[22px] font-bold text-gray-900 mb-5 pl-1">Browse by category</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={cat.href}
                className="bg-white rounded-xl flex flex-col items-center justify-center p-5 text-center shadow-sm border border-black/[0.02] hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 aspect-[1/1.1]"
              >
                <div className="w-[70px] h-[70px] mb-4">
                  {cat.icon}
                </div>
                <div className="text-[11px] font-bold text-gray-900 uppercase tracking-wide leading-snug">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 4: Budget + Bundles (home4.html style) ── */}
      <div className="bg-[#f7f8fa] px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Budget filter */}
          <h2 className="text-[20px] font-black text-gray-900 text-center mb-5">What's your budget?</h2>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { label: "5$",  href: "/catalog?sort=deals&max=5",  cls: "before:bg-blue-600 before:top-[-10px] before:left-[-10px] before:rounded-br-[40px] after:bg-orange-500 after:bottom-[-5px] after:right-[-5px] after:rounded-tl-[40px] after:!w-[50px] after:!h-[50px]" },
              { label: "10$", href: "/catalog?sort=deals&max=10", cls: "before:bg-orange-500 before:top-[-15px] before:left-[-15px] before:rotate-45 before:!w-[60px]" },
              { label: "15$", href: "/catalog?sort=deals&max=15", cls: "before:bg-orange-500 before:bottom-[-10px] before:left-[-15px] before:rotate-[15deg] before:!w-[80px] before:!h-[50px]" },
              { label: "20$", href: "/catalog?sort=deals&max=20", cls: "after:bg-blue-600 after:bottom-[-15px] after:right-[-15px] after:rotate-[15deg] after:!w-[70px] after:!h-[100px]" },
            ].map(b => (
              <Link
                key={b.label}
                to={b.href}
                className={`relative bg-white border border-gray-200 rounded-2xl h-[75px] flex flex-col items-center justify-center overflow-hidden hover:border-blue-500 transition-colors before:content-[''] before:absolute before:w-10 before:h-10 before:z-0 after:content-[''] after:absolute after:w-10 after:h-10 after:z-0 ${b.cls}`}
              >
                <span className="relative z-10 text-[11px] font-bold text-gray-500 uppercase">Up to:</span>
                <span className="relative z-10 text-[32px] font-black text-gray-600 leading-none">{b.label}</span>
              </Link>
            ))}
          </div>

          {/* Bundle deals */}
          <h2 className="text-[20px] font-black text-gray-900 mb-4">Bundle deals</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {[
            {
              items: [
                { img: "https://placehold.co/100x100/111111/ff3333?text=ACT", platform: "Steam · Key · GLOBAL", title: "5 Random Steam Keys GLOBAL", price: "9.31 USD", discount: "-95%", original: "200.38 USD" },
                { img: "https://placehold.co/100x100/1a1205/d4af37?text=RPG", platform: "Steam · Key · GLOBAL", title: "Random ELITE 5 Keys PC", price: "5.06 USD", discount: "-93%", original: "77.76 USD" },
              ],
              total: "19.14 USD", save: "341.52 USD",
            },
            {
              items: [
                { img: "https://placehold.co/100x100/000d1a/00d4ff?text=AAA", platform: "Steam · Key · GLOBAL", title: "Premium AAA Game Key", price: "4.03 USD", discount: "-90%", original: "40.00 USD" },
                { img: "https://placehold.co/100x100/2d0a3d/ff6bcd?text=DLC", platform: "Steam · Key · GLOBAL", title: "Random DLC Pack PC", price: "6.40 USD", discount: "-85%", original: "42.52 USD" },
              ],
              total: "10.43 USD", save: "78.83 USD",
            },
            {
              items: [
                { img: "https://placehold.co/100x100/0d1a0d/98ff98?text=RPG", platform: "GOG.com · Key · GLOBAL", title: "Classic RPG Bundle Key", price: "7.20 USD", discount: "-88%", original: "59.99 USD" },
                { img: "https://placehold.co/100x100/1a0d33/9d4edd?text=STR", platform: "GOG.com · Key · GLOBAL", title: "Strategy Pack Edition", price: "3.80 USD", discount: "-82%", original: "21.00 USD" },
              ],
              total: "11.00 USD", save: "72.79 USD",
            },
            {
              items: [
                { img: "https://placehold.co/100x100/0a1628/e8c558?text=FPS", platform: "Steam · Key · GLOBAL", title: "FPS Legends Bundle 3 Keys", price: "5.50 USD", discount: "-87%", original: "42.00 USD" },
                { img: "https://placehold.co/100x100/1a0808/ff8c42?text=ACT", platform: "Steam · Key · GLOBAL", title: "Action Hits 4 Keys PC", price: "8.20 USD", discount: "-85%", original: "54.95 USD" },
              ],
              total: "13.70 USD", save: "88.25 USD",
            },
            {
              items: [
                { img: "https://placehold.co/100x100/050e1a/4fc3f7?text=ADV", platform: "Epic · Key · GLOBAL", title: "Adventure Game Pack 2 Keys", price: "3.99 USD", discount: "-91%", original: "43.98 USD" },
                { img: "https://placehold.co/100x100/1a1400/ffd700?text=SIM", platform: "Steam · Key · GLOBAL", title: "Simulation Bundle 3 Keys", price: "6.10 USD", discount: "-79%", original: "28.99 USD" },
              ],
              total: "10.09 USD", save: "62.88 USD",
            },
            ].map((bundle, i) => (
              <div key={i} className="min-w-[300px] bg-white border border-gray-200 rounded-2xl p-4 flex-shrink-0">
                {bundle.items.map((item, j) => (
                  <div key={j}>
                    {j > 0 && <div className="text-center text-gray-300 text-xl my-2.5 font-light">+</div>}
                    <div className="flex gap-3 items-start">
                      <img src={item.img} alt={item.title} className="w-[65px] h-[65px] rounded-md object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-gray-500 mb-0.5">☁️ {item.platform}</div>
                        <div className="text-[13px] font-bold leading-tight mb-1.5 line-clamp-2">{item.title}</div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm">{item.price}</span>
                          <span className="bg-red-500 text-white text-[10px] font-black px-1 py-0.5 rounded">{item.discount}</span>
                        </div>
                        <div className="text-[11px] text-gray-400 line-through">{item.original}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="text-2xl font-black mb-0.5">{bundle.total}</div>
                  <div className="text-[13px] font-bold text-emerald-600 mb-4">You save: {bundle.save}</div>
                  <Link to="/cart" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors mb-2">Add to cart</Link>
                  <Link to="/catalog" className="block w-full text-center border border-blue-600 text-blue-600 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">Check bundle details</Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── SECTION 5: Bestsellers + Random Keys (home5.html style) ── */}
      <div className="bg-white py-8">

        {/* Bestsellers horizontal scroll */}
        <div className="flex items-center justify-between mx-4 mb-4">
          <h2 className="text-[20px] font-black text-gray-900">Bestsellers</h2>
          <Link to="/catalog" className="text-[13px] font-bold text-blue-500 hover:text-blue-700 transition-colors">See all →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-3">
          {[
            { sellers: 32, img: "https://placehold.co/400x530/111111/ff3333?text=ULTRAKILL",            title: "ULTRAKILL PC",                     platform: "Steam · Key",  region: "GLOBAL",  regionColor: "text-emerald-600", price: "10.65", discount: "-46%", original: "19.80" },
            { sellers: 12, img: "https://placehold.co/400x530/1a0000/ff6666?text=Resident+Evil",         title: "Resident Evil Requiem PC",          platform: "Steam · Key",  region: "EUROPE",  regionColor: "text-red-500",     price: "58.03", discount: "-30%", original: "82.52" },
            { sellers: 5,  img: "https://placehold.co/400x530/2d0a3d/ff6bcd?text=Hades",                 title: "Hades PC Steam Key",               platform: "Steam · Key",  region: "GLOBAL",  regionColor: "text-emerald-600", price: "12.50", discount: "-50%", original: "24.99" },
            { sellers: 20, img: "https://placehold.co/400x530/1a1205/d4af37?text=Elden+Ring",            title: "Elden Ring: Shadow of the Erdtree", platform: "Steam · Key",  region: "GLOBAL",  regionColor: "text-emerald-600", price: "34.99", discount: "-12%", original: "39.99" },
            { sellers: 8,  img: "https://placehold.co/400x530/000d1a/00d4ff?text=Cyberpunk+2077",        title: "Cyberpunk 2077: Phantom Liberty",   platform: "GOG.com · Key",region: "GLOBAL",  regionColor: "text-emerald-600", price: "19.99", discount: "-33%", original: "29.99" },
            { sellers: 17, img: "https://placehold.co/400x530/0a1628/e8c558?text=GTA+V",                 title: "Grand Theft Auto V Premium",       platform: "Steam · Key",  region: "GLOBAL",  regionColor: "text-emerald-600", price: "6.99",  discount: "-65%", original: "19.99" },
            { sellers: 44, img: "https://placehold.co/400x530/1a0d33/9d4edd?text=Baldur%27s+Gate+3",     title: "Baldur's Gate 3",                  platform: "Steam · Key",  region: "GLOBAL",  regionColor: "text-emerald-600", price: "39.99", discount: "-20%", original: "49.99" },
            { sellers: 9,  img: "https://placehold.co/400x530/0d1a0d/98ff98?text=The+Witcher+3",         title: "The Witcher 3: Wild Hunt Complete", platform: "GOG.com · Key",region: "GLOBAL",  regionColor: "text-emerald-600", price: "4.99",  discount: "-75%", original: "19.99" },
            { sellers: 23, img: "https://placehold.co/400x530/1a0808/ff8c42?text=God+of+War",            title: "God of War PC",                    platform: "Steam · Key",  region: "GLOBAL",  regionColor: "text-emerald-600", price: "24.99", discount: "-37%", original: "39.99" },
            { sellers: 6,  img: "https://placehold.co/400x530/050e1a/4fc3f7?text=Hogwarts+Legacy",       title: "Hogwarts Legacy",                  platform: "Steam · Key",  region: "GLOBAL",  regionColor: "text-emerald-600", price: "29.99", discount: "-40%", original: "49.99" },
          ].map((p, i) => (
            <Link key={i} to="/catalog" className="min-w-[175px] max-w-[175px] bg-white rounded-xl overflow-hidden flex-shrink-0 block hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1.5 px-0.5">Offers from {p.sellers} selle...</div>
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={e => e.preventDefault()}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-sm hover:bg-white/90 hover:text-red-500 transition-colors"
                >♡</button>
              </div>
              <div className="pt-2 pb-1 px-0.5">
                <div className="text-[13px] font-bold leading-snug line-clamp-2 mb-1 h-[34px]">{p.title}</div>
                <div className="text-[11px] text-gray-500">☁️ {p.platform}</div>
                <div className={`text-[11px] font-bold ${p.regionColor}`}>{p.region}</div>
                <div className="mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-black">{p.price} USD</span>
                    <span className="bg-orange-600 text-white text-[10px] font-black px-1 py-0.5 rounded">{p.discount}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 line-through">{p.original} USD</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Random Keys horizontal scroll */}
        <div className="flex items-center justify-between mx-4 mt-8 mb-4">
          <div className="flex items-center gap-1">
            <h2 className="text-[20px] font-black text-gray-900">Random Keys</h2>
            <span className="text-sm text-gray-400">ⓘ</span>
          </div>
          <Link to="/catalog" className="text-[13px] font-bold text-blue-500 hover:text-blue-700 transition-colors">See all →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-3">
          {[
            { seller: "Offer from: Gaming4you", img: "https://placehold.co/480x270/111827/f97316?text=Random+Keys",      title: "REQUIEM Random by Gaming4you 1 Key PC",  platform: "Steam · Key",   price: "6.35", discount: "-10%", original: "7.06" },
            { seller: "SPONSORED",               img: "https://placehold.co/480x270/0d1117/22d3ee?text=VIP+Mystery+Box",  title: "Random VIP 5 Keys Steam Global",        platform: "Steam · Key",   price: "8.82", discount: "-95%", original: "200.38" },
            { seller: "Offer from: KeyMaster",   img: "https://placehold.co/480x270/1c0a2e/a78bfa?text=Mystery+Box",     title: "Mystery Box 3 Keys GLOBAL",             platform: "Steam · Key",   price: "4.99", discount: "-70%", original: "16.50" },
            { seller: "Offer from: LootDrop",    img: "https://placehold.co/480x270/0a1f0a/4ade80?text=GOG+Random",      title: "GOG Random Bundle 5 Keys PC",           platform: "GOG.com · Key", price: "7.49", discount: "-85%", original: "49.99" },
            { seller: "SPONSORED",               img: "https://placehold.co/480x270/1a0a00/fbbf24?text=Epic+Random",     title: "Epic Games Random 3 Keys GLOBAL",       platform: "Epic · Key",    price: "5.99", discount: "-80%", original: "29.95" },
          ].map((r, i) => (
            <Link key={i} to="/catalog" className="min-w-[240px] bg-white rounded-2xl p-3 flex-shrink-0 shadow-sm block hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2">{r.seller}</div>
              <img src={r.img} alt={r.title} className="w-full aspect-video rounded-xl object-cover mb-3" />
              <div className="text-[13px] font-bold leading-snug line-clamp-2 mb-1">{r.title}</div>
              <div className="text-[11px] text-gray-500 mb-2">☁️ {r.platform} · <span className="text-emerald-600 font-bold">GLOBAL</span></div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-black">{r.price} USD</span>
                    <span className="bg-orange-600 text-white text-[10px] font-black px-1 py-0.5 rounded">{r.discount}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 line-through">{r.original} USD</div>
                </div>
                <button type="button" onClick={e => e.preventDefault()} className="text-xl text-gray-400 hover:text-red-500 transition-colors">♡</button>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* ── SECTION 6: Mobile Top-Ups + Software Deals (home6.html style) ── */}
      <div className="bg-[#f7f8fa] py-8">

        {/* Top-up banner */}
        <div className="text-center px-4 py-2 mb-4">
          <div className="text-[26px] font-black italic uppercase leading-none tracking-tight">
            <span className="text-pink-500">DIAMONDS</span>
            <span className="text-gray-300 text-lg mx-1">✦</span>
            <span className="text-blue-500">COINS</span>
            <span className="text-gray-300 text-lg mx-1">✦</span>
            <span className="text-blue-500">POINTS</span>
          </div>
          <div className="text-[18px] font-black text-blue-500 uppercase tracking-wide mt-1">TOP UP YOUR MOBILE GAME</div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-3 mb-6">
          {[1,2,3,4].map(n => (
            <div key={n} className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg text-cyan-300 bg-gray-900 ${n === 1 ? "shadow-[0_0_15px_rgba(249,115,22,0.8)] border border-orange-500/50" : ""}`}>{n}</div>
          ))}
        </div>

        {/* Mobile game grid — scrollable row */}
        <div className="flex gap-2.5 overflow-x-auto px-4 pb-2 mb-8">
          {[
            { img: "https://placehold.co/150x150/1a226e/ffffff?text=ML",   name: "Mobile Legends",     promo: "+200% TOKENS" },
            { img: "https://placehold.co/150x150/3d1a00/ffbb33?text=PUBG", name: "PUBG Mobile" },
            { img: "https://placehold.co/150x150/0d1a33/80cfff?text=GI",   name: "Genshin Impact" },
            { img: "https://placehold.co/150x150/1a0a2e/c084fc?text=HSR",  name: "Honkai Star Rail" },
            { img: "https://placehold.co/150x150/ff6600/ffffff?text=FF",   name: "Free Fire" },
            { img: "https://placehold.co/150x150/0d0d0d/00e5ff?text=CoD",  name: "Call of Duty Mobile" },
            { img: "https://placehold.co/150x150/1a2e1a/7cfc00?text=CoC",  name: "Clash of Clans" },
            { img: "https://placehold.co/150x150/1a1a40/4488ff?text=CR",   name: "Clash Royale" },
            { img: "https://placehold.co/150x150/001a33/00aaff?text=BS",   name: "Brawl Stars" },
            { img: "https://placehold.co/150x150/33001a/ff66aa?text=LoL",  name: "League·WR",          promo: "+3 BLUE ESSENCE" },
            { img: "https://placehold.co/150x150/0d2233/66ffee?text=MLBB", name: "Magic Chess" },
            { img: "https://placehold.co/150x150/1a1400/ffd700?text=RoK",  name: "Rise of Kingdoms" },
          ].map((g, i) => (
            <Link key={i} to="/catalog?category=gift-cards" className="relative flex-none w-[90px] h-[90px] bg-slate-800 rounded-xl overflow-hidden block">
              <img
                src={g.img}
                alt={g.name}
                className="w-full h-full object-cover"
              />
              {g.promo && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-yellow-300 font-black text-[9px] text-center py-0.5">{g.promo}</div>
              )}
            </Link>
          ))}
        </div>

        {/* Top software deals */}
        <div className="flex items-center justify-between px-4 mb-1">
          <h2 className="text-[20px] font-black text-gray-900">Top software deals</h2>
          <Link to="/catalog?category=software" className="text-[13px] font-bold text-blue-500 hover:text-blue-700 transition-colors">See all →</Link>
        </div>
        <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide px-4 mb-4">Sponsored ⓘ</div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-3">
          {[
            { bg: "bg-[#0078d4]", label: "Windows", title: "Microsoft Windows 11 Pro - PC", meta: "Microsoft · Key" },
            { bg: "bg-gray-500",  label: "Office",  title: "Microsoft Office 2021 Pro Plus", meta: "Microsoft · Key" },
            { bg: "bg-[#d83b01]", label: "Visual Studio", title: "Visual Studio Professional 2022", meta: "Microsoft · Key" },
            { bg: "bg-[#2b579a]", label: "365",     title: "Microsoft 365 Family 1 Year", meta: "Microsoft · Key" },
          ].map((s, i) => (
            <Link key={i} to="/catalog?category=software" className="min-w-[260px] bg-white rounded-2xl overflow-hidden flex-shrink-0 block">
              <div className={`h-[140px] ${s.bg} flex items-end justify-end p-4 rounded-t-2xl`}>
                <div className="flex items-center gap-2 text-white font-bold text-xl">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M0 3.449L9.75 2.1V11.419H0V3.449zm0 17.102L9.75 21.9V12.581H0v7.97zm10.55 1.579L24 24V12.581H10.55V22.13zm0-19.833V11.42H24V0l-13.45 2.297z"/></svg>
                  {s.label}
                </div>
              </div>
              <div className="p-3">
                <div className="text-[14px] font-bold mb-1.5">{s.title}</div>
                <div className="text-[12px] text-gray-500 flex items-center gap-1">
                  {s.meta} · <span className="text-emerald-600 font-bold">GLOBAL</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* ── SECTION 7: Software with prices + Software Bundles (home7.html style) ── */}
      <div className="bg-white py-8">

        {/* Top software deals with prices */}
        <div className="flex items-center justify-between mx-4 mb-1">
          <h2 className="text-[20px] font-black text-gray-900">Top software deals</h2>
          <Link to="/catalog?category=software" className="text-[13px] font-bold text-blue-500 hover:text-blue-700 transition-colors">See all →</Link>
        </div>
        <div className="text-[11px] text-gray-400 font-semibold uppercase mx-4 mb-4">Sponsored ⓘ</div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-5">
          {[
            { bg: "bg-[#0078d4]", label: "Windows", title: "Microsoft Windows 11 Pro - PC",  meta: "🪟 Microsoft · Key", price: "22.25", discount: "-85%", original: "153.28" },
            { bg: "bg-[#0078d4]", label: "Windows", title: "Microsoft Windows 11 Home",       meta: "🪟 Microsoft · Key", price: "20.37", discount: "-82%", original: "112.01" },
            { bg: "bg-[#2b579a]", label: "Office",  title: "Microsoft Office 2021 Pro Plus",  meta: "🪟 Microsoft · Key", price: "18.99", discount: "-79%", original: "89.99"  },
            { bg: "bg-[#d83b01]", label: "Visual Studio", title: "Visual Studio Pro 2022",    meta: "🪟 Microsoft · Key", price: "14.50", discount: "-75%", original: "58.00"  },
          ].map((s, i) => (
            <Link key={i} to="/catalog?category=software" className="min-w-[240px] bg-white rounded-2xl flex flex-col flex-shrink-0 shadow-sm block">
              <div className={`h-[140px] ${s.bg} rounded-t-2xl flex items-end justify-end p-4`}>
                <div className="flex items-center gap-2 text-white font-semibold text-xl">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M0 3.449L9.75 2.1V11.419H0V3.449zm0 17.102L9.75 21.9V12.581H0v7.97zm10.55 1.579L24 24V12.581H10.55V22.13zm0-19.833V11.42H24V0l-13.45 2.297z"/></svg>
                  {s.label}
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <div className="text-[14px] font-bold truncate mb-1">{s.title}</div>
                <div className="text-[12px] text-gray-500 mb-3">{s.meta} · <span className="text-emerald-600 font-bold">GLOBAL</span></div>
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[18px] font-black">{s.price} USD</span>
                      <span className="bg-orange-600 text-white text-[11px] font-black px-1.5 py-0.5 rounded">{s.discount}</span>
                    </div>
                    <div className="text-[12px] text-gray-400 line-through">{s.original} USD</div>
                  </div>
                  <button type="button" onClick={e => e.preventDefault()} className="text-[22px] text-gray-300 hover:text-red-500 transition-colors">♡</button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Exclusive bundle deals */}
        <div className="flex items-center justify-between mx-4 mb-4">
          <h2 className="text-[20px] font-black text-gray-900">Exclusive bundle deals</h2>
          <Link to="/catalog" className="text-[13px] font-bold text-blue-500 hover:text-blue-700 transition-colors">See all →</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4">
          {[
            {
              items: [
                { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/CapCut_logo.svg/1024px-CapCut_logo.svg.png", title: "CapCut Pro 1 Month", sub: "CapCut · Account", price: "3.62 USD", discount: "-82%", original: "20.04 USD" },
                { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png", title: "ChatGPT Plus 1 User 1 Month", sub: "ChatGPT · Account", price: "2.05 USD", discount: "-92%", original: "27.12 USD" },
              ],
              total: "5.67 USD", save: "41.49 USD",
            },
            {
              items: [
                { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/CapCut_logo.svg/1024px-CapCut_logo.svg.png", title: "CapCut Pro Annual", sub: "CapCut · Account", price: "3.62 USD", discount: "-80%", original: "18.10 USD" },
                { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png", title: "Voicemeeter Subscription", sub: "Voicemod · Account", price: "4.31 USD", discount: "-72%", original: "15.40 USD" },
              ],
              total: "7.93 USD", save: "16.64 USD",
            },
            {
              items: [
                { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png", title: "ChatGPT Plus 3 Months", sub: "ChatGPT · Account", price: "5.99 USD", discount: "-88%", original: "50.00 USD" },
                { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png", title: "Canva Pro 1 Month", sub: "Canva · Account", price: "2.10 USD", discount: "-79%", original: "9.99 USD" },
              ],
              total: "8.09 USD", save: "51.90 USD",
            },
          ].map((bundle, i) => (
            <div key={i} className="min-w-[290px] bg-white rounded-2xl border border-gray-100 p-5 flex-shrink-0">
              {bundle.items.map((item, j) => (
                <div key={j}>
                  {j > 0 && <div className="text-center text-gray-200 text-2xl my-2.5 font-light">+</div>}
                  <div className="flex gap-3">
                    <div className="w-[50px] h-[50px] rounded-xl bg-gray-100 flex items-center justify-center p-2 flex-shrink-0">
                      <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold leading-snug line-clamp-2">{item.title}</div>
                      <div className="text-[11px] text-gray-400 my-0.5">{item.sub} · <span className="text-emerald-600 font-bold">GLOBAL</span></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-black">{item.price}</span>
                        <span className="bg-orange-600 text-white text-[10px] font-black px-1 py-0.5 rounded">{item.discount}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 line-through">{item.original}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="text-[26px] font-black">{bundle.total}</div>
                <div className="text-[13px] font-bold text-emerald-600 mb-4">You save: {bundle.save}</div>
                <Link to="/cart" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors mb-2">Add to cart</Link>
                <Link to="/catalog" className="block w-full text-center border border-blue-50 text-blue-600 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">Check bundle details</Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── SECTION 8: Customer Favorites + App Promo Banner (home8.html style) ── */}
      <div className="bg-[#f7f8fa] py-8">

        {/* Customer Favorites */}
        <h2 className="text-[20px] font-black px-4 pt-5 pb-3 text-[#1a1a1a]">Our customers' favorite items</h2>
        <div className="flex gap-3 overflow-x-auto pb-5 px-4">
          {[
            { meta: 'Offer from: Foniatravel', img: 'https://placehold.co/300x400/0d1a33/38bdf8?text=eSIM',      title: 'eSIM Fonia Travel (Android, iOS) 3 GB 3...', brand: 'Fonia Travel • Key', region: '',       price: '3.84 USD'  },
            { meta: 'Sponsored',               img: 'https://placehold.co/300x400/1a1a1a/44ff44?text=Razer+Gold', title: 'Razer Gold 20 USD',                         brand: 'Razer • Key',      region: 'GLOBAL', price: '21.80 USD' },
            { meta: 'Sponsored',               img: 'https://placehold.co/300x400/0050aa/ffffff?text=Windows',   title: 'Microsoft Windows 11 Pro',                  brand: 'Microsoft • Key',  region: 'GLOBAL', price: '22.25 USD' },
            { meta: 'Sponsored',               img: 'https://placehold.co/300x400/171a21/c2e0ff?text=Steam',     title: 'Steam Gift Card 50 USD',                    brand: 'Steam • Gift Card',region: 'GLOBAL', price: '51.99 USD' },
            { meta: 'Bestseller',              img: 'https://placehold.co/300x400/1a0d00/fbbf24?text=PSN',       title: 'PlayStation Network Card 50 USD',           brand: 'Sony • Gift Card', region: 'GLOBAL', price: '52.49 USD' },
            { meta: 'Offer from: TopupKing',   img: 'https://placehold.co/300x400/107c10/ffffff?text=Xbox',      title: 'Xbox Gift Card 25 USD',                     brand: 'Microsoft • Key',  region: 'GLOBAL', price: '26.50 USD' },
            { meta: 'Sponsored',               img: 'https://placehold.co/300x400/2d0a3d/ff9fff?text=Netflix',   title: 'Netflix Gift Card 30 USD',                  brand: 'Netflix • Account',region: 'GLOBAL', price: '31.99 USD' },
          ].map((item, i) => (
            <Link
              key={i}
              to="/catalog"
              className="flex-none w-[170px] bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="text-[10px] font-bold uppercase text-gray-500 px-2.5 pt-2 pb-1">{item.meta}</div>
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <button
                  className="absolute top-2.5 right-2.5 w-8 h-8 bg-black/35 rounded-full flex items-center justify-center text-white text-lg"
                  onClick={e => e.preventDefault()}
                >
                  ♡
                </button>
              </div>
              <div className="p-2.5 flex flex-col flex-1">
                <div className="text-[13px] font-bold mb-1 leading-snug line-clamp-2">{item.title}</div>
                <div className="text-[11px] text-gray-500 mb-0.5">{item.brand}</div>
                {item.region && <div className="text-[11px] font-bold text-emerald-500 mb-3">{item.region}</div>}
                <div className="text-[16px] font-black mt-auto">{item.price}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* App Promo Banner */}
        <div className="mx-4 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex items-center justify-between px-4 py-6 relative">
          {/* Phone mockup */}
          <div className="w-[45%]">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400"
              alt="App mockup"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
          {/* Promo content */}
          <div className="w-[50%] text-center z-10">
            <div className="text-[18px] font-black uppercase leading-tight mb-3">
              SAVE 15%<br />
              <span className="text-[14px] font-normal">on your first APP buy with the code:</span>
            </div>
            <div className="bg-[#00b8ff] text-white text-[28px] font-black py-2.5 px-3 rounded-lg mb-5 shadow-[0_4px_15px_rgba(0,184,255,0.4)]">
              APP15
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png"
                alt="App Store"
                className="h-8 brightness-125"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/640px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
                className="h-8 brightness-125"
              />
            </div>
            <div className="text-[10px] text-slate-300 mt-2">★★★★★ 4.7 &nbsp; ★★★★★ 4.2</div>
          </div>
        </div>

      </div>

      {/* ── SECTION 9: Newsletter + FAQ (home9.html style) ── */}
      <div className="bg-[#f7f8fa] pb-10">

        {/* Newsletter */}
        <div className="bg-[#e3f2fd] px-4 py-6">
          <h2 className="text-[18px] font-black mb-2">Join our newsletter and enjoy 11% off</h2>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
            Subscribe to get updates, confirm your subscription, and receive a discount code to use instantly{' '}
            <button className="text-blue-500 font-semibold inline-flex items-center gap-1 text-[13px]">
              Show more
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
            </button>
          </p>
          <NewsletterForm />
        </div>

        {/* FAQ */}
        <div className="px-4 pt-8">
          <h2 className="text-[28px] font-black mb-5">FAQ</h2>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            {[
              {
                q: 'What is this marketplace and how does it work?',
                a: 'Our marketplace is a platform for digital products where various sellers offer game keys, software, and gift cards at competitive prices.',
              },
              {
                q: 'What types of digital items can I buy here?',
                a: 'You can find Steam keys, PSN/Xbox gift cards, software licenses (like Windows), and even in-game top-ups for mobile games.',
              },
              {
                q: 'Is this a marketplace? And who sells digital items?',
                a: 'Yes, it\'s a marketplace where independent, verified third-party sellers list their digital products for customers worldwide.',
              },
              {
                q: 'What do customer reviews and ratings say?',
                a: 'Most users praise our platform for its variety and low prices, maintaining high ratings on Trustpilot and other review platforms.',
              },
              {
                q: 'Is this a legitimate and trustworthy platform?',
                a: 'Yes, the platform uses advanced security measures to ensure safe transactions for millions of users.',
              },
              {
                q: 'How can I contact customer support and get help?',
                a: 'You can reach out through the Support Center on the website or via the ticket system in your user dashboard.',
              },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} isLast={i === 5} />
            ))}
          </div>
        </div>

      </div>

      {/* ── SECTION 10: Footer — Payments, Links, App, Legal, Social (home10.html style) ── */}
      <div className="bg-white px-5 pt-8 pb-12">

        {/* Payment methods */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" alt="Discover" className="h-5 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 object-contain" />
          <span className="text-[13px] text-gray-500 w-full mt-1">and 200+ other payment methods</span>
        </div>

        <hr className="border-gray-100 my-6" />

        {/* Footer accordion links */}
        <div>
          {[
            { label: 'ABOUT', content: 'Information about our platform and our history.' },
            { label: 'FOR BUYERS', content: 'Buying guides, security features, and loyalty program.' },
            { label: 'FOR SELLERS', content: 'Selling items, business verification, and API.' },
            { label: 'SUPPORT', content: 'Support Center, contact us, and dispute resolution.' },
            { label: 'MEDIA', content: 'Press kit, news, and branding resources.' },
          ].map((item, i) => (
            <FooterAccordion key={i} label={item.label} content={item.content} />
          ))}
        </div>

        {/* App Promo */}
        <div className="mt-10">
          <h3 className="text-[14px] font-black mb-1">Install the app</h3>
          <p className="text-[13px] text-gray-500 mb-4">Get great deals on games wherever you go!</p>
          <div className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-3.5 py-2.5 w-fit mb-4">
            <span className="text-[#ffb400] text-base leading-none">★★★★<span className="opacity-30">★</span></span>
            <span className="text-[13px] text-gray-500"><b className="text-[#1a1a1a]">4.6</b> — 113,300 votes</span>
          </div>
          <div className="flex gap-2.5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-9 cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-9 cursor-pointer" />
          </div>
        </div>

        <hr className="border-gray-100 my-7" />

        {/* Legal info */}
        <div className="text-[11px] text-gray-400 leading-relaxed space-y-5">
          <div>
            <span className="text-gray-500 font-bold">GameKey Market Ltd (platform operator)</span><br />
            Address: 31/F, Tower Two, Times Square, 1 Matheson Street, Causeway Bay, Hong Kong<br />
            Business registration number: 63264201
          </div>
          <div>
            <span className="text-gray-500 font-bold">GameKey Market LLC (platform operator)</span><br />
            Address: 701 South Carson Street, Suite 200, Carson City, Nevada 89701, USA<br />
            Business registration number: E0627762014-7
          </div>
          <div>
            <span className="text-gray-500 font-bold">GameKey Market B.V. (platform support)</span><br />
            Address: James Wattstraat 77 A 3, 1097DL Amsterdam, the Netherlands<br />
            Business registration number: 89975561
          </div>
        </div>

        {/* Social icons */}
        <div className="flex gap-5 mt-7 items-center">
          {/* Facebook */}
          <svg className="w-5 h-5 fill-gray-500 hover:fill-gray-900 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          {/* YouTube */}
          <svg className="w-5 h-5 fill-gray-500 hover:fill-gray-900 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48L15.45 11.75l-5.7 3.27z"/></svg>
          {/* Kick */}
          <svg className="w-5 h-5 fill-gray-500 hover:fill-gray-900 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M11.57 14.89l-2.43-1.06-.8 1.31H6.72V8.86h1.62v3.17l3.23-3.17h2.03l-3.37 3.14 3.58 3.14h-2.24zM2.38 3.14h19.24v17.72H2.38z"/></svg>
          {/* Phone/Twitch placeholder */}
          <svg className="w-5 h-5 fill-gray-500 hover:fill-gray-900 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm3.33 11.08c-.14-.14-.36-.14-.5 0l-.83.83c-1.12-1.12-1.12-2.94 0-4.06l.83-.83c.14-.14.14-.36 0-.5l-1.67-1.67c-.14-.14-.36-.14-.5 0l-.56.56c-1.84 1.84-1.84 4.83 0 6.67l.56.56c.14.14.36.14.5 0l1.67-1.67z"/></svg>
          {/* Instagram */}
          <svg className="w-5 h-5 fill-gray-500 hover:fill-gray-900 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
          {/* X / Twitter */}
          <svg className="w-5 h-5 fill-gray-500 hover:fill-gray-900 cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </div>

      </div>

    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-green-600 font-bold text-sm">Success! Check {email} for your 11% discount code.</p>;
  }

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full h-12 border border-gray-300 rounded px-4 text-[15px] mb-4 outline-none focus:border-blue-400"
      />
      <button
        onClick={handleSubmit}
        className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded transition-colors"
      >
        Subscribe
      </button>
    </>
  );
}

function FAQItem({ question, answer, isLast }: { question: string; answer: string; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={isLast ? '' : 'border-b border-gray-100'}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-5 py-[18px] bg-white hover:bg-gray-50 text-left transition-colors"
      >
        <span className="text-[14px] font-bold text-[#111] pr-4">{question}</span>
        <svg
          className={`w-3 h-3 flex-none stroke-[#333] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="bg-[#fcfcfc] px-5 pb-5 text-[14px] text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function FooterAccordion({ label, content }: { label: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center py-[18px] bg-white text-left"
      >
        <span className="text-[13px] font-black tracking-wide text-[#1a1a1a]">{label}</span>
        <svg
          className={`w-3.5 h-3.5 flex-none transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="text-[13px] text-gray-500 pb-4 leading-relaxed">{content}</div>
      )}
    </div>
  );
}
