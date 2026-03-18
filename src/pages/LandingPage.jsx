import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useCart } from "../context/cartContext";
import { productAPI } from "../services/api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const { addToCart } = useCart();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending products from Django API
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getTrending();
        setTrendingProducts(response.data);
      } catch (err) {
        console.error("Error fetching trending products:", err);
        setError("Failed to load trending products");
        // Fallback data if API fails
        setTrendingProducts([
          {
            id: 1,
            name: "Wireless Headphones",
            price: 4500,
            image: "/images/Electronics.jpg",
            description: "Premium wireless headphones with noise cancellation",
          },
          {
            id: 2,
            name: "Designer Hoodie",
            price: 3200,
            image: "/images/clothes.jpg",
            description: "Comfortable and stylish designer hoodie",
          },
          {
            id: 3,
            name: "Leather Handbag",
            price: 6000,
            image: "/images/clothing.jpg",
            description: "Elegant Italian leather handbag",
          },
          {
            id: 4,
            name: "Smart Watch",
            price: 7800,
            image: "/images/Electronics.jpg",
            description: "Latest smart watch with fitness tracking",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productAPI.getFeatured();
        setFeaturedProducts(response.data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Handle add to cart
  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      console.log(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Slider configuration
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  // Featured categories
  const categories = [
    { name: "Electronics", image: "/images/Electronics.jpg" },
    { name: "Fashion", image: "/images/clothes.jpg" },
    { name: "Bags", image: "/images/clothing.jpg" },
    { name: "Accessories", image: "/images/Electronics.jpg" },
  ];

  // Hero images
  const heroImages = [
    { src: "/images/Electronics.jpg", alt: "electronics" },
    { src: "/images/clothes.jpg", alt: "fashion" },
    { src: "/images/clothing.jpg", alt: "accessories" },
  ];

  return (
    <div className="landing-page">
      {/* ============ HERO SECTION ============ */}
      <div className="hero">
        <Slider {...sliderSettings}>
          {heroImages.map((image, idx) => (
            <div key={idx} className="hero-slide">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Slider>

        <div className="hero-overlay">
          <h1>✦ Lorreenstore ✦</h1>
          <p>Curated Elegance • Electronics • Fashion • Accessories</p>
          <Link to="/products" className="shop-button">
            Shop Now
          </Link>
        </div>
      </div>

      {/* ============ FEATURED CATEGORIES ============ */}
      <section className="categories">
        <h2>Featured Categories</h2>

        <div className="category-grid">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="category-card"
            >
              <img src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ TRENDING PRODUCTS ============ */}
      <section className="trending">
        <h2>✦ Trending Products ✦</h2>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading trending products...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
            <p className="error-hint">
              Make sure your Django backend is running
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {trendingProducts.map((product) => {
              // Handle image URL
              let imageUrl = product.image || "/images/placeholder.jpg";

              return (
                <div key={product.id} className="product-card">
                  {/* Product Image */}
                  <Link to={`/products/${product.id}`}>
                    <div className="product-image-wrapper">
                      {product.image ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = "/images/placeholder.jpg";
                          }}
                        />
                      ) : (
                        <div className="placeholder-image">No Image</div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <Link to={`/products/${product.id}`} className="product-link">
                    <h3>{product.name}</h3>
                    {product.description && (
                      <p className="product-description">
                        {product.description.substring(0, 50)}...
                      </p>
                    )}
                  </Link>

                  <p className="price">
                    Ksh {product.price?.toLocaleString() || "0"}
                  </p>

                  {/* Stock Status */}
                  <div className="product-footer">
                    {product.stock > 0 ? (
                      <span className="stock-badge in-stock">In Stock</span>
                    ) : (
                      <span className="stock-badge out-of-stock">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="cta-section">
        <h2>Explore Our Complete Collection</h2>
        <p>
          Browse through hundreds of curated luxury items across fashion,
          electronics, and exclusive accessories.
        </p>
        <Link to="/products" className="cta-button">
          Browse All Products
        </Link>
      </section>
    </div>
  );
}