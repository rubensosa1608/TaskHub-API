import { prisma } from "../../lib/prisma.js";

export class TaskService {
  async createTask(data) {
    // Prioridad segura
    const validPriorities = ["Alta", "Media", "Baja"];
    const priority = validPriorities.includes(data.priority)
      ? data.priority
      : "Baja";

    // Fecha límite segura
    let limitDate = null;
    if (data.limit_date) {
      const date = new Date(data.limit_date);
      if (!isNaN(date)) {
        limitDate = date;
      }
    }

    const task = await prisma.tasks.create({
      data: {
        title: data.title,
        description: data.description || null,
        priority,
        limit_date: limitDate,
        user_id: data.user_id,
      },
    });

    return task;
  }

  async getAllTasks(idUser) {
  const tasks = await prisma.tasks.findMany({
    where: {
      user_id: idUser,
    },
    include: {
      category: true, // <-- esto hace el JOIN
    },
  });

  return tasks;
}

  async getTaskById(idTask) {
    const task = await prisma.tasks.findUnique({
      where: {
        id: idTask,
      },
    });

    return task;
  }

  async updateTask(idTask, data) {
    const validPriorities = ["Alta", "Media", "Baja"];
    const priority = validPriorities.includes(data.priority)
      ? data.priority
      : "Baja";

    let limitDate = null;
    if (data.limit_date) {
      const date = new Date(data.limit_date);
      if (!isNaN(date)) {
        limitDate = date;
      }
    }

    const task = await prisma.tasks.update({
      where: {
        id: idTask,
      },
      data: {
        title: data.title,
        description: data.description || null,
        priority,
        limit_date: limitDate,
      },
    });

    return task;
  }

  async deleteTask(idTask) {
    await prisma.tasks.deleteMany({
      where: {
        id: idTask,
      },
    });
  }

  async verifyTaskOwnership(idTask, idUser) {
    const task = await getTaskById(idTask);

    if (!task) throw new Error("Tarea no encontrada");
    if (task.user_id !== idUser)
      throw new Error("No eres el dueño de la tarea");

    return true;
  }

  async getNumberOfTasks(idUser) {
    const count = await prisma.tasks.count({
      where: {
        user_id: idUser,
      },
    });

    return count;
  }
}
