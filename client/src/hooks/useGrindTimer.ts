import { useEffect } from "react";
import { useTimerStore } from "../store/useGrindTimerStore";

export const useGrindTimer = () => {
  const { timeLeft, isRunning, mode, actions } = useTimerStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        actions.tick();
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Handle session completion logic here, e.g., switching modes
      // For now, we'll just log it.
      console.log("Session complete!");
      // You might want to add a `switchMode` action to your store
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, actions]);

  return { timeLeft, isRunning, mode, ...actions };
};