import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCar,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaHeadset,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BiMap, BiTime, BiSupport } from "react-icons/bi";
import "./ContactScreen.css";
import axios from "axios";
import {
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  X,
  YOUTUBE,
} from "../../constants/social-urls";
import { SEND_FEEDBACK_API } from "../../config/api";

function ContactScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${SEND_FEEDBACK_API}`, formData);
      if (res && res.status == 200) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <HiOutlineMail />,
      title: "Email Us",
      details: ["infoatcarauras@gmail.com", "support@carauras.com"],
      response: "Response within 24 hours",
      color: "#3b82f6",
    },
    {
      icon: <HiOutlinePhone />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      response: "Mon-Fri 9AM-6PM EST",
      color: "#10b981",
    },
    {
      icon: <HiOutlineLocationMarker />,
      title: "Visit Us",
      details: ["123 Auto Plaza Drive", "Los Angeles, CA 90001"],
      response: "Showroom open daily",
      color: "#f59e0b",
    },
  ];

  const features = [
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Round-the-clock assistance",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Transactions",
      desc: "100% protected",
    },
    { icon: <FaStar />, title: "5-Star Service", desc: "Top rated dealers" },
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-particles"></div>
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <GiCarWheel className="hero-icon" />
          </div>
          <h1>Let's Drive Together</h1>
          <p>Your journey to the perfect car starts with a conversation</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <div className="contact-content">
        {/* Left Section - Contact Info */}
        <div className="contact-info-wrapper">
          <div className="section-header">
            <span className="section-badge">Get in Touch</span>
            <h2>We'd Love to Hear From You</h2>
            <p>
              Whether you have a question about a vehicle or just want to say
              hello, we're all ears.
            </p>
          </div>

          <div className="info-cards-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-card-modern">
                <div
                  className="card-icon"
                  style={{ background: `${info.color}15`, color: info.color }}
                >
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="card-detail">
                    {detail}
                  </p>
                ))}
                <span className="card-response">{info.response}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="features-section">
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Connect */}
          <div className="social-connect">
            <h3>Connect With Us</h3>
            <p>Follow us on social media for updates and exclusive offers</p>
            <div className="social-links">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link facebook"
              >
                <FaFacebook />
              </a>
              <a
                href={X}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href={YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link youtube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="contact-form-wrapper">
          <div className="form-card">
            <div className="form-header">
              <FaPaperPlane className="form-header-icon" />
              <h2>Send Us a Message</h2>
              <p>Fill out the form and we'll get back to you within 24 hours</p>
            </div>

            {submitted ? (
              <div className="success-animation">
                <FaCheckCircle className="success-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for reaching out. Our team will respond shortly.
                </p>
              </div>
            ) : (
              <form className="modern-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FaUser className="label-icon" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaEnvelope className="label-icon" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FaPhone className="label-icon" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaCar className="label-icon" />
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Vehicle Question">Vehicle Question</option>
                      <option value="Dealer Inquiry">Dealer Inquiry</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="button-icon" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
