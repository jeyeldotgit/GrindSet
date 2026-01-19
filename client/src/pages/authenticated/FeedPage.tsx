import { Link } from "react-router-dom";
import { Users, Zap } from "lucide-react";
import { EnhancedNavbar, Button, GrindCard, ReactionButton } from "../../components/ui";
import mockData from "../../mockdata.json";

const FeedPage = () => {
  const sessions = mockData.sessions;
  const activeNow = 12; // Mock active friends count

  const handleReaction = (sessionId: string, type: "fire" | "respect") => {
    console.log(`Reaction ${type} clicked for session ${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={3} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
                Feed
              </h1>
              <p className="text-gray-400">
                See what your friends are grinding on
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-5 h-5 text-primary" />
                <span>{activeNow} active now</span>
              </div>
              <Link to="/sessions/new">
                <Button className="text-gray-900">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Session
                </Button>
              </Link>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {sessions.map((session) => (
              <div key={session.id}>
                <GrindCard
                  title={session.title}
                  subtitle={session.subtitle}
                  duration={session.duration}
                  sets={session.sets}
                  notes={session.notes}
                  verified={session.verified}
                  actionLabel=""
                  onAction={undefined}
                />
                <div className="flex gap-2 mt-4 ml-6">
                  <ReactionButton
                    type="fire"
                    count={24}
                    isActive={false}
                    onClick={() => handleReaction(session.id, "fire")}
                  />
                  <ReactionButton
                    type="respect"
                    count={8}
                    isActive={false}
                    onClick={() => handleReaction(session.id, "respect")}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sessions.length === 0 && (
            <div className="card bg-neutral border border-white/5">
              <div className="card-body items-center text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Activity Yet</h3>
                <p className="text-gray-400 mb-6">
                  Add friends to see their sessions here
                </p>
                <Link to="/friends">
                  <Button className="text-gray-900">Find Friends</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;

