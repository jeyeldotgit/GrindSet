import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Square, Save } from "lucide-react";
import {
  EnhancedNavbar,
  Breadcrumbs,
  Button,
  SessionTimer,
  Input,
  Textarea,
} from "../../components/ui";
import Timer from "../../components/session/Timer";

const SessionTimerPage = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");

  const handleSave = () => {
    console.log("Save session clicked", {
      title: sessionTitle,
      notes: sessionNotes,
      duration: `${hours}:${minutes}:${seconds}`,
    });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={3} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Session Timer
            </h1>
            <p className="text-gray-400">Track your deep work session</p>
          </div>

          {/* Timer Component */}
          <Timer />

          {/* Session Details Form */}
          <div className="card bg-neutral border border-white/5">
            <div className="card-body">
              <h2 className="card-title text-2xl font-black italic mb-6">
                Session Details
              </h2>
              <div className="space-y-4">
                <Input
                  label="Session Title"
                  type="text"
                  placeholder="e.g., Advanced Calculus"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                />
                <Textarea
                  label="Notes"
                  placeholder="What did you focus on during this session?"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSave}
                    className="text-gray-900"
                    disabled={!sessionTitle}
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Session
                  </Button>
                  <Link to="/dashboard">
                    <Button variant="ghost">Cancel</Button>
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

export default SessionTimerPage;
