import React from "react";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "137px",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
        style={{ width: "50px", height: "50px" }}
        loading="lazy"
        title="loading-img"
      />
    </div>
  );
}

export default Loader;
