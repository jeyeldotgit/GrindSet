import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Users } from "lucide-react";
import { Navbar, Button, Input, Textarea } from "../../components/ui";

const CreateSquadPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleCreate = () => {
    console.log("Create squad clicked", { name, description, isPublic });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/squads"
              className="text-sm text-primary hover:underline mb-4 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Squads
            </Link>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Create Squad
            </h1>
            <p className="text-gray-400">Start a new study group</p>
          </div>

          {/* Form */}
          <div className="card bg-neutral border border-white/5">
            <div className="card-body">
              <div className="space-y-4">
                <Input
                  label="Squad Name"
                  type="text"
                  placeholder="e.g., Study Warriors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Textarea
                  label="Description"
                  placeholder="What is this squad about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    <div>
                      <span className="label-text font-semibold">
                        Public Squad
                      </span>
                      <p className="text-xs text-gray-400">
                        Anyone can join without an invite code
                      </p>
                    </div>
                  </label>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button onClick={handleCreate} className="text-gray-900">
                    <Save className="w-5 h-5 mr-2" />
                    Create Squad
                  </Button>
                  <Link to="/squads">
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

export default CreateSquadPage;

