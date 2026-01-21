import { apiClient } from '../utils/api-client';
import type { LoginFormData, RegisterFormData, AuthResponse } from '../schemas/auth';

export const loginUser = async (payload: LoginFormData): Promise<AuthResponse> => {
  return apiClient('/auth/login', {
    method: 'POST',
    body: payload,
    skipAuth: true, // Don't need token for login
  });
};

export const signupUser = async (payload: RegisterFormData): Promise<AuthResponse> => {
  return apiClient('/auth/signup', {
    method: 'POST',
    body: payload,
    skipAuth: true, // Don't need token for signup
  });
};

export const logoutUser = async (): Promise<void> => {
  // Optional: notify backend
  try {
    await apiClient('/auth/logout', {
      method: 'POST',
      skipAuth: false, // Send token for logout
    });
  } catch {
    // Even if logout fails on server, clear local token
  }
};

export const getCurrentUser = async (): Promise<{ user: { id: string; email: string } }> => {
  return apiClient('/auth/me', {
    method: 'GET',
    skipAuth: false,
  });
};
