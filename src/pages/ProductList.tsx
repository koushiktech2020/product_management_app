import React, { useState, useEffect } from "react";
import { productsAPI } from "../services/api";
import type { Product } from "../types/api";
import ProductForm from "../components/ProductForm";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const handleEditProduct = (product: Product) => {
    setProductId(product._id);
  };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        const result = await productsAPI.delete(product._id);
        if (result.success) {
          // Refresh the products list after successful deletion
          const refreshResult = await productsAPI.getAll();
          if (refreshResult.success && refreshResult.data) {
            const { data } = refreshResult.data;
            setProducts(data);
          }
        } else {
          alert("Failed to delete product. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("An error occurred while deleting the product.");
      }
    }
  };

  const handleAfterClose = () => {
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const result = await productsAPI.getAll();

      if (result.success && result.data) {
        const { data } = result.data;
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reusable page header component
  const PageHeader = () => (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1>Product List</h1>
      <button
        className="btn btn-primary btn-lg d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill fw-semibold transition-all"
        data-bs-toggle="offcanvas"
        data-bs-target="#productFormOffcanvas"
        aria-controls="productFormOffcanvas"
      >
        <i className="material-icons" style={{ fontSize: "20px" }}>
          add_circle
        </i>
        <span>Add New Product</span>
      </button>
    </div>
  );

  if (loading) {
    return <Loading text="Loading products..." />;
  }

  if (error) {
    return (
      <div className="container mt-5">
        <PageHeader />
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Products</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger rounded-pill fw-medium px-3 py-2 transition-all"
            onClick={fetchProducts}
            style={{
              border: "1px solid #dc3545",
              boxShadow: "0 2px 8px rgba(220, 53, 69, 0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#dc3545";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(220, 53, 69, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#dc3545";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(220, 53, 69, 0.15)";
            }}
          >
            <i
              className="material-icons me-1"
              style={{ fontSize: "16px", verticalAlign: "middle" }}
            >
              refresh
            </i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <PageHeader />

      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card h-100 border-secondary"
              style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
            >
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
                  <p className="text-primary mb-1">
                    <i
                      className="material-icons"
                      style={{ fontSize: "16px", verticalAlign: "middle" }}
                    >
                      inventory
                    </i>
                    <span className="ms-1 fw-medium">
                      Quantity: {product.quantity}
                    </span>
                  </p>
                  <small className="text-muted">
                    Created: {new Date(product.createdAt).toLocaleDateString()}
                  </small>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-outline-primary d-flex align-items-center gap-1 rounded-pill fw-medium transition-all"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#productFormOffcanvas"
                      aria-controls="productFormOffcanvas"
                      onClick={() => handleEditProduct(product)}
                      style={{
                        background:
                          "linear-gradient(135deg, #4198f5ff 0%, #3493f8ff 100%)",
                        color: "white",
                        border: "none",
                        boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#007bff";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 123, 255, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0, 123, 255, 0.15)";
                      }}
                    >
                      <i
                        className="material-icons"
                        style={{ fontSize: "16px" }}
                      >
                        edit
                      </i>
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger d-flex align-items-center gap-1 rounded-pill fw-medium transition-all"
                      onClick={() => handleDeleteProduct(product)}
                      style={{
                        border: "1px solid #dc3545",
                        boxShadow: "0 2px 8px rgba(220, 53, 69, 0.15)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#dc3545";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(220, 53, 69, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#dc3545";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(220, 53, 69, 0.15)";
                      }}
                    >
                      <i
                        className="material-icons"
                        style={{ fontSize: "16px" }}
                      >
                        delete
                      </i>
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
        <EmptyState
          title="No Products Found"
          description="You haven't added any products yet. Start by creating your first product to get started."
          icon="inventory_2"
          actionButton={{
            text: "Add Your First Product",
            onClick: () => {
              // Trigger the offcanvas to open
              const button = document.querySelector(
                '[data-bs-target="#productFormOffcanvas"]'
              ) as HTMLButtonElement;
              if (button) {
                button.click();
              }
            },
            variant: "primary",
          }}
        />
      )}

      <ProductForm
        productId={productId}
        setProductId={setProductId}
        afterClose={handleAfterClose}
      />
    </div>
  );
};

export default ProductList;
