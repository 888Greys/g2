import { Link } from "react-router-dom";
import { UserPlus, Mail, KeyRound, ShieldCheck, ChevronRight } from "lucide-react";

export default function SignUp() {
  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-orange-600">Create account</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Join the marketplace</h1>
            <p className="text-base text-gray-600 mt-3">
              Register once to track orders, save wishlists, and access exclusive deals.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h2 className="text-xl font-bold text-gray-900">Create your account</h2>
              <p className="text-sm text-gray-600 mt-2">It only takes a minute to get started.</p>

              <form className="mt-6 space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Full name</label>
                  <div className="mt-2 relative">
                    <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Alex Johnson"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Email address</label>
                  <div className="mt-2 relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <div className="mt-2 relative">
                    <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Confirm password</label>
                  <div className="mt-2 relative">
                    <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  I agree to the Terms & Conditions and Privacy Policy.
                </label>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Create account
                  <ChevronRight size={18} />
                </button>
              </form>

              <div className="mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-700">
                  Sign in
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <h3 className="text-lg font-bold text-gray-900">Membership perks</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    Instant access to your keys and receipts.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    Exclusive price alerts and early promotions.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    One-click support and dispute handling.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-indigo-900 p-8 text-white">
                <p className="text-sm uppercase tracking-wide text-indigo-200">Security first</p>
                <h3 className="mt-3 text-2xl font-bold">Protected by buyer guarantees</h3>
                <p className="mt-3 text-sm text-indigo-100">
                  Every order includes fraud monitoring, refund assistance, and verified seller reviews.
                </p>
                <Link
                  to="/support"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Learn more about buyer protection
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
