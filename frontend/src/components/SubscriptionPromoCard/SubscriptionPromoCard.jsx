import React from "react";
import { FaCrown, FaArrowRight } from "react-icons/fa";
import "./SubscriptionPromoCard.css";
import { useNavigate } from "react-router-dom";

const SubscriptionPromoCard = () => {
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate("/premium-plans");
  };

  return (
    <div className="subscription-promo-card" onClick={handleSubscribeClick}>
      <div className="card-header">
        <div className="card-icon">
          <FaCrown />
        </div>
        <h3>Upgrade Your Account</h3>
      </div>
      <div className="card-content">
        <p>Unlock premium features to get more leads and sell faster</p>
        <ul className="feature-highlights">
          <li>More listings</li>
          <li>Priority placement</li>
          <li>Advanced analytics</li>
        </ul>
      </div>
      <button className="subscribe-button">
        Subscribe Now <FaArrowRight className="arrow-icon" />
      </button>
    </div>
  );
};

export default SubscriptionPromoCard;
