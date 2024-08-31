import React from "react";

const Button = ({ handleClick }) => {
  return (
    <div className="htmlButtonDiv">
      <button className="htmlButton" onClick={handleClick}>
        Convert to HTML
      </button>
    </div>
  );
};

export default Button;
