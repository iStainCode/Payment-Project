import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  verifyToken
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, resgisterSchema } from "../schemas/auth.schema.js";
//iniciar el enrutador
const router = Router();
//rutas
router.post("/register", validateSchema(resgisterSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
//ruta protegita (authRequired)
router.get("/profile", authRequired, profile);
router.get('/verify',verifyToken);

export default router;
