import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, Bell, Lock, ChevronRight, Settings, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(chunk => chunk[0]?.toUpperCase() ?? "")
    .join("") || "GM";

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-orange-600">Account</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
                Welcome back, {user?.name ?? "Gamer"}
              </h1>
              <p className="text-base text-gray-600 mt-2">Manage your profile, security, and payment settings.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/orders" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View order history
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-3xl border border-gray-200 bg-white p-6 h-fit">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user?.name ?? "Gamer"}</p>
                  <p className="text-xs text-gray-500">Member since {user?.memberSince ?? new Date().getFullYear()}</p>
                </div>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <button className="w-full inline-flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-blue-700 font-semibold">
                  Profile overview
                  <ChevronRight size={16} />
                </button>
                <button className="w-full inline-flex items-center justify-between rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50">
                  Payment methods
                  <ChevronRight size={16} />
                </button>
                <button className="w-full inline-flex items-center justify-between rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50">
                  Security
                  <ChevronRight size={16} />
                </button>
                <button className="w-full inline-flex items-center justify-between rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50">
                  Notifications
                  <ChevronRight size={16} />
                </button>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Profile details</h2>
                    <p className="text-sm text-gray-600 mt-2">Update your public profile information.</p>
                  </div>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-2">
                    <Settings size={16} />
                    Edit profile
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Mail size={16} className="text-blue-500" />
                      {user?.email ?? "unknown@example.com"}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Phone size={16} className="text-blue-500" />
                      +1 (555) 012-4587
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Region</p>
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <MapPin size={16} className="text-blue-500" />
                      United States
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Buyer level</p>
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <ShieldCheck size={16} className="text-green-500" />
                      Verified member
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Payment methods</h3>
                    <CreditCard className="text-blue-500" size={18} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Visa ending in 4821 • Expires 05/27</p>
                  <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">Manage payments</button>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                    <Bell className="text-orange-500" size={18} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Weekly deals and order updates enabled.</p>
                  <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">Update preferences</button>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Security</h3>
                    <p className="text-sm text-gray-600 mt-2">Password last updated recently.</p>
                  </div>
                  <Lock className="text-gray-500" size={18} />
                </div>
                <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">Update password</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
