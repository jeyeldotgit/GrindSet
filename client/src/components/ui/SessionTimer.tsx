type SessionTimerProps = {
  hours: number;
  minutes: number;
  seconds: number;
  className?: string;
};

const formatTime = (value: number): string => {
  return value.toString().padStart(2, "0");
};

const SessionTimer = ({
  hours,
  minutes,
  seconds,
  className = "",
}: SessionTimerProps) => {
  return (
    <div
      className={`font-mono text-7xl font-black text-primary ${className}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Session duration: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
    >
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
};

export default SessionTimer;

