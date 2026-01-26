import { useState } from "react";
import { Input, Textarea, Button } from "../ui";
import { Link } from "react-router-dom";
import { Save } from "lucide-react";

import { useGrind } from "../../hooks/useGrinds";
import { useTimerStore } from "../../store/useGrindTimerStore";

const DetailsForm = () => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
  const [subject, setSubject] = useState("");

  const { createGrindSession, status, error } = useGrind();
  const { setSession } = useTimerStore((state) => state.actions);

  const handleCreateSession = async () => {
    if (status === "loading" || !sessionTitle.trim()) return; // Prevent multiple submissions

    try {
      const response = await createGrindSession({
        title: sessionTitle,
        notes: sessionNotes,
        subject: subject || "General",
      });

      if (response) {
        // Mock: Set session in store so Timer can be displayed
        // TODO: Replace with actual session ID from response
        const mockSessionId = response.id || `mock-${Date.now()}`;
        setSession(mockSessionId, sessionTitle, subject || "General");
        console.log("Session created successfully:", response);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <div className="card bg-neutral border border-white/5">
      <div className="card-body">
        <h2 className="card-title text-2xl font-black italic mb-6">
          Session Details
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-sm font-medium">{error}</p>
        )}
        <div className="space-y-4">
          <Input
            label="Session Title"
            type="text"
            placeholder="e.g., Physics Problem Set"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
          />
          <Input
            label="Subject"
            type="text"
            placeholder="e.g., Physics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
              onClick={handleCreateSession}
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
  );
};

export default DetailsForm;
