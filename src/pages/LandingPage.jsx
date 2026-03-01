import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";

// Static fallback images
const fallbackImages = [
  { id: "s1", url: "/images/electronics.jpg", title: "Electronics" },
  { id: "s2", url: "/images/clothing.jpg", title: "Clothing" },
  { id: "s3", url: "/images/shoes.jpg", title: "Shoes" },
];

const LandingPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://your-backend.com/api/carousel")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => {
        console.error("Error fetching carousel:", err);
        // fallback to static images if backend fails
        setImages(fallbackImages);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Lorreen Store</h1>

      <Slider {...settings} className="landing-slider">
        {images.map((img) => (
          <div key={img.id} className="carousel-slide">
            <img src={img.url} alt={img.title} className="carousel-image" />
            <div className="carousel-caption">{img.title}</div>
          </div>
        ))}
      </Slider>

      <Link to="/products">
        <button className="landing-btn">Shop Now</button>
      </Link>
    </div>
  );
};

export default LandingPage;