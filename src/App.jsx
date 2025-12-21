import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </CartProvider>
    </ThemeProvider>
    
  );

}
console.log("API URL:", import.meta.env.VITE_API_URL);
