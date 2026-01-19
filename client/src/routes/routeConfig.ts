type RouteConfig = {
  path: string;
  label: string;
  nav?: boolean; // Show in navbar
  breadcrumb?: string | ((params: Record<string, string>) => string);
  parent?: string; // Parent route path for hierarchy
};

export const routes: RouteConfig[] = [
  // Public routes
  {
    path: "/",
    label: "Home",
    nav: false,
  },
  {
    path: "/login",
    label: "Login",
    nav: false,
  },
  {
    path: "/register",
    label: "Register",
    nav: false,
  },
  // Authenticated routes
  {
    path: "/dashboard",
    label: "Dashboard",
    nav: true,
  },
  {
    path: "/sessions",
    label: "Sessions",
    nav: true,
  },
  {
    path: "/sessions/new",
    label: "New Session",
    parent: "/sessions",
    breadcrumb: "New Session",
    nav: false,
  },
  {
    path: "/sessions/:id",
    label: "Session Details",
    parent: "/sessions",
    breadcrumb: (params) => {
      // In a real app, you'd fetch the session title here
      // For now, return a generic label
      return "Session Details";
    },
    nav: false,
  },
  {
    path: "/feed",
    label: "Feed",
    nav: true,
  },
  {
    path: "/goals",
    label: "Goals",
    nav: true,
  },
  {
    path: "/squads",
    label: "Squads",
    nav: true,
  },
  {
    path: "/squads/new",
    label: "Create Squad",
    parent: "/squads",
    breadcrumb: "Create Squad",
    nav: false,
  },
  {
    path: "/squads/:id",
    label: "Squad Details",
    parent: "/squads",
    breadcrumb: (params) => {
      // In a real app, you'd fetch the squad name here
      // For now, return a generic label
      return "Squad Details";
    },
    nav: false,
  },
  {
    path: "/profile",
    label: "Profile",
    nav: false, // In user menu, not main nav
  },
  {
    path: "/profile/stats",
    label: "Statistics",
    parent: "/profile",
    breadcrumb: "Statistics",
    nav: false,
  },
  {
    path: "/friends",
    label: "Friends",
    nav: false, // In user menu, not main nav
  },
  {
    path: "/notifications",
    label: "Notifications",
    nav: false, // Accessible via bell icon
  },
];

// Helper to get route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find((route) => route.path === path);
};

// Helper to find route that matches a path (handles dynamic routes)
export const findMatchingRoute = (
  pathname: string
): RouteConfig | undefined => {
  // Try exact match first
  const exactMatch = routes.find((route) => route.path === pathname);
  if (exactMatch) return exactMatch;

  // Try dynamic route match
  for (const route of routes) {
    if (route.path.includes(":")) {
      const pattern = route.path.replace(/:[^/]+/g, "[^/]+");
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(pathname)) {
        return route;
      }
    }
  }

  return undefined;
};

// Extract params from pathname for dynamic routes
export const extractParams = (
  pathname: string,
  routePath: string
): Record<string, string> => {
  const params: Record<string, string> = {};
  const pathSegments = pathname.split("/").filter(Boolean);
  const routeSegments = routePath.split("/").filter(Boolean);

  routeSegments.forEach((segment, index) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1);
      params[paramName] = pathSegments[index] || "";
    }
  });

  return params;
};

// Get all nav routes (for navbar)
export const getNavRoutes = (): RouteConfig[] => {
  return routes.filter((route) => route.nav === true);
};

// Build breadcrumb path from segments
const buildPathFromSegments = (segments: string[]): string => {
  return "/" + segments.join("/");
};

// Get breadcrumb trail for a pathname
export const getBreadcrumbTrail = (
  pathname: string
): Array<{ label: string; path: string }> => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: Array<{ label: string; path: string }> = [];

  // Check if this is an authenticated route
  const isAuthenticatedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/sessions") ||
    pathname.startsWith("/feed") ||
    pathname.startsWith("/goals") ||
    pathname.startsWith("/squads") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/friends") ||
    pathname.startsWith("/notifications");

  // Always start with dashboard for authenticated routes (except dashboard itself)
  if (isAuthenticatedRoute && pathname !== "/dashboard") {
    const dashboardRoute = routes.find((r) => r.path === "/dashboard");
    if (dashboardRoute) {
      breadcrumbs.push({
        label: dashboardRoute.label,
        path: dashboardRoute.path,
      });
    }
  }

  // Build breadcrumb trail by checking each segment
  for (let i = 0; i < segments.length; i++) {
    const currentPath = buildPathFromSegments(segments.slice(0, i + 1));
    const route = findMatchingRoute(currentPath);

    if (route) {
      // Skip dashboard if we already added it
      if (route.path === "/dashboard" && breadcrumbs.length > 0) {
        continue;
      }

      let label = route.label;

      // Handle dynamic breadcrumb
      if (route.breadcrumb) {
        if (typeof route.breadcrumb === "function") {
          const params = extractParams(currentPath, route.path);
          label = route.breadcrumb(params);
        } else {
          label = route.breadcrumb;
        }
      }

      breadcrumbs.push({
        label,
        path: currentPath,
      });
    } else if (i > 0) {
      // Only add fallback for nested routes, not root
      // Fallback: use segment as label if no route found
      const capitalized = segments[i].charAt(0).toUpperCase() + segments[i].slice(1);
      breadcrumbs.push({
        label: capitalized,
        path: currentPath,
      });
    }
  }

  return breadcrumbs;
};

