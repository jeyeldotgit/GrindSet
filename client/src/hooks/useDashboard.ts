import { useNavigate } from "react-router-dom";
import { useGrind } from "./useGrinds";

export const useDashboard = () => {
  const navigate = useNavigate();

  // 1. Consume the "Grind" hook
  const { grindSesions, status, fetchAllGrindSessions } = useGrind();

  // 2. Add Dashboard-specific logic
  const handleStartSession = () => navigate("/sessions/new");
  const handleSessionClick = (sessionId: string) =>
    navigate(`/sessions/${sessionId}`);

  // 3. Transform Raw Grind Data into "Dashboard Data"
  // This is where the magic happens—converting DB rows into UI display values
  const sessionsCount = grindSesions?.length || 0;

  const dashboardData = {
    todayPerformance: {
      sessions: {
        value: sessionsCount.toString(),
        description: "+2 from yesterday",
      },
      time: {
        value: "4h 30m",
        description: "Avg 54m/session",
      },
      focusScore: {
        value: "92%",
        description: "Personal best",
      },
    },
    // Map your real database sessions to the format your UI expects
    recentSessions:
      grindSesions?.slice(0, 3).map((s) => ({
        id: s.id,
        title: s.title,
        duration: `${Math.floor(s.duration / 60)}m`,
        sets: s.pomodoroSets,
        verified: s.status === "COMPLETED",
      })) || [],
    overallStats: {
      totalSessions: {
        value: "127",
        description: "+12 this week",
      },
      hoursLogged: {
        value: "342",
        description: "This month",
      },
      currentStreak: {
        value: "42",
        description: "days in a row",
      },
    },
    dailyGoal: {
      progress: 75,
      target: "4h",
      completed: "3h",
    },
  };

  return {
    handleStartSession,
    handleSessionClick,
    fetchAllGrindSessions,
    status,
    dashboardData,
    unreadNotifications: 3,
  };
};
