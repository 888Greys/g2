import { Link } from "react-router-dom";
import { Package, Download, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { type OrderStatus, formatOrderDate } from "../lib/orders";

const statusStyles: Record<OrderStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  Delivered: { label: "Delivered", className: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle2 },
  Processing: { label: "Processing", className: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  "Issue reported": { label: "Issue reported", className: "bg-orange-50 text-orange-700 border-orange-200", icon: AlertCircle },
};

export default function Orders() {
  const { orders } = useOrders();

  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-orange-600">Orders</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Order history</h1>
              <p className="text-base text-gray-600 mt-2">Access your keys, receipts, and support cases.</p>
            </div>
            <Link to="/account" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Back to account
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {orders.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900">No orders yet</h2>
              <p className="text-gray-600 mt-3">Your completed purchases will appear here with receipts and status.</p>
              <Link
                to="/catalog"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map(order => {
                const status = statusStyles[order.status];
                const StatusIcon = status.icon;
                return (
                  <div key={order.id} className="rounded-3xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{order.id}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar size={14} />
                              {formatOrderDate(order.createdAtIso)}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.items.map(item => item.title).join(" • ")}
                        </div>
                        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </div>
                      </div>

                      <div className="space-y-3 text-right">
                        <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-blue-300 hover:text-blue-600">
                          <Download size={16} />
                          Download invoice
                        </button>
                        <div>
                          <Link to="/support" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                            Need help?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
