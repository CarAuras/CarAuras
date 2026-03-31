import React from "react";
import "./PopularBrandsSection.css";

function PopularBrandsSection() {
  const brands = [
    {
      name: "Toyota",
      logo: "https://cdn-icons-png.flaticon.com/512/1968/1968661.png",
      count: 124,
    },
    {
      name: "Honda",
      logo: "https://cdn-icons-png.flaticon.com/512/599/599502.png",
      count: 98,
    },
    {
      name: "Ford",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731985.png",
      count: 87,
    },
    {
      name: "BMW",
      logo: "https://cdn-icons-png.flaticon.com/512/1968/1968125.png",
      count: 76,
    },
    {
      name: "Mercedes",
      logo: "https://cdn-icons-png.flaticon.com/512/1968/1968124.png",
      count: 65,
    },
    {
      name: "Audi",
      logo: "https://cdn-icons-png.flaticon.com/512/1968/1968131.png",
      count: 59,
    },
    {
      name: "Hyundai",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731962.png",
      count: 112,
    },
    {
      name: "Nissan",
      logo: "https://cdn-icons-png.flaticon.com/512/1968/1968657.png",
      count: 83,
    },
  ];

  return (
    <section className="popular-brands-section">
      <div className="brands-header">
        <h2 className="section-title">
          <span className="title-accent">Popular</span> Car Brands
        </h2>
        <p className="section-subtitle">
          Browse our extensive collection of vehicles from top manufacturers
        </p>
      </div>

      <div className="brands-container">
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-card">
              <div className="brand-logo-container">
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
                <div className="brand-count">{brand.count}+</div>
              </div>
              <div className="brand-info">
                <h3 className="brand-name">{brand.name}</h3>
                <button className="explore-btn">Explore</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-container">
        <button className="cta-button">
          View All Brands
          <svg
            className="arrow-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default PopularBrandsSection;
