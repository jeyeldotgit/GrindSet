import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { AsyncState } from "../ui";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <AsyncState isLoading loadingLabel="Checking session…">
        <div />
      </AsyncState>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};


