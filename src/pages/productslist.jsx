import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cartContext";
import "../styles/products.css";

const API_URL = "http://127.0.0.1:8000/api/products/"; // adjust if needed

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image_url || "placeholder.jpg"} alt={p.name} />
            <h3>{p.name}</h3>
            <p>Ksh {p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
