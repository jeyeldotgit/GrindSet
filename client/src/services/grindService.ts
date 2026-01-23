// Functions to create
/**
- `createGrindSession(payload)` → POST /grind-sessions

- `getAllGrindSessions()` → GET /grind-sessions

- `getGrindSessionById(id)` → GET /grind-sessions/:id

- `updateGrindSession(id, payload)` → PUT /grind-sessions/:id

- `deleteGrindSession(id)` → DELETE /grind-sessions/:id

- `startTimer(id)` → POST /grind-sessions/:id/start

- `pauseTimer(id)` → POST /grind-sessions/:id/pause

- `stopTimer(id)` → POST /grind-sessions/:id/stop

- `abandonGrindSession(id)` → POST /grind-sessions/:id/abandon

 */

import { apiClient } from "../utils/api-client";
import {
  type GrindSessionResponse,
  type CreateGrindSessionRequest,
  CreateGrindSessionRequestSchema,
  GrindSessionResponseSchema,
} from "../schemas/grindSchema";

// Create a new grind session
export const createGrindSession = async (
  payload: CreateGrindSessionRequest,
): Promise<GrindSessionResponse> => {
  const parsedPayload = CreateGrindSessionRequestSchema.parse(payload);

  const response = await apiClient("/grind-sessions", {
    method: "POST",
    body: parsedPayload,
  });

  return GrindSessionResponseSchema.parse(response);
};

// Get All grind sessions for the current user
export const getAllGrindSessions = async (
  userId: string,
): Promise<GrindSessionResponse[]> => {
  const response = await apiClient(`/grind-sessions?userId=${userId}`, {
    method: "GET",
  });

  return response as GrindSessionResponse[];
};

// Get a grind session (details) byt ID
export const getGrindSessionById = async (
  id: string,
): Promise<GrindSessionResponse> => {
  const response = await apiClient(`/grind-sessions/${id}`, {
    method: "GET",
  });

  return GrindSessionResponseSchema.parse(response);
};

// Update a grind session by ID
export const updateGrindSession = async (
  id: string,
  payload: CreateGrindSessionRequest,
): Promise<GrindSessionResponse> => {
  const parsedPayload = CreateGrindSessionRequestSchema.parse(payload);

  const response = await apiClient(`/grind-sessions/${id}`, {
    method: "PUT",
    body: parsedPayload,
  });

  return GrindSessionResponseSchema.parse(response);
};

// Delete a grind session by ID
export const deleteGrindSession = async (
  id: string,
): Promise<{ message: string }> => {
  const response = await apiClient(`/grind-sessions/${id}`, {
    method: "DELETE",
  });

  return response as { message: string };
};
