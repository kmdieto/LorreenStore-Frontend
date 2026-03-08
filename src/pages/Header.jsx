import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Make sure this exists

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">Lorreen Store</h1>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}