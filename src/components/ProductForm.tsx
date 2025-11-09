import React from "react";

interface ProductFormProps {
  productId?: string | null;
  setProductId?: (id: string | null) => void;
  afterClose?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productId = null,
  setProductId,
  afterClose,
}) => {
  // Basic usage of props to avoid unused variable warnings
  console.log("ProductForm props:", { productId, setProductId, afterClose });

  const isEditing = productId !== null;
  const title = isEditing ? "Edit Product" : "Add New Product";

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      data-bs-backdrop="static"
      tabIndex={-1}
      id="productFormOffcanvas"
      aria-labelledby="productFormOffcanvasLabel"
    >
      <div className="offcanvas-header bg-primary text-white shadow-sm">
        <h5
          className="offcanvas-title fw-bold mb-0"
          id="productFormOffcanvasLabel"
        >
          {title}
        </h5>
        <button
          type="button"
          className="btn-close bg-white rounded-circle d-flex align-items-center justify-content-center"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={afterClose}
          style={{
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(0, 123, 255, 0.4)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(0, 123, 255, 0.3)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
        ></button>
      </div>
      <div className="offcanvas-body">
        <p>Try scrolling the rest of the page to see this option in action.</p>
      </div>
    </div>
  );
};

export default ProductForm;
