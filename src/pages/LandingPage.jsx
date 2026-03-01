import React from "react";
import Slider from "react-slick";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Landing page CSS
import "../styles/LandingPage.css";

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
    fade: true, // smooth fade effect
  };

  return (
    <>
      {/* Full-width carousel */}
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="slide">
            <img src="/images/Electronics.jpg" alt="Electronics" />
          </div>
          <div className="slide">
            <img src="/images/clothes.jpg" alt="Clothes" />
          </div>
          <div className="slide">
            <img src="/images/clothing.jpg" alt="Clothing" />
          </div>
        </Slider>

        {/* Gradient overlay with hero text */}
        <div className="hero-overlay">
          <h1 className="hero-title">LOrreen Store</h1>
          <p className="hero-subtitle">
            Shop Electronics, Fashion & More
          </p>
        </div>
      </div>

      {/* Centered content below carousel */}
      <div className="landing">
        <h2>Featured Categories</h2>
        <p>Discover quality products curated just for you.</p>
      </div>
    </>
  );
}