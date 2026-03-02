import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Minus, Plus, Trash2, CreditCard, Truck } from "lucide-react";
import { games } from "../data/games";
import { GameCard } from "../components/GameCard";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCart();

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
    const originalSubtotal = lineItems.reduce((sum, item) => sum + item.game!.originalPrice * item.quantity, 0);
    const savings = Math.max(0, originalSubtotal - subtotal);
    const serviceFee = subtotal > 0 ? 2.99 : 0;
    const total = subtotal + serviceFee;

    return { subtotal, originalSubtotal, savings, serviceFee, total };
  }, [lineItems]);

  const totalItems = lineItems.reduce((sum, item) => sum + item.quantity, 0);

  if (lineItems.length === 0) {
    return (
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Your cart is empty</h1>
            <p className="text-gray-600 mt-3">
              Browse the catalog to find your next deal. We will keep your favorites ready for checkout.
            </p>
            <Link
              to="/catalog"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Start shopping
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
              <p className="text-sm font-semibold text-orange-600">Checkout</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Shopping cart</h1>
              <p className="text-base text-gray-600 mt-2">
                {totalItems} item{totalItems === 1 ? "" : "s"} in your cart
              </p>
            </div>
            <Link
              to="/catalog"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              {lineItems.map(item => (
                <div key={item.game!.id} className="rounded-3xl border border-gray-200 bg-white p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-40">
                      <img
                        src={item.game!.coverUrl}
                        alt={item.game!.title}
                        className="w-full h-48 md:h-56 object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{item.game!.platform}</p>
                          <h2 className="text-xl font-bold text-gray-900 mt-2">{item.game!.title}</h2>
                          <p className="text-sm text-gray-500 mt-2">Seller: {item.game!.seller}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${item.game!.currentPrice.toFixed(2)}</p>
                          {item.game!.discount > 0 ? (
                            <p className="text-sm text-gray-400 line-through">${item.game!.originalPrice.toFixed(2)}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.game!.id, Math.max(0, item.quantity - 1))}
                            className="p-1 text-gray-500 hover:text-gray-900"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.game!.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-900"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.game!.id)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                        <div className="ml-auto text-sm text-gray-600">
                          Line total: <span className="font-semibold text-gray-900">${(item.game!.currentPrice * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-green-600">
                        <ShieldCheck size={14} />
                        Buyer protection enabled for this order.
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900">Recommended for you</h3>
                <p className="text-sm text-gray-600 mt-2">Based on your cart contents and top deals.</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {games.slice(0, 4).map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900">Order summary</h2>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Service fee</span>
                    <span>${totals.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-600">
                    <span>Savings</span>
                    <span>- ${totals.savings.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Proceed to checkout
                  </Link>
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600"
                  >
                    Apply promo code
                  </button>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <CreditCard size={16} className="text-blue-500 mt-0.5" />
                    Secure payments with 200+ methods.
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck size={16} className="text-green-500 mt-0.5" />
                    Instant digital delivery after checkout.
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
                Taxes and regional fees will be calculated at checkout once your delivery region is confirmed.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}



