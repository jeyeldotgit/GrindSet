import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Check, X, Search, User } from "lucide-react";
import { EnhancedNavbar, Button, Input } from "../../components/ui";

const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends] = useState([
    { id: "1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "2", name: "Bob Smith", email: "bob@example.com" },
  ]);
  const [pendingRequests] = useState([
    { id: "1", name: "Charlie Brown", email: "charlie@example.com" },
  ]);

  const handleSendRequest = () => {
    console.log("Send friend request clicked", searchQuery);
  };

  const handleAccept = (id: string) => {
    console.log("Accept friend request clicked", id);
  };

  const handleReject = (id: string) => {
    console.log("Reject friend request clicked", id);
  };

  const handleRemove = (id: string) => {
    console.log("Remove friend clicked", id);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <EnhancedNavbar unreadNotifications={3} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
              Friends
            </h1>
            <p className="text-gray-400">Connect with other grinders</p>
          </div>

          {/* Search/Add Friend */}
          <div className="card bg-neutral border border-white/5 mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl font-black italic mb-4">
                Add Friend
              </h2>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Search by email or username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendRequest}
                  className="text-gray-900"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Send Request
                </Button>
              </div>
            </div>
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="card bg-neutral border border-white/5 mb-8">
              <div className="card-body">
                <h2 className="card-title text-2xl font-black italic mb-4">
                  Pending Requests
                </h2>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 bg-base-100 rounded-lg border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{request.name}</p>
                          <p className="text-sm text-gray-400">
                            {request.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleAccept(request.id)}
                          className="text-secondary"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleReject(request.id)}
                          className="text-error"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Friends List */}
          <div className="card bg-neutral border border-white/5">
            <div className="card-body">
              <h2 className="card-title text-2xl font-black italic mb-4">
                Your Friends ({friends.length})
              </h2>
              {friends.length > 0 ? (
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-4 bg-base-100 rounded-lg border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{friend.name}</p>
                          <p className="text-sm text-gray-400">
                            {friend.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => handleRemove(friend.id)}
                        className="text-error"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400">No friends yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;

