import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grindset API',
      version: '1.0.0',
      description: 'Complete API collection for managing grind study sessions with timer functionality. Base URL: http://localhost:3000/api/v1',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from login endpoint',
        },
      },
      schemas: {
        GrindSession: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the grind session',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the user who owns this session',
            },
            title: {
              type: 'string',
              description: 'Title of the grind session',
              example: 'Physics Problem Set',
            },
            subject: {
              type: 'string',
              nullable: true,
              description: 'Subject category',
              example: 'Physics',
            },
            notes: {
              type: 'string',
              nullable: true,
              description: 'Additional notes about the session',
              example: 'Quantum mechanics homework',
            },
            photoUrl: {
              type: 'string',
              nullable: true,
              description: 'URL to proof photo',
            },
            duration: {
              type: 'integer',
              description: 'Total duration in seconds',
              example: 3600,
            },
            pomodoroSets: {
              type: 'integer',
              description: 'Number of 25-minute pomodoro sets completed',
              example: 2,
              default: 0,
            },
            focusScore: {
              type: 'integer',
              description: 'Focus score percentage (0-100)',
              example: 45,
              default: 0,
            },
            status: {
              type: 'string',
              enum: ['ACTIVE', 'PAUSED', 'COMPLETED', 'ABANDONED'],
              description: 'Current status of the session',
              example: 'ACTIVE',
            },
            isHardMode: {
              type: 'boolean',
              description: 'Whether the session is in hard mode',
              example: true,
              default: false,
            },
            didNotFinish: {
              type: 'boolean',
              description: 'Did not finish flag',
              example: false,
              default: false,
            },
            startedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the session started',
            },
            endedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When the session ended',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the session was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the session was last updated',
            },
            accumulatedTime: {
              type: 'integer',
              description: 'Total accumulated time in seconds',
              example: 1200,
              default: 0,
            },
            lastPausedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When the session was last paused',
            },
          },
          required: ['id', 'userId', 'title', 'duration', 'status', 'startedAt', 'createdAt', 'updatedAt'],
        },
        CreateGrindSessionRequest: {
          type: 'object',
          required: ['title', 'duration', 'startedAt'],
          properties: {
            title: {
              type: 'string',
              description: 'Title of the grind session',
              example: 'Physics Problem Set',
            },
            subject: {
              type: 'string',
              nullable: true,
              description: 'Subject category',
              example: 'Physics',
            },
            notes: {
              type: 'string',
              nullable: true,
              description: 'Additional notes about the session',
              example: 'Quantum mechanics homework',
            },
            photoUrl: {
              type: 'string',
              nullable: true,
              description: 'URL to proof photo',
            },
            duration: {
              type: 'integer',
              description: 'Total duration in seconds',
              example: 3600,
            },
            pomodoroSets: {
              type: 'integer',
              description: 'Number of 25-minute pomodoro sets completed',
              example: 2,
              default: 0,
            },
            focusScore: {
              type: 'integer',
              description: 'Focus score percentage (0-100)',
              example: 45,
              default: 0,
            },
            status: {
              type: 'string',
              enum: ['ACTIVE', 'PAUSED', 'COMPLETED', 'ABANDONED'],
              description: 'Initial status of the session',
              example: 'ACTIVE',
            },
            isHardMode: {
              type: 'boolean',
              description: 'Whether the session is in hard mode',
              example: true,
              default: false,
            },
            didNotFinish: {
              type: 'boolean',
              description: 'Did not finish flag',
              example: false,
              default: false,
            },
            startedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the session started',
              example: '2026-01-19T14:00:00Z',
            },
            endedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When the session ended',
              example: '2026-01-19T15:00:00Z',
            },
          },
        },
        UpdateGrindSessionRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the grind session',
              example: 'Physics Problem Set - Updated',
            },
            subject: {
              type: 'string',
              nullable: true,
              description: 'Subject category',
              example: 'Physics',
            },
            notes: {
              type: 'string',
              nullable: true,
              description: 'Additional notes about the session',
              example: 'Completed quantum mechanics homework',
            },
            photoUrl: {
              type: 'string',
              nullable: true,
              description: 'URL to proof photo',
            },
            duration: {
              type: 'integer',
              description: 'Total duration in seconds',
              example: 3600,
            },
            pomodoroSets: {
              type: 'integer',
              description: 'Number of 25-minute pomodoro sets completed',
              example: 2,
            },
            focusScore: {
              type: 'integer',
              description: 'Focus score percentage (0-100)',
              example: 85,
            },
            status: {
              type: 'string',
              enum: ['ACTIVE', 'PAUSED', 'COMPLETED', 'ABANDONED'],
              description: 'Status of the session',
              example: 'COMPLETED',
            },
            isHardMode: {
              type: 'boolean',
              description: 'Whether the session is in hard mode',
              example: true,
            },
            didNotFinish: {
              type: 'boolean',
              description: 'Did not finish flag',
              example: false,
            },
            startedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the session started',
              example: '2026-01-19T14:00:00Z',
            },
            endedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When the session ended',
              example: '2026-01-19T15:00:00Z',
            },
          },
        },
        GrindSessionResponse: {
          type: 'object',
          properties: {
            grindSession: {
              $ref: '#/components/schemas/GrindSession',
            },
            message: {
              type: 'string',
              example: 'Grind session created successfully',
            },
          },
        },
        GrindSessionsResponse: {
          type: 'object',
          properties: {
            grindSessions: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/GrindSession',
              },
            },
            message: {
              type: 'string',
              example: 'Grind sessions fetched successfully',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the user',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            name: {
              type: 'string',
              nullable: true,
              description: 'User name',
            },
            avatar: {
              type: 'string',
              nullable: true,
              description: 'URL to user avatar',
            },
            timezone: {
              type: 'string',
              description: 'User timezone',
              default: 'UTC',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        AuthRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password',
              example: 'password123',
            },
          },
        },
        SignUpResponse: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'uuid',
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
              },
            },
            message: {
              type: 'string',
              example: 'User signed up successfully',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              description: 'JWT access token',
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'uuid',
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
              },
            },
            message: {
              type: 'string',
              example: 'User logged in successfully',
            },
          },
        },
        RefreshTokenResponse: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              description: 'New JWT access token',
            },
            message: {
              type: 'string',
              example: 'Access token generated successfully',
            },
          },
        },
        GetUserResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            message: {
              type: 'string',
              example: 'User found successfully',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Grind Sessions - CRUD',
        description: 'Operations for managing grind sessions (Create, Read, Update, Delete)',
      },
      {
        name: 'Grind Sessions - Timer Controls',
        description: 'Operations for controlling the timer of grind sessions',
      },
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../routes/**/*.ts'),
    path.join(__dirname, '../docs/swagger/**/*.ts'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

