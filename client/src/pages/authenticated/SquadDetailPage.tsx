import { Link, useParams } from "react-router-dom";
import { Users, Trophy, TrendingUp, Crown } from "lucide-react";
import { EnhancedNavbar, Breadcrumbs, Button, StatDisplay, FeedCard } from "../../components/ui";
import mockData from "../../mockdata.json";

const SquadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const sessions = mockData.sessions.slice(0, 3); // Mock recent squad sessions

  const handleMemberClick = (memberId: string) => {
    console.log(`Member clicked: ${memberId}`);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={3} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Study Warriors
            </h1>
            <p className="text-gray-400">Daily study grinders squad</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Leaderboard */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-6 h-6 text-primary" />
                    <h2 className="card-title text-2xl font-black italic">
                      Leaderboard
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <div
                        key={rank}
                        className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-lg font-bold text-primary w-8">
                            #{rank}
                          </span>
                          {rank === 1 && <Crown className="w-5 h-5 text-primary" />}
                          <div>
                            <p className="font-semibold">User {rank}</p>
                            <p className="text-sm text-gray-400">
                              {120 - rank * 10}h this month
                            </p>
                          </div>
                        </div>
                        <TrendingUp className="w-5 h-5 text-secondary" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <FeedCard
                      key={session.id}
                      title={session.title}
                      duration={session.duration}
                      sets={session.sets}
                      verified={session.verified}
                      onClick={() => console.log(`Session clicked: ${session.id}`)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Squad Stats */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <h3 className="card-title text-xl font-black italic mb-4">
                    Squad Stats
                  </h3>
                  <div className="space-y-4">
                    <StatDisplay
                      title="Total Members"
                      value="12"
                      highlight
                    />
                    <StatDisplay
                      title="Squad Streak"
                      value="15 days"
                      highlight
                    />
                    <StatDisplay
                      title="This Month"
                      value="342h"
                    />
                  </div>
                </div>
              </div>

              {/* Members */}
              <div className="card bg-neutral border border-white/5">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="card-title text-xl font-black italic">
                      Members
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((memberId) => (
                      <div
                        key={memberId}
                        className="flex items-center justify-between p-2 hover:bg-base-100 rounded cursor-pointer"
                        onClick={() => handleMemberClick(memberId.toString())}
                      >
                        <span className="text-sm font-medium">
                          Member {memberId}
                        </span>
                        {memberId === 1 && (
                          <Crown className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => console.log("View all members")}
                  >
                    View All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadDetailPage;

