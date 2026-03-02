import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-sm text-center">
          <p className="text-sm font-semibold text-gray-500">404</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            The page you are looking for does not exist. Let us get you back to the marketplace.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
