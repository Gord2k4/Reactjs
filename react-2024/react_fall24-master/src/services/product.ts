import { http } from "../config/axios";
import { User } from "./auth";

type Product = {
  title: string,
  price: number,
  description: string,
  image: string,
  category: string,
}

type Cart = {
  product: Product;
  quantity: number;
  user: User;
};

export type Order = {
  name: string;
  address: string;
  phone: string;
  items: Array<{
    product: string; // ID sản phẩm
    quantity: number;
  }>;
};

export const getAllProduct = () => {
  return http.get("/products");
};

export const getProductDetail = (id: string) => {
  return http.get("/products/" + id);
};

export const deleteProduct = (id: string) => {
  return http.delete("/products/" + id);
};

export const addProduct = (data: Product) => {
  return http.post("/products", data);
};

export const editProductDetail = (id: string, data: Product) => {
  return http.put("/products/" + id, data);
};

export const addToCart = (data: Cart) => {
  return http.post("/carts", data);
};

export const getCart = (userId: string) => {
  return http.get(`/carts/${userId}`);
};

export const updateCart = (userId: string, cart: Cart[]) => {
  return http.put(`/carts/${userId}`, { cart });
};

export const removeFromCart = (userId: string, productId: string) => {
  return http.delete(`/carts/${userId}/products/${productId}`);
};

export const createOrder = (data: Order) => {
  return http.post("/orders", data);
};