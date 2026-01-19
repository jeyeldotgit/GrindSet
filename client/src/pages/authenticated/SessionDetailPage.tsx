import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Edit, Save, Trash2, Upload } from "lucide-react";
import { EnhancedNavbar, Breadcrumbs, Button, Input, Textarea, GrindCard } from "../../components/ui";
import mockData from "../../mockdata.json";

const SessionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const session = mockData.sessions.find((s) => s.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(session?.title || "");
  const [notes, setNotes] = useState(session?.notes || "");

  if (!session) {
    return (
      <div className="min-h-screen bg-base-100">
        <EnhancedNavbar unreadNotifications={3} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Session not found</h1>
          <Link to="/sessions">
            <Button variant="ghost">Back to Sessions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Save session clicked", { id, title, notes });
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Delete session clicked", id);
  };

  const handlePhotoUpload = () => {
    console.log("Photo upload clicked", id);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={3} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
                Session Details
              </h1>
              {!isEditing && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleDelete}
                    className="text-error"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Session Card View */}
          {!isEditing && (
            <div className="mb-8">
              <GrindCard
                title={session.title}
                subtitle={session.subtitle}
                duration={session.duration}
                sets={session.sets}
                notes={session.notes}
                verified={session.verified}
              />
            </div>
          )}

          {/* Edit Form */}
          {isEditing && (
            <div className="card bg-neutral border border-white/5 mb-8">
              <div className="card-body">
                <h2 className="card-title text-2xl font-black italic mb-6">
                  Edit Session
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Session Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    label="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                  />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Proof Photo
                      </span>
                    </label>
                    <Button
                      variant="ghost"
                      onClick={handlePhotoUpload}
                      className="w-full border border-white/10"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleSave} className="text-gray-900">
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetailPage;

