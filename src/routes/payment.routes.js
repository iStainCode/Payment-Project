import { Router } from "express";
import { createOrder } from "../controllers/payment.controller.js";

const router = Router()

router.get('/create-order',createOrder)

export default router