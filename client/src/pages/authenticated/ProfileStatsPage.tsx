import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Calendar, BarChart3, Flame } from "lucide-react";
import { Navbar, StatDisplay, FocusProgress } from "../../components/ui";
import mockData from "../../mockdata.json";

const ProfileStatsPage = () => {
  const stats = mockData.stats;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/profile"
              className="text-sm text-primary hover:underline mb-4 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </Link>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Statistics
            </h1>
            <p className="text-gray-400">Your performance analytics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overall Stats */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    <h2 className="card-title text-2xl font-black italic">
                      Overall Statistics
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <StatDisplay
                      title="Total Sessions"
                      value={stats.totalSessions}
                      description="All time"
                      highlight
                    />
                    <StatDisplay
                      title="Total Hours"
                      value={stats.totalHours}
                      description="All time"
                      highlight
                    />
                    <StatDisplay
                      title="Current Streak"
                      value={`${stats.currentStreak} days`}
                      description="Keep it up!"
                    />
                    <StatDisplay
                      title="Avg Focus Score"
                      value={`${stats.averageFocusScore}%`}
                      description="Session average"
                    />
                  </div>
                </div>
              </div>

              {/* Heatmap Placeholder */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h2 className="card-title text-2xl font-black italic">
                      Activity Heatmap
                    </h2>
                  </div>
                  <div className="h-48 flex items-center justify-center border border-white/5 rounded-lg">
                    <p className="text-gray-400">
                      Heatmap visualization will appear here
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject Breakdown */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    <h2 className="card-title text-2xl font-black italic">
                      Subject Breakdown
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { subject: "Mathematics", hours: 120, percentage: 35 },
                      { subject: "Computer Science", hours: 100, percentage: 29 },
                      { subject: "Physics", hours: 80, percentage: 23 },
                      { subject: "Other", hours: 42, percentage: 13 },
                    ].map((item) => (
                      <div key={item.subject}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">{item.subject}</span>
                          <span className="text-gray-400">
                            {item.hours}h ({item.percentage}%)
                          </span>
                        </div>
                        <FocusProgress
                          progress={item.percentage}
                          variant="linear"
                          showLabel={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Streak Info */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-6 h-6 text-primary" />
                    <h3 className="card-title text-xl font-black italic">
                      Streak
                    </h3>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-mono font-black text-primary mb-2">
                      {stats.currentStreak}
                    </div>
                    <p className="text-sm text-gray-400">days in a row</p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-6 h-6 text-primary" />
                    <h3 className="card-title text-xl font-black italic">
                      Achievements
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "100 Sessions",
                      "30 Day Streak",
                      "500 Hours",
                      "Perfect Week",
                    ].map((achievement) => (
                      <div
                        key={achievement}
                        className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-white/5"
                      >
                        <Trophy className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsPage;

