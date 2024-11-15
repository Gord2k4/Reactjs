import React, { useState } from "react";
import { useCart } from "../contexts/Card";
import { createOrder } from "../services/product";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
    const { cartItems, getTotalItems } = useCart();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const orderData = {
            name,
            address,
            phone,
            items: cartItems.map(item => ({
                product: item.product._id, 
                quantity: item.quantity,
            })),
        };
    
        try {
            await createOrder(orderData);
            toast.success("Đặt hàng thành công!");
            navigate("/"); 
        } catch {
            
            toast.error("Đặt hàng thất bại!");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Thanh Toán</h2>
            {getTotalItems() === 0 ? (
                <p className="text-center">Giỏ hàng trống!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Họ tên</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" id="address" value={address} onChange={e => setAddress(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                        <input type="text" className="form-control" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Đặt hàng</button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
