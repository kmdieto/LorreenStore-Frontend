import React from "react";
import Slider from "react-slick";
import "./LandingPage.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import electronics from "../assets/Electronics.jpg";
import clothes from "../assets/clothes.jpg";
import clothing from "../assets/clothing.jpg";

export default function LandingPage() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    fade: true, // 🔥 smooth fade instead of slide
  };

  return (
    <>
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="slide">
            <img src={electronics} alt="Electronics" />
          </div>

          <div className="slide">
            <img src={clothes} alt="Clothes" />
          </div>

          <div className="slide">
            <img src={clothing} alt="Clothing" />
          </div>
        </Slider>

        {/* 🔥 Gradient Overlay */}
        <div className="hero-overlay">
          <h1 className="hero-title">LOrreen Store</h1>
          <p className="hero-subtitle">
            Shop Electronics, Fashion & More
          </p>
        </div>
      </div>

      <div className="landing">
        <h2>Featured Categories</h2>
        <p>Discover quality products curated just for you.</p>
      </div>
    </>
  );
}