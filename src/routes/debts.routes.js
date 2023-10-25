import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getDebts,
  getDebt,
  createDebt,
  deleteDebt,
  updateDebt,
} from "../controllers/debts.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createDebtSchema } from "../schemas/debts.schema.js";

//inicia el enrutador
const router = Router();

//rutas protegidas
router.get("/debts", authRequired, getDebts);

router.get("/debts/:id", authRequired, getDebt);

router.post(
  "/debts",
  authRequired,
  validateSchema(createDebtSchema),
  createDebt
);

router.delete("/debts/:id", authRequired, deleteDebt);

router.put("/debts/:id", authRequired, updateDebt);

export default router;
