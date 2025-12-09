import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/cartContext";
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
