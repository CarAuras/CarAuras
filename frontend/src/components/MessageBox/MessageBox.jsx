import React from "react";
import "./MessageBox.css";

function MessageBox({ title, type }) {
  return (
    <div>
      <div className="message-box">
        {type == "not-found" && (
          <img
            src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"
            className="not-found-im"
            loading="lazy"
            title="message-box-img"
          />
        )}
        <h4 className="message-title">{title}</h4>
      </div>
    </div>
  );
}

export default MessageBox;
