import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SpeedIcon from "@mui/icons-material/Speed";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const slides = [
    {
      title: "Drive Your Dream",
      location: "Kochi • Kerala",
      subtitle: "Premium Selection",
      tagline: "CarAuras",
      description: "500+ Certified Cars Ready for Test Drive",
      bgImage:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000",
      overlay:
        "linear-gradient(90deg, #0a0f1a 0%, rgba(10,15,26,0.7) 50%, transparent 100%)",
      accentColor: "#ff6b4a",
      image: "/images/wheeelzloop cars1.webp",
      badge: "Hot Deal",
      badgeIcon: <FlashOnIcon />,
      price: "From ₹3.5L",
      offer: "0% EMI Available",
    },
    {
      title: "Sell in 24 Hours",
      location: "Anywhere in Kerala",
      subtitle: "Instant Cash Offer",
      tagline: "CarAuras",
      description: "Free Inspection • Best Price Guarantee",
      bgImage:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2000",
      overlay:
        "linear-gradient(90deg, #1a0f0a 0%, rgba(26,15,10,0.7) 50%, transparent 100%)",
      accentColor: "#4affb5",
      image: "/images/wheeelzloop blue-sports-car-isolated-white-vector.webp",
      badge: "Fast Sell",
      badgeIcon: <SpeedIcon />,
      price: "Get Quote",
      offer: "Same Day Payment",
    },
    {
      title: "Trusted Quality",
      location: "Since 2020",
      subtitle: "Certified Pre-Owned",
      tagline: "CarAuras",
      description: "150-Point Check • 1 Year Warranty",
      bgImage:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000",
      overlay:
        "linear-gradient(90deg, #0f1a0f 0%, rgba(15,26,15,0.7) 50%, transparent 100%)",
      accentColor: "#ffd966",
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800",
      badge: "Premium",
      badgeIcon: <EmojiEventsIcon />,
      price: "EMI ₹5,999/mo",
      offer: "Free Insurance",
    },
  ];

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isHovering]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="carousel-luxury">
      <div className="carousel-luxury-container">
        <div
          className="slides-luxury"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="slide-luxury"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
              }}
            >
              <div
                className="slide-overlay"
                style={{ background: slide.overlay }}
              ></div>

              <div className="slide-luxury-content">
                <div className="content-left">
                  <div
                    className="badge-luxury"
                    style={{
                      background: slide.accentColor + "20",
                      borderColor: slide.accentColor,
                    }}
                  >
                    <span className="badge-icon-luxury">{slide.badgeIcon}</span>
                    <span style={{ color: "#fff" }}>{slide.badge}</span>
                  </div>

                  <h1 className="title-luxury">
                    {slide.title}
                    <span className="location-luxury">
                      <LocationOnIcon className="location-icon-luxury" />
                      {slide.location}
                    </span>
                  </h1>

                  <div className="subtitle-section">
                    <span className="subtitle-luxury">{slide.subtitle}</span>
                    <div
                      className="glowing-line"
                      style={{ background: slide.accentColor }}
                    ></div>
                  </div>

                  <p className="description-luxury">{slide.description}</p>

                  <div className="price-section">
                    <div
                      className="price-tag"
                      style={{ borderColor: slide.accentColor }}
                    >
                      <span className="price-value">{slide.price}</span>
                    </div>
                    <div
                      className="offer-badge"
                      style={{
                        background: slide.accentColor + "20",
                        color: slide.accentColor,
                      }}
                    >
                      {slide.offer}
                    </div>
                  </div>

                  <button
                    className="cta-luxury"
                    style={{
                      borderColor: slide.accentColor,
                      color: slide.accentColor,
                    }}
                  >
                    <span>View Details</span>
                    <ArrowForwardIcon className="cta-icon-luxury" />
                  </button>

                  <div className="tagline-luxury">
                    <span
                      className="dot-luxury"
                      style={{ background: slide.accentColor }}
                    ></span>
                    {slide.tagline}
                    <span
                      className="dot-luxury"
                      style={{ background: slide.accentColor }}
                    ></span>
                  </div>
                </div>

                <div className="content-right">
                  <div
                    className="image-glow"
                    style={{ background: slide.accentColor }}
                  ></div>
                  <img
                    src={slide.image}
                    className="car-image-luxury"
                    alt="car"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800";
                    }}
                  />

                  <div
                    className="floating-stats stat-1"
                    style={{
                      background: slide.accentColor + "15",
                      borderColor: slide.accentColor,
                    }}
                  >
                    <VerifiedIcon
                      style={{ fontSize: "12px", color: slide.accentColor }}
                    />
                    <span>Verified</span>
                  </div>
                  <div
                    className="floating-stats stat-2"
                    style={{
                      background: slide.accentColor + "15",
                      borderColor: slide.accentColor,
                    }}
                  >
                    <span>4.9 Rating</span>
                  </div>
                  <div
                    className="floating-stats stat-3"
                    style={{
                      background: slide.accentColor + "15",
                      borderColor: slide.accentColor,
                    }}
                  >
                    <span> 500+ Cars</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-luxury nav-prev-luxury" onClick={prevSlide}>
          <ChevronLeftIcon />
        </button>
        <button className="nav-luxury nav-next-luxury" onClick={nextSlide}>
          <ChevronRightIcon />
        </button>

        <div className="dots-luxury">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot-luxury ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            >
              <span className="dot-pulse"></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
