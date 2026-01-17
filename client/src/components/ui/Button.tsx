type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost";
  className?: string;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "btn uppercase font-black tracking-tighter italic focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 transition-all duration-200";

  const variantClasses = {
    primary: "btn-primary",
    ghost: "btn-ghost",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    loading ? "loading" : ""
  } ${disabled ? "btn-disabled" : ""} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      aria-busy={loading}
      aria-disabled={disabled}
    >
      {loading ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
};

export default Button;
