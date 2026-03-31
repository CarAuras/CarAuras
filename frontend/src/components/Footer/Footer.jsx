import React, { useState } from "react";
import "./Footer.css";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Email,
  LocationOn,
  Phone,
  Send,
  ArrowUpward,
} from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { FACEBOOK, INSTAGRAM, LINKEDIN, X } from "../../constants/social-urls";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";
import { ADD_SUBSCRIPTION_URL } from "../../config/api";
import Swal from "sweetalert2";

function Footer() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        title: "Error",
        text: "Please enter your email address",
        icon: "error",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(ADD_SUBSCRIPTION_URL, { email });
      setLoading(false);
      if (res && res.status === 200) {
        Swal.fire({
          title: "Subscription added!",
          text: "Thank you for subscribing with us!",
          icon: "success",
          confirmButtonColor: "#667eea",
          timer: 2000,
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      Swal.fire({
        title: "Already Subscribed",
        text: "This email is already subscribed to our newsletter",
        icon: "info",
        confirmButtonColor: "#667eea",
      });
      setLoading(false);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    company: {
      title: "Company",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Contact Us", path: "/contact-us" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blogs" },
      ],
    },
    services: {
      title: "Services",
      links: [
        { name: "Find Cars", path: "/used-cars" },
        { name: "Sell Your Car", path: "/sell-car" },
        { name: "Car Valuation", path: "/valuation" },
        { name: "Favorites", path: "/favourites" },
        { name: "Reviews", path: "/reviews" },
      ],
    },
    support: {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "FAQs", path: "/faq" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Safety Tips", path: "/safety-tips" },
        { name: "Report an Issue", path: "/report" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Disclaimer", path: "/disclaimer" },
      ],
    },
  };

  const socialLinks = [
    { icon: FacebookIcon, url: FACEBOOK, color: "#1877f2", name: "Facebook" },
    {
      icon: InstagramIcon,
      url: INSTAGRAM,
      color: "#e4405f",
      name: "Instagram",
    },
    { icon: XIcon, url: X, color: "#000000", name: "X" },
    { icon: LinkedInIcon, url: LINKEDIN, color: "#0a66c2", name: "LinkedIn" },
    {
      icon: YouTubeIcon,
      url: "https://www.youtube.com/@carauras",
      color: "#ff0000",
      name: "YouTube",
    },
  ];

  return (
    <footer className="modern-footer">
      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="logo-icon">🚗</span>
              <h2>
                Car<span>Auras</span>
              </h2>
            </div>
            <p className="brand-description">
              India's most trusted platform for buying and selling used cars. We
              connect car enthusiasts with their dream vehicles.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Email className="contact-icon" />
                <span>support@carauras.com</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <LocationOn className="contact-icon" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="footer-links">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.path}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-content">
          <div className="copyright">
            <p>
              &copy; {new Date().getFullYear()} CarAuras. All rights reserved.
            </p>
          </div>

          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
                style={{ "--hover-color": social.color }}
              >
                <social.icon />
              </a>
            ))}
          </div>

          <button className="scroll-top" onClick={scrollToTop}>
            <ArrowUpward />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
