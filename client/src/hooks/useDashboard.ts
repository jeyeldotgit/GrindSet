import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();

  const handleStartSession = () => {
    console.log("Start session clicked");
    navigate("/sessions/new");
  };

  const handleSessionClick = (sessionId: string) => {
    console.log(`Session clicked: ${sessionId}`);
    navigate(`/sessions/${sessionId}`);
  };

  const dashboardData = {
    todayPerformance: {
      sessions: {
        value: "5",
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
    recentSessions: [
      {
        id: "1",
        title: "Advanced Calculus",
        duration: "2h 45m",
        sets: 5,
        verified: true,
      },
      {
        id: "2",
        title: "Data Structures",
        duration: "1h 30m",
        sets: 3,
        verified: true,
      },
      {
        id: "3",
        title: "Machine Learning",
        duration: "3h 15m",
        sets: 7,
        verified: true,
      },
    ],
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
    dashboardData,
    unreadNotifications: 3,
  };
};
