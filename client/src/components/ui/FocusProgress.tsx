type ProgressVariant = "radial" | "linear";

type FocusProgressProps = {
  progress: number;
  variant?: ProgressVariant;
  size?: string;
  showLabel?: boolean;
  className?: string;
};

const FocusProgress = ({
  progress,
  variant = "radial",
  size = "6rem",
  showLabel = true,
  className = "",
}: FocusProgressProps) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  if (variant === "radial") {
    return (
      <div
        className={`radial-progress text-primary border-4 border-neutral ${className}`}
        style={
          {
            "--value": clampedProgress,
            "--size": size,
          } as React.CSSProperties
        }
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${clampedProgress}%`}
      >
        {showLabel && `${Math.round(clampedProgress)}%`}
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-neutral rounded-full h-2 ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedProgress}%`}
    >
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};

export default FocusProgress;

