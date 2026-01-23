import { z } from "zod";

const SessionStatusEnum = z.enum([
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
  "ABANDONED",
]);

const GrindSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string().min(1),
  subject: z.string().nullable(),
  notes: z.string().nullable(),
  photoUrl: z.string().url().nullable(),
  duration: z.number().int().nonnegative(),
  pomodoroSets: z.number().int().default(0),
  focusScore: z.number().int().min(0).max(100).default(0),
  status: SessionStatusEnum,
  isHardMode: z.boolean().default(false),
  didNotFinish: z.boolean().default(false),
  startedAt: z.coerce.date(), // Automatically converts ISO string to Date object
  endedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accumulatedTime: z.number().int().default(0),
  lastPausedAt: z.coerce.date().nullable(),
});

// 🟢 For POST Requests (The "Request" shape)
// We omit the fields the server generates automatically
export const CreateGrindSessionRequestSchema = GrindSessionSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  accumulatedTime: true,
  lastPausedAt: true,
}).extend({
  // Override startedAt if you want it to be a string in the request body
  startedAt: z.string().datetime(),
});

// 🔵 For API Responses (The "Source of Truth")
export const GrindSessionResponseSchema = z.object({
  grindSession: GrindSessionSchema,
  message: z.string(),
});

// 🟦 Inferring Types for your Service Layer
export type GrindSession = z.infer<typeof GrindSessionSchema>;
export type CreateGrindSessionRequest = z.infer<
  typeof CreateGrindSessionRequestSchema
>;
export type GrindSessionResponse = z.infer<typeof GrindSessionResponseSchema>;
