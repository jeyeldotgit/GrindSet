import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

// Load environment variables
dotenv.config();

// Import routes
import exampleRoutes from "./routes/example";
import indexRoutes from "./routes/index.routes";

// Import middlewares
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";

// Import Swagger configuration
import swaggerSpec from "./config/swagger";


const app: Application = express();

// Middleware
const allowedOrigins = (
  process.env.CORS_ORIGINS ?? "http://localhost:5173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests (e.g. curl/postman) with no Origin header
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Request logging middleware
app.use(logger);

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Swagger JSON endpoint
app.get("/api-docs.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Grindset API Documentation",
}));

// API routes
app.use("/api/example", exampleRoutes);

app.use("/api/v1", indexRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
