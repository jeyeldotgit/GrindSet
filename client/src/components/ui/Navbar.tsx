import { Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

type NavbarProps = {
  items?: NavItem[];
  logoPath?: string;
  className?: string;
};

const Navbar = ({
  items = [],
  logoPath = "/",
  className = "",
}: NavbarProps) => {
  const defaultItems: NavItem[] = [
    { label: "Sessions", path: "/sessions", icon: <Zap className="w-5 h-5" /> },
    { label: "Goals", path: "/goals", icon: <Target className="w-5 h-5" /> },
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  return (
    <nav
      className={`navbar bg-base-100 border-b border-white/5 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-start">
        <Link
          to={logoPath}
          className="btn btn-ghost text-xl font-black italic focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
          aria-label="GrindSet Home"
        >
          GRINDSET
        </Link>
      </div>
      <div className="navbar-end">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="btn btn-ghost focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
            aria-label={item.label}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

