import React from "react";
import type { ProductFilters } from "../types/api";

interface ProductFilterProps {
  onFilter?: (filters: ProductFilters) => void;
  filterValues?: ProductFilters;
  onFilterChange?: (filters: ProductFilters) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  onFilter,
  filterValues,
  onFilterChange,
}) => {
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const filters: ProductFilters = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      minPrice: formData.get("minPrice")
        ? parseFloat(formData.get("minPrice") as string)
        : undefined,
      maxPrice: formData.get("maxPrice")
        ? parseFloat(formData.get("maxPrice") as string)
        : undefined,
      minQuantity: formData.get("minQuantity")
        ? parseInt(formData.get("minQuantity") as string)
        : undefined,
      maxQuantity: formData.get("maxQuantity")
        ? parseInt(formData.get("maxQuantity") as string)
        : undefined,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    };

    if (onFilter) {
      onFilter(filters);
    }
  };

  const handleReset = () => {
    const form = document.querySelector(
      "#productFilterOffcanvas form"
    ) as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

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
        <form
          onSubmit={handleFilterSubmit}
          className="d-flex flex-column gap-3"
        >
          <div className="form-group">
            <label htmlFor="name" className="form-label fw-semibold">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Search by name or description"
              value={filterValues?.name || ""}
              onChange={(e) =>
                onFilterChange?.({ ...filterValues!, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label fw-semibold">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              placeholder="Category"
              value={filterValues?.category || ""}
              onChange={(e) =>
                onFilterChange?.({ ...filterValues!, category: e.target.value })
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
                  onFilterChange?.({
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
                  onFilterChange?.({
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
                  onFilterChange?.({
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
                  onFilterChange?.({
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
                  onFilterChange?.({
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
                  onFilterChange?.({
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
  );
};

export default ProductFilter;
