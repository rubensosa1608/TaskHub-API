import { Router } from 'express'
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';

export const taskRouter = Router()
const TaskServiceI = new TaskService();
const TaskControllerI = new TaskController(TaskServiceI);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
taskRouter.get('/:id', TaskControllerI.getTaskById)

/**
 * @openapi
 * /tasks/user/{idUser}:
 *   get:
 *     summary: Obtener todas las tareas de un usuario
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 */

taskRouter.get('/tasksUser/:idUser', TaskControllerI.getAllTasks)

/**
 * @openapi
 * /tasks:
 *    post:
 *      summary: Crear una nueva tarea
 *      tags:
 *        - Tasks
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *                - priority
 *                - limit_date
 *                - user_id
 *              properties:
 *                title:
 *                  type: string
 *                  example: "Nueva Tarea"
 *                description:
 *                  type: string
 *                  example: "Descripción de la nueva tarea"
 *                priority:
 *                  type: string
 *                  example: "Alta"
 *                limit_date:
 *                  type: string
 *                  format: date
 *                  example: "2024-12-31"
 *                user_id:
 *                  type: integer
 *                  example: 1
 *      responses:
 *        201:
 *          description: Tarea creada exitosamente
 *        400:
 *          description: Datos inválidos
 */
taskRouter.post('/', TaskControllerI.createTask)

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Actualizar una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
taskRouter.put('/:id', TaskControllerI.updateTask)

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
taskRouter.delete('/:id', TaskControllerI.deleteTask)

// Rutas para obtener numero de tareas, y tareas favoritas y archivadas
taskRouter.get('/taskNumber/:id', TaskControllerI.getNumberOfTasks)
taskRouter.get('/taskNumberFavorites/:id', TaskControllerI.getNumberOfTasksFavorites)
taskRouter.get('/taskNumberArchived/:id', TaskControllerI.getNumberOfTasksArchived)
taskRouter.get('/taskNumberActived/:id', TaskControllerI.getNumberOfTasksActived)