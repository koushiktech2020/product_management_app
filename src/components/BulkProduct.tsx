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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleBulkSubmit = async (
    values: BulkProductValues,
    helpers: { resetForm: () => void }
  ) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // Add default category for each product
      const products: ProductData[] = values.products.map(
        (p: Omit<ProductData, "category">) => ({ ...p, category: "General" })
      );
      const result = await productsAPI.bulk(
        PRODUCTS_ENDPOINTS.BASE + "/bulk",
        products
      );
      if (result.success) {
        setSuccess(true);
        helpers.resetForm();
      } else {
        setError("Bulk add failed. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <Formik
            initialValues={{ products: [initialProduct] }}
            validationSchema={bulkProductValidationSchema}
            onSubmit={handleBulkSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <div className="modal-body p-4">
                  <FieldArray name="products">
                    {({ push, remove }) => (
                      <div className="d-flex flex-column gap-4">
                        {values.products.map((_, idx) => (
                          <div key={idx} className="card shadow-sm border-0">
                            <div className="card-body">
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <label className="form-label fw-semibold">
                                    Product Name *
                                  </label>
                                  <Field
                                    type="text"
                                    name={`products[${idx}].name`}
                                    className="form-control"
                                    placeholder="Enter product name"
                                  />
                                  <ErrorMessage
                                    name={`products[${idx}].name`}
                                    component="div"
                                    className="text-danger small"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label fw-semibold">
                                    Description *
                                  </label>
                                  <Field
                                    as="textarea"
                                    name={`products[${idx}].description`}
                                    className="form-control"
                                    placeholder="Enter product description"
                                    rows={2}
                                  />
                                  <ErrorMessage
                                    name={`products[${idx}].description`}
                                    component="div"
                                    className="text-danger small"
                                  />
                                </div>
                              </div>
                              <div className="row g-3 mt-2">
                                <div className="col-md-6">
                                  <label className="form-label fw-semibold">
                                    Price (₹) *
                                  </label>
                                  <Field
                                    type="number"
                                    name={`products[${idx}].price`}
                                    className="form-control"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                  />
                                  <ErrorMessage
                                    name={`products[${idx}].price`}
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
                                    name={`products[${idx}].quantity`}
                                    className="form-control"
                                    placeholder="1"
                                    min="1"
                                  />
                                  <ErrorMessage
                                    name={`products[${idx}].quantity`}
                                    component="div"
                                    className="text-danger small"
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-end mt-3">
                                {values.products.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm rounded-pill"
                                    onClick={() => remove(idx)}
                                  >
                                    <i
                                      className="material-icons"
                                      style={{ fontSize: "18px" }}
                                    >
                                      delete
                                    </i>{" "}
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-success rounded-pill fw-semibold align-self-start"
                          onClick={() => push(initialProduct)}
                        >
                          <i
                            className="material-icons"
                            style={{ fontSize: "20px" }}
                          >
                            add_circle
                          </i>{" "}
                          Add Another Product
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  {error && (
                    <div className="alert alert-danger mt-3">{error}</div>
                  )}
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
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
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
                          className="material-icons"
                          style={{ fontSize: "20px" }}
                        >
                          save
                        </i>{" "}
                        Add Products
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BulkProduct;
