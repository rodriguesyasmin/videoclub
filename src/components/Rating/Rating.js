import React from "react";

function Star({ filled, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        color: filled ? "#ffc107" : "#e4e5e9",
        fontSize: "20px",
      }}
    >
      ★
    </span>
  );
}

export default Star;
