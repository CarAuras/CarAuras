import React from "react";
import "./CarCategoriesSection.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SpeedIcon from "@mui/icons-material/Speed";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";

const categories = [
  {
    id: 1,
    title: "Sedan",
    count: "124 Cars",
    img: "/images/sedan-removebg-preview.png",
    description: "Comfort meets elegance",
    trending: true,
    color: "#3b82f6",
    lightColor: "#eff6ff",
    icon: <StarIcon />,
  },
  {
    id: 2,
    title: "SUV",
    count: "85 Cars",
    img: "/images/suv.png",
    description: "Power & adventure ready",
    trending: false,
    color: "#10b981",
    lightColor: "#ecfdf5",
    icon: <SpeedIcon />,
  },
  {
    id: 3,
    title: "Hatchback",
    count: "62 Cars",
    img: "/images/hatchback.png",
    description: "Agile city companion",
    trending: true,
    color: "#f59e0b",
    lightColor: "#fffbeb",
    icon: <EmojiEventsIcon />,
  },
  {
    id: 4,
    title: "Sports",
    count: "48 Cars",
    img: "/images/sports-removebg-preview.png",
    description: "Unleash the thrill",
    trending: false,
    color: "#ef4444",
    lightColor: "#fef2f2",
    icon: <TrendingUpIcon />,
  },
];

function CarCategoriesSection() {
  return (
    <section className="categories-vibrant">
      <div className="vibrant-bg-elements">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
        <div className="bg-blob blob-4"></div>
      </div>

      <div className="section-header-vibrant">
        <div className="header-chip">
          <span className="chip-pulse"></span>
          <span>Explore Categories</span>
        </div>
        <h2 className="section-title-vibrant">
          Find Your Perfect
          <span className="title-bracket"> Ride</span>
        </h2>
        <div className="title-underline-vibrant"></div>
        <p className="section-subtitle-vibrant">
          Discover our handpicked collection of premium vehicles, curated for
          every lifestyle and budget
        </p>
      </div>

      <div className="categories-vibrant-container">
        {categories.map((cat, index) => (
          <div
            className="category-vibrant-card"
            key={cat.id}
            style={{
              animationDelay: `${index * 0.1}s`,
              "--card-color": cat.color,
              "--card-light": cat.lightColor,
            }}
          >
            <div className="card-strip" style={{ background: cat.color }}></div>

            <div className="card-content-vibrant">
              <div
                className="icon-badge"
                style={{ background: cat.lightColor, color: cat.color }}
              >
                {cat.icon}
              </div>

              {cat.trending && (
                <div className="trending-vibrant">
                  <LocalOfferIcon />
                  <span>Hot Deal</span>
                </div>
              )}

              <div className="image-container-vibrant">
                <div
                  className="image-glow-ring"
                  style={{ background: cat.color }}
                ></div>
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="category-vibrant-image"
                />
              </div>

              <div className="info-vibrant">
                <h3 className="category-vibrant-title">{cat.title}</h3>
                <p className="category-vibrant-desc">{cat.description}</p>
                <div className="stats-vibrant">
                  <div className="count-vibrant">
                    <span className="count-number-vibrant">
                      {cat.count.split(" ")[0]}
                    </span>
                    <span className="count-label-vibrant">
                      {cat.count.split(" ")[1]}
                    </span>
                  </div>
                  <div className="divider-dot"></div>
                  <div className="price-badge" style={{ color: cat.color }}>
                    Starting at
                    <strong> ₹2.5L</strong>
                  </div>
                </div>
                <button
                  className="explore-btn-vibrant"
                  style={{ borderColor: cat.color, color: cat.color }}
                >
                  <span>Explore</span>
                  <ArrowForwardIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-vibrant">
        <button className="view-all-btn-vibrant">
          <span>Browse All Categories</span>
          <ArrowForwardIcon />
        </button>
      </div>
    </section>
  );
}

export default CarCategoriesSection;
