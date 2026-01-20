import { GrindSession } from "../generated/prisma/client";

/**
 * Session status enum - represents the current state of a grind session
 * ACTIVE: Timer is running
 * PAUSED: Timer was paused and can be resumed
 * COMPLETED: Session finished successfully
 * ABANDONED: Session was abandoned before completion
 */
enum SessionStatus {
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED",
    ABANDONED = "ABANDONED",
  }
  
  /**
   * Request/Payload Types - define the shape of API request data
   */
  
  /** Payload for creating a new grind session - includes all required fields */
  interface CreateGrindSessionRequest extends Omit<GrindSession, "id" | "createdAt" | "updatedAt" | "accumulatedTime" | "lastPausedAt"> {}
  
  /** Payload for updating an existing grind session - excludes user-specific and timestamp fields */
  interface UpdateGrindSessionRequest extends Omit<GrindSession, "id" | "userId" | "createdAt" | "updatedAt" | "accumulatedTime" | "lastPausedAt"> {}
  
  /** Common request params for operations requiring id and userId (authorization) */
  interface AuthorizedResourceRequest {
    id: string;
    userId: string;
  }
  
  /**
   * Response Types - define the shape of API response data
   */
  
  /** Generic response wrapper for grind session operations */
  interface GrindSessionResponse {
    grindSession: GrindSession | null;
    message: string;
  }
  
  /** Response wrapper for operations returning multiple sessions */
  interface GrindSessionsResponse {
    grindSessions: GrindSession[];
    message: string;
  }

  export { CreateGrindSessionRequest, UpdateGrindSessionRequest, AuthorizedResourceRequest, GrindSessionResponse, GrindSessionsResponse, SessionStatus };