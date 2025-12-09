import React from "react";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Lorreen Store</h1>
      <Link to="/products">
        <button className="landing-btn">Shop Now</button>
      </Link>
    </div>
  );
};

export default LandingPage;
