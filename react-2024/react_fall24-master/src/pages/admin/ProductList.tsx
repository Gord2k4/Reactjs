import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";

export default function ProductList() {
  const { loading, products, handleDeleteProduct } = useProduct();

  return (
    <div className="container">
      <h1>Admin Product List</h1>
      <a href="/admin/product/add" className="btn btn-success">Product Add</a>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Desc</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>{product.price} VND</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "50px", height: "auto" }}
                  />
                </td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <Link to={`/admin/product/edit/${product._id}`}>
                    <button className="btn btn-info">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="btn btn-danger mt-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                Không có sản phẩm nào để hiển thị.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
