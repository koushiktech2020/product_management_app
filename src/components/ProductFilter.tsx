import React, { useState, useEffect, useCallback } from "react";
import type { Product, ProductFilters } from "../types/api";
import { productsAPI } from "../services/api";
import { PRODUCTS_ENDPOINTS } from "../services/endpoints/products";

interface ProductFilterProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  resetTrigger?: number; // When this changes, trigger reset
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  setProducts,
  resetTrigger,
}) => {
  const [filterValues, setFilterValues] = useState<ProductFilters>({
    name: "",
    minPrice: 0,
    maxPrice: 0,
    minQuantity: 0,
    maxQuantity: 0,
    startDate: "",
    endDate: "",
  });

  // Utility function to filter out empty/null/undefined values
  const cleanFilters = useCallback(
    (filters: ProductFilters): Partial<ProductFilters> => {
      const cleaned: Partial<ProductFilters> = {};

      Object.entries(filters).forEach(([key, value]) => {
        // Only include values that are not empty strings, null, or undefined
        if (value !== "" && value !== null && value !== undefined) {
          cleaned[key as keyof ProductFilters] = value;
        }
      });

      return cleaned;
    },
    []
  );

  const fetchProducts = useCallback(
    async (filters?: ProductFilters) => {
      try {
        // Clean filters to remove empty/null/undefined values
        const cleanedFilters = filters ? cleanFilters(filters) : undefined;

        const result = await productsAPI.getAll(
          PRODUCTS_ENDPOINTS.BASE,
          cleanedFilters
        );

        if (result.success && result.data) {
          const { data } = result.data;
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    },
    [cleanFilters, setProducts]
  );

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: ProductFilters = {
      name: filterValues.name || undefined,
      minPrice: filterValues.minPrice || undefined,
      maxPrice: filterValues.maxPrice || undefined,
      minQuantity: filterValues.minQuantity || undefined,
      maxQuantity: filterValues.maxQuantity || undefined,
      startDate: filterValues.startDate || undefined,
      endDate: filterValues.endDate || undefined,
    };

    fetchProducts(filters);
  };

  const handleReset = useCallback(() => {
    const form = document.querySelector(
      "#productFilterOffcanvas form"
    ) as HTMLFormElement;
    if (form) {
      form.reset();
    }
    setFilterValues({
      name: "",
      minPrice: 0,
      maxPrice: 0,
      minQuantity: 0,
      maxQuantity: 0,
      startDate: "",
      endDate: "",
    });
    fetchProducts(undefined);
  }, [fetchProducts]);

  // Watch for reset trigger from parent
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      handleReset();
    }
  }, [resetTrigger, handleReset]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="productFilterOffcanvas"
      aria-labelledby="productFilterOffcanvasLabel"
      data-bs-scroll="true"
    >
      <div className="offcanvas-header bg-primary text-white shadow-sm">
        <h5
          className="offcanvas-title fw-bold mb-0"
          id="productFilterOffcanvasLabel"
        >
          Filter Products
        </h5>
        <button
          type="button"
          className="btn-close bg-white rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={handleReset}
        ></button>
      </div>
      <div className="offcanvas-body p-4">
        {/* Filter Form */}
        <div className="p-3 p-md-4 border border-gray-300 rounded-10 shadow-sm rounded-3">
          <form
            onSubmit={handleFilterSubmit}
            className="d-flex flex-column h-100 gap-3"
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label fw-semibold">
                Search By Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Search by name or description"
                value={filterValues?.name || ""}
                onChange={(e) =>
                  setFilterValues({ ...filterValues!, name: e.target.value })
                }
              />
            </div>
            <div className="row g-2">
              <div className="col">
                <label htmlFor="minPrice" className="form-label fw-semibold">
                  Min Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="minPrice"
                  name="minPrice"
                  placeholder="0"
                  min="0"
                  value={filterValues?.minPrice || ""}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues!,
                      minPrice: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                />
              </div>
              <div className="col">
                <label htmlFor="maxPrice" className="form-label fw-semibold">
                  Max Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maxPrice"
                  name="maxPrice"
                  placeholder="100"
                  min="0"
                  value={filterValues?.maxPrice || ""}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues!,
                      maxPrice: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col">
                <label htmlFor="minQuantity" className="form-label fw-semibold">
                  Min Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="minQuantity"
                  name="minQuantity"
                  placeholder="1"
                  min="1"
                  value={filterValues?.minQuantity || ""}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues!,
                      minQuantity: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                />
              </div>
              <div className="col">
                <label htmlFor="maxQuantity" className="form-label fw-semibold">
                  Max Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maxQuantity"
                  name="maxQuantity"
                  placeholder="10"
                  min="1"
                  value={filterValues?.maxQuantity || ""}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues!,
                      maxQuantity: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label htmlFor="startDate" className="form-label fw-semibold">
                  Created From
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={filterValues?.startDate || ""}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues!,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col">
                <label htmlFor="endDate" className="form-label fw-semibold">
                  Created To
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={filterValues?.endDate || ""}
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues!,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 fw-semibold w-100"
              >
                Apply Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
