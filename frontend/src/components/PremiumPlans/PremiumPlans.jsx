import React, { useContext } from "react";
import {
  FaCrown,
  FaStar,
  FaRocket,
  FaChartLine,
  FaTags,
  FaPhone,
  FaShieldAlt,
} from "react-icons/fa";
import "./PremiumPlans.css";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import { SUBRIPTION_PLANS } from "../../constants/userConstants";
import Swal from "sweetalert2";

const PremiumPlans = () => {
  const handleSubscribePan = async (plan) => {
    window.location.href = `/subscribe/${plan}`;
  };
  const { user } = useContext(UserContext);

  return (
    <div className="premium-plans-container mt-2">
      <div className="premium-plans-header">
        <h2>Upgrade Your Experience</h2>
        <p>
          Get more visibility, more leads, and sell faster with our premium
          plans
        </p>
      </div>

      <div className="plans-grid">
        <div className="plan-card free-plan">
          <div className="plan-header">
            <div className="plan-icon">
              <FaShieldAlt />
            </div>
            <h3>Free Plan</h3>
          </div>
          <div className="plan-price">
            <p className="price">₹0</p>
            <p className="price-subtext">Forever free</p>
          </div>
          <ul className="plan-features">
            <li>
              <span>✓</span> Max 5 active listings
            </li>
            <li>
              <span>✓</span> Basic dealer profile
            </li>
            <li>
              <span>✓</span> Basic inquiry notifications
            </li>
          </ul>
          <button className="plan-button free-button">Current Plan</button>
        </div>

        <div className="plan-card pro-plan highlighted">
          <div className="plan-header">
            <div className="plan-icon">
              <FaStar />
            </div>
            <h3>Pro Plan</h3>
            <span className="popular-badge">POPULAR</span>
          </div>
          <div className="plan-price">
            <p className="price">₹499–₹799</p>
            <p className="price-subtext">Per month</p>
          </div>
          <ul className="plan-features">
            <li>
              <span>✓</span> Up to 25–50 listings
            </li>
            <li>
              <span>✓</span> Featured profile badge
            </li>
            <li>
              <span>✓</span> WhatsApp contact button
            </li>
            <li>
              <span>✓</span> Basic performance analytics
            </li>
            <li>
              <span>✓</span> Boost 2 listings/month
            </li>
          </ul>
          <button
            className="plan-button pro-button"
            onClick={() => handleSubscribePan(SUBRIPTION_PLANS.PRO.TITLE)}
          >
            Upgrade Now
          </button>
        </div>

        <div className="plan-card elite-plan">
          <div className="plan-header">
            <div className="plan-icon">
              <FaCrown />
            </div>
            <h3>Elite Plan</h3>
          </div>
          <div className="plan-price">
            <p className="price">₹1,499–₹2,499</p>
            <p className="price-subtext">Per month</p>
          </div>
          <ul className="plan-features">
            <li>
              <span>✓</span> Unlimited listings
            </li>
            <li>
              <span>✓</span> Priority placement
            </li>
            <li>
              <span>✓</span> Custom dealer landing page
            </li>
            <li>
              <span>✓</span> Advanced analytics
            </li>
            <li>
              <span>✓</span> Boost up to 10 listings/month
            </li>
          </ul>
          <button
            className="plan-button elite-button"
            onClick={() => handleSubscribePan(SUBRIPTION_PLANS.ELITE.TITLE)}
          >
            Go Elite
          </button>
        </div>
      </div>

      <div className="enterprise-cta">
        <div className="cta-icon">
          <FaRocket />
        </div>
        <div className="cta-content">
          <h3>Need more power?</h3>
          <p>
            Contact us for enterprise solutions with custom features and
            dedicated support.
          </p>
        </div>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "/contact-us")}
        >
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default PremiumPlans;
