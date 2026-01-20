import { GrindSession } from "../../generated/prisma/client";
import { prisma } from "../../utils/prisma";

import { CreateGrindSessionRequest, UpdateGrindSessionRequest, AuthorizedResourceRequest, GrindSessionResponse, GrindSessionsResponse, SessionStatus } from "../../types/grinds.types";

/**
 * Service Layer - Business logic for grind session operations
 */

/**
 * Creates a new grind session for a user
 * @param payload - Session creation data including title, subject, and timing info
 * @returns Created session with basic fields and success message
 * @throws Error if title or subject are missing
 */
export const createGrindSession = async (
  payload: CreateGrindSessionRequest
): Promise<GrindSessionResponse> => {
  const { title, subject } = payload;

  // Validate required fields
  if (!title || !subject) {
    throw new Error("Title and subject are required");
  }

  // Create session in database
  const grindSession = await prisma.grindSession.create({
    data: payload,
  });

  return {
    grindSession: {
      ...grindSession,
      id: grindSession.id,
      title: grindSession.title,
      subject: grindSession.subject,
      notes: grindSession.notes,
      photoUrl: grindSession.photoUrl,
    } as GrindSession,
    message: "Grind session created successfully",
  };
};

/**
 * Retrieves all grind sessions for a specific user
 * @param userId - The user ID to filter sessions
 * @returns Array of user's sessions ordered by most recent first
 */
export const getAllGrindSessions = async (
  userId: string
): Promise<GrindSessionsResponse> => {
  const grindSessions = await prisma.grindSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return {
    grindSessions,
    message: "Grind sessions fetched successfully",
  };
};

/**
 * Retrieves a single grind session by ID (with authorization check)
 * @param params - Object containing id and userId for authorization
 * @returns The requested session if user is authorized
 * @throws Error if session not found or user is not authorized
 */
export const getGrindSessionById = async (
  params: AuthorizedResourceRequest
): Promise<GrindSessionResponse> => {
  const { id, userId } = params;

  const grindSession = await prisma.grindSession.findUnique({
    where: { id, userId },
  });

  if (!grindSession) {
    throw new Error("Grind session not found or unauthorized");
  }

  return {
    grindSession,
    message: "Grind session fetched successfully",
  };
};

/**
 * Updates an existing grind session (with authorization check)
 * @param params - Object containing id and userId for authorization
 * @param payload - Session fields to update
 * @returns Updated session with success message
 * @throws Error if session not found or user is not authorized
 */
export const updateGrindSession = async (
  params: AuthorizedResourceRequest,
  payload: UpdateGrindSessionRequest
): Promise<GrindSessionResponse> => {
  const { id, userId } = params;

  // Verify user owns this session
  const existingSession = await prisma.grindSession.findUnique({
    where: { id, userId },
  });

  if (!existingSession) {
    throw new Error("Grind session not found or unauthorized");
  }

  const grindSession = await prisma.grindSession.update({
    where: { id },
    data: payload,
  });

  return {
    grindSession,
    message: "Grind session updated successfully",
  };
};

/**
 * Deletes a grind session (with authorization check)
 * @param params - Object containing id and userId for authorization
 * @returns Deleted session with success message
 * @throws Error if session not found or user is not authorized
 */
export const deleteGrindSession = async (
  params: AuthorizedResourceRequest
): Promise<GrindSessionResponse> => {
  const { id, userId } = params;

  // Verify user owns this session before deletion
  const existingSession = await prisma.grindSession.findUnique({
    where: { id, userId },
  });

  if (!existingSession) {
    throw new Error("Grind session not found or unauthorized");
  }

  const grindSession = await prisma.grindSession.delete({
    where: { id },
  });

  return {
    grindSession,
    message: "Grind session deleted successfully",
  };
};

/**
 * Starts the timer for a grind session
 * Handles both initial start and resume from pause states
 * @param params - Object containing id and userId for authorization
 * @returns Updated session with timer started
 * @throws Error if session not found, unauthorized, or invalid state
 */
export const startTimer = async (
  params: AuthorizedResourceRequest
): Promise<GrindSessionResponse> => {
  const { id, userId } = params;

  const grindSession = await prisma.grindSession.findUnique({
    where: { id, userId },
  });

  if (!grindSession) {
    throw new Error("Grind session not found or unauthorized");
  }

  // If already active, return current state
  if (grindSession.status === SessionStatus.ACTIVE) {
    return {
      grindSession,
      message: "Timer is already running",
    };
  }

  // Only set startedAt on first start (not when resuming from pause)
  const updateData: Partial<GrindSession> = {
    status: SessionStatus.ACTIVE as any,
  };

  if (grindSession.status !== SessionStatus.PAUSED) {
    updateData.startedAt = new Date();
  }

  const updatedSession = await prisma.grindSession.update({
    where: { id },
    data: updateData,
  });

  return {
    grindSession: updatedSession,
    message: "Timer started successfully",
  };
};

/**
 * Pauses the timer for an active grind session
 * Accumulates elapsed time from current segment
 * @param params - Object containing id and userId for authorization
 * @returns Updated session with timer paused and accumulated time recorded
 * @throws Error if session not found, unauthorized, or not in ACTIVE state
 */
export const pauseTimer = async (
  params: AuthorizedResourceRequest
): Promise<GrindSessionResponse> => {
  const { id, userId } = params;

  const grindSession = await prisma.grindSession.findUnique({
    where: { id, userId },
  });

  if (!grindSession) {
    throw new Error("Grind session not found or unauthorized");
  }

  if (grindSession.status !== SessionStatus.ACTIVE) {
    throw new Error("Session is not active and cannot be paused");
  }

  // Calculate elapsed time for current active segment
  const now = new Date();
  const sessionStart = grindSession.startedAt || now;
  const elapsedMs = now.getTime() - sessionStart.getTime();

  // Add to accumulated time (in seconds)
  const accumulatedTime = (grindSession.accumulatedTime || 0) + Math.floor(elapsedMs / 1000);

  const updatedSession = await prisma.grindSession.update({
    where: { id },
    data: {
      status: SessionStatus.PAUSED as any,
      accumulatedTime,
      lastPausedAt: now,
    },
  });

  return {
    grindSession: updatedSession,
    message: "Timer paused successfully",
  };
};

/**
 * Stops/completes the timer for a grind session
 * Calculates total elapsed time and marks session as COMPLETED
 * @param params - Object containing id and userId for authorization
 * @returns Updated session with timer stopped and final elapsed time
 * @throws Error if session not found or unauthorized
 */
export const stopTimer = async (
  params: AuthorizedResourceRequest
): Promise<GrindSessionResponse> => {
  const { id, userId } = params;

  const grindSession = await prisma.grindSession.findUnique({
    where: { id, userId },
  });

  if (!grindSession) {
    throw new Error("Grind session not found or unauthorized");
  }

  // If already completed, return current state
  if (grindSession.status === SessionStatus.COMPLETED) {
    return {
      grindSession,
      message: "Session already completed",
    };
  }

  const now = new Date();
  let accumulatedTime = grindSession.accumulatedTime || 0;

  // If currently active, add time from current segment to accumulated total
  if (grindSession.status === SessionStatus.ACTIVE && grindSession.startedAt) {
    const elapsedMs = now.getTime() - grindSession.startedAt.getTime();
    accumulatedTime += Math.floor(elapsedMs / 1000);
  }

  const updatedSession = await prisma.grindSession.update({
    where: { id },
    data: {
      status: SessionStatus.COMPLETED as any,
      accumulatedTime,
      endedAt: now,
    },
  });

  return {
    grindSession: updatedSession,
    message: "Timer stopped and session completed",
  };
};

/**
 * Calculates the total elapsed time for a session
 * Includes both accumulated time and current active segment (if running)
 * @param grindSession - The grind session to calculate elapsed time for
 * @returns Total elapsed time in seconds
 */
export const getElapsedTime = (grindSession: GrindSession): number => {
  let total = grindSession.accumulatedTime || 0;

  // If currently active, add current segment time to total
  if (
    grindSession.status === SessionStatus.ACTIVE &&
    grindSession.startedAt
  ) {
    const currentSegmentMs =
      new Date().getTime() - grindSession.startedAt.getTime();
    total += Math.floor(currentSegmentMs / 1000);
  }

  return total;
};

/** Abandons a grind session
 * @param params - Object containing id and userId for authorization
 * @returns Abandoned session with success message
 * @throws Error if session not found or unauthorized
 */
export const abandonGrindSession = async (
  params: AuthorizedResourceRequest
): Promise<GrindSessionResponse> => {
  const { id, userId } = params;

  const grindSession = await prisma.grindSession.findUnique({
    where: { id, userId },
  });

  if (!grindSession) {
    throw new Error("Grind session not found or unauthorized");
  }

  const abandonedSession = await prisma.grindSession.update({
    where: { id }, 
    data: { status: SessionStatus.ABANDONED as any, didNotFinish: true }});

  return {
    grindSession: abandonedSession,
    message: "Session abandoned successfully",
  };
};
