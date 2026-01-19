import { Link } from "react-router-dom";
import { Bell, Check, X, Trash2 } from "lucide-react";
import { Navbar, Button } from "../../components/ui";

const NotificationsPage = () => {
  const notifications = [
    {
      id: "1",
      type: "friend_request",
      message: "Alice Johnson sent you a friend request",
      read: false,
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      type: "squad_invite",
      message: "You were invited to join Study Warriors",
      read: false,
      createdAt: "5 hours ago",
    },
    {
      id: "3",
      type: "reaction",
      message: "Bob Smith gave you 🔥 on your session",
      read: true,
      createdAt: "1 day ago",
    },
  ];

  const handleMarkRead = (id: string) => {
    console.log("Mark as read clicked", id);
  };

  const handleMarkAllRead = () => {
    console.log("Mark all as read clicked");
  };

  const handleDelete = (id: string) => {
    console.log("Delete notification clicked", id);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
                Notifications
              </h1>
              <p className="text-gray-400">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" onClick={handleMarkAllRead}>
                <Check className="w-5 h-5 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`card border border-white/5 ${
                  notification.read
                    ? "bg-neutral"
                    : "bg-neutral border-l-4 border-l-primary"
                }`}
              >
                <div className="card-body p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-400">
                        {notification.createdAt}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!notification.read && (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleMarkRead(notification.id)}
                          aria-label="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => handleDelete(notification.id)}
                        aria-label="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {notifications.length === 0 && (
            <div className="card bg-neutral border border-white/5">
              <div className="card-body items-center text-center py-12">
                <Bell className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Notifications</h3>
                <p className="text-gray-400">
                  You're all caught up! New notifications will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

