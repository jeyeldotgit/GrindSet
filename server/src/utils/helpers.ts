import { Response } from "express";

/**
 * Utility helper functions
 */

export const formatResponse = <T>(data: T, message?: string) => {
  return {
    success: true,
    message: message || 'Operation successful',
    data,
  };
};

export const formatError = (message: string, statusCode?: number) => {
  return {
    success: false,
    message,
    statusCode: statusCode || 400,
  };
};

/**
 * Validation Helpers
 */

/**
 * Validates required fields for creating a grind session
 * @param payload - The request payload to validate
 * @throws Error if required fields are missing or invalid
 */
export const validateCreateGrindSessionPayload = (payload: any): void => {
  const {
    title,
    subject,
    duration,
    pomodoroSets,
    focusScore,
    status,
    isHardMode,
    didNotFinish,
    startedAt,
    endedAt,
  } = payload;

  const errors: string[] = [];

  if (!title) errors.push("Title is required");
  if (!subject) errors.push("Subject is required");
  if (!duration) errors.push("Duration is required");
  if (!pomodoroSets) errors.push("Pomodoro sets is required");
  if (focusScore === undefined) errors.push("Focus score is required");
  if (!status) errors.push("Status is required");
  if (typeof isHardMode !== "boolean")
    errors.push("isHardMode must be a boolean");
  if (typeof didNotFinish !== "boolean")
    errors.push("didNotFinish must be a boolean");
  if (!startedAt) errors.push("Start time is required");
  if (!endedAt) errors.push("End time is required");

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
};

/**
 * Error Handler - standardizes error responses across controllers
 */
export const handleControllerError = (error: unknown, res: Response): Response => {
  console.error("Controller error:", error);

  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal server error" });
};
