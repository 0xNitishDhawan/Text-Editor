import React from "react";
import { Link } from "react-router-dom";

const Homebutton = () => {
  return (
    <Link to="/">
      <div className="homeButton">Go to Homepage</div>
    </Link>
  );
};

export default Homebutton;
