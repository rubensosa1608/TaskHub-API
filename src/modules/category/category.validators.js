import * as z from "zod";

// Esquema para crear una categoría
export const createCategorySchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    user_id: z.coerce.number().int(),
});

// Esquema para actualizar una categoría
export const updateCategorySchema = z.object({
    name: z.string().min(1).optional(),
});