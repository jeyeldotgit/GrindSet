import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Zap,
  Target,
  Users,
  User,
  Bell,
  Menu,
  X,
  LogOut,
  Settings,
  BarChart3,
} from "lucide-react";
import { getNavRoutes } from "../../routes/routeConfig";
import { useAuth } from "../../hooks/useAuth";
import MiniTimer from "./MiniTimer";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
};

// Icon mapping for routes
const routeIcons: Record<string, React.ReactNode> = {
  "/dashboard": <BarChart3 className="w-5 h-5" />,
  "/sessions": <Zap className="w-5 h-5" />,
  "/feed": <Users className="w-5 h-5" />,
  "/goals": <Target className="w-5 h-5" />,
  "/squads": <Users className="w-5 h-5" />,
};

type EnhancedNavbarProps = {
  unreadNotifications?: number;
  className?: string;
};

const EnhancedNavbar = ({
  unreadNotifications = 0,
  className = "",
}: EnhancedNavbarProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Import logout from useAuth
  const { logout, isLoading } = useAuth();

  // Derive nav items from route config
  const mainNavItems: NavItem[] = useMemo(() => {
    return getNavRoutes().map((route) => ({
      label: route.label,
      path: route.path,
      icon: routeIcons[route.path] || <BarChart3 className="w-5 h-5" />,
    }));
  }, []);

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    if (isLoading) return; // Prevent multiple clicks
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }

    setUserMenuOpen(false);
  };

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuDropdownRef = useRef<HTMLUListElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        userMenuDropdownRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !userMenuDropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <nav
      className={`navbar bg-base-100 border-b border-white/5 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-start">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="btn btn-ghost text-xl font-black italic focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
          aria-label="GrindSet Home"
        >
          GRINDSET
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:ml-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`btn btn-ghost focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 ${
                isActive(item.path) ? "text-primary" : ""
              }`}
              aria-label={item.label}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.icon}
              <span className="ml-2 hidden xl:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="navbar-end">
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Mini Timer - shows when active session exists */}
          <MiniTimer />

          {/* Notifications */}
          <Link
            to="/notifications"
            className="btn btn-ghost btn-circle relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
            )}
          </Link>

          {/* User Menu */}
          <div className="relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              ref={userMenuRef}
              aria-label="User menu"
              aria-expanded={userMenuOpen}
            >
              <User className="w-5 h-5" />
            </div>
            {userMenuOpen && (
              <ul
                ref={userMenuDropdownRef}
                tabIndex={0}
                className="absolute right-0 mt-2 menu bg-neutral border border-white/5 rounded-box w-52 p-2 shadow-2xl z-50"
              >
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/stats"
                    onClick={() => setUserMenuOpen(false)}
                    className="focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Statistics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/friends"
                    onClick={() => setUserMenuOpen(false)}
                    className="focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <Users className="w-4 h-4" />
                    Friends
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </li>
                <li className="border-t border-white/5 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="text-error focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-base-100 border-b border-white/5 shadow-2xl z-50">
          <div className="flex flex-col p-4 space-y-2">
            {/* Mini Timer in mobile menu */}
            <div className="pb-2 border-b border-white/5 mb-2">
              <MiniTimer />
            </div>
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`btn btn-ghost justify-start ${
                  isActive(item.path) ? "text-primary" : ""
                }`}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
            <div className="divider my-2" />
            <Link
              to="/notifications"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-ghost justify-start"
            >
              <Bell className="w-5 h-5" />
              <span className="ml-2">
                Notifications
                {unreadNotifications > 0 && (
                  <span className="ml-2 badge badge-error badge-sm">
                    {unreadNotifications}
                  </span>
                )}
              </span>
            </Link>
            <Link
              to="/friends"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-ghost justify-start"
            >
              <Users className="w-5 h-5" />
              <span className="ml-2">Friends</span>
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-ghost justify-start"
            >
              <User className="w-5 h-5" />
              <span className="ml-2">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-ghost justify-start text-error"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EnhancedNavbar;
