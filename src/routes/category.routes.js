import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getCategorys,
  createCategory,
  deleteCategory,
  updataCategory,
} from "../controllers/category.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCategorySchema } from "../schemas/category.schema.js";

const router = Router();

router.get("/categorys", getCategorys);

router.post(
  "/categorys",
  authRequired,
  validateSchema(createCategorySchema),
  createCategory
);

router.delete("/categorys", authRequired, deleteCategory);

router.put("/categorys", authRequired, updataCategory);

export default router;
