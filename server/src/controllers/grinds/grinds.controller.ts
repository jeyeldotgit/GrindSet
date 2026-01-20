import { Response } from "express";
import {
  getAllGrindSessions,
  createGrindSession,
  startTimer,
  pauseTimer,
  stopTimer,
  getGrindSessionById,
  updateGrindSession,
  deleteGrindSession,
  abandonGrindSession,
} from "../../services/grind/grind-session-service";
import { AuthMiddlewareRequest } from "../../middlewares/auth.middleware";
import { validateCreateGrindSessionPayload, handleControllerError } from "../../utils/helpers";
import {
  CreateGrindSessionRequest,
  UpdateGrindSessionRequest,
  GrindSessionResponse,
  GrindSessionsResponse,
} from "../../types/grinds.types";

/**
 * Controller Layer - HTTP request/response handlers for grind session operations
 * 
 * Responsibilities:
 * - Parse HTTP request data (params, body, headers)
 * - Extract user context from auth middleware
 * - Validate input using validation helpers
 * - Call service layer with proper context
 * - Transform service responses to HTTP responses
 * - Handle errors consistently
 */

/**
 * Creates a new grind session for the authenticated user
 * @route POST /grind-sessions
 * @param req - Authenticated request with userId and session data in body
 * @param res - Express response object
 * @returns 201 Created with new session data
 */
export const createGrindSessionController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const userId = req.userId as string;
    const payload: CreateGrindSessionRequest = req.body;

    validateCreateGrindSessionPayload(payload);

    const result = await createGrindSession({
      ...payload,
      userId,
    });

    return res.status(201).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Retrieves all grind sessions for the authenticated user
 * @route GET /grind-sessions
 * @param req - Authenticated request with userId from auth middleware
 * @param res - Express response object
 * @returns 200 OK with array of user's sessions
 */
export const getAllGrindSessionsController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionsResponse>> => {
  try {
    const userId = req.userId as string;

    const result = await getAllGrindSessions(userId);

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Retrieves a single grind session by ID (with authorization check)
 * @route GET /grind-sessions/:id
 * @param req - Authenticated request with session ID in params and userId from auth middleware
 * @param res - Express response object
 * @returns 200 OK with session data
 */
export const getGrindSessionByIdController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;

    const result = await getGrindSessionById({ id, userId });

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Updates an existing grind session (with authorization check)
 * @route PUT /grind-sessions/:id
 * @param req - Authenticated request with session ID in params, userId from auth middleware, and update data in body
 * @param res - Express response object
 * @returns 200 OK with updated session data
 */
export const updateGrindSessionController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;
    const payload: UpdateGrindSessionRequest = req.body;

    const result = await updateGrindSession(
      { id, userId },
      payload
    );

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Deletes a grind session (with authorization check)
 * @route DELETE /grind-sessions/:id
 * @param req - Authenticated request with session ID in params and userId from auth middleware
 * @param res - Express response object
 * @returns 200 OK with deleted session data
 */
export const deleteGrindSessionController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;

    const result = await deleteGrindSession({ id, userId });

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Starts the timer for a grind session
 * Handles both initial start and resume from pause states
 * @route POST /grind-sessions/:id/start
 * @param req - Authenticated request with session ID in params and userId from auth middleware
 * @param res - Express response object
 * @returns 200 OK with updated session (timer started)
 */
export const startGrindTimerController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;

    const result = await startTimer({ id, userId });

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Pauses the timer for an active grind session
 * Accumulates elapsed time from the current segment
 * @route POST /grind-sessions/:id/pause
 * @param req - Authenticated request with session ID in params and userId from auth middleware
 * @param res - Express response object
 * @returns 200 OK with updated session (timer paused, accumulated time recorded)
 */
export const pauseGrindTimerController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;

    const result = await pauseTimer({ id, userId });

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Stops/completes the timer for a grind session
 * Calculates final elapsed time and marks session as COMPLETED
 * @route POST /grind-sessions/:id/stop
 * @param req - Authenticated request with session ID in params and userId from auth middleware
 * @param res - Express response object
 * @returns 200 OK with completed session data and final elapsed time
 */
export const stopGrindTimerController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;

    const result = await stopTimer({ id, userId });

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};

/**
 * Abandons a grind session
 * @route POST /grind-sessions/:id/abandon
 * @param req - Authenticated request with session ID in params and userId from auth middleware
 * @param res - Express response object
 * @returns 200 OK with abandoned session data
 */
export const abandonGrindSessionController = async (
  req: AuthMiddlewareRequest,
  res: Response
): Promise<Response<GrindSessionResponse>> => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;

    const result = await abandonGrindSession({ id, userId });

    return res.status(200).json(result);
  } catch (error) {
    return handleControllerError(error, res);
  }
};