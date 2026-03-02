import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, CreditCard, Wallet, Banknote, CheckCircle2 } from "lucide-react";
import { games } from "../data/games";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { isValidEmail } from "../lib/validation";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, helper: "Visa, Mastercard, Amex" },
  { id: "wallet", label: "Digital Wallet", icon: Wallet, helper: "PayPal, Apple Pay" },
  { id: "bank", label: "Bank Transfer", icon: Banknote, helper: "Local bank options" },
];

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [deliveryEmail, setDeliveryEmail] = useState("gamer@example.com");
  const [newsletter, setNewsletter] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const { items, clear } = useCart();
  const { createOrder } = useOrders();

  const lineItems = useMemo(() => {
    return items
      .map(item => ({
        ...item,
        game: games.find(game => game.id === item.gameId) ?? null,
      }))
      .filter(item => item.game !== null);
  }, [items]);

  const totals = useMemo(() => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.game!.currentPrice * item.quantity, 0);
    const serviceFee = subtotal > 0 ? 2.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + serviceFee + tax;
    return { subtotal, serviceFee, tax, total };
  }, [lineItems]);

  const placeOrder = () => {
    const email = deliveryEmail.trim();
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address to receive your keys.");
      return;
    }

    const order = createOrder({
      items,
      deliveryEmail: email,
      paymentMethod: selectedPayment,
      subtotal: totals.subtotal,
      serviceFee: totals.serviceFee,
      tax: totals.tax,
      total: totals.total,
    });

    setEmailError(null);
    setPlacedOrderId(order.id);
    clear();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 size={30} />
            </div>
            <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-gray-900">Order placed</h1>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Your keys are being delivered to <span className="font-semibold text-gray-900">{deliveryEmail}</span>.
              You can track status and download invoices from your orders page.
            </p>
            {placedOrderId ? (
              <p className="mt-3 text-sm font-semibold text-gray-700">Order ID: {placedOrderId}</p>
            ) : null}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/orders"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                View orders
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (lineItems.length === 0) {
    return (
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Your cart is empty</h1>
            <p className="text-gray-600 mt-3">
              Add items to your cart before checking out.
            </p>
            <Link
              to="/catalog"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-orange-600">Secure checkout</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Checkout</h1>
              <p className="text-base text-gray-600 mt-2">Complete your purchase and receive your keys instantly.</p>
            </div>
            <Link to="/cart" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Edit cart
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900">Delivery details</h2>
                <p className="text-sm text-gray-600 mt-2">We will send your keys and receipts to this email.</p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Email address</label>
                    <input
                      value={deliveryEmail}
                      onChange={event => {
                        setDeliveryEmail(event.target.value);
                        if (emailError) {
                          setEmailError(null);
                        }
                      }}
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="you@example.com"
                    />
                    {emailError ? (
                      <p className="mt-2 text-sm text-red-600">{emailError}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Delivery region</label>
                    <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={event => setNewsletter(event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Email me the best deals and new releases.
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900">Payment method</h2>
                <p className="text-sm text-gray-600 mt-2">Choose how you would like to pay.</p>
                <div className="mt-5 space-y-3">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                        selectedPayment === method.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                            <method.icon size={20} className="text-gray-700" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{method.label}</p>
                            <p className="text-xs text-gray-500">{method.helper}</p>
                          </div>
                        </div>
                        {selectedPayment === method.id ? (
                          <CheckCircle2 className="text-blue-600" size={20} />
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900">Review items</h2>
                <div className="mt-5 space-y-4">
                  {lineItems.map(item => (
                    <div key={item.game!.id} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.game!.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} x {item.game!.platform}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.game!.currentPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sticky top-24">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Order total</h2>
                  <Lock size={18} className="text-gray-500" />
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Service fee</span>
                    <span>${totals.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated tax</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={placeOrder}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Place order
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600"
                  >
                    Apply gift card
                  </button>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-green-500 mt-0.5" />
                    Buyer protection for every order.
                  </div>
                  <div className="flex items-start gap-2">
                    <CreditCard size={16} className="text-blue-500 mt-0.5" />
                    Encrypted payments and fraud monitoring.
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
                Keys are delivered instantly after payment confirmation. We'll email you if there are any issues.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
