import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import * as grindService from "../services/grindService";

interface GrindTimerState {
  timeLeft: number;
  isRunning: boolean;
  mode: "focus" | "break";
  currentSessionId: string | null;
  // Mock session data - will be replaced with real logic
  sessionTitle: string | null;
  sessionSubject: string | null;
  actions: {
    tick: () => void;
    start: (id: string) => void;
    pause: () => void;
    reset: (focusTime: number) => void;
    sync: () => void;
    setSession: (id: string, title: string, subject: string) => void;
    clearSession: () => void;
  };
}

export const useTimerStore = create<GrindTimerState>()(
  persist(
    // This saves the timer state to LocalStorage automatically
    (set, get) => ({
      timeLeft: 1500,
      isRunning: false,
      mode: "focus",
      currentSessionId: null,
      sessionTitle: null,
      sessionSubject: null,
      actions: {
        tick: () => set((state) => ({ timeLeft: state.timeLeft - 1 })),
        start: async (id) => {
          set({ isRunning: true, currentSessionId: id });

          try {
            const response = await grindService.startTimer(id);

            if (!response.grindSession) {
              throw new Error(
                "No grind session returned from API: " +
                  JSON.stringify(response.message),
              );
            }

            set({ isRunning: true, timeLeft: response.grindSession.duration });
          } catch (error) {
            console.error("Failed to start timer:", error);
          }
        },
        pause: () => set({ isRunning: false }),
        reset: (focusTime) => set({ timeLeft: focusTime, isRunning: false }),
        sync: () => ({}),
        // Mock: Set session when form is submitted
        setSession: (id, title, subject) => {
          set({
            currentSessionId: id,
            sessionTitle: title,
            sessionSubject: subject,
          });
        },
        // Mock: Clear session when stopped
        clearSession: () => {
          set({
            currentSessionId: null,
            sessionTitle: null,
            sessionSubject: null,
            isRunning: false,
            timeLeft: 1500,
          });
        },
      },
    }),
    {
      name: "grind-timer-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        timeLeft: state.timeLeft,
        currentSessionId: state.currentSessionId,
        mode: state.mode,
        sessionTitle: state.sessionTitle,
        sessionSubject: state.sessionSubject,
      }),
    },
  ),
);
