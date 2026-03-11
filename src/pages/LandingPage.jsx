import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/LandingPage.css";

export default function LandingPage() {

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  };

  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <div className="hero">
        <Slider {...settings}>
          <div className="hero-slide">
            <img src="/images/Electronics.jpg" alt="electronics"/>
          </div>

          <div className="hero-slide">
            <img src="/images/clothes.jpg" alt="fashion"/>
          </div>

          <div className="hero-slide">
            <img src="/images/clothing.jpg" alt="fashion"/>
          </div>
        </Slider>

        <div className="hero-overlay">
          <h1>Lorreen Store</h1>
          <p>Electronics • Fashion • Accessories</p>
          <button>Shop Now</button>
        </div>
      </div>


      {/* FEATURED CATEGORIES */}
      <section className="categories">

        <h2>Featured Categories</h2>

        <div className="category-grid">

          <div className="category-card">
            <img src="/images/Electronics.jpg"/>
            <span>Electronics</span>
          </div>

          <div className="category-card">
            <img src="/images/clothes.jpg"/>
            <span>Fashion</span>
          </div>

          <div className="category-card">
            <img src="/images/clothing.jpg"/>
            <span>Bags</span>
          </div>

          <div className="category-card">
            <img src="/images/Electronics.jpg"/>
            <span>Accessories</span>
          </div>

        </div>
      </section>


      {/* TRENDING PRODUCTS */}
      <section className="trending">

        <h2>Trending Products</h2>

        <div className="product-grid">

          <div className="product-card">
            <img src="/images/Electronics.jpg"/>
            <h3>Wireless Headphones</h3>
            <p>Ksh 4,500</p>
          </div>

          <div className="product-card">
            <img src="/images/clothes.jpg"/>
            <h3>Designer Hoodie</h3>
            <p>Ksh 3,200</p>
          </div>

          <div className="product-card">
            <img src="/images/clothing.jpg"/>
            <h3>Leather Handbag</h3>
            <p>Ksh 6,000</p>
          </div>

          <div className="product-card">
            <img src="/images/Electronics.jpg"/>
            <h3>Smart Watch</h3>
            <p>Ksh 7,800</p>
          </div>

        </div>
      </section>

    </div>
  );
}