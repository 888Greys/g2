import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export function Section({ title, subtitle, children, actionText, actionHref, className = "" }: SectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>
          
          {actionText && (
            <Link
              to={actionHref || "/catalog"}
              className="group flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {actionText}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
        
        {children}
      </div>
    </section>
  );
}
