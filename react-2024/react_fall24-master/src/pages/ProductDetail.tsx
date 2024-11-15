import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail } from "../services/product";
import { Product, CartItem } from "../types/Product";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useCart } from "../contexts/Card";
import '../styles/productDetail.css';


export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchProductDetail = async () => {
            if (!id) return;

            try {
                const response = await getProductDetail(id);
                setProduct(response.data.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(`Error: ${error.response?.data?.message || error.message}`);
                } else {
                    toast.error("Lỗi không xác định!");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) {
            toast.error("Sản phẩm không hợp lệ!");
            return;
        }

        const cartItem: CartItem = { product, quantity };
        addToCart(cartItem);
        toast.success(`Đã thêm ${quantity} ${product.title} vào giỏ hàng!`);
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Chi Tiết Sản Phẩm</h2>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : product ? (
                <div className="row">
                    <div className="col">
                        <img src={product.image} className="card-img-top" alt={product.title} />
                    </div>
                    <div className="col">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.category}</p>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">Giá: {product.price} VND</p>
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(q => Math.max(q - 1, 1))} className="btn btn-secondary">-</button>
                            <span className="mx-2">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="btn btn-secondary">+</button>
                        </div>
                        <button onClick={handleAddToCart} className="btn btn-primary mt-3">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            ) : (
                <p className="text-center">Không tìm thấy sản phẩm.</p>
            )}
            <div className="text-center my-4">
                <button onClick={() => navigate(-1)} className="btn btn-secondary">Quay lại</button>
            </div>
        </div>
    );
}
