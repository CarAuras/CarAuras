import React, { useEffect, useState } from "react";
import "./NewsAndResources.css";
import { fetchEntries } from "../../contentfull/contentfulClient";
import { convertContentfullResponse } from "../../utils/utils";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
 
const NewsAndResources = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleCardClick = (link) => {
    navigate(`/blogs/${link}`);

    setTimeout(() => {
      const element = document.getElementById(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <section className="news-container">
      <h3 className="text-center fw-bold">
        <span className="quality-text">
          NEWS AND RESOURCES
          <svg
            width="120"
            height="12"
            viewBox="0 0 120 12"
            className="curved-line"
          >
            <path
              d="M0,6 Q60,12 120,6"
              stroke="#FFD700"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </span>{" "}
      </h3>
      <div className="news-header">
        <p>
          Discover the latest tips, guides, and insights to make smarter car
          decisions.
        </p>
      </div>
      <div className="news-grid">
        {loading ? (
          <Loader />
        ) : (
          blogs.length > 0 &&
          blogs.map((blog, index) => (
            <article
              key={index}
              className="news-card"
              onClick={() => handleCardClick(blog.slug)}
            >
              <div className="news-image-container">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="news-image"
                  loading="lazy"
                  title="blogs image"
                />
                <div className="news-overlay"></div>
                <span className="news-category">{blog.category}</span>
              </div>
              <div className="news-content">
                <h3 className="news-card-title">{blog.title}</h3>
                <p className="news-text">{blog.sections[0]?.content}</p>
                <button className="news-link">
                  View More
                  <svg className="arrow-icon" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))
        )}
      </div>
      <div className="view-all-container">
        <a href="/blogs"><button className="view-all-button">View All Articles</button></a>
        
      </div>
    </section>
  );
};

export default NewsAndResources;
