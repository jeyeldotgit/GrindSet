import Button from "./Button";

type SocialProvider = "google" | "facebook";

type SocialAuthButtonProps = {
  provider: SocialProvider;
  onClick?: () => void;
  className?: string;
};

const SocialAuthButton = ({
  provider,
  onClick,
  className = "",
}: SocialAuthButtonProps) => {
  const handleClick = () => {
    console.log(`${provider} button clicked`);
    onClick?.();
  };

  const providerConfig = {
    google: {
      label: "Continue with Google",
      icon: "G",
    },
    facebook: {
      label: "Continue with Facebook",
      icon: "f",
    },
  };

  const config = providerConfig[provider];

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`w-full border border-white/10 hover:border-white/20 ${className}`}
      aria-label={config.label}
    >
      <span className="font-bold text-lg mr-2">{config.icon}</span>
      {config.label}
    </Button>
  );
};

export default SocialAuthButton;
