import React from "react";
import "./CategoryGrid.css";
import { FiArrowRight, FiZap } from "react-icons/fi";

const CategoryGrid = () => {
  const sections = [
    {
      title: "Popular Body Styles",
      tag: "Top Choice",
      items: [
        {
          label: "SUVs",
          img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Sedans",
          img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Hatchbacks",
          img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Coupes",
          img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400",
        },
      ],
      link: "View all body types",
    },
    {
      title: "Premium Brands",
      tag: "Certified",
      items: [
        {
          label: "BMW",
          img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Mercedes",
          img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Audi",
          img: "https://images.unsplash.com/photo-1541348263662-e0c86433ac10?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Porsche",
          img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400",
        },
      ],
      link: "Explore all brands",
    },
    {
      title: "Shop by Budget",
      tag: "Save Big",
      items: [
        {
          label: "Under ₹5L",
          img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "₹5L - ₹10L",
          img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "₹10L - ₹20L",
          img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Luxury",
          img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400",
        },
      ],
      link: "Check financing",
    },
    {
      title: "Essential Gear",
      tag: "New Arrivals",
      items: [
        {
          label: "Cleaning",
          img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Wheels",
          img: "https://images.unsplash.com/photo-1549174138-0387532a8845?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Helmets",
          img: "https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "Tech",
          img: "https://images.unsplash.com/photo-1569698134101-f15cde5cd66c?auto=format&fit=crop&q=80&w=400",
        },
      ],
      link: "Shop accessories",
    },
  ];

  return (
    <section className="category-section-clean">
      <div className="category-container">
        {sections.map((section, index) => (
          <div key={index} className="category-main-card">
            <div className="card-header-top">
              <span className="card-tag">
                <FiZap /> {section.tag}
              </span>
              <h2 className="card-main-title">{section.title}</h2>
            </div>

            <div className="quad-item-grid">
              {section.items.map((item, i) => (
                <div key={i} className="quad-item">
                  <div className="quad-img-container">
                    <img src={item.img} alt={item.label} loading="lazy" />
                    <div className="quad-item-overlay">
                      <span className="quad-label">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#" className="card-footer-link">
              <span>{section.link}</span>
              <FiArrowRight className="footer-arrow" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
