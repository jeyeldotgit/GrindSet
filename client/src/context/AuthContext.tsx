import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "../services/authService";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setAuth: (payload: { accessToken: string; user: User }) => void;
  clearAuth: (reason?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setAuth = (payload: { accessToken: string; user: User }) => {
    localStorage.setItem("accessToken", payload.accessToken);
    setUser(payload.user);
    setError(null);
  };

  const clearAuth = (reason?: string) => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setError(reason ?? null);
  };

  // Check if user is logged in on mount (and on refresh token events via apiClient)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        setUser(data.user);
        setError(null);
      } catch {
        clearAuth("Session expired");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for logout event (from apiClient on 401)
    const handleLogout = () => {
      clearAuth("Session expired");
    };
    window.addEventListener('logout', handleLogout);

    return () => window.removeEventListener('logout', handleLogout);
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      setAuth,
      clearAuth,
    }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};