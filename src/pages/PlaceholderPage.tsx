import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  primaryActionText?: string;
  primaryActionHref?: string;
}

export function PlaceholderPage({
  title,
  description,
  primaryActionText,
  primaryActionHref,
}: PlaceholderPageProps) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-white to-gray-50 p-8 md:p-12 shadow-sm">
          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
            In progress
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl">
            {description || "This page is next in line. We are building the full experience step by step."}
          </p>
          {primaryActionText && primaryActionHref ? (
            <Link
              to={primaryActionHref}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {primaryActionText}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
