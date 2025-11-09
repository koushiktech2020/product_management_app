import React, { useEffect } from "react";
import { productsAPI } from "../services/api";
import { useSafeAsync } from "../hooks/useSafeAsync";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

const ProductList: React.FC = () => {
  const { execute, loading, error } = useSafeAsync({
    onError: (err) => {
      console.error("ProductList error:", err);
    },
  });

  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await execute(
        async () => {
          const result = await productsAPI.getAll();

          if (result.success && result.data) {
            setProducts(result.data);
          } else {
            throw new Error(
              result.error?.message || "Failed to fetch products"
            );
          }
        },
        // Success callback
        () => {
          console.log("Products fetched successfully");
        }
      );
    };

    fetchProducts();
  }, [execute]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Products</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Product List</h1>
        <button className="btn btn-primary">Add New Product</button>
      </div>

      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">
                  Created by: {product.createdBy.name}
                </p>
                <p className="card-text flex-grow-1">{product.description}</p>
                <div className="mt-auto">
                  <h6 className="text-success">
                    ₹{product.price.toLocaleString()}
                  </h6>
                  <small className="text-muted">
                    Created: {new Date(product.createdAt).toLocaleDateString()}
                  </small>
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-outline-primary btn-sm">
                      Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
