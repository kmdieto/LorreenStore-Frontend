import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header ${darkMode ? "dark" : ""}`}>
      <h1 className="logo">Lorreen Store</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
