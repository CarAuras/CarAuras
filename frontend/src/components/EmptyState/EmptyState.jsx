import React from "react";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state w-100">
      <div className="empty-icon">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/data-not-found-illustration-download-in-svg-png-gif-file-formats--message-empty-communication-emptystate-no-pack-design-development-illustrations-9404367.png"
          className="w-100"
          alt="no-data available"
          title="No data available"
        />
      </div>
      <h2 className="empty-title">No cars Available</h2>
      <p className="empty-description">
        We couldn't find any data matching your request.
      </p>
      <button className="empty-action">
        Refresh Page
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM4.93 12c0-3.96 3.22-7.18 7.18-7.18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 4.93V1l4.24 4.24L12 9.41V5.7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default EmptyState;
