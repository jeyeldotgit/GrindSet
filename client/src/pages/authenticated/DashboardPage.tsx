import { Link } from "react-router-dom";
import { Zap, Target, TrendingUp, Clock } from "lucide-react";
import {
  Navbar,
  Button,
  StatDisplay,
  FeedCard,
  FocusProgress,
} from "../../components/ui";

const DashboardPage = () => {
  const handleStartSession = () => {
    console.log("Start session clicked");
  };

  const handleSessionClick = (sessionId: string) => {
    console.log(`Session clicked: ${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar
        items={[
          {
            label: "Sessions",
            path: "/sessions",
            icon: <Zap className="w-5 h-5" />,
          },
          {
            label: "Goals",
            path: "/goals",
            icon: <Target className="w-5 h-5" />,
          },
        ]}
      />

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
                value="5"
                description="+2 from yesterday"
                highlight
              />
              <StatDisplay
                title="Time"
                value="4h 30m"
                description="Avg 54m/session"
              />
              <StatDisplay
                title="Focus Score"
                value="92%"
                description="Personal best"
                highlight
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Recent Sessions */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                Recent Sessions
              </h2>
              <Link
                to="/sessions"
                className="text-sm text-primary hover:underline font-semibold"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              <FeedCard
                title="Advanced Calculus"
                duration="2h 45m"
                sets={5}
                verified
                onClick={() => handleSessionClick("1")}
              />
              <FeedCard
                title="Data Structures"
                duration="1h 30m"
                sets={3}
                verified
                onClick={() => handleSessionClick("2")}
              />
              <FeedCard
                title="Machine Learning"
                duration="3h 15m"
                sets={7}
                verified
                onClick={() => handleSessionClick("3")}
              />
            </div>
          </div>

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
                    value="127"
                    description="+12 this week"
                  />
                  <StatDisplay
                    title="Hours Logged"
                    value="342"
                    description="This month"
                    highlight
                  />
                  <StatDisplay
                    title="Current Streak"
                    value="42"
                    description="days in a row"
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
                  <FocusProgress progress={75} variant="radial" size="8rem" />
                  <p className="text-sm text-gray-400 mt-4">
                    3h / 4h target completed
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
