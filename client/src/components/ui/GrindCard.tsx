import SuccessBadge from "./SuccessBadge";
import StatDisplay from "./StatDisplay";

type GrindCardProps = {
  title: string;
  subtitle?: string;
  duration: string;
  sets: number;
  notes?: string;
  verified?: boolean;
  onAction?: () => void;
  actionLabel?: string;
  variant?: "default" | "compact" | "minimal";
  className?: string;
};

const GrindCard = ({
  title,
  subtitle = "Deep Work Session",
  duration,
  sets,
  notes,
  verified = false,
  onAction,
  actionLabel = "Give Kudos 🔥",
  variant = "default",
  className = "",
}: GrindCardProps) => {
  return (
    <div
      className={`card w-full bg-neutral shadow-2xl border-l-4 border-primary ${className}`}
      role="article"
      aria-label={`Session: ${title}, Duration: ${duration}`}
    >
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            {subtitle && (
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {subtitle}
              </h3>
            )}
            <h2 className="card-title text-2xl font-black italic">{title}</h2>
          </div>
          {verified && (
            <SuccessBadge variant="secondary">VERIFIED GRIND</SuccessBadge>
          )}
        </div>

        {/* Stats */}
        <div className="stats bg-transparent w-full mt-4">
          <StatDisplay title="Duration" value={duration} highlight />
          <StatDisplay title="Sets" value={sets} />
        </div>

        {/* Notes */}
        {variant !== "compact" && variant !== "minimal" && notes && (
          <div className="mt-4 opacity-70">
            <p className="text-sm font-medium">"{notes}"</p>
          </div>
        )}

        {/* Actions */}
        {variant !== "minimal" && onAction && (
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-ghost btn-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
              onClick={onAction}
              aria-label={actionLabel}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrindCard;

