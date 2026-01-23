import { Link } from "react-router-dom";
import { FeedCard } from "../ui";

interface SessionsProps {
  dashboardData: {
    recentSessions: {
      id: string;
      title: string;
      duration: string;
      sets: number;
      verified: boolean;
    }[];
  };
  handleSessionClick: (sessionId: string) => void;
}

const Sessions = ({ dashboardData, handleSessionClick }: SessionsProps) => {
  return (
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
      {dashboardData.recentSessions.length === 0 ? (
        <p className="text-gray-400">No recent sessions found.</p>
      ) : (
        <div className="space-y-4">
          {dashboardData.recentSessions.map((session) => (
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
      )}
    </div>
  );
};

export default Sessions;
