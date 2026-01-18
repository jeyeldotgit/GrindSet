import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Square, Save } from "lucide-react";
import { Navbar, Button, SessionTimer, Input, Textarea } from "../../components/ui";

const SessionTimerPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");

  const handleStart = () => {
    console.log("Start session clicked");
    setIsRunning(true);
  };

  const handlePause = () => {
    console.log("Pause session clicked");
    setIsRunning(false);
  };

  const handleStop = () => {
    console.log("Stop session clicked");
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleSave = () => {
    console.log("Save session clicked", {
      title: sessionTitle,
      notes: sessionNotes,
      duration: `${hours}:${minutes}:${seconds}`,
    });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="text-sm text-primary hover:underline mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Session Timer
            </h1>
            <p className="text-gray-400">Track your deep work session</p>
          </div>

          {/* Timer Display */}
          <div className="card bg-neutral border border-white/5 mb-8">
            <div className="card-body items-center text-center py-12">
              <SessionTimer hours={hours} minutes={minutes} seconds={seconds} />
              <div className="flex gap-4 mt-8">
                {!isRunning ? (
                  <Button
                    onClick={handleStart}
                    className="text-gray-900"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={handlePause}
                    variant="ghost"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </Button>
                )}
                <Button
                  onClick={handleStop}
                  variant="ghost"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop
                </Button>
              </div>
            </div>
          </div>

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

