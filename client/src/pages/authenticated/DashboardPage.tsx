import { Link } from "react-router-dom";
import { Zap, Target, TrendingUp, Clock } from "lucide-react";
import {
  EnhancedNavbar,
  Button,
  StatDisplay,
  FocusProgress,
} from "../../components/ui";

import Sessions from "../../components/dashboard/Sessions";

import { useDashboard } from "../../hooks/useDashboard";

const DashboardPage = () => {
  const {
    handleStartSession,
    handleSessionClick,
    dashboardData,
    unreadNotifications,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={unreadNotifications} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">Track your cognitive performance</p>
          </div>
          <Link to="/sessions/new">
            <Button onClick={handleStartSession} className="text-gray-900">
              <Zap className="w-5 h-5 mr-2" />
              Start Session
            </Button>
          </Link>
        </div>

        {/* Today's Performance */}
        <div className="card bg-neutral border border-white/5 mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl font-black italic mb-4">
              Today's Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatDisplay
                title="Sessions"
                value={dashboardData.todayPerformance.sessions.value}
                description={
                  dashboardData.todayPerformance.sessions.description
                }
                highlight
              />
              <StatDisplay
                title="Time"
                value={dashboardData.todayPerformance.time.value}
                description={dashboardData.todayPerformance.time.description}
              />
              <StatDisplay
                title="Focus Score"
                value={dashboardData.todayPerformance.focusScore.value}
                description={
                  dashboardData.todayPerformance.focusScore.description
                }
                highlight
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Recent Sessions */}
          <Sessions
            dashboardData={dashboardData}
            handleSessionClick={handleSessionClick}
          ></Sessions>

          {/* Sidebar - Stats & Progress */}
          <div className="space-y-6">
            {/* Overall Stats */}
            <div className="card bg-neutral border border-white/5">
              <div className="card-body">
                <h3 className="card-title text-xl font-black italic mb-4">
                  Overall Stats
                </h3>
                <div className="space-y-4">
                  <StatDisplay
                    title="Total Sessions"
                    value={dashboardData.overallStats.totalSessions.value}
                    description={
                      dashboardData.overallStats.totalSessions.description
                    }
                  />
                  <StatDisplay
                    title="Hours Logged"
                    value={dashboardData.overallStats.hoursLogged.value}
                    description={
                      dashboardData.overallStats.hoursLogged.description
                    }
                    highlight
                  />
                  <StatDisplay
                    title="Current Streak"
                    value={dashboardData.overallStats.currentStreak.value}
                    description={
                      dashboardData.overallStats.currentStreak.description
                    }
                  />
                </div>
              </div>
            </div>

            {/* Daily Goal Progress */}
            <div className="card bg-neutral border border-white/5">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="card-title text-xl font-black italic">
                    Daily Goal
                  </h3>
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col items-center">
                  <FocusProgress
                    progress={dashboardData.dailyGoal.progress}
                    variant="radial"
                    size="8rem"
                  />
                  <p className="text-sm text-gray-400 mt-4">
                    {dashboardData.dailyGoal.completed} /{" "}
                    {dashboardData.dailyGoal.target} target completed
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-neutral border border-white/5">
              <div className="card-body">
                <h3 className="card-title text-xl font-black italic mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link to="/sessions/new" className="block">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleStartSession}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      New Session
                    </Button>
                  </Link>
                  <Link to="/goals" className="block">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => console.log("Goals clicked")}
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Set Goals
                    </Button>
                  </Link>
                  <Link to="/sessions" className="block">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => console.log("History clicked")}
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      View History
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
