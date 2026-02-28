import * as z from "zod";

// Esquema para crear una task
export const createTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  priority: z.string(),
  state: z.string(),
  limit_date: z.coerce.date(),
  user_id: z.coerce.number().int(),
  category_id: z.coerce.number().int().optional(),
});

// Esquema para actualizar una task
export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.string(),
  state: z.string(),
  limit_date: z.coerce.date().optional(),
  category_id: z.coerce.number().int().optional(),
});
