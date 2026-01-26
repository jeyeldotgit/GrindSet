import { Link } from "react-router-dom";
import { Clock, Play, Pause } from "lucide-react";
import { useTimerStore } from "../../store/useGrindTimerStore";
import { useGrindTimer } from "../../hooks/useGrindTimer";

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const MiniTimer = () => {
  const currentSessionId = useTimerStore((state) => state.currentSessionId);
  const sessionTitle = useTimerStore((state) => state.sessionTitle);
  const { timeLeft, isRunning, pause, start } = useGrindTimer();

  // Don't render if no active session
  if (!currentSessionId) {
    return null;
  }

  const handleToggle = () => {
    if (isRunning) {
      pause();
    } else {
      // Mock: Use current session ID
      start(currentSessionId);
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral border border-white/5">
      <Link
        to="/sessions/new"
        className="flex items-center gap-2 flex-1 min-w-0 hover:opacity-80 transition-opacity"
        aria-label="Go to session timer"
      >
        <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-gray-400 truncate max-w-[100px] leading-tight">
            {sessionTitle || "Session"}
          </span>
          <span className="text-xs font-mono font-bold text-primary leading-tight">
            {formatTime(timeLeft)}
          </span>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggle();
        }}
        className="p-1 rounded hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label={isRunning ? "Pause timer" : "Resume timer"}
      >
        {isRunning ? (
          <Pause className="w-3 h-3 text-gray-400" />
        ) : (
          <Play className="w-3 h-3 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default MiniTimer;

