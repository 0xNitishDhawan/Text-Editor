import React from "react";

const Button = ({ handleClick, text }) => {
  return (
    <div className="htmlButtonDiv">
      <button className="htmlButton" onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
