import eps from "express";
import setupSwagger from "./config/swagger.js";
import { taskRouter } from "./modules/tasks/task.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { categoryRouter } from "./modules/category/category.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import cors from "cors";

export const app = eps();
app.use(
  cors({
    origin: "http://localhost:5173", // tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // si envías cookies
  }),
);
app.use(eps.json());

// Swagger documentation setup
setupSwagger(app);

// Rutas de autenticación
app.use("/auth", authRouter);

// Rutas protegidas de tareas
app.use("/tasks", authMiddleware, taskRouter);

// Rutas protegidas de categorías
app.use("/categories", authMiddleware, categoryRouter);

// Error handling middleware
app.use(errorHandler);
