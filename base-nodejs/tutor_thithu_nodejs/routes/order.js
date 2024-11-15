// routes/order.js
import { Router } from "express";
import { createOrder } from "../controllers/OrderController.js";

const router = Router();

router.post("/", createOrder);

export default router;
