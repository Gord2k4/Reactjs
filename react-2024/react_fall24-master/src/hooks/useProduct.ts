import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { addProduct, deleteProduct, getAllProduct } from "../services/product";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { Inputs } from "../components/ProductForm";
import { AxiosError } from "axios";

interface UseProductReturn {
    products: Product[];
    loading: boolean;
    handleAddProduct: SubmitHandler<Inputs>;
    handleDeleteProduct: (id: string) => void;
    handleUpdateProductQuantity: (productId: string, newQuantity: number) => void;
}

export const useProduct = (): UseProductReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const nav = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await getAllProduct();
                if (data && Array.isArray(data.data)) {
                    setProducts(data.data);
                    toast.success("Thành Công");
                } else {
                    console.error("Dữ liệu không hợp lệ:", data);
                    setProducts([]);
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error("Error: " + error.message);
                } else {
                    console.error("Unexpected error:", error);
                    toast.error("Unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProduct: SubmitHandler<Inputs> = async (values) => {
        try {
            await addProduct(values);
            toast.success("Thêm sản phẩm thành công");
            nav("/admin/product/list");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error("Error: " + error.message);
            } else {
                toast.error("Unexpected error occurred.");
            }
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm("Xóa sản phẩm này?")) {
            try {
                await deleteProduct(id);
                toast.success(`Xóa sản phẩm ID: ${id} thành công`);
                setProducts(prev => prev.filter(product => product._id !== id));
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error("Error: " + error.message);
                } else {
                    toast.error("Unexpected error occurred.");
                }
            }
        }
    };

    const handleUpdateProductQuantity = (productId: string, newQuantity: number) => {
        setProducts(prev =>
            prev.map(product =>
                product._id === productId ? { ...product, quantity: newQuantity } : product
            )
        );
    };

    return {
        products,
        loading,
        handleAddProduct,
        handleDeleteProduct,
        handleUpdateProductQuantity,
    };
};
