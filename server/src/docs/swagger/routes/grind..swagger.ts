/**
 * @swagger
 * /grind-sessions:
 *   post:
 *     summary: Create Grind Session
 *     description: Creates a new grind session for the authenticated user. Returns 201 Created with session data.
 *     tags: [Grind Sessions - CRUD]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGrindSessionRequest'
 *           example:
 *             title: "Physics Problem Set"
 *             subject: "Physics"
 *             notes: "Quantum mechanics homework"
 *             photoUrl: null
 *             duration: 3600
 *             pomodoroSets: 2
 *             focusScore: 45
 *             status: "ACTIVE"
 *             isHardMode: true
 *             didNotFinish: false
 *             startedAt: "2026-01-19T14:00:00Z"
 *             endedAt: "2026-01-19T15:00:00Z"
 *     responses:
 *       201:
 *         description: Grind session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions:
 *   get:
 *     summary: Get All Grind Sessions
 *     description: Retrieves all grind sessions for the authenticated user. Results are ordered by most recent first.
 *     tags: [Grind Sessions - CRUD]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Grind sessions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionsResponse'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions/{id}:
 *   get:
 *     summary: Get Grind Session by ID
 *     description: Retrieves a single grind session by ID with authorization check. User can only access their own sessions.
 *     tags: [Grind Sessions - CRUD]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The grind session ID
 *     responses:
 *       200:
 *         description: Grind session fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       401:
 *         description: Unauthorized - invalid token or session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions/{id}:
 *   put:
 *     summary: Update Grind Session
 *     description: Updates an existing grind session with authorization check. User can only update their own sessions.
 *     tags: [Grind Sessions - CRUD]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The grind session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateGrindSessionRequest'
 *     responses:
 *       200:
 *         description: Grind session updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - invalid token or session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions/{id}:
 *   delete:
 *     summary: Delete Grind Session
 *     description: Deletes a grind session with authorization check. User can only delete their own sessions.
 *     tags: [Grind Sessions - CRUD]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The grind session ID
 *     responses:
 *       200:
 *         description: Grind session deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       401:
 *         description: Unauthorized - invalid token or session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions/{id}/start:
 *   post:
 *     summary: Start Timer
 *     description: Starts the timer for a grind session. Handles both initial start and resume from pause states. If already active, returns current state.
 *     tags: [Grind Sessions - Timer Controls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The grind session ID
 *     responses:
 *       200:
 *         description: Timer started successfully or already running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       400:
 *         description: Bad request - session cannot be started
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - invalid token or session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions/{id}/pause:
 *   post:
 *     summary: Pause Timer
 *     description: Pauses the timer for an active grind session. Accumulates elapsed time from the current segment.
 *     tags: [Grind Sessions - Timer Controls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The grind session ID
 *     responses:
 *       200:
 *         description: Timer paused successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       400:
 *         description: Bad request - session is not active and cannot be paused
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - invalid token or session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions/{id}/stop:
 *   post:
 *     summary: Stop Timer
 *     description: Stops/completes the timer for a grind session. Calculates final elapsed time and marks session as COMPLETED.
 *     tags: [Grind Sessions - Timer Controls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The grind session ID
 *     responses:
 *       200:
 *         description: Timer stopped and session completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       400:
 *         description: Bad request - session cannot be stopped
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - invalid token or session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /grind-sessions/{id}/abandon:
 *   post:
 *     summary: Abandon Session
 *     description: Marks a grind session as abandoned. User can abandon sessions at any time.
 *     tags: [Grind Sessions - Timer Controls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The grind session ID
 *     responses:
 *       200:
 *         description: Session abandoned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GrindSessionResponse'
 *       401:
 *         description: Unauthorized - invalid token or session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


