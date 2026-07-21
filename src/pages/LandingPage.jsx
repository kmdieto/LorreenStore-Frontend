import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const categoryCards = [
    { title: "Bags & Accessories", image: "/images/clothing.jpg", query: "accessories" },
    { title: "Women's Fashion", image: "/images/clothes.jpg", query: "fashion" },
    { title: "Footwear", image: "/images/clothes.jpg", query: "fashion" },
    { title: "Watches & Jewelry", image: "/images/Electronics.jpg", query: "electronics" },
    { title: "Lifestyle Essentials", image: "/images/Electronics.jpg", query: "electronics" },
  ];

  const features = [
    { icon: "🚚", title: "Free Delivery", note: "On orders over $50" },
    { icon: "🛡", title: "Secure Payment", note: "100% protected" },
    { icon: "↩", title: "Easy Returns", note: "30-day return" },
    { icon: "🎧", title: "24/7 Support", note: "We're here to help" },
  ];

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-left">
          <p className="hero-eyebrow">FIND YOUR STYLE</p>
          <h1>
            Shop. Style.
            <br />
            <span>Shine.</span>
          </h1>
          <p className="hero-copy">
            Trendy picks, exclusive deals and everything you love - all in one place.
          </p>
          <Link to="/products" className="primary-cta">
            SHOP NOW <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="hero-right">
          <div className="shape-ring"></div>
          <img src="/images/lorreen-hero-muse.png" alt="Featured style" className="hero-model" />
          <div className="new-arrivals-badge">
            <span>☆</span>
            <p>
              New Arrivals
              <br />
              Every Week
            </p>
          </div>
        </div>

        <div className="feature-strip">
          {features.map((feature) => (
            <article key={feature.title} className="feature-item">
              <span className="feature-icon" aria-hidden="true">{feature.icon}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="category-section">
        <div className="section-head">
          <div>
            <p className="section-eyebrow">SHOP BY CATEGORY</p>
            <h2>Explore Our Top Picks</h2>
          </div>
          <Link to="/products" className="view-all-btn">
            VIEW ALL <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="category-grid">
          {categoryCards.map((category) => (
            <Link
              key={category.title}
              to={`/products?category=${category.query}`}
              className="category-card"
            >
              <img src={category.image} alt={category.title} />
              <div className="category-overlay">
                <h3>{category.title}</h3>
                <span>Explore Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="offer-strip">
        <div className="offer-copy">
          <h3>Special Offer!</h3>
          <p>Get 20% off on your first order</p>
          <small>Use code: LORREEN20</small>
        </div>
        <Link to="/products" className="offer-cta">
          SHOP NOW <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
