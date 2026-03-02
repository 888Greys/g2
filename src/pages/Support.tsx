import { Link } from "react-router-dom";
import {
  LifeBuoy,
  Mail,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  FileText,
  CreditCard,
  Globe,
} from "lucide-react";

const faqs = [
  {
    question: "When do I receive my key after checkout?",
    answer: "Most orders are delivered instantly. If a manual review is required, you'll receive an email within minutes.",
  },
  {
    question: "How do refunds and disputes work?",
    answer: "Submit a support request within 30 days. Our team will investigate and guide you through a refund or replacement.",
  },
  {
    question: "Can I change my region after purchase?",
    answer: "Region changes depend on the seller and key availability. Contact support to verify options before redemption.",
  },
  {
    question: "How do I sell keys on the marketplace?",
    answer: "Create a seller account, complete verification, and list your inventory. We will guide you through pricing and delivery.",
  },
];

const guides = [
  {
    title: "How to redeem your key",
    description: "Step-by-step instructions for Steam, EA App, and other platforms.",
    icon: FileText,
  },
  {
    title: "Payment methods and billing",
    description: "Understand supported payment types, fees, and receipt downloads.",
    icon: CreditCard,
  },
  {
    title: "Regional activation rules",
    description: "Check region locks, VPN policies, and activation guidance.",
    icon: Globe,
  },
];

export default function Support() {
  return (
    <div className="bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-orange-600">Support center</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">How can we help?</h1>
            <p className="text-base text-gray-600 mt-3">
              Find answers quickly, open a ticket, or chat with our team 24/7.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <MessageCircle size={22} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">Live chat</h2>
              <p className="text-sm text-gray-600 mt-2">Get help from a support agent in under 5 minutes.</p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                Start chat
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Mail size={22} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">Email support</h2>
              <p className="text-sm text-gray-600 mt-2">Open a ticket for billing, delivery, or account issues.</p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                Submit ticket
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                <LifeBuoy size={22} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">Seller help</h2>
              <p className="text-sm text-gray-600 mt-2">Guidance on listings, payouts, and buyer disputes.</p>
              <Link
                to="/seller"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Go to dashboard
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
                <p className="text-sm text-gray-600 mt-2">Answers for buyers and sellers.</p>
              </div>
              <ShieldCheck className="text-green-500" size={20} />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faqs.map(item => (
                <div key={item.question} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">{item.question}</p>
                  <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-8">
              <h2 className="text-xl font-bold text-gray-900">Guides and tutorials</h2>
              <p className="text-sm text-gray-600 mt-2">Step-by-step resources curated by our team.</p>
              <div className="mt-6 space-y-4">
                {guides.map(guide => (
                  <div key={guide.title} className="flex items-start gap-4 rounded-2xl border border-gray-100 p-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <guide.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{guide.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{guide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-indigo-900 p-8 text-white">
                <p className="text-sm uppercase tracking-wide text-indigo-200">Priority support</p>
                <h3 className="mt-3 text-2xl font-bold">G2A Plus members</h3>
                <p className="mt-3 text-sm text-indigo-100">
                  Skip the line with priority assistance and dedicated escalation paths.
                </p>
                <Link to="/signup" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Join G2A Plus
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
                For urgent order issues, include your order ID and delivery email to speed up resolution.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
