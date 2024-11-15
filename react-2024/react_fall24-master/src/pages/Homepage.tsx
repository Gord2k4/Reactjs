import { Link } from "react-router-dom";
import '../styles/homepage.css';
import { useProduct } from "../hooks/useProduct";

export default function Homepage() {
  
  const { products, loading } = useProduct();

  return (
    <div className="container">
      <h1 className="my-4 text-center">Homepage</h1>
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4">
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text card-price">Price: {product.price} VND</p>
                  <Link to={`/product/${product._id}`} className="btn btn-primary">
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Không có sản phẩm nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
}
