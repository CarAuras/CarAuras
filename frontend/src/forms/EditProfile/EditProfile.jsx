import React, { useState } from "react";
import "./EditProfile.css";

function EditProfile() {
  const [formData, setFormData] = useState({
    username: "Aswin",
    first_name: "Aswin",
    last_name: "Aswin",
    phone: "+1244567890",
    email: "aswin@example.com",
    business_name: "Doe Motors",
    location: "New York, USA",
    address: "123 Main St, New York, NY 10001",
    profile_picture: "https://example.com/profile.jpg",
    has_physical_store: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="edit-profile-container">
      <div className="profile-header">
        <h1>Edit Profile</h1>
        <div className="profile-image-container">
          <img
            src={formData.profile_picture}
            alt="Profile"
            className="profile-image"
            title="edit-profile-img"
          />
          <button className="change-photo-btn">Change Photo</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Business Name</label>
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="has_physical_store"
              name="has_physical_store"
              checked={formData.has_physical_store}
              onChange={handleChange}
            />
            <label htmlFor="has_physical_store">Has Physical Store</label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
