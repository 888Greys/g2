import { Search, ShoppingCart, User, Menu, Heart, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { itemCount, subtotal } = useCart();
  const { isAuthenticated, user, signOut } = useAuth();
  const categories = [
    { label: "Video Games", to: "/catalog?category=games" },
    { label: "Software", to: "/catalog?category=software" },
    { label: "Gift Cards", to: "/catalog?category=gift-cards" },
    { label: "Gaming Gear", to: "/catalog?category=gear" },
    { label: "Subscriptions", to: "/catalog?category=subscriptions" },
    { label: "Best Deals", to: "/catalog?sort=deals", highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Announcements/Promos */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-medium py-2 text-center">
        <span className="opacity-90">SUMMER SALE IS HERE! Up to 90% off on top titles.</span>
        <Link to="/catalog?sort=deals" className="ml-2 underline font-bold hover:text-orange-200 transition-colors">Shop Now</Link>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-orange-500 text-white font-black text-xl italic px-2 py-1 rounded-sm tracking-tighter">
                G2A
              </div>
              <span className="hidden sm:block font-bold text-gray-900 text-lg tracking-tight">.COM</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Search for games, software, gift cards..."
              />
              <button className="absolute inset-y-1 right-1 bg-blue-600 text-white px-4 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
              <Heart size={20} />
            </button>
            <button className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
              <Bell size={20} />
            </button>
            
            <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1"></div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                <Link to="/account" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 font-medium text-sm">
                  <User size={20} />
                  <span className="hidden lg:block">{user?.name ?? "Account"}</span>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="hidden lg:block text-xs font-semibold text-gray-500 hover:text-red-600 px-2"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/signin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 font-medium text-sm">
                <User size={20} />
                <span className="hidden lg:block">Sign In</span>
              </Link>
            )}
            
            <Link to="/cart-items" className="flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors px-3 py-2 rounded-lg font-medium text-sm">
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <span className="hidden lg:block ml-1">${subtotal.toFixed(2)}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="hidden lg:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-3">
            {categories.map(item => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm font-medium transition-colors ${item.highlight ? "text-orange-500 hover:text-orange-600" : "text-gray-600 hover:text-blue-600"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
