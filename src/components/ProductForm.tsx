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
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
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
