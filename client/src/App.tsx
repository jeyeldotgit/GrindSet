import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import DashboardPage from "./pages/authenticated/DashboardPage";
import SessionTimerPage from "./pages/authenticated/SessionTimerPage";
import SessionHistoryPage from "./pages/authenticated/SessionHistoryPage";
import SessionDetailPage from "./pages/authenticated/SessionDetailPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import ProfileStatsPage from "./pages/authenticated/ProfileStatsPage";
import GoalsPage from "./pages/authenticated/GoalsPage";
import FeedPage from "./pages/authenticated/FeedPage";
import FriendsPage from "./pages/authenticated/FriendsPage";
import SquadsPage from "./pages/authenticated/SquadsPage";
import SquadDetailPage from "./pages/authenticated/SquadDetailPage";
import CreateSquadPage from "./pages/authenticated/CreateSquadPage";
import NotificationsPage from "./pages/authenticated/NotificationsPage";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/sessions/new" element={<SessionTimerPage />} />
      <Route path="/sessions/:id" element={<SessionDetailPage />} />
      <Route path="/sessions" element={<SessionHistoryPage />} />
      <Route path="/profile/stats" element={<ProfileStatsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/squads/new" element={<CreateSquadPage />} />
      <Route path="/squads/:id" element={<SquadDetailPage />} />
      <Route path="/squads" element={<SquadsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
  
    </Routes>
  );
};

export default App;
