import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Save } from "lucide-react";
import { EnhancedNavbar, Breadcrumbs, Button, Input } from "../../components/ui";
import mockData from "../../mockdata.json";

const ProfilePage = () => {
  const profile = mockData.profile;
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [timezone, setTimezone] = useState(profile.timezone);
  const [notifications, setNotifications] = useState(profile.notifications);

  const handleSave = () => {
    console.log("Save profile clicked", {
      name,
      email,
      timezone,
      notifications,
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    console.log(`Notification ${key} toggled`);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={3} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs className="mb-4" />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
                  Profile & Settings
                </h1>
                <p className="text-gray-400">Manage your account settings</p>
              </div>
              <Link to="/profile/stats">
                <Button variant="ghost">View Statistics</Button>
              </Link>
            </div>
          </div>

          {/* Profile Information */}
          <div className="card bg-neutral border border-white/5 mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl font-black italic mb-6">
                Profile Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Timezone"
                  type="text"
                  placeholder="UTC"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card bg-neutral border border-white/5 mb-6">
            <div className="card-body">
              <div className="flex items-center mb-6">
                <Bell className="w-6 h-6 text-primary mr-3" />
                <h2 className="card-title text-2xl font-black italic">
                  Notifications
                </h2>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">Email Notifications</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">Push Notifications</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange("push")}
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">Daily Reminder</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notifications.dailyReminder}
                    onChange={() => handleNotificationChange("dailyReminder")}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button onClick={handleSave} className="text-gray-900">
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

