import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import { CategoryService } from "./category.service.js";

export const categoryRouter = Router();
const CategoryServiceI = new CategoryService();
const categoryController = new CategoryController(CategoryServiceI);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
categoryRouter.get("/:id", categoryController.getCategoryById);

/**
 * @openapi
 * /categories/user/{idUser}:
 *   get:
 *     summary: Obtener todas las categorías de un usuario
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de categorías del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
categoryRouter.get("/categoriesUser/:idUser", categoryController.getAllCategories);

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - idUser
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               idUser:
 *                 type: integer
 *                 description: ID del usuario al que pertenece la categoría
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
categoryRouter.post("/", categoryController.createCategory);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     summary: Actualizar una categoría por ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
categoryRouter.put("/:id", categoryController.updateCategory);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
categoryRouter.delete("/:id", categoryController.deleteCategory);
