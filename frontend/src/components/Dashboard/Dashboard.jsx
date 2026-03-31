import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { BACKEND_URL } from "../../config/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ dealerId }) {
  const [timePeriod, setTimePeriod] = useState("week");
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (dealerId) {
      const fetchStats = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/v1/user/dashboard/${dealerId}/stats`
          );
          if (res && res.data) {
            setStats(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchStats();
    }
  }, [dealerId]);

  useEffect(() => {
    if (dealerId) {
      const fetchGraphStats = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/v1/user/dashboard/${dealerId}/graph?period=${timePeriod}`
          );
          if (res && res.data) {
            setGraphData(res.data.data);
          }
        } catch (error) {
          console.log("Error while fetching graph details : ", error);
        }
      };
      fetchGraphStats();
    }
  }, [dealerId, timePeriod]);

  const cardData = [
    {
      title: "Total Cars",
      value: stats ? stats.totalCars.toString() : "0",
      icon: "🚗",
      trendColor: "#27ae60",
    },
    {
      title: "Total Car Views",
      value: stats ? stats.totalViews.toString() : "0",
      icon: "👁️",
      trendColor: "#27ae60",
    },
    {
      title: "Expired Cars",
      value: stats ? stats.expiredCars.toString() : "0",
      icon: "📩",
      trendColor: "#e74c3c",
    },
  ];

  const getChartData = () => {
    let labels = [];
    if (timePeriod === "week") {
      labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    } else if (timePeriod === "month") {
      labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    } else {
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "Car Views",
          data: graphData,
          borderColor: "#606cbc",
          backgroundColor: "#606cbc30",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="cards-container-2">
        {cardData.map((card, index) => (
          <div key={index} className="dashboard-card">
            <div
              className="card-icon"
              style={{ backgroundColor: `${card.trendColor}20` }}
            >
              {card.icon}
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <h2>{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h2>Analytics Overview</h2>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="period-selector"
          >
            <option value="week">Week</option>
            <option value="month">Current Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="chart-wrapper">
          <Line data={getChartData()} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
