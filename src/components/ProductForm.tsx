import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { productsAPI } from "../services/api";
import {
  productValidationSchema,
  type ProductFormValues,
} from "../utils/validation";
import type { Product } from "../types/api";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null; // For edit mode
}

const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  product = null,
}) => {
  const isEdit = !!product;

  const initialValues: ProductFormValues = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    stock: product?.stock || 0,
  };

  const handleSubmit = async (
    values: ProductFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const productData = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        stock: values.stock,
      };

      let result;
      if (isEdit && product) {
        result = await productsAPI.update(product._id, productData);
      } else {
        result = await productsAPI.create(productData);
      }

      if (result.success) {
        onSuccess();
        resetForm();
        onClose();
      } else {
        console.error("Product save failed:", result.error);
        alert(
          `Failed to ${isEdit ? "update" : "create"} product: ${
            result.error?.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      console.error("Product save error:", err);
      alert(
        `An error occurred while ${
          isEdit ? "updating" : "creating"
        } the product.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`offcanvas offcanvas-end offcanvas-xl ${isOpen ? "show" : ""}`}
      data-bs-scroll="true"
      tabIndex={-1}
      id="productFormOffcanvas"
      aria-labelledby="productFormOffcanvasLabel"
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <div className="offcanvas-header bg-primary text-white">
        <h5 className="offcanvas-title" id="productFormOffcanvasLabel">
          <i
            className={`bi ${
              isEdit ? "bi-pencil-square" : "bi-plus-circle"
            } me-2`}
          ></i>
          {isEdit ? "Edit Product" : "Add New Product"}
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Formik
          initialValues={initialValues}
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Product Name <span className="text-danger">*</span>
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description <span className="text-danger">*</span>
                </label>
                <Field
                  as="textarea"
                  className="form-control"
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Enter product description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label fw-semibold">
                    Price (₹) <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label fw-semibold">
                    Category <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    placeholder="e.g., Electronics, Clothing"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger small mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="stock" className="form-label fw-semibold">
                  Stock Quantity <span className="text-danger">*</span>
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="stock"
                  name="stock"
                  placeholder="0"
                  min="0"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="d-flex gap-2 pt-3 border-top">
                <button
                  type="submit"
                  className="btn btn-primary flex-fill"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {isEdit ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <i
                        className={`bi ${
                          isEdit ? "bi-check-circle" : "bi-plus-circle"
                        } me-2`}
                      ></i>
                      {isEdit ? "Update Product" : "Create Product"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
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
