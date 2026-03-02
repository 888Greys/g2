import { Link } from "react-router-dom";
import { BarChart3, PackageCheck, DollarSign, MessageCircle, PlusCircle, TrendingUp, AlertCircle } from "lucide-react";

const listings = [
  {
    id: "LIST-2041",
    title: "Elden Ring: Shadow of the Erdtree",
    platform: "Steam",
    price: "$34.99",
    stock: 18,
    status: "Active",
  },
  {
    id: "LIST-1972",
    title: "Helldivers 2",
    platform: "Steam",
    price: "$31.50",
    stock: 7,
    status: "Low stock",
  },
  {
    id: "LIST-1855",
    title: "EA SPORTS FC 24",
    platform: "EA App",
    price: "$19.99",
    stock: 0,
    status: "Out of stock",
  },
];

const kpis = [
  { label: "Monthly revenue", value: "$4,820", change: "+12%", icon: DollarSign },
  { label: "Active listings", value: "18", change: "+3", icon: PackageCheck },
  { label: "Orders fulfilled", value: "152", change: "+9%", icon: BarChart3 },
  { label: "Buyer messages", value: "7", change: "+2", icon: MessageCircle },
];

export default function SellerDashboard() {
  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-orange-600">Seller dashboard</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Overview</h1>
              <p className="text-base text-gray-600 mt-2">Track sales, manage listings, and respond to buyers.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600">
                View payouts
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
                <PlusCircle size={16} />
                New listing
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kpis.map(kpi => (
              <div key={kpi.label} className="rounded-3xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{kpi.label}</p>
                  <kpi.icon size={18} className="text-blue-500" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-full">
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Listings performance</h2>
                  <p className="text-sm text-gray-600 mt-1">Monitor stock and pricing health.</p>
                </div>
                <Link to="/support" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Seller help
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {listings.map(listing => {
                  const isLowStock = listing.status === "Low stock";
                  const isOut = listing.status === "Out of stock";
                  return (
                    <div key={listing.id} className="rounded-2xl border border-gray-100 p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{listing.platform}</p>
                          <p className="text-base font-semibold text-gray-900 mt-2">{listing.title}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                            <PackageCheck size={14} />
                            {listing.stock} keys in stock
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-lg font-bold text-gray-900">{listing.price}</p>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${
                              isOut
                                ? "border-red-200 bg-red-50 text-red-600"
                                : isLowStock
                                ? "border-orange-200 bg-orange-50 text-orange-600"
                                : "border-green-200 bg-green-50 text-green-600"
                            }`}
                          >
                            {isOut ? <AlertCircle size={12} /> : <TrendingUp size={12} />}
                            {listing.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                <p className="text-sm text-gray-600 mt-2">Respond quickly to keep your seller rating high.</p>
                <div className="mt-4 space-y-3">
                  {["Order ORD-10482 question", "Need region confirmation", "Bulk discount request"].map(message => (
                    <div key={message} className="rounded-2xl border border-gray-100 p-4 text-sm text-gray-600">
                      {message}
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">View inbox</button>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-blue-900 p-6 text-white">
                <h3 className="text-lg font-bold">Seller tips</h3>
                <p className="text-sm text-blue-100 mt-2">
                  Keep stock above 10 keys to stay eligible for featured listings and automatic price matching.
                </p>
                <Link to="/support" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Learn about seller standards
                  <TrendingUp size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
