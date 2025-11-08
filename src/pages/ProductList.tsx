import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch products
    const fetchProducts = async () => {
      try {
        // Replace with actual API call
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Laptop",
            price: 999.99,
            category: "Electronics",
            description: "High-performance laptop",
          },
          {
            id: 2,
            name: "Smartphone",
            price: 699.99,
            category: "Electronics",
            description: "Latest smartphone model",
          },
          {
            id: 3,
            name: "Coffee Maker",
            price: 79.99,
            category: "Appliances",
            description: "Automatic coffee maker",
          },
          {
            id: 4,
            name: "Running Shoes",
            price: 129.99,
            category: "Sports",
            description: "Comfortable running shoes",
          },
          {
            id: 5,
            name: "Book",
            price: 19.99,
            category: "Books",
            description: "Bestselling novel",
          },
        ];
        setProducts(mockProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Product List</h1>
        <button className="btn btn-primary">Add New Product</button>
      </div>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.category}</p>
                <p className="card-text flex-grow-1">{product.description}</p>
                <div className="mt-auto">
                  <h6 className="text-success">${product.price.toFixed(2)}</h6>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm">
                      Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
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
        <div className="text-center mt-5">
          <p className="text-muted">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
