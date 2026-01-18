import { Link } from "react-router-dom";
import { Zap, Filter } from "lucide-react";
import { Navbar, Button, FeedCard, GrindCard } from "../../components/ui";
import mockData from "../../mockdata.json";

const SessionHistoryPage = () => {
  const sessions = mockData.sessions;

  const handleSessionClick = (sessionId: string) => {
    console.log(`Session clicked: ${sessionId}`);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Session History
            </h1>
            <p className="text-gray-400">View all your study sessions</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={handleFilter}>
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </Button>
            <Link to="/sessions/new">
              <Button className="text-gray-900">
                <Zap className="w-5 h-5 mr-2" />
                New Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <FeedCard
              key={session.id}
              title={session.title}
              duration={session.duration}
              sets={session.sets}
              verified={session.verified}
              onClick={() => handleSessionClick(session.id)}
            />
          ))}
        </div>

        {/* Empty State (if no sessions) */}
        {sessions.length === 0 && (
          <div className="card bg-neutral border border-white/5">
            <div className="card-body items-center text-center py-12">
              <Zap className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">No Sessions Yet</h3>
              <p className="text-gray-400 mb-6">
                Start your first grind to see it here
              </p>
              <Link to="/sessions/new">
                <Button className="text-gray-900">Start Session</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionHistoryPage;

