import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { productsAPI } from "../services/api";
import type { ProductData } from "../types/api";

// Custom validation schema for the form fields
const productFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Product name must be at least 2 characters long")
    .max(100, "Product name cannot exceed 100 characters")
    .required("Product name is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .max(1000000, "Price cannot exceed ₹10,00,000")
    .required("Price is required"),
  quantity: yup
    .number()
    .integer("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(10000, "Quantity cannot exceed 10,000")
    .required("Quantity is required"),
});

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

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
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<ProductFormValues>({
    name: "",
    description: "",
    price: 0,
    quantity: 1,
  });

  const isEditing = productId !== null;
  const title = isEditing ? "Edit Product" : "Add New Product";

  const fetchProduct = useCallback(async () => {
    if (!productId) return; // Additional safety check

    try {
      const result = await productsAPI.getById(productId);

      if (result.success && result.data) {
        const { data: product } = result.data;
        console.log("Fetched product:", product);
        setInitialValues({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity || 1,
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [productId]);

  const handleSubmit = async (values: ProductFormValues) => {
    setLoading(true);
    try {
      const productData: ProductData = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: "General", // Default category
        quantity: values.quantity,
      };

      let result;
      if (isEditing && productId) {
        result = await productsAPI.update(productId, productData);
      } else {
        result = await productsAPI.create(productData);
      }

      if (result.success) {
        // Close the offcanvas
        const offcanvas = document.getElementById("productFormOffcanvas");
        if (offcanvas) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(
            offcanvas
          );
          bsOffcanvas?.hide();
        }

        // Reset form state
        if (setProductId) {
          setProductId(null);
        }

        // Call afterClose callback
        if (afterClose) {
          afterClose();
        }
      } else {
        alert(
          `Failed to ${
            isEditing ? "update" : "create"
          } product. Please try again.`
        );
      }
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} product:`,
        error
      );
      alert(
        `An error occurred while ${
          isEditing ? "updating" : "creating"
        } the product.`
      );
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setInitialValues({
      name: "",
      description: "",
      price: 0,
      quantity: 1,
    });
    if (setProductId) {
      setProductId(null);
    }
  };

  // Fetch product data if editing
  useEffect(() => {
    if (isEditing && productId) {
      fetchProduct();
    } else {
      // Reset form for new product
      setInitialValues({
        name: "",
        description: "",
        price: 0,
        quantity: 1,
      });
    }
  }, [productId, isEditing, fetchProduct]);

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
          onClick={resetHandler}
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
      <div className="offcanvas-body p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={productFormValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="d-flex flex-column gap-4">
              {/* Product Name */}
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="form-label fw-semibold text-dark mb-2"
                >
                  Product Name *
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-lg border-2"
                  placeholder="Enter product name"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#e9ecef",
                    padding: "12px 16px",
                    fontSize: "16px",
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger mt-1 small"
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label
                  htmlFor="description"
                  className="form-label fw-semibold text-dark mb-2"
                >
                  Description *
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="form-control border-2"
                  rows={4}
                  placeholder="Enter product description"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#e9ecef",
                    padding: "12px 16px",
                    fontSize: "16px",
                    resize: "vertical",
                  }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger mt-1 small"
                />
              </div>

              {/* Price and Quantity Row */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="price"
                      className="form-label fw-semibold text-dark mb-2"
                    >
                      Price (₹) *
                    </label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="form-control form-control-lg border-2"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      style={{
                        borderRadius: "8px",
                        borderColor: "#e9ecef",
                        padding: "12px 16px",
                        fontSize: "16px",
                      }}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger mt-1 small"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="quantity"
                      className="form-label fw-semibold text-dark mb-2"
                    >
                      Quantity *
                    </label>
                    <Field
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="form-control form-control-lg border-2"
                      placeholder="1"
                      min="1"
                      style={{
                        borderRadius: "8px",
                        borderColor: "#e9ecef",
                        padding: "12px 16px",
                        fontSize: "16px",
                      }}
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-danger mt-1 small"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 pt-3 border-top">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="btn btn-primary btn-lg w-100 py-3 fw-semibold rounded-pill d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
                    fontSize: "16px",
                  }}
                >
                  {isSubmitting || loading ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <i
                        className="material-icons"
                        style={{ fontSize: "20px" }}
                      >
                        {isEditing ? "save" : "add_circle"}
                      </i>
                      {isEditing ? "Update Product" : "Create Product"}
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductForm;
