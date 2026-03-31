import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogsScreen.css";
import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaShareAlt,
  FaBookmark,
  FaChevronRight,
} from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { ADD_SUBSCRIPTION_URL } from "../../config/api";

import { ToastContainer, toast } from "react-toastify";
import { fetchEntries } from "../../contentfull/contentfulClient";
import { convertContentfullResponse } from "../../utils/utils";
import Loader from "../../components/Loader/Loader";

function BlogScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [blogIndex, setBlogIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchEntries();
      setLoading(false);

      if (res) {
        let formatedData = await convertContentfullResponse(res);
        setBlogs(formatedData);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const index = slug ? blogs.findIndex((blog) => blog.slug === slug) : 0;
      if (index !== -1) {
        setBlogIndex(index);
        setCurrentBlog(blogs[index]);
      }
    }
  }, [slug, blogs, blogIndex]);

  const handleSubscribe = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (email) {
        const res = await axios.post(ADD_SUBSCRIPTION_URL, { email });
        setLoading(false);
        if (res && res.status === 200) {
          Swal.fire({
            title: "Subscription added!",
            text: "Thank you for subscribing with us!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "You are already subscribed",
            icon: "success",
            draggable: true,
          });
        }
        setEmail("");
      }
    } catch (error) {
      Swal.fire({
        title: "You are already subscribed",
        icon: "success",
        draggable: true,
      });
      setLoading(false);
      setEmail("");
    }
  };

  const handlePrevClick = () => {
    if (blogIndex > 0) {
      const prevIndex = blogIndex - 1;
      navigate(`/blogs/${blogs[prevIndex].slug}`);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    if (blogIndex < blogs.length - 1) {
      const nextIndex = blogIndex + 1;
      navigate(`/blogs/${blogs[nextIndex].slug}`);
      scrollToTop();
    }
  };

  const handleNavLinkClick = (index) => {
    navigate(`/blog/${blogs[index].slug}`);
  };

  const handleRelatedBlogClick = (index) => {
    setBlogIndex(index);
    navigate(`/blogs/${blogs[index].slug}`);
    scrollToTop();
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!currentBlog && !loading && slug) {
    return <div className="error-message">Blog not found</div>;
  }

  return (
    <div className="blogs-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="blog-hero">
            <div className="hero-content">
              <h1>Car Buying Resources & Guides</h1>
              <p>
                Expert advice to help you make informed decisions about buying,
                selling, and maintaining your vehicle
              </p>
            </div>
          </div>

          <div className="blog-content">
            <article className="blog-article" id={currentBlog?.slug}>
              <div className="article-header">
                <div className="article-meta">
                  <span className="article-category">
                    {currentBlog?.category}
                  </span>
                  <span className="article-date">
                    <FaCalendarAlt /> {currentBlog?.date}
                  </span>
                </div>
                <h2 className="article-title">{currentBlog?.title}</h2>
                <div className="article-actions">
                  <button
                    className=""
                    style={{
                      padding: "8px",
                      border: "none",
                      outline: "none",
                      background: "rgba(96, 108, 188, 0.1)",
                    }}
                    onClick={handleShare}
                  >
                    <FaShareAlt /> Share
                  </button>
                </div>
              </div>

              <div className="article-image">
                <img
                  src={currentBlog?.image}
                  alt={currentBlog?.alt}
                  loading="lazy"
                  title={currentBlog?.title}
                />
              </div>
              <div className="article-body mt-4">
                <div className="content-section">
                  {/* <h3>{index}</h3> */}
                  <p>{currentBlog?.description ?? ""}</p>
                </div>
              </div>
            </article>

            <div className="article-footer">
              <div className="author-info">
                <div className="author-avatar">JD</div>
                <div>
                  <h4>Aswin</h4>
                  <p>Auto Expert</p>
                </div>
              </div>
              <div className="article-nav">
                <button
                  className="nav-btn prev-btn"
                  onClick={handlePrevClick}
                  disabled={blogIndex === 0}
                >
                  <BsArrowLeft /> Previous
                </button>
                <button
                  className="nav-btn next-btn"
                  onClick={handleNextClick}
                  disabled={blogIndex === blogs.length - 1}
                >
                  Next <BsArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="newsletter-cta">
            <div className="cta-content">
              <h3 className="text-center">Get More Car Buying Tips</h3>
              <p>
                Subscribe to our newsletter for the latest advice and market
                trends
              </p>
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? (
                    "Please wait...."
                  ) : (
                    <>
                      Subscribe <FaChevronRight />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="related-articles">
            <h3>More Helpful Guides</h3>
            <div className="article-grid">
              {blogs
                .filter((_, index) => index !== blogIndex)
                .slice(0, 3)
                .map((blog) => {
                  const index = blogs.findIndex((b) => b.id === blog.id);
                  return (
                    <div
                      key={blog.id}
                      className="related-card"
                      onClick={() => handleRelatedBlogClick(index)}
                    >
                      <img src={blog.image} alt={blog.alt} title={blog.title} />
                      <div className="card-content">
                        <span className="card-category">{blog.category}</span>
                        <h4>{blog.title}</h4>
                        {/* <p>{blog.sections[0].content.substring(0, 60)}...</p> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default BlogScreen;
