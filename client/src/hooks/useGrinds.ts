import { useState, useCallback } from "react";
import * as grindService from "../services/grindService";
import type {
  GrindSession,
  CreateGrindSessionRequest,
} from "../schemas/grindSchema";
import { useAuth } from "./useAuth";

type Status = "idle" | "loading" | "error" | "success";

type UseGrindResult = {
  grindSesions: GrindSession[] | null;
  status: Status;
  error: string | null;
  refetch: () => Promise<void>;
  fetchAllGrindSessions: () => void;
  fetchGrindSessionById: (id: string) => void;
  createGrindSession: (data: CreateGrindSessionRequest) => void;
  updateGrindSession: (data: CreateGrindSessionRequest, id: string) => void;
  deleteGrindSession: (id: string) => Promise<void>;
};

export const useGrind = (): UseGrindResult => {
  const [grindSessions, setGrindSessions] = useState<GrindSession[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  if (!user) {
    throw new Error("useGrind must be used within an authenticated context");
  }

  const handleRequest = useCallback(
    async <T>(request: () => Promise<T>): Promise<T | undefined> => {
      setStatus("loading");
      setError(null);
      try {
        const result = await request();
        setStatus("success");
        return result; // Allows components to 'await' the result
      } catch (error) {
        setError((error as Error).message);
        setStatus("error");
        return undefined;
      }
    },
    [],
  );

  // Action: Fetch all grind sessions for the user
  const fetchAllGrindSessions = useCallback(() => {
    handleRequest(async () => {
      const sessions = await grindService.getAllGrindSessions(user.id);
      const sessionData = sessions.map((item) => item.grindSession);
      setGrindSessions(sessionData);
    });
  }, [handleRequest, user.id]);

  // Action: refetch grind sessions
  const refetch = useCallback(async () => {
    await fetchAllGrindSessions();
  }, [fetchAllGrindSessions]);

  // Action: Fetch session by ID
  const fetchGrindSessionById = useCallback(
    (id: string) => {
      handleRequest(async () => {
        const session = await grindService.getGrindSessionById(id);

        setGrindSessions((prevSessions) => {
          // 1. Ensure we have an array to work with (fallback if null)
          const safePrev = prevSessions ?? [];

          // 2. Check if the session already exists in our local state
          const existingIndex = safePrev.findIndex((s) => s.id === id);

          if (existingIndex !== -1) {
            // 3. UPDATE: Create a new array and swap the specific item
            const updatedSessions = [...safePrev];
            updatedSessions[existingIndex] = session.grindSession;
            return updatedSessions;
          } else {
            // 4. INSERT: Append the new session to the end
            return [...safePrev, session.grindSession];
          }
        });
      });
    },
    [handleRequest],
  );

  // Action: Create a new session
  const createGrindSession = useCallback(
    (data: CreateGrindSessionRequest) => {
      handleRequest(async () => {
        const newSession = await grindService.createGrindSession(data);

        setGrindSessions((prevSessions) => [
          ...prevSessions,
          newSession.grindSession,
        ]);
      });
    },
    [handleRequest],
  );

  // Action: Update a session by ID
  const updateGrindSession = useCallback(
    (data: CreateGrindSessionRequest, id: string) => {
      handleRequest(async () => {
        const updatedSession = await grindService.updateGrindSession(id, data);

        setGrindSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === id ? updatedSession.grindSession : session,
          ),
        );
      });
    },
    [handleRequest],
  );

  // Action: Delete a session by ID
  const deleteGrindSession = useCallback(
    async (id: string) => {
      await handleRequest(async () => {
        await grindService.deleteGrindSession(id);
        // Refresh the list so the deleted item disappears
        await fetchAllGrindSessions();
      });
    },
    [handleRequest, fetchAllGrindSessions],
  );

  return {
    grindSesions: grindSessions,
    status,
    error,
    refetch,
    fetchAllGrindSessions,
    fetchGrindSessionById,
    createGrindSession,
    updateGrindSession,
    deleteGrindSession,
  };
};
