import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartItem } from "../types/Product";
import '../styles/cart.css';

const Cart: React.FC = () => {
    const [products, setProducts] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        const existingCart: CartItem[] = cartData ? JSON.parse(cartData) : [];
        setProducts(existingCart);
        setLoading(false);
    }, []);

    const totalAmount = products.reduce((total, item) => total + (item.product.price * item.quantity || 0), 0);

    const removeFromCart = (productId: string) => {
        const updatedCart = products.filter(item => item.product._id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setProducts(updatedCart);
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        const updatedCart = products.map(item =>
            item.product._id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setProducts(updatedCart);
    };

    return (
        <div className="container">
            <h1>Giỏ Hàng</h1>
            {loading && <p className="text-center">Loading...</p>}
            {products.length === 0 ? (
                <p className="text-center">
                    Giỏ hàng của bạn đang trống.
                    <Link to="/products" className="btn btn-primary mx-2">Xem sản phẩm</Link>
                </p>
            ) : (
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.product._id}>
                                    <td>{item.product._id}</td>
                                    <td>{item.product.title}</td>
                                    <td>{item.product.price} VND</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                handleQuantityChange(item.product._id, Number(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <img src={item.product.image} alt={item.product.title} width={80} />
                                    </td>
                                    <td>
                                        <button onClick={() => removeFromCart(item.product._id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Tổng Giá: {totalAmount} VND</h4>
                    <Link to="/checkout" className="btn btn-success mt-3">Thanh Toán</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
