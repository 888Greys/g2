import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, KeyRound, Mail, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/account";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = signIn(email, password);
    if (!result.ok) {
      setFormError(result.error ?? "Could not sign in.");
      return;
    }

    if (!remember) {
      sessionStorage.setItem("auth_remember_notice", "off");
    } else {
      sessionStorage.removeItem("auth_remember_notice");
    }

    setFormError(null);
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-orange-600">Welcome back</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Sign in</h1>
            <p className="text-base text-gray-600 mt-3">
              Access your orders, saved deals, and seller dashboard in one secure place.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h2 className="text-xl font-bold text-gray-900">Account login</h2>
              <p className="text-sm text-gray-600 mt-2">Use your email and password to continue.</p>

              <form className="mt-6 space-y-5" onSubmit={onSubmit}>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Email address</label>
                  <div className="mt-2 relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
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
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={event => setRemember(event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                  </label>
                  <Link to="/support" className="font-semibold text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>
                {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Sign in
                  <ChevronRight size={18} />
                </button>
              </form>

              <div className="mt-6 text-sm text-gray-600">
                New here?{" "}
                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                  Create an account
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <h3 className="text-lg font-bold text-gray-900">Why sign in?</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    Track orders and access your keys instantly.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    Save your favorite sellers and deals.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    Manage your seller profile and inventory.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-blue-900 p-8 text-white">
                <p className="text-sm uppercase tracking-wide text-blue-200">Seller tools</p>
                <h3 className="mt-3 text-2xl font-bold">Unlock the seller dashboard</h3>
                <p className="mt-3 text-sm text-blue-100">
                  List new offers, manage promotions, and respond to buyers with our seller toolkit.
                </p>
                <Link
                  to="/seller"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Go to seller dashboard
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
