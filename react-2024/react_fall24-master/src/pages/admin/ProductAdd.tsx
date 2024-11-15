import { ProductForm } from "../../components/ProductForm";
import { useProduct } from "../../hooks/useProduct";

export default function ProductAdd() {
  const {handleAddProduct} = useProduct();

  return (
    <div className="container">
      <h1>Product Add</h1>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
}