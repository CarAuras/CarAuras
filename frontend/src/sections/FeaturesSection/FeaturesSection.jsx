import React, { useEffect, useRef, useState } from "react";
import "./FeaturesSection.css";
import {
  VerifiedUser,
  Payment,
  LocalShipping,
  SupportAgent,
  Security,
  TrendingUp,
  Speed,
  HeadsetMic,
  EmojiEvents,
  Shield,
  MonetizationOn,
  RocketLaunch,
  WorkspacePremium,
  AutoAwesome,
  Diamond,
  Storefront,
  Star,
  FlashOn,
  ThumbUp,
  Assessment,
} from "@mui/icons-material";

function FeaturesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      id: 1,
      icon: <VerifiedUser />,
      title: "Verified Dealers",
      description:
        "Every dealer undergoes rigorous verification for maximum trust and reliability.",
      stat: "500+",
      statLabel: "Certified Dealers",
      color: "var(--primary)",
      gradient: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
      delay: 0,
    },
    {
      id: 2,
      icon: <Diamond />,
      title: "Premium Selection",
      description:
        "Curated collection of luxury and premium vehicles with verified history.",
      stat: "10k+",
      statLabel: "Quality Cars",
      color: "var(--primary)",
      gradient: "linear-gradient(135deg, #111827 0%, #2d3748 100%)",
      delay: 0.1,
    },
    {
      id: 3,
      icon: <FlashOn />,
      title: "Instant Listing",
      description:
        "Sell your car in minutes with our AI-powered streamlined process.",
      stat: "24h",
      statLabel: "Quick Sale",
      color: "var(--primary)",
      gradient: "linear-gradient(135deg, #111827 0%, #374151 100%)",
      delay: 0.2,
    },
    {
      id: 4,
      icon: <HeadsetMic />,
      title: "24/7 Concierge",
      description: "Round-the-clock expert assistance for all your queries.",
      stat: "100%",
      statLabel: "Satisfaction",
      color: "var(--primary)",
      gradient: "linear-gradient(135deg, #111827 0%, #4b5563 100%)",
      delay: 0.3,
    },
  ];

  const stats = [
    { value: "50k+", label: "Happy Customers", icon: <ThumbUp /> },
    { value: "98%", label: "Satisfaction Rate", icon: <Star /> },
    { value: "24/7", label: "Support Available", icon: <SupportAgent /> },
    { value: "15min", label: "Avg Response Time", icon: <Speed /> },
  ];

  const benefits = [
    {
      icon: <Security />,
      text: "Secure Payments",
      desc: "SSL encrypted transactions",
    },
    {
      icon: <Speed />,
      text: "Fast Delivery",
      desc: "Within 3-5 business days",
    },
    {
      icon: <Assessment />,
      text: "Price Transparency",
      desc: "No hidden fees",
    },
    {
      icon: <WorkspacePremium />,
      text: "Warranty Included",
      desc: "6-month warranty",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="features-section-modern" ref={sectionRef}>
      <div className="features-bg-elements">
        <div className="bg-blur-1"></div>
        <div className="bg-blur-2"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="features-header-modern">
        <div className="header-badge-modern">
          <AutoAwesome />
          <span>Trust & Excellence</span>
        </div>
        <h2 className="features-title-modern">
          Your Journey to <span className="gradient-modern">Perfect Car</span>
          <br />
          Starts Here
        </h2>
        <p className="features-subtitle-modern">
          Join 50,000+ satisfied customers who found their dream car with us
        </p>
      </div>

      <div className="features-grid-modern">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`feature-card-modern ${isVisible ? "animate" : ""}`}
            style={{ animationDelay: `${feature.delay}s` }}
          >
            <div className="card-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="card-header-modern">
              <div className="icon-wrapper-modern">{feature.icon}</div>
            </div>

            <h3 className="feature-title-modern">{feature.title}</h3>
            <p className="feature-description-modern">{feature.description}</p>

            <div className="feature-stats">
              <div className="stat-value">{feature.stat}</div>
              <div className="stat-label">{feature.statLabel}</div>
            </div>

            <div className="feature-link">
              <span>Learn more</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-showcase">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-text">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* <div className="benefits-section">
        <h3 className="benefits-title">Why Choose Us?</h3>
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <div className="benefit-content">
                <h4>{benefit.text}</h4>
                <p>{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="trust-badge-modern">
        <div className="trust-content-modern">
          <Shield />
          <span>Trusted by 50,000+ customers</span>
          <div className="rating-stars-modern">
            {[...Array(5)].map((_, i) => (
              <Star key={i} />
            ))}
          </div>
          <span className="rating-value">4.9</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
