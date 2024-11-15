export type Product = {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  category: string
};


export interface CartItem {
  product: Product;
  quantity: number;
};


export interface Order {
  name: string;
  address: string;
  phone: string;
  items: CartItem[];
}