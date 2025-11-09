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
  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex={-1}
      id="productFormOffcanvas"
      aria-labelledby="productFormOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="productFormOffcanvasLabel">
          Backdrop with scrolling
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <p>Try scrolling the rest of the page to see this option in action.</p>
      </div>
    </div>
  );
};

export default ProductForm;
