import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import checkPermission from "../middlewares/index.js";

const productRouter = Router();
const productController = new ProductController;

productRouter.get("/",productController.getList);
productRouter.get("/:id",productController.getDetail);
productRouter.post("/", productController.create);
productRouter.put("/:id", productController.update);
productRouter.delete("/:id", productController.delete);

export default productRouter;