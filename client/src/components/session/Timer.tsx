import { useState, useEffect } from "react";
import { Play, Pause, Square, Coffee, Brain } from "lucide-react";
import { Button } from "../ui";
import SessionTimer from "../ui/SessionTimer";
import { useGrindTimer } from "../../hooks/useGrindTimer";

interface TimerProps {
  sessionId: string;
}

const Timer = ({ sessionId }: TimerProps) => {
  // Local state for UI settings that don't need to be global.
  const [inputFocusTime, setInputFocusTime] = useState(25);
  const [inputBreakTime, setInputBreakTime] = useState(5);
  const [showSettings, setShowSettings] = useState(false);

  // All timer-related state and actions now come from our custom hook.
  const { timeLeft, isRunning, mode, start, pause, reset, clearSession } = useGrindTimer();

  // The countdown logic is now in the useGrindTimer hook.
  // We only need to handle UI and user input here.

  // The handle functions now call the actions from the hook.
  const handleStart = () => {
    // The component doesn't need to know *how* start works, just that it can be called.
    // The async logic and API call are handled in the Zustand store.
    start(sessionId);
    setShowSettings(false); // Switch to timer view on start
  };

  const handlePause = () => {
    pause();
  };

  const handleStop = () => {
    // The reset action in the store handles resetting the state.
    reset(inputFocusTime * 60);
    setShowSettings(true); // Show settings on stop
    // Clear the session when stopped
    clearSession();
  };

  // When the user changes the focus time slider, update the timer in the store
  // only if the timer is not currently running.
  useEffect(() => {
    if (!isRunning) {
      reset(inputFocusTime * 60);
    }
  }, [inputFocusTime, isRunning, reset]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="card bg-neutral border border-white/5 mb-8">
      <div className="card-body items-center text-center py-12">
        <div className="flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/5 text-sm font-medium">
          {mode === "focus" ? (
            <>
              <Brain className="w-4 h-4 text-purple-400" /> Focus Session
            </>
          ) : (
            <>
              <Coffee className="w-4 h-4 text-green-400" /> Short Break
            </>
          )}
        </div>

        <div className="form-control w-52 mb-4">
          <label className="label cursor-pointer">
            <span className="label-text">
              {showSettings ? "Show Settings" : "Show Timer"}
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={!showSettings}
              onChange={() => setShowSettings(!showSettings)}
            />
          </label>
        </div>

        {showSettings ? (
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Focus Time (minutes)</span>
                  <span className="label-text-alt">{inputFocusTime} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={inputFocusTime}
                  onChange={(e) => setInputFocusTime(Number(e.target.value))}
                  className="range range-primary"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Break Time (minutes)</span>
                  <span className="label-text-alt">{inputBreakTime} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={inputBreakTime}
                  onChange={(e) => setInputBreakTime(Number(e.target.value))}
                  className="range range-secondary"
                />
              </label>
            </div>
            <Button
              onClick={handleStart}
              className="bg-primary text-gray-900 hover:bg-primary/90 mt-4"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Session
            </Button>
          </div>
        ) : (
          <>
            <SessionTimer hours={hours} minutes={minutes} seconds={seconds} />

            <p className="mt-2 text-xs text-gray-500 uppercase tracking-widest">
              {/* This will need to come from the store eventually */}
              Sets Completed: 0
            </p>

            <div className="flex gap-4 mt-8">
              {!isRunning ? (
                <Button
                  onClick={handleStart}
                  className="bg-primary text-gray-900 hover:bg-primary/90"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  variant="ghost"
                  className="border border-white/10"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button
                onClick={handleStop}
                variant="ghost"
                className="text-red-400 hover:text-red-300"
              >
                <Square className="w-5 h-5 mr-2" />
                Stop
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
