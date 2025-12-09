import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/cartContext";
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/products/");
        setProducts(res.data);
      } catch {
        setError("Failed to load products. Please check your API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => {
          // ✅ Get first image URL if available
          const firstImage =
            product.images && product.images.length > 0
              ? product.images[0].image_url
              : "https://via.placeholder.com/200x180?text=No+Image";

          return (
            <div className="product-card" key={product.id}>
              <img
                src={firstImage}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Ksh {product.price}</p>
              <button className="product-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
