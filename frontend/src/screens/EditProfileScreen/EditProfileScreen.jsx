import React, { useContext, useEffect, useState } from "react";
import "./EditProfileScreen.css";
import { UserContext } from "../../hooks/UserContext";
import { DEFAULT_AVATAR } from "../../constants/urls";
import Button from "antd/es/button";
import Upload from "antd/es/upload";
import {
  UploadOutlined,
  Person,
  Business,
  LocationOn,
  Email,
  Phone,
  Store,
  Edit,
  Save,
  Close,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../../config/api";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { motion, AnimatePresence } from "framer-motion";

function EditProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    business_name: "",
    location: "",
    address: "",
    has_physical_store: false,
    profile_picture: DEFAULT_AVATAR,
    role: "",
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async ({ fileList }) => {
    if (fileList.length === 0) return;
    const base64Image = await convertToBase64(fileList[fileList.length - 1]);
    setUserData((prev) => {
      const updatedData = { ...prev, profile_picture: base64Image };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleRemoveImage = () => {
    setUserData((prev) => {
      const updatedData = { ...prev, profile_picture: DEFAULT_AVATAR };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => {
      const updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleDiscardChanges = async () => {
    Swal.fire({
      title: "Discard Changes?",
      text: "You'll lose all unsaved changes to your profile",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, discard",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "swal-popup",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUserData(user);
        setIsEdited(false);
        Swal.fire({
          title: "Changes Discarded",
          text: "Your profile has been reset to the last saved version",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        setLoading(true);
        await axios.patch(`${UPDATE_PROFILE_URL}/${user._id}`, userData);
        setShowSuccess(true);
        setIsEdited(false);
        Swal.fire({
          title: "Success!",
          text: "Your profile has been updated successfully",
          icon: "success",
          confirmButtonColor: "#667eea",
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update profile. Please try again.",
        icon: "error",
        confirmButtonColor: "#667eea",
      });
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: Person },
    { id: "business", label: "Business Details", icon: Business },
  ];

  const InputField = ({
    icon: Icon,
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    fullWidth = false,
  }) => (
    <div className={`input-group ${fullWidth ? "full-width" : ""}`}>
      <label>
        <Icon className="input-icon" />
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={userData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          rows="3"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={userData[name]}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <motion.div
      className="profile-edit-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingOverlay loading={loading} />

      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="header-content">
            <h1>
              <Edit className="header-icon" />
              Account Settings
            </h1>
            <p>Manage your profile information and preferences</p>
          </div>
          {isEdited && (
            <motion.div
              className="unsaved-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <CheckCircle />
              <span>Unsaved changes</span>
            </motion.div>
          )}
        </div>

        <div className="profile-content">
          {/* Avatar Section */}
          <div className="avatar-section">
            <motion.div
              className="avatar-wrapper"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="avatar-container">
                <img
                  src={userData.profile_picture}
                  alt="Profile"
                  className="avatar"
                />
                <div className="avatar-overlay">
                  <Upload
                    listType="picture"
                    multiple={false}
                    beforeUpload={() => false}
                    onChange={handleImageUpload}
                    showUploadList={false}
                  >
                    <Button className="avatar-upload-btn">
                      <UploadOutlined />
                    </Button>
                  </Upload>
                </div>
              </div>
              <div className="avatar-actions">
                <Upload
                  listType="picture"
                  multiple={false}
                  beforeUpload={() => false}
                  onChange={handleImageUpload}
                  showUploadList={false}
                >
                  <Button className="upload-btn">
                    <UploadOutlined />
                    Change Photo
                  </Button>
                </Upload>
                <button className="remove-btn" onClick={handleRemoveImage}>
                  Remove
                </button>
              </div>
            </motion.div>

            <div className="avatar-info">
              <h3>
                {user?.first_name} {user?.last_name}
              </h3>
              <div
                className={`account-type-badge ${
                  userData.role === "company" ? "business" : "personal"
                }`}
              >
                {userData.role === "company"
                  ? "Business Account"
                  : "Personal Account"}
              </div>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-label">Member Since</span>
                  <span className="stat-value">2024</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-label">Listings</span>
                  <span className="stat-value">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="section-tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`tab-btn ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon />
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <AnimatePresence mode="wait">
              {/* Personal Details Section */}
              {activeSection === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="form-section"
                >
                  <h2 className="section-title">
                    <Person className="title-icon" />
                    Personal Details
                  </h2>
                  <div className="form-grid">
                    <InputField
                      icon={Person}
                      label="First Name"
                      name="first_name"
                      placeholder="Enter your first name"
                      required
                    />
                    <InputField
                      icon={Person}
                      label="Last Name"
                      name="last_name"
                      placeholder="Enter your last name"
                      required
                    />
                    <InputField
                      icon={Email}
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                    <InputField
                      icon={Phone}
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Business Details Section */}
              {activeSection === "business" && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="form-section"
                >
                  <h2 className="section-title">
                    <Business className="title-icon" />
                    Business Information
                  </h2>
                  <div className="form-grid">
                    <InputField
                      icon={Business}
                      label="Business Name"
                      name="business_name"
                      placeholder="Enter your business name"
                    />
                    <InputField
                      icon={LocationOn}
                      label="Location"
                      name="location"
                      placeholder="Enter your location"
                    />
                    <InputField
                      icon={LocationOn}
                      label="Business Address"
                      name="address"
                      type="textarea"
                      placeholder="Enter your full business address"
                      fullWidth
                    />
                    <div className="input-group checkbox-container full-width">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="has_physical_store"
                          checked={userData.has_physical_store}
                          onChange={handleChange}
                        />
                        <Store className="checkbox-icon" />
                        <span>I have a physical store</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="discard-btn"
                onClick={handleDiscardChanges}
                disabled={!isEdited}
              >
                <Cancel />
                Discard Changes
              </button>
              <button
                type="submit"
                className="save-btn"
                disabled={loading || !isEdited}
              >
                {loading ? (
                  <div className="loading-spinner-small"></div>
                ) : (
                  <>
                    <Save />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default EditProfileScreen;
