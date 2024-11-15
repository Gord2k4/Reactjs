// routes/cart.js
import { Router } from 'express';
import CartsController from '../controllers/CartController.js';

const router = Router();

router.get('/', CartsController.getAllCarts); // Lấy tất cả giỏ hàng
router.post('/', CartsController.addToCart); // Thêm sản phẩm vào giỏ hàng
router.put('/:id', CartsController.updateProductCart); // Cập nhật sản phẩm trong giỏ hàng
router.delete('/:id', CartsController.deleteProductCart); // Xóa sản phẩm khỏi giỏ hàng

export default router;
