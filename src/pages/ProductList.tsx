import React, { useState, useEffect, useCallback } from "react";
import { productsAPI } from "../services/api";
import { PRODUCTS_ENDPOINTS } from "../services/endpoints/products";
import type { Product } from "../types/api";
import ProductForm from "../components/ProductForm";
import ProductFilter from "../components/ProductFilter";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [totalPages, setTotalPages] = useState(1);

  const handleEditProduct = (product: Product) => {
    setProductId(product._id);
  };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        const result = await productsAPI.delete(
          PRODUCTS_ENDPOINTS.BY_ID(product._id)
        );
        if (result.success) {
          // Refresh the products list after successful deletion
          // Since ProductFilter now manages fetching, we need to trigger a refetch
          // For now, we'll reload all products
          fetchProducts();
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

  // Handler for refresh - trigger reset in ProductFilter
  const handleRefresh = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        sortBy,
        sortOrder,
      };
      const result = await productsAPI.getAll(PRODUCTS_ENDPOINTS.BASE, params);
      if (result.success && result.data) {
        const { data, totalPages: apiTotalPages } = result.data;
        setProducts(data);
        setTotalPages(apiTotalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reusable page header component
  const PageHeader = () => (
    <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
      <h1>Product List</h1>
      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-primary btn-lg d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill fw-semibold transition-all"
          onClick={handleRefresh}
          title="Refresh products"
        >
          <i className="material-icons" style={{ fontSize: "20px" }}>
            refresh
          </i>
        </button>
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
        <button
          className="btn btn-outline-primary btn-lg d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill fw-semibold transition-all"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#productFilterOffcanvas"
          aria-controls="productFilterOffcanvas"
        >
          <i className="material-icons" style={{ fontSize: "20px" }}>
            filter_alt
          </i>
          <span>Filter Products</span>
        </button>
      </div>
    </div>
  );

  // Pagination, limit, and sorting controls UI
  const ControlsBar = () => (
    <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
      <div>
        <label className="me-2 fw-semibold">Page:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="me-2 fw-semibold">Limit:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          {[10, 20, 50].map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="me-2 fw-semibold">Sort By:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Created At</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div>
        <label className="me-2 fw-semibold">Order:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
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
            onClick={() => handleRefresh()}
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
      <ControlsBar />

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
          title="No Matching Products"
          description="Sorry, we couldn't find any products matching your criteria."
          icon="search"
          actionButton={{
            text: "Clear Filters",
            onClick: () => {
              handleRefresh();
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
      <ProductFilter setProducts={setProducts} resetTrigger={resetTrigger} />
    </div>
  );
};

export default ProductList;
