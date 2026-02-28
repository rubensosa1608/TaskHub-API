import { prisma } from "../../lib/prisma.js";

export class CategoryService {
  async createCategory(data) {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        user_id: data.user_id,
      },
    });

    return category;
  }

  async getAllCategories(idUser) {
    const categories = await prisma.category.findMany({
      where: {
        user_id: idUser,
      },
    });

    return categories;
  }

  async getCategoryById(idCategory) {
    const category = await prisma.category.findUnique({
      where: {
        id: idCategory,
      },
    });

    return category;
  }

  async updateCategory(idCategory, data) {
    const category = await prisma.category.update({
      where: {
        id: idCategory,
      },
      data: {
        name: data.name,
      },
    });

    return category;
  }

  async deleteCategory(idCategory) {
    await prisma.category.delete({
      where: {
        id: idCategory,
      },
    });
  }
}
