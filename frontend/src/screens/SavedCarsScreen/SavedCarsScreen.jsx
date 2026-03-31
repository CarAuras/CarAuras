import React, { useEffect, useState } from "react";
import "./SavedCarsScreen.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { GET_SAVED_CARS_URL } from "../../config/api";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SavedCarsScreen() {
  const [savedCars, setSavedCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeFromFavorites = (id) => {
    const updatedCars = savedCars.filter((car) => car._id !== id);
    setSavedCars(updatedCars);
    localStorage.setItem(
      "fav-cars",
      JSON.stringify(updatedCars.map((car) => car._id))
    );
  };

  useEffect(() => {
    const fetchSavedCars = async () => {
      try {
        setLoading(true);
        let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
        let { data } = await axios.post(`${GET_SAVED_CARS_URL}`, {
          savedIds: favCars,
        });

        if (data && data.cars && data.cars.length > 0) {
          setLoading(false);
          setSavedCars(data.cars);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedCars();
  }, []);

  const handleShare = (carId) => {
    const carUrl = `${window.location.origin}/car/${carId}`;
    navigator.clipboard.writeText(carUrl);

    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="saved-cars-container">
      <div className="saved-cars-header">
        <h1 className="saved-cars-title">Your Saved Vehicles</h1>
        <p className="saved-cars-subtitle">
          {savedCars.length} {savedCars.length === 1 ? "vehicle" : "vehicles"}{" "}
          saved
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : savedCars?.length === 0 ? (
        <div className="empty-state">
          <FavoriteIcon className="empty-icon" />
          <h3>No saved vehicles yet</h3>
          <p>Start saving your favorite vehicles to see them here</p>
          <button
            className="browse-button"
            onClick={() => (window.location.href = "/cars")}
          >
            Browse Vehicles
          </button>
        </div>
      ) : (
        <div className="saved-cars-grid">
          {savedCars.map((car) => (
            <div key={car._id} className="saved-car-card">
              {car.featured && <div className="featured-tag">Featured</div>}
              <div
                className="car-image"
                onClick={() => (window.location.href = `/car/${car._id}`)}
              >
                <img src={car?.images[0]} alt={car.car_name} />
              </div>
              <div className="car-details">
                <div className="car-info">
                  <h3 className="car-name">{car?.car_name ?? "_"}</h3>
                  <p className="car-price">${car.price.toLocaleString()}</p>
                  <div className="car-meta">
                    <span className="meta-item">
                      <img src="/mileage-icon.svg" alt="Mileage" />
                      {car.mileage.toLocaleString()} mi
                    </span>
                    <span className="meta-item">
                      <img src="/location-icon.svg" alt="Location" />
                      {car?.place ?? ""}
                    </span>
                  </div>
                </div>
                <div className="car-actions">
                  <button
                    className="action-btn delete-btn"
                    onClick={() => removeFromFavorites(car?._id)}
                  >
                    <DeleteIcon />
                    <span>Remove</span>
                  </button>
                  <button
                    className="action-btn share-btn"
                    onClick={() => handleShare(car._id)}
                  >
                    <ShareIcon />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default SavedCarsScreen;
