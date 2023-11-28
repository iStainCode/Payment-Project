import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductschema } from "../schemas/products.schema.js";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post(
  "/products",
  authRequired,
  validateSchema(createProductschema),
  createProduct
);

router.delete("/products/:id", authRequired, deleteProduct);

router.put("/products/:id", authRequired, updateProduct);

export default router