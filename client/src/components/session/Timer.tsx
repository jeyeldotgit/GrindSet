import { useState, useEffect } from "react";
import { Play, Pause, Square, Coffee, Brain } from "lucide-react";
import { Button } from "../ui";
import SessionTimer from "../ui/SessionTimer";

const Timer = () => {
  const [inputFocusTime, setInputFocusTime] = useState(25); // Default 25 minutes
  const [inputBreakTime, setInputBreakTime] = useState(5); // Default 5 minutes

  const FOCUS_TIME = inputFocusTime * 60;
  const BREAK_TIME = inputBreakTime * 60;

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [pomodoroSets, setPomodoroSets] = useState(0);
  const [showSettings, setShowSettings] = useState(true); // Start with settings shown

  // Reset timeLeft when focus or break time changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
    }
  }, [inputFocusTime, inputBreakTime, mode, isRunning]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Handle timer countdown
  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle session completion when timeLeft reaches 0
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === "focus") {
        setPomodoroSets((prev) => prev + 1);
        setMode("break");
        setTimeLeft(BREAK_TIME);
      } else {
        setMode("focus");
        setTimeLeft(FOCUS_TIME);
      }
    }
  }, [timeLeft, isRunning, mode]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleStop = () => {
    setIsRunning(false);
    setMode("focus");
    setTimeLeft(FOCUS_TIME);
    setInputFocusTime(25);
    setInputBreakTime(5);
  };

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
            <span className="label-text">{showSettings ? "Show Timer" : "Timer Sets"}</span>
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
          </div>
        ) : (
          <>
            <SessionTimer hours={hours} minutes={minutes} seconds={seconds} />

            <p className="mt-2 text-xs text-gray-500 uppercase tracking-widest">
              Sets Completed: {pomodoroSets}
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
