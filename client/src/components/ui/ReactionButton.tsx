import { Flame, Heart } from "lucide-react";
import Button from "./Button";

type ReactionType = "fire" | "respect";

type ReactionButtonProps = {
  type: ReactionType;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
};

const ReactionButton = ({
  type,
  count,
  isActive = false,
  onClick,
  className = "",
}: ReactionButtonProps) => {
  const handleClick = () => {
    console.log(`${type} reaction clicked`);
    onClick?.();
  };

  const config = {
    fire: {
      icon: <Flame className="w-4 h-4" />,
      label: "Fire",
      activeClass: "text-primary",
    },
    respect: {
      icon: <Heart className="w-4 h-4" />,
      label: "Respect",
      activeClass: "text-secondary",
    },
  };

  const { icon, label, activeClass } = config[type];

  return (
    <button
      onClick={handleClick}
      className={`btn btn-ghost btn-sm gap-2 ${isActive ? activeClass : ""} ${className}`}
      aria-label={`${label} reaction (${count})`}
      aria-pressed={isActive}
    >
      {icon}
      <span className="font-mono text-sm">{count}</span>
    </button>
  );
};

export default ReactionButton;

