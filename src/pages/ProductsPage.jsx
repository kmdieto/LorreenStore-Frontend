import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { productAPI } from "../services/api";
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;

        if (selectedCategory === "all") {
          response = await productAPI.getAll();
        } else {
          response = await productAPI.getByCategory(selectedCategory);
        }

        setProducts(response.data);
        setFilteredProducts(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please check your API connection.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Handle add to cart with feedback
  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      // Optional: Show toast notification
      console.log(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Get unique categories from products
  const categories = [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "accessories", label: "Accessories" },
  ];

  if (error && !loading) {
    return (
      <div className="products-container">
        <div className="error-message">
          <p>{error}</p>
          <p>Make sure your Django backend is running on http://127.0.0.1:8000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`filter-btn ${selectedCategory === cat.value ? "active" : ""}`}
            onClick={() => handleCategoryFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            // Handle product image - support multiple formats
            let imageUrl = "https://via.placeholder.com/200x180?text=No+Image";

            if (product.image) {
              imageUrl = product.image;
            } else if (product.images && product.images.length > 0) {
              imageUrl = product.images[0].image_url || product.images[0];
            }

            return (
              <div className="product-card" key={product.id}>
                {/* Product Image */}
                <Link to={`/products/${product.id}`} className="product-image-link">
                  <div className="product-image-container">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x180?text=No+Image";
                      }}
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="product-info">
                  <Link to={`/products/${product.id}`} className="product-name-link">
                    <h3>{product.name}</h3>
                  </Link>

                  <p className="product-description">
                    {product.description?.substring(0, 60)}...
                  </p>

                  <p className="product-price">
                    Ksh {product.price?.toLocaleString() || "0"}
                  </p>

                  {/* Stock Status */}
                  {product.stock > 0 ? (
                    <span className="stock-available">In Stock</span>
                  ) : (
                    <span className="stock-unavailable">Out of Stock</span>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    className="product-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;