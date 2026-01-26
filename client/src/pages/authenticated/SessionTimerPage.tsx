import { EnhancedNavbar, Breadcrumbs, Button } from "../../components/ui";
import Timer from "../../components/session/Timer";
import DetailsForm from "../../components/session/DetailsForm";
import { useTimerStore } from "../../store/useGrindTimerStore";
import { Plus } from "lucide-react";

const SessionTimerPage = () => {
  const currentSessionId = useTimerStore((state) => state.currentSessionId);
  const clearSession = useTimerStore((state) => state.actions.clearSession);
  const sessionTitle = useTimerStore((state) => state.sessionTitle);

  const handleStartNewSession = () => {
    clearSession();
  };

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={3} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
                  Session Timer
                </h1>
                <p className="text-gray-400">
                  {currentSessionId
                    ? `Tracking: ${sessionTitle || "Active Session"}`
                    : "Track your deep work session"}
                </p>
              </div>
              {currentSessionId && (
                <Button
                  onClick={handleStartNewSession}
                  variant="ghost"
                  className="border border-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Session
                </Button>
              )}
            </div>
          </div>

          {/* Show Timer only if session is created */}
          {currentSessionId ? (
            <Timer sessionId={currentSessionId} />
          ) : (
            <DetailsForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionTimerPage;
