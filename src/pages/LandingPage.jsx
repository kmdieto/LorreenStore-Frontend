import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  // Fetch products
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 4))) // show 4 products
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <>
      {/* HERO CAROUSEL */}
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="slide">
            <img src="/images/Electronics.jpg" alt="Electronics" />
          </div>
          <div className="slide">
            <img src="/images/clothes.jpg" alt="Clothes" />
          </div>
          <div className="slide">
            <img src="/images/clothing.jpg" alt="Fashion" />
          </div>
        </Slider>

        <div className="hero-overlay">
          <h1 className="hero-title">Lorreen Store</h1>
          <p className="hero-subtitle">
            Shop Electronics, Fashion & More
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* FEATURED CATEGORIES */}
      <section className="categories">
        <h2>Featured Categories</h2>

        <div className="category-grid">
          <div className="category-card" onClick={() => navigate("/products")}>
            <img src="/images/Electronics.jpg" alt="electronics" />
            <h3>Electronics</h3>
          </div>

          <div className="category-card" onClick={() => navigate("/products")}>
            <img src="/images/clothing.jpg" alt="fashion" />
            <h3>Fashion</h3>
          </div>

          <div className="category-card" onClick={() => navigate("/products")}>
            <img src="/images/clothes.jpg" alt="accessories" />
            <h3>Accessories</h3>
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="trending">
        <h2>Trending Products</h2>

        <div className="trending-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p className="price">
                Ksh {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}