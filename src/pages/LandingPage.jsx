import React from "react";
import Slider from "react-slick";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";

const fallbackImages = [
  {
    id: "s1",
    primary: "/images/Electronics.jpg",
    secondary: "/images/clothes.jpg",
    title: "Electronics & Gadgets",
  },
  {
    id: "s2",
    primary: "/images/clothing.jpg",
    secondary: "/images/clothes.jpg",
    title: "Fashion & Accessories",
  },
  {
    id: "s3",
    primary: "/images/clothes.jpg",
    secondary: "/images/Electronics.jpg",
    title: "Home, Tools & Essentials",
  },
];

const LandingPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4 seconds per frame
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="landing-wrapper">
      <div className="hero-carousel">
        <Slider {...settings}>
          {fallbackImages.map((img) => (
            <div key={img.id} className="slide">
              <div
                className="blended-background"
                style={{
                  backgroundImage: `
                    url(${img.primary}),
                    url(${img.secondary})
                  `,
                }}
              >
                <div className="overlay"></div>

                <div className="hero-content">
                  <h1>{img.title}</h1>
                  <Link to="/products">
                    <button>Shop Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LandingPage;