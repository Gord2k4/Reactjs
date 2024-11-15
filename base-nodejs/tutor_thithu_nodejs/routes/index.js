// code base
import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import cartRouter from "./cart.js";
import orderRouter from "./order.js";

const router = Router();
router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/carts", cartRouter);
router.use("/orders", orderRouter);

export default router;