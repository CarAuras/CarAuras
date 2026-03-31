import React, { useEffect, useState } from "react";
import "./Counter.css";
import axios from "axios";
import { STATS_COUNT } from "../../config/api";

function Counter() {
  const [counts, setCounts] = useState({
    cars: 0,
    customers: 0,
    brands: 0,
  });

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${STATS_COUNT}`);

        if (res && res.data) {
          setData(res.data);
          // setCounts(res.data);
          setTargetCounts(res.data);
        }
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [targetCounts, setTargetCounts] = useState({
    cars: 1250,
    customers: 850,
    brands: 35,
  });

  useEffect(() => {
    const updateCounts = (key, step, limit) => {
      return setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          [key]: prev[key] < limit ? Math.min(prev[key] + step, limit) : limit,
        }));
      }, 20);
    };

    const intervals = [
      updateCounts("cars", 25, targetCounts.cars),
      updateCounts("customers", 15, targetCounts.customers),
      updateCounts("brands", 2, targetCounts.brands),
    ];

    return () => intervals.forEach(clearInterval);
  }, [targetCounts]);

  return (
    <section className="counter-section" id="Our Achievements">
      <div className="">
        <h3 className="text-center fw-bold">
          <span className="quality-text">
            Our Achievements
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

        <p className="counter-subtitle text-center">
          Driving excellence in every number
        </p>
      </div>
      <div className="counter-container">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} className="counter-item">
            <div className="counter-circle">
              <div className="counter-value">
                {value}
                <span className="counter-plus">+</span>
              </div>
              <svg className="counter-circle-bg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  style={{
                    strokeDashoffset: 283 - 283 * (value / targetCounts[key]),
                  }}
                />
              </svg>
            </div>
            <p className="counter-label">
              {key === "cars" && "Cars Available"}
              {key === "customers" && "Happy Customers"}
              {key === "brands" && "Top Brands"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Counter;
