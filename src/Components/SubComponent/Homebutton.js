import React from "react";
import { Link } from "react-router-dom";

const Homebutton = () => {
  return (
    <div className="htmlButtonDiv">
      <Link to="/">
        <button className="htmlButton ">Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Homebutton;
