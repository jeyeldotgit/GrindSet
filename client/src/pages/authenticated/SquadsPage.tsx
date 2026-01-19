import { Link } from "react-router-dom";
import { Users, Plus, Trophy, TrendingUp } from "lucide-react";
import { Navbar, Button, StatDisplay } from "../../components/ui";

const SquadsPage = () => {
  const squads = [
    {
      id: "1",
      name: "Study Warriors",
      memberCount: 12,
      streak: 15,
      description: "Daily study grinders",
    },
    {
      id: "2",
      name: "Math Masters",
      memberCount: 8,
      streak: 7,
      description: "Advanced mathematics focus",
    },
  ];

  const handleSquadClick = (id: string) => {
    console.log(`Squad clicked: ${id}`);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
                Squads
              </h1>
              <p className="text-gray-400">Join study groups and compete</p>
            </div>
            <Link to="/squads/new">
              <Button className="text-gray-900">
                <Plus className="w-5 h-5 mr-2" />
                Create Squad
              </Button>
            </Link>
          </div>

          {/* Squads List */}
          <div className="space-y-6">
            {squads.map((squad) => (
              <div
                key={squad.id}
                className="card bg-neutral border border-white/5 cursor-pointer hover:border-white/10 transition-all"
                onClick={() => handleSquadClick(squad.id)}
              >
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black italic mb-2">
                        {squad.name}
                      </h2>
                      <p className="text-gray-400">{squad.description}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <StatDisplay
                      title="Members"
                      value={squad.memberCount}
                      highlight
                    />
                    <StatDisplay
                      title="Squad Streak"
                      value={`${squad.streak} days`}
                      highlight
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {squads.length === 0 && (
            <div className="card bg-neutral border border-white/5">
              <div className="card-body items-center text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Squads Yet</h3>
                <p className="text-gray-400 mb-6">
                  Create or join a squad to compete with others
                </p>
                <Link to="/squads/new">
                  <Button className="text-gray-900">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Squad
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SquadsPage;

