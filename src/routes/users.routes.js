import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserschema } from "../schemas/user.schema.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post(
  "/users",
  authRequired,
  validateSchema(createUserschema),
  createUser
);

router.delete("/users/:id", authRequired, deleteUser);

router.put("/users/:id", authRequired, updateUser);

export default router