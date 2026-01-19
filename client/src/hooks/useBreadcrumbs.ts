import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBreadcrumbTrail } from "../routes/routeConfig";

type BreadcrumbItem = {
  label: string;
  path: string;
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const params = useParams();

  return useMemo(() => {
    const trail = getBreadcrumbTrail(location.pathname);

    // Enhance breadcrumbs with actual params if available
    // This allows dynamic routes to show better labels
    return trail.map((crumb, index) => {
      // If this is a dynamic route segment, try to enhance the label
      if (index === trail.length - 1 && Object.keys(params).length > 0) {
        // For now, we'll use the route config breadcrumb function
        // In a real app, you might fetch data here to get better labels
        return crumb;
      }
      return crumb;
    });
  }, [location.pathname, params]);
};

