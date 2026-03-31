import React, { useContext, useEffect, useState, useRef } from "react";
import "./HowItWorks.css";
import { UserContext } from "../../hooks/UserContext";
import {
  FiUserPlus,
  FiCamera,
  FiArrowRight,
  FiZap,
  FiStar,
  FiSmile,
  FiCheckCircle,
  FiGift,
  FiTrendingUp,
  FiShield,
  FiThumbsUp,
} from "react-icons/fi";
import {
  MdOutlineVerified,
  MdOutlineSpeed,
  MdRocketLaunch,
  MdOutlineSecurity,
} from "react-icons/md";
import { BiHappy, BiMoney, BiTime, BiCar } from "react-icons/bi";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { FaCar, FaHandshake, FaRegClock, FaChartLine } from "react-icons/fa";

function HowItWorks() {
  const { user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) setLoggedIn(true);
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const steps = [
    {
      id: "01",
      title: "Create Account",
      description: "Sign up in 30 seconds — completely free and secure.",
      icon: <FiUserPlus />,
      benefits: ["No Credit Card", "Instant Access"],
    },
    {
      id: "02",
      title: "List Your Car",
      description: "Snap photos & get an AI-powered valuation in minutes.",
      icon: <FiCamera />,
      benefits: ["AI Valuation", "Smart Specs"],
    },
    {
      id: "03",
      title: "Get Paid",
      description: "Connect with verified buyers and receive instant payment.",
      icon: <GiMoneyStack />,
      benefits: ["Secure Escrow", "Fast Payout"],
    },
  ];

  const features = [
    { icon: <MdOutlineSpeed />, text: "Lightning Fast" },
    { icon: <MdOutlineVerified />, text: "100% Verified" },
    { icon: <BiMoney />, text: "Best Price" },
    { icon: <FaRegClock />, text: "24/7 Support" },
  ];

  const stats = [
    { value: "50k+", label: "Sellers", icon: <BiHappy /> },
    { value: "10k+", label: "Cars Sold", icon: <FaCar /> },
    { value: "98%", label: "Success Rate", icon: <FiSmile /> },
    { value: "24h", label: "Avg. Sale", icon: <MdOutlineSpeed /> },
  ];

  const handleGetStarted = () => {
    window.location.href = loggedIn ? "/profile" : "/signin";
  };

  const handleOpenModal = () => {
    const modal = document.getElementById("elegantModal");
    if (modal) {
      const bsModal = new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  };

  return (
    <div className="how-it-works-elegant" ref={sectionRef}>
      <div className="container-elegant">
        {/* Header */}
        <div className={`header-elegant ${isVisible ? "reveal" : ""}`}>
          <div className="badge-elegant">
            <span className="badge-dot"></span>
            <span>Simple. Fast. Trusted.</span>
          </div>
          <h1 className="title-elegant">
            Sell Your Car in
            <span className="title-accent"> Three Steps</span>
          </h1>
          <p className="subtitle-elegant">
            Join thousands of sellers who got the best value for their cars
          </p>
        </div>

        {/* Features Bar */}
        <div className={`features-bar-elegant ${isVisible ? "reveal" : ""}`}>
          {features.map((f, i) => (
            <div key={i} className="feature-item-elegant">
              {f.icon}
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="steps-grid-elegant">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-card-elegant ${isVisible ? "reveal" : ""}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="step-number-elegant">{step.id}</div>
              <div className="step-icon-elegant">{step.icon}</div>
              <h3 className="step-title-elegant">{step.title}</h3>
              <p className="step-description-elegant">{step.description}</p>
              <div className="step-benefits-elegant">
                {step.benefits.map((b, idx) => (
                  <span key={idx}>
                    <FiCheckCircle />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`stats-grid-elegant ${isVisible ? "reveal" : ""}`}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-card-elegant">
              <div className="stat-icon-elegant">{stat.icon}</div>
              <div className="stat-content-elegant">
                <h4 className="stat-value-elegant">{stat.value}</h4>
                <p className="stat-label-elegant">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* <div className={`cta-section-elegant ${isVisible ? "reveal" : ""}`}>
          <div className="cta-card-elegant">
            <div className="cta-content-elegant">
              <h2>Ready to sell your car?</h2>
              <p>Get a free valuation in under 2 minutes</p>
              <div className="cta-buttons-elegant">
                <button
                  className="btn-primary-elegant"
                  onClick={handleOpenModal}
                >
                  Start Selling
                  <FiArrowRight />
                </button>
                <button
                  className="btn-secondary-elegant"
                  onClick={handleGetStarted}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Trust Footer */}
        {/* <div className="trust-footer-elegant">
          <div className="rating-elegant">
            <div className="stars-elegant">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} />
              ))}
            </div>
            <span className="rating-score-elegant">4.9/5</span>
            <span className="rating-count-elegant">(2,847 reviews)</span>
          </div>
          <p>© 2025 CarAuras — Premium Car Marketplace</p>
        </div> */}
      </div>

      {/* Modal */}
      <div
        className="modal fade modal-elegant"
        id="elegantModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content-elegant">
            <div className="modal-header-elegant">
              <h3>Start Your Journey</h3>
              <button
                type="button"
                className="modal-close-elegant"
                data-bs-dismiss="modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body-elegant">
              <div className="timeline-elegant">
                {[
                  { step: "Create Account", time: "30 sec" },
                  { step: "List Your Car", time: "5 min" },
                  { step: "Get Offers", time: "24h" },
                  { step: "Receive Payment", time: "Instant" },
                ].map((item, i) => (
                  <div key={i} className="timeline-item-elegant">
                    <div className="timeline-dot-elegant"></div>
                    <div className="timeline-content-elegant">
                      <strong>{item.step}</strong>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer-elegant">
              <button
                className="btn-modal-secondary-elegant"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn-modal-primary-elegant"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
