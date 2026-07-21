import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const navItems = ["Home", "Shop", "Categories", "New Arrivals", "Deals", "About Us"];

  return (
    <header className="header">
      <div className="brand-wrap">
        <span className="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="img" focusable="false">
            <path d="M14 17h20l3 22H11l3-22z" />
            <path d="M18 18c0-5.2 2.9-8 6-8s6 2.8 6 8" fill="none" />
            <path d="M20 24v9h8" fill="none" />
          </svg>
        </span>
        <h1 className="logo">LORREENSTORE</h1>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => (
          <a
            key={item}
            href={item === "Home" ? "/" : item === "Shop" ? "/products" : "#"}
            className={item === "Home" ? "active" : ""}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="header-actions" aria-label="Quick actions">
        <button type="button" className="icon-btn" aria-label="Search">⌕</button>
        <button type="button" className="icon-btn" aria-label="Account">◯</button>
        <button type="button" className="icon-btn" aria-label="Wishlist">♡</button>
        <Link to="/products" className="icon-btn cart-btn" aria-label="Cart">
          🛒
          <span className="cart-badge">2</span>
        </Link>
      </div>
    </header>
  );
}