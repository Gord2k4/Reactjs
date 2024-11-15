import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js'; // Ensure you have .js extension
import Cart from '../models/Cart.js'; // Ensure you have .js extension
import Product from '../models/Product.js'; // Ensure you have .js extension

class CartsController {
  // GET /carts
  async getAllCarts(req, res, next) {
    try {
      const carts = await Cart.find().populate({
        path: 'products.product',
        model: Product,
      });
      res.status(StatusCodes.OK).json(carts);
    } catch (error) {
      next(error);
    }
  }

  // POST /carts
  async addToCart(req, res, next) {
    try {
      const { quantity, user, product } = req.body;
      const cart = await Cart.findOne({ user });

      if (!cart) {
        const newCart = await Cart.create({
          user,
          products: [{ product, quantity }],
        });
        return res.status(StatusCodes.CREATED).json({
          message: 'Cart created successfully',
          data: newCart,
        });
      }

      const productExisted = cart.products.find(item => item.product.toString() === product);
      let newProductCart;

      if (productExisted) {
        newProductCart = cart.products.map(item =>
          item.product.toString() === product
            ? { product, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newProductCart = [...cart.products, { product, quantity }];
      }

      const updatedCart = await Cart.findByIdAndUpdate(cart._id, { products: newProductCart }, { new: true });
      res.status(StatusCodes.OK).json({
        message: 'Product added to cart successfully',
        data: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /carts/:id
  async updateProductCart(req, res, next) {
    try {
      const { user, product, quantity } = req.body;
      const cart = await Cart.findOne({ user });
      if (!cart) throw new ApiError(StatusCodes.NOT_FOUND, 'Cart Not Found');

      const productExisted = cart.products.find(item => item.product.toString() === product);
      let newProductCart;

      if (productExisted) {
        newProductCart = cart.products.map(item =>
          item.product.toString() === product
            ? { product, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newProductCart = [...cart.products, { product, quantity }];
      }

      const updatedCart = await Cart.findByIdAndUpdate(cart._id, { products: newProductCart }, { new: true });
      res.status(StatusCodes.OK).json({
        message: 'Cart updated successfully',
        data: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /carts/:id
  async deleteProductCart(req, res, next) {
    try {
      const { id } = req.params;
      const { user } = req.body;
      const cart = await Cart.findOne({ user });
      if (!cart) throw new ApiError(StatusCodes.NOT_FOUND, 'Cart Not Found');

      const newProductCart = cart.products.filter(item => item.product.toString() !== id);
      const updatedCart = await Cart.findByIdAndUpdate(cart._id, { products: newProductCart }, { new: true });

      if (!updatedCart) throw new ApiError(StatusCodes.NOT_FOUND, 'Cart Not Found');

      res.status(StatusCodes.OK).json({
        message: 'Product removed from cart successfully',
        data: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartsController();
