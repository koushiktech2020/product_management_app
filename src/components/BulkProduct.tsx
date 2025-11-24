import React, { useState } from "react";
import type { ProductData } from "../types/api";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import { productsAPI } from "../services/api";
import { PRODUCTS_ENDPOINTS } from "../services/endpoints/products";

const bulkProductValidationSchema = yup.object().shape({
  products: yup
    .array()
    .of(
      yup.object().shape({
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
      })
    )
    .min(1, "Add at least one product"),
});

interface BulkProductValues {
  products: Array<Omit<ProductData, "category">>;
}

const initialProduct = {
  name: "",
  description: "",
  price: 0,
  quantity: 1,
};

const BulkProduct = () => {
  const [products, setProducts] = useState<
    Array<Omit<ProductData, "category">>
  >([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formValues, setFormValues] =
    useState<Omit<ProductData, "category">>(initialProduct);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = yup.object().shape({
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

  const handleAddOrUpdate = (
    values: Omit<ProductData, "category">,
    { resetForm }: any
  ) => {
    if (editingIndex !== null) {
      // Update existing product
      const updated = [...products];
      updated[editingIndex] = values;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      // Add new product
      setProducts([...products, values]);
    }
    resetForm();
    setFormValues(initialProduct);
    setSuccess(false);
    setError("");
  };

  const handleEdit = (idx: number) => {
    setFormValues(products[idx]);
    setEditingIndex(idx);
    setSuccess(false);
    setError("");
  };

  const handleDelete = (idx: number) => {
    setProducts(products.filter((_, i) => i !== idx));
    setSuccess(false);
    setError("");
    // If editing the deleted row, reset form
    if (editingIndex === idx) {
      setEditingIndex(null);
      setFormValues(initialProduct);
    }
  };

  const handleBulkSubmit = async () => {
    if (products.length === 0) {
      setError("Add at least one product before submitting.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const payload: ProductData[] = products.map((p) => ({
        ...p,
        category: "General",
      }));
      const result = await productsAPI.bulk(
        PRODUCTS_ENDPOINTS.BASE + "/bulk",
        payload
      );
      if (result.success) {
        setSuccess(true);
        setProducts([]);
        setFormValues(initialProduct);
        setEditingIndex(null);
      } else {
        setError("Bulk add failed. Please try again.");
      }
    } catch (e) {
      setError("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="bulkProductModal"
      tabIndex={-1}
      aria-labelledby="bulkProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white shadow-sm">
            <h1 className="modal-title fs-5 fw-bold" id="bulkProductModalLabel">
              Bulk Product Add
            </h1>
            <button
              type="button"
              className="btn-close bg-white rounded-circle"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="card mb-4 shadow-sm border-0">
              <div className="card-body">
                <Formik
                  initialValues={formValues}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={handleAddOrUpdate}
                >
                  {({ isSubmitting, resetForm }) => (
                    <Form>
                      <div className="row g-3">
                        <div className="col-12 mb-2">
                          <label className="form-label fw-semibold">
                            Product Name *
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className="form-control border border-secondary-subtle shadow-none"
                            placeholder="Enter product name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                        <div className="col-12 mb-2">
                          <label className="form-label fw-semibold">
                            Description *
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            className="form-control border border-secondary-subtle shadow-none"
                            placeholder="Enter product description"
                            rows={2}
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Price (₹) *
                          </label>
                          <Field
                            type="number"
                            name="price"
                            className="form-control border border-secondary-subtle shadow-none"
                            placeholder="0"
                            min="0"
                            step="0.01"
                          />
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Quantity *
                          </label>
                          <Field
                            type="number"
                            name="quantity"
                            className="form-control border border-secondary-subtle shadow-none"
                            placeholder="1"
                            min="1"
                          />
                          <ErrorMessage
                            name="quantity"
                            component="div"
                            className="text-danger small"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <button
                          type="submit"
                          className="btn btn-success rounded-pill fw-semibold d-flex align-items-center"
                          disabled={isSubmitting || loading}
                        >
                          <i
                            className="material-icons me-1"
                            style={{ fontSize: "20px" }}
                          >
                            add_circle
                          </i>
                          {editingIndex !== null
                            ? "Update Product"
                            : "Add Product"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* Table/List of products */}
            {products.length > 0 && (
              <div className="table-responsive mb-4">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price (₹)</th>
                      <th>Quantity</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, idx) => (
                      <tr key={idx}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center"
                              onClick={() => handleEdit(idx)}
                            >
                              <i
                                className="material-icons me-1"
                                style={{ fontSize: "18px" }}
                              >
                                edit
                              </i>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm rounded-pill d-flex align-items-center"
                              onClick={() => handleDelete(idx)}
                            >
                              <i
                                className="material-icons me-1"
                                style={{ fontSize: "18px" }}
                              >
                                delete
                              </i>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && (
              <div className="alert alert-success mt-3">
                Products added successfully!
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center"
              disabled={loading}
              onClick={handleBulkSubmit}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />{" "}
                  Adding...
                </>
              ) : (
                <>
                  <i
                    className="material-icons me-1"
                    style={{ fontSize: "20px" }}
                  >
                    save
                  </i>
                  Add Products
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BulkProduct;
