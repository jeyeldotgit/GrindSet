type BadgeVariant = "primary" | "secondary" | "warning" | "error";

type SuccessBadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const SuccessBadge = ({
  children,
  variant = "secondary",
  className = "",
}: SuccessBadgeProps) => {
  const variantClasses = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    warning: "badge-warning",
    error: "badge-error",
  };

  const classes = `badge ${variantClasses[variant]} font-bold text-black px-4 italic ${className}`.trim();

  return (
    <div className={classes} role="status" aria-label={`Badge: ${children}`}>
      {children}
    </div>
  );
};

export default SuccessBadge;

