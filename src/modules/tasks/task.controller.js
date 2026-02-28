import { ca } from "zod/locales";
import * as taskValidator from "./task.validators.js";

export class TaskController {
  constructor(TaskService) {
    this.TaskService = TaskService;

    this.createTask = this.createTask.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.getTaskById = this.getTaskById.bind(this);
    this.getNumberOfTasks = this.getNumberOfTasks.bind(this);
  }

  async createTask(req, res, next) {
    try {
      const result = taskValidator.createTaskSchema.safeParse(req.body);

      if (!result.success) {
        const er = new Error(
          result.error.errors.map((e) => e.message).join(", "),
        );
        er.status = 400;
        throw er;
      }

      const { title, description, priority,state, limit_date, user_id, category_id } = result.data;

      const newTask = await this.TaskService.createTask({
        title,
        description,
        priority,
        state,
        limit_date,
        user_id,
        category_id
      });

      res.status(201).json({
        message: "Tarea creada exitosamente",
        task: newTask,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const userId = parseInt(req.params.idUser, 10); // convierte "2" -> 2

      const tasks = await this.TaskService.getAllTasks(userId);

      if (tasks.length === 0) {
        const er = new Error("No se encontraron tareas para este usuario");
        er.status = 404;
        throw er;
      }

      res.status(200).json({
        message: "Tareas obtenidas exitosamente",
        tasks: tasks,
      });
    } catch (err) {
      next(err);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const idTask = parseInt(req.params.id, 10);

      const task = await this.TaskService.getTaskById(idTask);

      if (!task) {
        const er = new Error("Tarea no encontrada");
        er.status = 404;
        throw er;
      }

      res.status(200).json({
        message: "Tarea obtenida exitosamente",
        task: task,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateTask(req, res, next) {
    try {
      const idTask = parseInt(req.params.id, 10);
      const result = taskValidator.updateTaskSchema.safeParse(req.body);

      if (!result.success) {
        const er = new Error(
          result.error.errors.map((e) => e.message).join(", "),
        );
        er.status = 400;
        throw er;
      }

      const updates = result.data;
      const updatedTask = await this.TaskService.updateTask(idTask, updates);

      res.status(200).json({
        message: "Tarea actualizada exitosamente",
        task: updatedTask,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const idTask = parseInt(req.params.id, 10);

      await this.TaskService.deleteTask(idTask);

      if (!idTask) {
        const er = new Error("Tarea no encontrada");
        er.status = 404;
        throw er;
      }

      res.status(200).json({
        message: "Tarea eliminanda exitosamente",
      });
    } catch (err) {
      next(err);
    }
  }

  async getNumberOfTasks(req, res, next) {
    try {
      const userId = parseInt(req.params.id, 10);
      const tasksNumber = await this.TaskService.getNumberOfTasks(userId);

      res.status(200).json({
        message: "Número de tareas obtenidas exitosamente",
        numberOfTasks: tasksNumber,
      });
    } catch (err) {
      next(err);
    }
  }
}
