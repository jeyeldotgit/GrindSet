import { useState } from "react";
import { Target, Plus, Edit, Trash2, Save } from "lucide-react";
import { EnhancedNavbar, Button, Input, FocusProgress } from "../../components/ui";
import mockData from "../../mockdata.json";

const GoalsPage = () => {
  const [goals, setGoals] = useState(mockData.goals);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: "",
    targetHours: "",
    period: "daily" as "daily" | "weekly" | "monthly",
  });

  const handleCreate = () => {
    console.log("Create goal clicked", newGoal);
    setIsCreating(false);
    setNewGoal({ title: "", targetHours: "", period: "daily" });
  };

  const handleEdit = (id: string) => {
    console.log("Edit goal clicked", id);
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete goal clicked", id);
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const handleSave = (id: string) => {
    console.log("Save goal clicked", id);
    setEditingId(null);
  };

  const getProgress = (goal: (typeof goals)[0]) => {
    return Math.min(100, Math.round((goal.currentHours / goal.targetHours) * 100));
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
                Goals
              </h1>
              <p className="text-gray-400">Set and track your study goals</p>
            </div>
            {!isCreating && (
              <Button
                onClick={() => setIsCreating(true)}
                className="text-gray-900"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Goal
              </Button>
            )}
          </div>

          {/* Create Goal Form */}
          {isCreating && (
            <div className="card bg-neutral border border-white/5 mb-6">
              <div className="card-body">
                <h2 className="card-title text-2xl font-black italic mb-6">
                  Create New Goal
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Goal Title"
                    type="text"
                    placeholder="e.g., Daily Study Goal"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                  />
                  <Input
                    label="Target Hours"
                    type="number"
                    placeholder="4"
                    value={newGoal.targetHours}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, targetHours: e.target.value })
                    }
                  />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Period</span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-neutral border-white/10 focus:border-primary"
                      value={newGoal.period}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          period: e.target.value as "daily" | "weekly" | "monthly",
                        })
                      }
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleCreate} className="text-gray-900">
                      <Save className="w-5 h-5 mr-2" />
                      Create Goal
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setIsCreating(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goals List */}
          <div className="space-y-6">
            {goals.map((goal) => {
              const progress = getProgress(goal);
              const isEditing = editingId === goal.id;

              return (
                <div
                  key={goal.id}
                  className="card bg-neutral border border-white/5"
                >
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black italic mb-2">
                          {goal.title}
                        </h3>
                        <p className="text-gray-400">
                          {goal.currentHours}h / {goal.targetHours}h (
                          {goal.period})
                        </p>
                      </div>
                      {!isEditing && (
                        <div className="flex gap-2">
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleEdit(goal.id)}
                            aria-label="Edit goal"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() => handleDelete(goal.id)}
                            aria-label="Delete goal"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <FocusProgress
                        progress={progress}
                        variant="linear"
                        showLabel={false}
                      />
                      <p className="text-sm text-gray-400 mt-2 text-right">
                        {progress}% complete
                      </p>
                    </div>

                    {isEditing && (
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <Input
                          label="Goal Title"
                          type="text"
                          value={goal.title}
                          onChange={(e) =>
                            setGoals((prev) =>
                              prev.map((g) =>
                                g.id === goal.id
                                  ? { ...g, title: e.target.value }
                                  : g
                              )
                            )
                          }
                        />
                        <Input
                          label="Target Hours"
                          type="number"
                          value={goal.targetHours.toString()}
                          onChange={(e) =>
                            setGoals((prev) =>
                              prev.map((g) =>
                                g.id === goal.id
                                  ? { ...g, targetHours: Number(e.target.value) }
                                  : g
                              )
                            )
                          }
                        />
                        <div className="flex gap-4">
                          <Button
                            onClick={() => handleSave(goal.id)}
                            className="text-gray-900"
                          >
                            <Save className="w-5 h-5 mr-2" />
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {goals.length === 0 && !isCreating && (
            <div className="card bg-neutral border border-white/5">
              <div className="card-body items-center text-center py-12">
                <Target className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Goals Yet</h3>
                <p className="text-gray-400 mb-6">
                  Set your first goal to start tracking progress
                </p>
                <Button
                  onClick={() => setIsCreating(true)}
                  className="text-gray-900"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Goal
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;

