import React from "react";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";

const categories = [
  "📱 Electronics",
  "👗 Clothing",
  "💄 Beauty",
  "👟 Footwear",
  "👜 Accessories",
  "🎧 Gadgets"
];

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* HERO */}
      <section className="hero">
        <h1 className="landing-title">Welcome to Lorreen Store</h1>
        <p className="landing-subtitle">
          Your one-stop shop for electronics, fashion & more
        </p>
        <Link to="/products">
          <button className="landing-btn">Shop Now</button>
        </Link>
      </section>

      {/* SCROLLING CATEGORY BANNER */}
      <section className="category-scroll">
        <div className="scroll-track">
          {categories.map((cat, index) => (
            <span key={index}>{cat}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;