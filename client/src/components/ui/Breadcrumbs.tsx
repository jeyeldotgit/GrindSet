
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";

type BreadcrumbsProps = {
  className?: string;
  showBackButton?: boolean; // Show back button on mobile instead of full trail
};

const Breadcrumbs = ({
  className = "",
  showBackButton = true,
}: BreadcrumbsProps) => {
  const breadcrumbs = useBreadcrumbs();

  // On mobile, show back button or last 1-2 crumbs only
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const displayBreadcrumbs =  breadcrumbs.slice(-2) // Last 2 crumbs on mobile


  // If only one breadcrumb (e.g., Dashboard), don't show breadcrumbs
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      className={`breadcrumbs text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      {/* Mobile: Show back button */}
      {isMobile && showBackButton && breadcrumbs.length > 1 && (
        <Link
          to={breadcrumbs[breadcrumbs.length - 2].path}
          className="btn btn-ghost btn-sm mb-2 lg:hidden"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
      )}

      {/* Desktop: Show full breadcrumb trail */}
      <ul className="flex items-center gap-2 flex-wrap">
        {displayBreadcrumbs.map((item, index) => {
          const isLast = index === displayBreadcrumbs.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {!isLast ? (
                <Link
                  to={item.path}
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-400" aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

