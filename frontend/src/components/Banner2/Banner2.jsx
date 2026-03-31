import React, { useState, useEffect } from "react";
import "./Banner2.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { SEARCH_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

function Banner2() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const searchCar = async (name) => {
    if (name.length > 2) {
      setIsSearching(true);
      try {
        const res = await axios.get(`${SEARCH_URL}?key=${name}`);
        if (res && res?.data && res.data?.data) {
          setSearchResults(res.data.data.slice(0, 5));
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKey.trim()) {
        searchCar(searchKey);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchKey]);

  const handleResultClick = (carId) => {
    setShowSearchModal(false);
    setSearchKey("");
    setSearchResults([]);
    navigate(`/car/${carId}`);
  };

  return (
    <div className="banner-modern">
      <div className="banner-container">
        <div className="banner-grid">
          {/* LEFT COLUMN - CONTENT */}
          <div className="banner-content">
            <div className="feature-tag">
              <span className="tag-indicator"></span>
              CERTIFIED PREMIUM COLLECTION
            </div>

            <h1 className="banner-2-title">
              Building <br />a better{" "}
              <span className="title-highlight">
                drive
                <span className="love-badge">
                  <FavoriteIcon />
                </span>
              </span>
            </h1>

            <p className="banner-description">
              Anyone can sell you a car, but no one can beat our hand-picked
              certified pre-owned luxury collection. Discover the drive you
              deserve with CarAuras.
            </p>

            <div className="action-buttons">
              <button
                className="btn-primary-banner"
                onClick={() => navigate("/used-cars")}
              >
                Start shopping <ArrowRightAltIcon />
              </button>
              <button
                className="btn-search"
                onClick={() => setShowSearchModal(true)}
              >
                <div className="search-icon-circle">
                  <SearchIcon />
                </div>
                <span>Quick Search</span>
              </button>
              <button className="btn-play">
                <div className="play-icon-circle">
                  <PlayArrowIcon />
                </div>
                <span>Watch review</span>
              </button>
            </div>

            <div className="stats-grid-banner">
              <div className="stat-item-banner">
                <div className="stat-number-banner">500+</div>
                <div className="stat-label-banner">Premium Cars</div>
              </div>
              <div className="stat-item-banner">
                <div className="stat-number-banner">50k+</div>
                <div className="stat-label-banner">Happy Customers</div>
              </div>
              <div className="stat-item-banner">
                <div className="stat-number-banner">24/7</div>
                <div className="stat-label-banner">Expert Support</div>
              </div>
            </div>

            {/* TESTIMONIAL CARD - Inspired by screenshot */}
            <div className="testimonial-card">
              <div className="quote-mark">“</div>
              <p>
                I just love CarAuras! Their cars are so premium and
                well-maintained. I can't think of buying from anyone else but
                them.
              </p>
              <div className="rating-wrapper">
                <div className="star-rating">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <span>4.9 ★ Overall rating</span>
              </div>
              <div className="reviewer-info">
                <img src="https://i.pravatar.cc/150?img=7" alt="reviewer" />
                <div>
                  <h6>Sarah Johnson</h6>
                  <p>Car Enthusiast</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - VISUAL */}
          <div className="banner-visual">
            <div className="visual-background">
              <div className="bg-blob blob-1"></div>
              <div className="bg-blob blob-2"></div>
              <div className="bg-blob blob-3"></div>
              <div className="bg-blob blob-4"></div>
            </div>

            <img
              src="/images/wheelzloop-main-img.webp"
              alt="Luxury Car"
              className="hero-image"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000";
              }}
            />

            {/* FLOATING CARD 1 - Similar to screenshot's "Natural Health" */}
            <div className="floating-card info-card">
              <div className="card-thumbnail">
                <img
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=150"
                  alt="Certified"
                />
              </div>
              <div className="card-details-banner">
                <h6>Certified Quality</h6>
                <p>Inspection | Warranty</p>
              </div>
              <div className="card-love">
                <VerifiedIcon />
              </div>
            </div>

            {/* FLOATING CARD 2 - Social proof card */}
            <div className="floating-card social-card">
              <div className="social-icon-wrapper">
                <ThumbUpIcon />
              </div>
              <div className="avatar-group">
                <img src="https://i.pravatar.cc/100?img=1" alt="user" />
                <img src="https://i.pravatar.cc/100?img=2" alt="user" />
                <img src="https://i.pravatar.cc/100?img=3" alt="user" />
                <img src="https://i.pravatar.cc/100?img=4" alt="user" />
              </div>
              <span className="social-count">1.2k+</span>
            </div>

            {/* FLOATING CARD 3 - Rating badge */}
            <div className="floating-card rating-card">
              <div className="rating-badge">
                <StarIcon />
                <span>4.9</span>
              </div>
              <div className="rating-text">
                <p>Trustpilot</p>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH MODAL */}
      {showSearchModal && (
        <div
          className="search-overlay"
          onClick={() => setShowSearchModal(false)}
        >
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <h3>Find Your Dream Car</h3>
              <button
                className="modal-close"
                onClick={() => setShowSearchModal(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="search-input-wrapper">
              <SearchIcon className="input-icon" />
              <input
                type="text"
                placeholder="Search by make, model, or location..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                autoFocus
              />
              {isSearching && <div className="search-loader"></div>}
            </div>
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((car) => (
                  <div
                    key={car._id}
                    className="result-item"
                    onClick={() => handleResultClick(car._id)}
                  >
                    <div className="result-image">
                      <img src={car.images?.[0]} alt={car.car_name} />
                    </div>
                    <div className="result-info">
                      <h4>{car.car_name}</h4>
                      <p>
                        {car.brand} • {car.model} • {car.year}
                      </p>
                      <div className="result-meta">
                        <span className="result-price">
                          ${car.price?.toLocaleString()}
                        </span>
                        <span className="result-location">
                          <LocationOnIcon />
                          {car.place}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : searchKey.trim() && !isSearching ? (
                <div className="empty-state">
                  <SearchIcon />
                  <p>No cars found for "{searchKey}"</p>
                  <button onClick={() => navigate("/used-cars")}>
                    Browse All Cars
                  </button>
                </div>
              ) : searchKey.trim() === "" ? (
                <div className="suggestions">
                  <h4>Popular Searches</h4>
                  <div className="suggestion-tags">
                    <span onClick={() => setSearchKey("BMW")}>BMW</span>
                    <span onClick={() => setSearchKey("Mercedes")}>
                      Mercedes
                    </span>
                    <span onClick={() => setSearchKey("Audi")}>Audi</span>
                    <span onClick={() => setSearchKey("Tesla")}>Tesla</span>
                    <span onClick={() => setSearchKey("Luxury")}>Luxury</span>
                    <span onClick={() => setSearchKey("SUV")}>SUV</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner2;
