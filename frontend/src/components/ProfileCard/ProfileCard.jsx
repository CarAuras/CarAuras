import React, { useState } from "react";
import "./ProfileCard.css";
import { formatDate } from "../../utils/utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import { ToastContainer, toast } from "react-toastify";

function ProfileCard({ user, editable = false, onEdit, onShare }) {
  const [isSharing, setIsSharing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleEditProfile = () => {
    if (onEdit) {
      onEdit();
    } else {
      window.location.href = "/profile/edit";
    }
  };

  const handleShareProfile = async () => {
    if (!user) return;

    setIsSharing(true);
    const currentUrl = `${window.location.origin}/profile/${user._id}`;

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("✨ Link copied to clipboard!", {
        position: "bottom-center",
        autoClose: 2000,
      });
      if (onShare) onShare();
    } catch (error) {
      toast.error("Failed to copy link. Please try again.", {
        position: "bottom-center",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const getInitials = () => {
    if (!user) return "";
    return `${user.first_name?.charAt(0) || ""}${
      user.last_name?.charAt(0) || ""
    }`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!user) {
    return (
      <div className="profile-card profile-card-loading">
        <div className="skeleton-loader">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="avatar-wrapper">
          {!imageError && user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={`${user.first_name} ${user.last_name}'s avatar`}
              className="profile-avatar"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="avatar-initials" aria-label="User initials">
              {getInitials()}
            </div>
          )}

          {user?.subscribed && (
            <div className="verified-badge" aria-label="Verified user">
              <VerifiedIcon className="verified-icon" />
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-name-section">
          <h2 className="profile-name">
            {user?.first_name} {user?.last_name}
          </h2>
          {user?.pronouns && (
            <span className="pronouns">({user.pronouns})</span>
          )}
        </div>

        {user?.bio && <p className="profile-bio">{user.bio}</p>}

        <div className="profile-details">
          {user?.created_at && (
            <div className="detail-item">
              <CalendarMonthIcon className="detail-icon" aria-hidden="true" />
              <span>Joined {formatDate(user.created_at, "MMMM yyyy")}</span>
            </div>
          )}

          {user?.location && (
            <div className="detail-item">
              <LocationOnIcon className="detail-icon" aria-hidden="true" />
              <span>{user.location}</span>
            </div>
          )}

          {user?.email && (
            <div className="detail-item">
              <EmailIcon className="detail-icon" aria-hidden="true" />
              <a href={`mailto:${user.email}`} className="detail-link">
                {user.email}
              </a>
            </div>
          )}

          {user?.company && (
            <div className="detail-item">
              <BusinessIcon className="detail-icon" aria-hidden="true" />
              <span>{user.company}</span>
            </div>
          )}
        </div>

        <div className="stats-container">
          {user?.posts_count !== undefined && (
            <div className="stat-item">
              <span className="stat-value">{user.posts_count}</span>
              <span className="stat-label">Posts</span>
            </div>
          )}
          {user?.followers_count !== undefined && (
            <div className="stat-item">
              <span className="stat-value">{user.followers_count}</span>
              <span className="stat-label">Followers</span>
            </div>
          )}
          {user?.following_count !== undefined && (
            <div className="stat-item">
              <span className="stat-value">{user.following_count}</span>
              <span className="stat-label">Following</span>
            </div>
          )}
        </div>

        <div className="button-container">
          {editable && (
            <button
              className="btn btn-primary"
              onClick={handleEditProfile}
              aria-label="Edit profile"
            >
              <EditIcon fontSize="small" aria-hidden="true" />
              <span>Edit Profile</span>
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={handleShareProfile}
            disabled={isSharing}
            aria-label="Share profile"
          >
            <ShareIcon fontSize="small" aria-hidden="true" />
            <span>{isSharing ? "Copying..." : "Share"}</span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfileCard;
