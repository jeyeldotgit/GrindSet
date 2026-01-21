// src/hooks/useAuth.ts
import { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser, logoutUser } from '../services/authService';
import { useAuthContext } from '../context/AuthContext';
import type { LoginFormData, RegisterFormData } from '../schemas/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading, setAuth, clearAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { accessToken, user: userData } = await loginUser(credentials);
      setAuth({ accessToken, user: userData });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate, setAuth]);

  const signup = useCallback(async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { accessToken, user: userData } = await signupUser(data);
      setAuth({ accessToken, user: userData });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate, setAuth]);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutUser();
      clearAuth();
      navigate("/login", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [clearAuth, navigate]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading: authLoading || loading,
    error,

    // Actions
    login,
    signup,
    logout,
  };
};