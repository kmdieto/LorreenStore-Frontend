import React from "react";
import "../styles/CategoriesPage.css";

export default function CategoriesPage() {
  const categories = [
    "Electronics",
    "Clothing - Men",
    "Clothing - Women",
    "Shoes",
    "Gadgets",
    "Cosmetics",
    "Perfumes",
    "Back to School",
    "Phones & Laptops",
    "Tools",
  ];

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <div className="categories-grid">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-card">
            <h3>{cat}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}