import SuccessBadge from "./SuccessBadge";

type FeedCardProps = {
  title: string;
  duration: string;
  sets: number;
  verified?: boolean;
  onClick?: () => void;
  className?: string;
};

const FeedCard = ({
  title,
  duration,
  sets,
  verified = false,
  onClick,
  className = "",
}: FeedCardProps) => {
  return (
    <div
      className={`card bg-neutral border border-white/5 hover:border-white/10 transition-all cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Session: ${title}, Duration: ${duration}, Sets: ${sets}`}
    >
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-400">
              {duration} • {sets} {sets === 1 ? "set" : "sets"}
            </p>
          </div>
          {verified && <SuccessBadge variant="secondary">VERIFIED</SuccessBadge>}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

