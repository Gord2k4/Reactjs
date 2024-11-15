import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "../types/Product";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(cartItem => cartItem.product._id === item.product._id);
            let updatedItems;

            if (existingItemIndex !== -1) {
                updatedItems = [...prev];
                updatedItems[existingItemIndex].quantity += item.quantity;
            } else {
                updatedItems = [...prev, item];
            }

            localStorage.setItem("cart", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => {
            const updatedCart = prev.filter(item => item.product._id !== productId);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
