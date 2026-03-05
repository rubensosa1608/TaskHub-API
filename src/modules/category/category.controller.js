import * as categoryValidator from "./category.validators.js";

export class CategoryController {
  constructor(CategoryService) {
    this.CategoryService = CategoryService;

    this.createCategory = this.createCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async createCategory(req, res, next) {
    try {
      const result = categoryValidator.createCategorySchema.safeParse(req.body);

      if (!result.success) {
        const error = new Error(
          result.error.errors.map((e) => e.message).join(", "),
        );
        error.status = 400;
        throw error;
      }

      const category = await this.CategoryService.createCategory({
        name: result.data.name,
        user_id: result.data.user_id,
      });

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async getAllCategories(req, res, next) {
    try {
      const userId = parseInt(req.params.idUser, 10);
      const categories = await this.CategoryService.getAllCategories(userId);

      if (categories.length === 0) {
        const error = new Error(
          "No se encontraron categorías para este usuario",
        );
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Categorías obtenidas exitosamente",
        categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const idCategory = parseInt(req.params.id, 10);
      const category = await this.CategoryService.getCategoryById(idCategory);

      if (!category) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Categoría obtenida exitosamente",
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const idCategory = parseInt(req.params.id, 10);
      const result = categoryValidator.updateCategorySchema.safeParse(req.body);

      if (!result.success) {
        const error = new Error(
          result.error.errors.map((e) => e.message).join(", "),
        );
        error.status = 400;
        throw error;
      }

      const updates = result.data;
      const updatedCategory = await this.CategoryService.updateCategory(
        idCategory,
        updates,
      );

      res.status(200).json({
        message: "Categoría actualizada exitosamente",
        category: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const idCategory = parseInt(req.params.id, 10);

      await this.CategoryService.deleteCategory(idCategory);

      res.status(200).json({
        message: "Categoría eliminada exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
