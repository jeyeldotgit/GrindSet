// src/schemas/auth.ts
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords don't match", path: ['confirmPassword'] }
);

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
  }),
});


export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;