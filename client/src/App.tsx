import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import DashboardPage from "./pages/authenticated/DashboardPage";
import SessionTimerPage from "./pages/authenticated/SessionTimerPage";
import SessionHistoryPage from "./pages/authenticated/SessionHistoryPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import GoalsPage from "./pages/authenticated/GoalsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/sessions/new" element={<SessionTimerPage />} />
      <Route path="/sessions" element={<SessionHistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/goals" element={<GoalsPage />} />
    </Routes>
  );
};

export default App;
