import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContext";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams(); // get product ID from route
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(res.data);

        // Set first image as main image
        const firstImage =
          res.data.images && res.data.images.length > 0
            ? res.data.images[0].image_url
            : "https://via.placeholder.com/400x400?text=No+Image";
        setMainImage(firstImage);
      } catch {
        setError("Failed to load product. Please check your API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      {/* Images Section */}
      <div className="product-images">
        <img src={mainImage} alt={product.name} />

        {/* Thumbnails */}
        {product.images && product.images.length > 1 && (
          <div className="product-thumbnails">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img.image_url}
                alt={`${product.name} ${idx + 1}`}
                className={mainImage === img.image_url ? "active" : ""}
                onClick={() => setMainImage(img.image_url)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="price">Ksh {product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}